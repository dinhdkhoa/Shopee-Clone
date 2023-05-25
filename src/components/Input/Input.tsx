import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  className?: string
  placeholder: string
  errorMessage?: string
  register: UseFormRegister<any>
  // rules: RegisterOptions
  autoComplete?: string
  name: string
}

export default function Input({
  placeholder,
  register,
  // rules,
  type,
  className,
  errorMessage,
  autoComplete,
  name
}: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
