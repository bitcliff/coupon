import React from "react"
import { useForm } from "react-hook-form";
import Auth from '../auth/Auth'
import dateFormat from 'dateformat'
import { createCoupon, deleteCoupon, getCoupons, patchCoupon } from '../api/coupons-api'
interface Iprops {
    auth: Auth
}

export const AddCoupon: React.FC<Iprops> = (props: Iprops) => {
    type FormFields = {
        code: string,
        shop: number,
        dueDate: string
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>();

    const errorFormValues = (errors: any) => {
        console.log("error", errors)
    }

    function calculateDueDate(): string {
        const date = new Date()
        date.setDate(date.getDate() + 7)

        return dateFormat(date, 'yyyy-mm-dd') as string
    }

    async function submit(values: FormFields) {
        console.log(values)
        try {
            const name = values.code
            const dueDate = values.dueDate
            await createCoupon(props.auth.getIdToken(), {
                name,
                dueDate
            })
            alert('Coupon saved')
        } catch {
            alert('Coupon creation failed')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit, errorFormValues)}>
                <label>Coupon code</label>
                <input type="code" {...register("code", { required: true })} name="code" /><br />
                {errors.code && <span>This field is required</span>}<br />
                <label>Shop</label>
                <input type="shop" {...register("shop", { required: true })} name="shop" /><br />
                {errors.shop && <span>This field is required</span>}<br />
                <label>Due date</label>
                <input type="dueDate" {...register("dueDate", {
                    pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/i,
                        message: "invalid date: It has to match format: yyyy-MM-dd"
                    }
                })} name="dueDate" /><br />
                {errors.dueDate && <span>{errors.dueDate.message}</span>}<br />
                <input type="submit" value="Save Coupon"/>
                <input
                    type="button"
                    onClick={() => reset()}
                    value="Reset"
                />
            </form>
        </div>
    )
}