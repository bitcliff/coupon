export interface CouponItem {
  userId: string
  couponId: string
  createdAt: string
  code: string
  shop: string,
  dueDate: string
  used: boolean
  attachmentUrl?: string
}
