import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  clasNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    clasNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    errorMessage,
    value = '',
    onChange,
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // Cập nhật localValue state
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input className={clasNameInput} {...rest} onChange={handleChange} value={value || localValue} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
