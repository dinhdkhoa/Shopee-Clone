import Popover from '../Popover'
import { useAppContext } from 'src/context/app.context'
import Button from '../Button'
import { path } from 'src/constant/path'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constant/purchaseStatus'
import { getAvatarURL } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

export default function NavHeader() {
  const { i18n, t } = useTranslation('header')
  const currentLang = locales[i18n.language as keyof typeof locales]
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useAppContext()
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleClick = () => {
    logoutMutation.mutate()
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  return (
    <div className='flex justify-end'>
      <Popover
        classNameForPopover='shadow-md relative rounded-sm border border-gray-200 bg-white'
        as='span'
        className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        renderPopover={
          <div className='flex flex-col px-3 py-2'>
            <button className='px-3 py-2 hover:text-orange' onClick={() => changeLanguage('vi')}>
              Tiếng Việt
            </button>
            <button className='mt-2 px-3 py-2 hover:text-orange' onClick={() => changeLanguage('en')}>
              English
            </button>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>{currentLang}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          classNameForPopover='shadow-md relative rounded-sm border border-gray-200 bg-white'
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div>
              <Link to={path.profile} className='block bg-white px-3 py-2 hover:bg-slate-100 hover:text-cyan-500'>
                {t('myAccount')}
              </Link>
              <Link to={path.orderHistory} className='block bg-white px-3 py-2 hover:bg-slate-100 hover:text-cyan-500'>
                {t('purchase')}
              </Link>
              <Button
                disabled={logoutMutation.isLoading}
                onClick={handleClick}
                className='w-100 block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                {t('logout')}
              </Button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img src={getAvatarURL(profile?.avatar)} alt='avatar' className='h-full w-full rounded-full object-cover' />
          </div>
          <div>{profile?.name || profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            {t('login')}
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40'></div>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            {t('register')}
          </Link>
        </div>
      )}
    </div>
  )
}
