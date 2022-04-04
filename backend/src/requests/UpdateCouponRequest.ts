/**
 * Fields in a request to update a single Coupon item.
 */
export interface UpdateCouponRequest {
  name: string
  dueDate: string
  used: boolean
}