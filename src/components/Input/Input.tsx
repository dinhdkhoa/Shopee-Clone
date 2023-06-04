import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  clasNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  register,
  rules,
  name,
  className,
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  clasNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  errorMessage,
  ...rest
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : {} // đảm bảo ts vì nếu rỗng thì trả về object rỗng hooặc null
  return (
    <div className={className}>
      <input
        className={clasNameInput}
        {...rest}
        {...registerResult} //xử lí react-hook-form
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
