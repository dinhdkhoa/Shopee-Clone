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
//       message: 'Độ dài từ 5-160 kí tự'
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

export const schema = yup.object({
  email: yup
    .string()
    .required('Bắt buộc nhập Email')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Bắt buộc nhập Email')
    .min(6, 'Độ dài từ 6-160 kí tự')
    .max(160, 'Độ dài từ 6-160 kí tự'),
  confirm_password: yup
    .string()
    .required('Bắt buộc nhập Email')
    .min(6, 'Độ dài từ 6-160 kí tự')
    .max(160, 'Độ dài từ 6-160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

export type Schema = yup.InferType<typeof schema>