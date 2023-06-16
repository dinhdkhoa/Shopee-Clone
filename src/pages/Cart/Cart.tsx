import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import noproduct from 'src/assets/images/no-product.png'
import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchasesApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { path } from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchaseStatus'
import { Purchase } from 'src/types/purchase.types'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { toast } from 'react-toastify'
import { useAppContext } from 'src/context/app.context'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function Cart() {
  const { t } = useTranslation('product')
  const { extendedPurchases, setExtendedPurchases } = useAppContext()

  const location = useLocation()
  const purchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  const { data: purchasesInCartQueryData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchasesMutation = useMutation({
    mutationFn: purchasesApi.updatePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchasesApi.buyProducts,
    onSuccess: () => {
      refetch()
      toast.success(t('bought'), {
        position: 'top-center'
      })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchasesApi.deletePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = purchasesInCartQueryData?.data.data
  const isAllChecked = useMemo(() => extendedPurchases?.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchase = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const totalPurchasePrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + current.price * current.buy_count
      }, 0),
    [checkedPurchase]
  )
  const totalPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + (current.price_before_discount - current.price) * current.buy_count
      }, 0),
    [checkedPurchase]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const matchingId = purchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: matchingId || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasesInCart, purchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (productIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (productIndex: number, value: number, enable: boolean) => {
    if (enable) {
      setExtendedPurchases(
        produce((draft) => {
          draft[productIndex].disabled = true
        })
      )
      updatePurchasesMutation.mutate({ product_id: extendedPurchases[productIndex].product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteAll = () => {
    const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
    purchaseIds.length > 0 && deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuy = () => {
    if (checkedPurchase.length > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <Helmet>
        <title> {t('cart')} | Shopee Clone</title>
        <meta name='description' content='Trang giỏ hàng Shopee' />
      </Helmet>
      <div className='container'>
        {purchasesInCart && purchasesInCart.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>{t('products')}</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>{t('unitPrice')}</div>
                      <div className='col-span-1'>{t('quantity')}</div>
                      <div className='col-span-1'>{t('totalPrice')}</div>
                      <div className='col-span-1'>{t('actions')}</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                  className='h-20 w-20 flex-shrink-0 '
                                >
                                  <img alt={purchase.product.name} src={purchase.product.image} />
                                </Link>
                                <div className='flex-grow px-2 pb-2 pt-1'>
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id
                                    })}`}
                                    className='line-clamp-2 text-left'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onType={handleTypeQuantity(index)}
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-orange'
                                onClick={() => handleDelete(index)}
                              >
                                {t('delete')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-3 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none'>
                  {t('seleteAll')} ({extendedPurchases.length})
                </button>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteAll}>
                  {t('delete')}{' '}
                </button>
              </div>
              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>
                      {t('total')} ({checkedPurchase.length} {t('products')}):
                    </div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>{t('saving')}</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  isLoading={buyProductsMutation.isLoading}
                  disabled={buyProductsMutation.isLoading || checkedPurchase.length == 0}
                  onClick={handleBuy}
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                >
                  {t('checkOut')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='min-h-[400px] text-center'>
            <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>{t('noPurchase')}</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                {t('buyNow')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
