// import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']: RegisterOptions }

// export const rules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: 'Bắt buộc nhập Email',
//     pattern: {
//       value: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
//       message: 'Email không đúng định dạng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5-160 digits'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5-160 kí tự'
//     }
//   },
//   password: {
//     required: 'Bắt buộc nhập Password',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6-160 kí tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6-160 kí tự'
//     }
//   },
//   confirm_password: {
//     required: 'Bắt buộc nhập Password',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6-160 kí tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6-160 kí tự'
//     },
//     validate:
//       typeof getValues === 'function' ? (v) => v === getValues('password') || 'Nhập lại password không khớp' : undefined
//   }
// })
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handlePasswordYup = (message: string, yupRef?: string) => {
  return yupRef
    ? yup
        .string()
        .required('Confirm Password is required')
        .min(6, 'Must have 6-160 digits')
        .max(160, 'Must have 6-160 digits')
        .oneOf([yup.ref(yupRef)], 'Confirm Password is not matching')
    : yup.string().required(message).min(6, 'Must have 6-160 digits').max(160, 'Must have 6-160 digits')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Incorrect Email Format')
    .min(5, 'Must have 5-160 digits')
    .max(160, 'Must have 5-160 digits'),
  password: handlePasswordYup('Password is required'),
  confirm_password: handlePasswordYup('Confirm password is required', 'password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price not allowed',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price not allowed',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Maximum 160 digits'),
  address: yup.string().max(160, 'Maximum 160 digits'),
  phone: yup.string().max(20, 'Maximum 20 digits'),
  date_of_birth: yup.date().max(new Date(), 'Invalid Date'),
  avatar: yup.string().max(1000, 'Maximum 1000 digits'),
  password: handlePasswordYup('Password is required'),
  new_password: handlePasswordYup('Password is required'),
  confirm_password: handlePasswordYup('Password is required', 'new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
