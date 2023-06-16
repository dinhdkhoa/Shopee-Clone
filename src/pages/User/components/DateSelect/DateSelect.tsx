import range from 'lodash/range'
import { useState } from 'react'

interface Props {
  errorMessage?: string
  onChange?: (value: Date) => void
  value: Date
  lang: string
}

export default function DateSelect({ value, errorMessage, onChange, lang }: Props) {
  const [dob, setDOB] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: eventTargetValue } = event.target
    const newDate = {
      date: value?.getDate() || dob.date,
      month: value?.getMonth() || dob.month,
      year: value?.getFullYear() || dob.year,
      [name]: eventTargetValue
    }
    setDOB(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{lang}</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            name='date'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            onChange={handleChange}
            value={value?.getDate() || dob.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            onChange={handleChange}
            value={value?.getMonth() || dob.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            onChange={handleChange}
            value={value?.getFullYear() || dob.year}
          >
            <option disabled>Năm</option>
            {range(1950, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
