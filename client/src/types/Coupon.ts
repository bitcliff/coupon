export interface Coupon {
  couponId: string
  createdAt: string
  name: string
  dueDate: string
  used: boolean
  attachmentUrl?: string
}
