import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateCouponItem } from '../../businessLogic/coupons'
import { UpdateCouponRequest } from '../../requests/UpdateCouponRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('updateCoupon')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', { event: event });
    const userId = getUserId(event);
    const couponId = event.pathParameters.couponId
    const updatedCoupon: UpdateCouponRequest = JSON.parse(event.body)

    logger.info(`updating coupon ${couponId} of user ${userId}`)
    await updateCouponItem(couponId, updatedCoupon, userId);
    logger.info(`updated coupon ${couponId} of user ${userId}`)

    return {
      statusCode: 204,
      body: ''
    };
  });

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
