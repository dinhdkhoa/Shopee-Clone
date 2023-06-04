import { InputHTMLAttributes, forwardRef } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  clasNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputProps>(function InputNumberInner(
  {
    className,
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    clasNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    errorMessage,
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange(event)
      // Cập nhật localValue state
    }
  }

  return (
    <div className={className}>
      <input className={clasNameInput} {...rest} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
