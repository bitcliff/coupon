import { CouponsAccess } from '../dataLayer/couponsAcess'
import { CouponItem } from '../models/CouponItem'
import { CreateCouponRequest } from "../requests/CreateCouponRequest"
import { UpdateCouponRequest } from '../requests/UpdateCouponRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { CouponUpdate } from '../models/CouponUpdate';
import { FileAccess } from '../dataLayer/fileAccess';


const logger = createLogger('Coupons')
const couponsAccess = new CouponsAccess();
const fileAccess = new FileAccess();

export async function createAttachmentPresignedUrl(userId: string, couponId: string): Promise<String> {
    const uploadUrl = await fileAccess.getUploadUrl(couponId);
    logger.info(`upload url is ${uploadUrl}`)
    const attachmentUrl = fileAccess.getAttachmentUrl(couponId);
    logger.info(`attachmentUrl is ${attachmentUrl}`)
    await couponsAccess.updateAttachmentUrl(userId, couponId, attachmentUrl);
    logger.info(`updated attachment url for coupon ${couponId} of user ${userId}`)
    return uploadUrl;
}

export async function getAllCoupons(userId: string): Promise<CouponItem[]> {
    return couponsAccess.getAllCoupons(userId);
}

export async function getCoupon(couponId: string, userId: string): Promise<CouponItem> {
    return couponsAccess.getCouponById(couponId, userId);
}


export async function createCouponItem(createCouponRequest: CreateCouponRequest, userId: string): Promise<CouponItem> {
    logger.info('Creating new Coupon for user ', userId);

    const couponId = uuid.v4();
    const timestamp = new Date().toISOString();

    return await couponsAccess.createCoponItem({
        userId: userId,
        couponId: couponId,
        createdAt: timestamp,
        code: createCouponRequest.code,
        shop: createCouponRequest.shop,
        dueDate: createCouponRequest.dueDate,
        used: false
    });
}

export async function updateCouponItem(couponId: string, updateCouponRequest: UpdateCouponRequest, userId: string): Promise<CouponUpdate> {
    logger.info(`Udating coupon ${couponId} of user ${userId}`);

    return await couponsAccess.updateCouponItem({
        code: updateCouponRequest.code,
        shop: updateCouponRequest.shop,
        dueDate: updateCouponRequest.dueDate,
        used: updateCouponRequest.used
    },
        couponId,
        userId);
}

export async function deleteCouponItem(couponId: string, userId: string) {
    await couponsAccess.deleteCouponItem(couponId, userId)
  }