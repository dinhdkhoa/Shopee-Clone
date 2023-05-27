import { Link } from 'react-router-dom'
import { Schema, schema } from 'src/utils/rules'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isAxiosUnprocessableError from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import Input from 'src/components/Input'

type FormData = Omit<Schema, 'confirm_password'>

const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...body } = data
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        console.log('Đăng nhập thành công')
      },
      onError: (data) => {
        if (isAxiosUnprocessableError<ResponseApi<FormData>>(data)) {
          const formError = data.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'Server',
                message: formError[key as keyof FormData]
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-login-hero-image bg-cover  bg-fixed bg-center bg-no-repeat'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
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
                errorMessage={errors.password?.message}
                autoComplete='on'
                type='password'
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
