import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateCouponRequest } from "../../requests/CreateCouponRequest"
import { getUserId } from '../utils';
import { createCouponItem } from '../../businessLogic/coupons'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createCoupon')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('Processing event: ', { event: event });
    const newCoupon: CreateCouponRequest = JSON.parse(event.body)
  
    const userId = getUserId(event);
    logger.info(`creating coupon item for user ${userId}`);
  
    
    const item = await createCouponItem(newCoupon, userId);

    logger.info(`successfully created new coupon item for user ${userId}`);
  
    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    };
  });

handler.use(
  cors({
    credentials: true
  })
)
