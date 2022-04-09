/**
 * Fields in a request to create a single Coupon item.
 */
export interface CreateCouponRequest {
  code: string;
  shop: string;
  dueDate: string;
}
