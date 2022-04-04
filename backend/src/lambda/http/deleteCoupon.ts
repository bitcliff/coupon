import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteCouponItem } from '../../businessLogic/coupons'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteCoupon')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('Processing event: ', { event: event });
    const couponId = event.pathParameters.couponId
    const userId = getUserId(event);
    logger.info(`deleting coupon item ${couponId} for user ${userId}`);
    await deleteCouponItem(couponId, userId);
    logger.info(`deleted coupon item ${couponId} for user ${userId}`);
    return {
      statusCode: 204,
      body: ''
    };
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
