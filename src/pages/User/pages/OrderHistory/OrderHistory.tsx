import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesApi from 'src/apis/purchase.api'
import { path } from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchaseStatus'
import useQueryParams from 'src/hooks/useQueryParams'
import { Purchase, PurchaseListStatus } from 'src/types/purchase.types'
import { formatCurrency, generateNameId } from 'src/utils/utils'

export default function OrderHistory() {
  const { t } = useTranslation('product')
  const orderHistoryTab = [
    { name: t('Tất cả'), status: purchasesStatus.all },
    { name: t('Chờ xác nhận'), status: purchasesStatus.waitForConfirmation },
    { name: t('Đang giao'), status: purchasesStatus.inProgress },
    { name: t('Hoàn thành'), status: purchasesStatus.delivered },
    { name: t('Đã hủy'), status: purchasesStatus.cancelled }
  ]

  const queryConfig: { status?: string } = useQueryParams()
  const queryStatus = queryConfig.status || purchasesStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { queryStatus }],
    queryFn: () => purchasesApi.getPurchases({ status: queryStatus as PurchaseListStatus })
  })
  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabLink = orderHistoryTab.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.orderHistory,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': queryStatus === tab.status,
        'border-b-black/10 text-gray-900': queryStatus !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <Helmet>
        <title> Đơn Mua | Shopee Clone</title>
        <meta name='description' content='Trang Đơn Mua Shopee' />
      </Helmet>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabLink}</div>
          <div>
            {purchasesInCart?.map((purchase: Purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>{t('total')}</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
