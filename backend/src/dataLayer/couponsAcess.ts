import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { CouponItem } from '../models/CouponItem'
import { CouponUpdate } from '../models/CouponUpdate';

const logger = createLogger('CouponsAccess')

export class CouponsAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly couponsTable = process.env.COUPONS_TABLE) {
    }

    async getAllCoupons(userId: string): Promise<CouponItem[]> {
        console.log('Getting all Coupons for user ', userId)

        const result = await this.docClient.query({
            TableName: this.couponsTable,
            KeyConditionExpression: '#userId =:i',
            ExpressionAttributeNames: {
                '#userId': 'userId'
            },
            ExpressionAttributeValues: {
                ':i': userId
            }
        }).promise();

        const items = result.Items
        return items as CouponItem[]
    }

    async createCoponItem(coupon: CouponItem): Promise<CouponItem> {
        console.log('Creating new coupon item')
        await this.docClient.put({
            TableName: this.couponsTable,
            Item: coupon
        }).promise()
        console.log('Created new coupon item')
        return coupon
    }

    async updateCouponItem(coupon: CouponUpdate, userId: string, couponId: string): Promise<CouponUpdate> {
        console.log(`updating coupon item for user ${userId} and ${couponId}`)
        const params = {
            TableName: this.couponsTable,
            Key: {
                userId: userId,
                couponId: couponId
            },
            ExpressionAttributeNames: {
                '#coupon_code': 'code',
            },
            ExpressionAttributeValues: {
                ':code': coupon.code,
                ':shop': coupon.shop,
                ':dueDate': coupon.dueDate,
                ':used': coupon.used,
            },
            UpdateExpression: 'SET #coupon_code = :code, shop = :shop, dueDate = :dueDate, used = :used',
            ReturnValues: 'ALL_NEW',
        };

        const result = await this.docClient.update(params).promise();

        logger.info('Result of update statement', { result: result });

        return result.Attributes as CouponUpdate;
    }

    async updateAttachmentUrl(userId: string, couponId: string, attachmentUrl: string) {
        console.log(`updating attachment url for ${userId} and ${couponId} with url ${attachmentUrl}`)
        const params = {
            TableName: this.couponsTable,
            Key: {
                userId: userId,
                couponId: couponId
            },
            ExpressionAttributeNames: {
                '#coupon_attachmentUrl': 'attachmentUrl'
            },
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            },
            UpdateExpression: 'SET #coupon_attachmentUrl = :attachmentUrl',
            ReturnValues: 'ALL_NEW',
        };

        const result = await this.docClient.update(params).promise();
        logger.info('Result of update statement', { result: result });
    }

    async deleteCouponItem(couponId: string, userId: string) {
        console.log(`deleting coupon ${couponId} of user ${userId}`)
    
        await this.docClient.delete({
          TableName: this.couponsTable,
          Key: {
            userId: userId,
            couponId: couponId
          }
        }).promise();
    
        logger.info('deleted successfully');
      }
}

function createDynamoDBClient(): DocumentClient {
    // workaround for return new XAWS.DynamoDB.DocumentClient() --> compiling problems
    const service = new AWS.DynamoDB();
    const client = new AWS.DynamoDB.DocumentClient({
        service: service
    });
    AWSXRay.captureAWSClient(service);
    return client;
}
