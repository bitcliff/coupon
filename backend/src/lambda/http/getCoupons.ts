import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getAllCoupons } from '../../businessLogic/coupons'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('getCoupons')


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', { event: event });
    const userId = getUserId(event);
    logger.info(`get all coupons for user ${userId}`);
    const coupons = await getAllCoupons(userId);
    logger.info(`fetched all coupons for user ${userId}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: coupons
      })
    };
  });

handler.use(
  cors({
    credentials: true
  })
)
