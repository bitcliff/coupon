import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getCoupon } from '../../businessLogic/coupons'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('getCoupon')


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', { event: event });
    const couponId = event.pathParameters.couponId
    const userId = getUserId(event);
    logger.info(`get coupon with id ${couponId} for user ${userId}`);
    const coupon = await getCoupon(couponId, userId);
    logger.info(`fetched coupon with id ${couponId} for user ${userId}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        coupon
      })
    };
  });

handler.use(
  cors({
    credentials: true
  })
)
