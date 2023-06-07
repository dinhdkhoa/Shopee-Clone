import { Purchase, PurchaseListStatus } from 'src/types/purchase.types'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

const URL = 'purchases'
const purchasesApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponse<Purchase[]>>(URL, {
      params
    })
  }
}

export default purchasesApi
