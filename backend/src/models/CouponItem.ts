export interface CouponItem {
  userId: string
  couponId: string
  createdAt: string
  name: string
  dueDate: string
  used: boolean
  attachmentUrl?: string
}
