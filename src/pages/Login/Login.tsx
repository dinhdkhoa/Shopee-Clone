import { Link } from 'react-router-dom'
import { Schema, schema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isAxiosUnprocessableError from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useMutation } from '@tanstack/react-query'
import Input from 'src/components/Input'
import { useAppContext } from 'src/context/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constant/path'
import authApi from 'src/apis/auth.api'

type FormData = Pick<Schema, 'email' | 'password'>

const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const { setIsAuthenticated, setProfile } = useAppContext()

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...body } = data
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data?.user)
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
        }
      }
    })
  })
  return (
    <div className='bg-orange bg-cover bg-center bg-no-repeat'>
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
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                autoComplete='on'
                type='password'
              />
              <div className='mt-2'>
                <Button
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.register}>
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
