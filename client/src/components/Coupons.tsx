import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader
} from 'semantic-ui-react'

import { deleteCoupon, getCoupons, patchCoupon } from '../api/coupons-api'
import Auth from '../auth/Auth'
import { Coupon } from '../types/Coupon'

interface CouponsProps {
  auth: Auth
  history: History
}

interface CouponsState {
  coupons: Coupon[]
  newCouponName: string
  loadingCoupons: boolean
}

export class Coupons extends React.PureComponent<CouponsProps, CouponsState> {
  state: CouponsState = {
    coupons: [],
    newCouponName: '',
    loadingCoupons: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newCouponName: event.target.value })
  }

  onUploadButtonClick = async (couponId: string) => {
    this.props.history.push(`/coupons/${couponId}/uploadImage`)
  }

  onEditButtonClick = async (couponId: string) => {
    this.props.history.push(`/coupons/${couponId}/edit`)
  }

  onCouponDelete = async (couponId: string) => {
    try {
      await deleteCoupon(this.props.auth.getIdToken(), couponId)
      this.setState({
        coupons: this.state.coupons.filter(coupon => coupon.couponId !== couponId)
      })
    } catch {
      alert('Coupon deletion failed')
    }
  }

  onCouponCheck = async (pos: number) => {
    try {
      const coupon = this.state.coupons[pos]
      await patchCoupon(this.props.auth.getIdToken(), coupon.couponId, {
        code: coupon.code,
        shop: coupon.shop,
        dueDate: coupon.dueDate,
        used: !coupon.used
      })
      this.setState({
        coupons: update(this.state.coupons, {
          [pos]: { used: { $set: !coupon.used } }
        })
      })
    } catch {
      alert('Coupon deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const coupons = await getCoupons(this.props.auth.getIdToken())
      this.setState({
        coupons: coupons,
        loadingCoupons: false
      })
    } catch (e) {
      let errorMessage = "Failed to do something exceptional";
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      alert(errorMessage);
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Coupons</Header>
        {this.renderCoupons()}
      </div>
    )
  }

  renderCoupons() {
    if (this.state.loadingCoupons) {
      return this.renderLoading()
    }

    return this.renderCouponsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Coupons
        </Loader>
      </Grid.Row>
    )
  }

  renderCouponsList() {
    return (
      <Grid padded>
        {this.state.coupons.map((coupon, pos) => {
          return (
            <Grid.Row key={coupon.couponId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onCouponCheck(pos)}
                  checked={coupon.used}
                />
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {coupon.code} ({coupon.shop})              
                {coupon.attachmentUrl && (
                <Image src={coupon.attachmentUrl} size="small" wrapped />
              )}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {coupon.dueDate}
              </Grid.Column>

              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onUploadButtonClick(coupon.couponId)}
                >
                  <Icon name="upload" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onCouponDelete(coupon.couponId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}
