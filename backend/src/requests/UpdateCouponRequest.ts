/**
 * Fields in a request to update a single Coupon item.
 */
export interface UpdateCouponRequest {
  code: string
  shop: string
  dueDate: string
  used: boolean
}