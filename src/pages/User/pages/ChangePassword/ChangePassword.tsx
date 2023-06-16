import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
// import userApi from 'src/apis/user.api'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
// import { useMutation } from '@tanstack/react-query'
// import isAxiosUnprocessableError from 'src/utils/utils'
// import omit from 'lodash/omit'
// import { toast } from 'react-toastify'
// import { ErrorResponse } from 'src/types/utils.type'

type FormData = Pick<UserSchema, 'confirm_password' | 'new_password' | 'password'>
const passwordSchema = userSchema.pick(['confirm_password', 'new_password', 'password'])

export default function ChangePassword() {
  const { t } = useTranslation('header')
  const {
    register,
    handleSubmit,
    // reset,
    // setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      confirm_password: '',
      new_password: '',
      password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  // const updateProfileMutation = useMutation(userApi.updateUser)

  const onSubmit = handleSubmit(async () => {
    // try {
    //   // const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
    //   // toast.success(res.data.message)
    //   reset()
    // } catch (error) {
    //   if (isAxiosUnprocessableError<ErrorResponse<FormData>>(error)) {
    //     const formError = error.response?.data.data
    //     if (formError) {
    //       Object.keys(formError).forEach((key) => {
    //         setError(key as keyof FormData, {
    //           type: 'Server',
    //           message: formError[key as keyof FormData]
    //         })
    //       })
    //     }
    //   }
    // }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <Helmet>
        <title>{t('changePassword')} | Shopee</title>
        <meta
          name='description'
          content='TrangThay đổi mật khẩu.Đây là một dự án clone shopee dùng cho mục đích học tập, và phi thương mại'
        />
      </Helmet>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('changePassword')} </h1>
        <div className='mt-1 text-sm text-gray-900'>{t('myProfileDesc')} </div>
      </div>
      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('currentPassword')} </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative '
                register={register}
                name='password'
                type='password'
                placeholder={t('currentPassword')}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('newPassword')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative '
                register={register}
                name='new_password'
                type='password'
                placeholder={t('newPassword')}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('confirm')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative '
                register={register}
                name='confirm_password'
                type='password'
                placeholder={t('confirm')}
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                {t('save')}
              </Button>
              <span className='mt-2 flex text-orange'>
                This is a demo for changing password data validation, submitting will not call API to protect the demo
                account.
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
