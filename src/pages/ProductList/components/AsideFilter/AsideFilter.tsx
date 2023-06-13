import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { path } from 'src/constant/path'
import { CategoryType } from 'src/types/category.type'
import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import InputNumber from 'src/components/InputNumber'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'
interface Props {
  queryConfig: QueryConfig
  categories: CategoryType[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ categories, queryConfig }: Props) {
  const { t } = useTranslation('home')
  const category = queryConfig.category
  const navigate = useNavigate()
  const {
    control,
    reset,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const removeAllFilter = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'category', 'rating_filter'])).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all categories')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          const tKey = `aside filter.${categoryItem.name}`
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {t(tKey as any)}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t('aside filter.filter')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        {t('aside filter.priceRange')}
        <div></div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-center'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  ref={field.ref}
                  type='text'
                  className='row'
                  classNameError='hidden'
                  placeholder={'₫ ' + t('aside filter.from')}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                  value={field.value}
                  classNameInput='p-1 w-full rounded-sm border border-gray-300  outline-none focus:border-gray-500 focus:shadow-sm'
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  ref={field.ref}
                  classNameError='hidden'
                  type='text'
                  className='row'
                  placeholder={'₫ ' + t('aside filter.to')}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                  value={field.value}
                  classNameInput='p-1 w-full rounded-sm border border-gray-300  outline-none focus:border-gray-500 focus:shadow-sm'
                />
              )}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            {t('aside filter.apply')}
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={removeAllFilter}
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        {t('aside filter.deleteAll')}
      </Button>
    </div>
  )
}
