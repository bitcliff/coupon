import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createAttachmentPresignedUrl } from '../../businessLogic/coupons'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const couponId = event.pathParameters.couponId
    const userId = getUserId(event);


    const presignedUrl = await createAttachmentPresignedUrl(userId, couponId);
    
    return {
      statusCode: 200,
      body:  JSON.stringify({
        uploadUrl: presignedUrl,
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
