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
  placeholder,
  register,
  rules,
  type,
  className,
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  clasNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  errorMessage,
  autoComplete,
  name
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : {} // đảm bảo ts
  return (
    <div className={className}>
      <input
        type={type}
        className={clasNameInput}
        placeholder={placeholder}
        {...registerResult} //xử lí react-hook-form
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
