import { Controller, useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import userApi from 'src/apis/user.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import InputNumber from 'src/components/InputNumber'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { useAppContext } from 'src/context/app.context'
import { saveProfiletoLS } from 'src/utils/auth'
import isAxiosUnprocessableError, { getAvatarURL } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import UploadImage from 'src/components/UploadImage'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { t } = useTranslation('header')
  const { setProfile } = useAppContext()
  const [file, setFile] = useState<File>()
  let isAvatarUploaded = false
  const previewImg = useMemo(() => {
    if (file) {
      isAvatarUploaded = true
      return URL.createObjectURL(file)
    } else return ''
    // return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: queryData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser
  })
  const profile = queryData?.data.data

  const updateProfileMutation = useMutation(userApi.updateUser)
  const uploadAvatarMutation = useMutation(userApi.uploadUserAvatar)

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isDirty }
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      name: '',
      phone: '',
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      let avatarUpload = previewImg
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const resUploadAvatar = await uploadAvatarMutation.mutateAsync(form)
        avatarUpload = resUploadAvatar.data.data
      }
      await updateProfileMutation.mutateAsync(
        { ...data, date_of_birth: data.date_of_birth?.toISOString(), avatar: avatarUpload },
        {
          onSuccess: (data) => {
            refetch()
            setProfile(data.data.data)
            saveProfiletoLS(data.data.data)
            setFile(undefined)
            toast.success(data.data.message)
          }
        }
      )
    } catch (error) {
      if (isAxiosUnprocessableError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              type: 'Server',
              message: formError[key as keyof FormDataError]
            })
          })
        }
      }
    }
  })

  const uploadImage = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <Helmet>
        <title> {t('userProfile')} | Shopee Clone</title>
        <meta name='description' content='Trang thông tin người dùng Shopee' />
      </Helmet>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('myProfile')}</h1>
        <div className='mt-1 text-sm text-gray-700'>{t('myProfileDesc')}</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('name')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='name'
                placeholder={t('name')}
                errorMessage={errors.name?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('phone')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder={t('phone')}
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('address')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='address'
                placeholder={t('address')}
                errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect
                lang={t('dob')}
                value={field.value as Date}
                onChange={field.onChange}
                errorMessage={errors.date_of_birth?.message}
              />
            )}
          />
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                disabled={!isDirty && !isAvatarUploaded}
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImg || getAvatarURL(profile?.avatar)}
                alt='previewimage'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <UploadImage onChange={uploadImage} />
            <div className='mt-3 text-gray-400'>
              <div>{t('maxImgSize')}</div>
              <div>{t('imgType')}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
