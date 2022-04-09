import { apiEndpoint } from '../config'
import { Coupon } from '../types/Coupon';
import { CreateCouponRequest } from '../types/CreateCouponRequest';
import Axios from 'axios'
import { UpdateCouponRequest } from '../types/UpdateCouponRequest';

export async function getCoupons(idToken: string): Promise<Coupon[]> {
  console.log('Fetching coupons')

  const response = await Axios.get(`${apiEndpoint}/coupons`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Coupons:', response.data)
  return response.data.items
}

export async function getCoupon(idToken: string, couponId: string): Promise<Coupon> {
  console.log('Fetching coupon')

  const response = await Axios.get(`${apiEndpoint}/coupons/${couponId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Coupon:', response.data)
  return response.data.item
}

export async function createCoupon(
  idToken: string,
  newCoupon: CreateCouponRequest
): Promise<Coupon> {
  const response = await Axios.post(`${apiEndpoint}/coupons`,  JSON.stringify(newCoupon), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchCoupon(
  idToken: string,
  couponId: string,
  updatedCoupon: UpdateCouponRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/coupons/${couponId}`, JSON.stringify(updatedCoupon), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteCoupon(
  idToken: string,
  couponId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/coupons/${couponId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  couponId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/coupons/${couponId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
