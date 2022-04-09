export interface Coupon {
  couponId: string
  createdAt: string
  code: string
  shop: string
  dueDate: string
  used: boolean
  attachmentUrl?: string
}
