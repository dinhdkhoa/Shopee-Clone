import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import isAxiosUnprocessableError from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Button from 'src/components/Button'
import { path } from 'src/constant/path'
import authApi from 'src/apis/auth.api'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { t } = useTranslation('header')
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...body } = data
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (data) => {
        if (isAxiosUnprocessableError<ErrorResponse<FormData>>(data)) {
          const formError = data.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'Server',
                message: formError[key as keyof FormData]
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     type: 'Server',
          //     message: formError.email
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-orange bg-cover bg-center bg-no-repeat '>
      <Helmet>
        <title>{t('register')} | Shopee Clone</title>
        <meta name='description' content='Đăng nhập giỏ hàng Shopee' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>{t('register')}</div>
              <Input
                placeholder='Email'
                register={register}
                // rules={rules.email}
                className='mt-5'
                name='email'
                errorMessage={errors.email?.message}
                type='email'
              />

              <Input
                placeholder='Password'
                register={register}
                // rules={rules.password}
                name='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                autoComplete='on'
                type='password'
              />
              <Input
                placeholder='Confirm Password'
                register={register}
                // rules={rules.confirm_password}
                name='confirm_password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
                type='password'
              />

              <div className='mt-2'>
                <Button
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                >
                  {t('register')}
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>{t('haveAccount')}</span>
                <Link className='ml-1 text-red-400' to={path.login}>
                  {t('login')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
