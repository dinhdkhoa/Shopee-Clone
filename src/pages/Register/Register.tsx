import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  // const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      // console.log(data)
    }
    // (data) => {

    // }
  )
  // console.log(errors)

  return (
    <div className='bg-login-hero-image bg-cover bg-center bg-no-repeat'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
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
              <Input
                placeholder='Confirm Password'
                register={register}
                // rules={rules.confirm_password}
                name='confirm_password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
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
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}