import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'
import { AppContext } from 'src/context/app.context'
import { useContext } from 'react'
import { User } from 'src/types/user.types'

export default function UserLayout() {
  const { profile } = useContext(AppContext)
  const userProfile = profile as User

  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav profile={userProfile} />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet context={userProfile} />
          </div>
        </div>
      </div>
    </div>
  )
}
