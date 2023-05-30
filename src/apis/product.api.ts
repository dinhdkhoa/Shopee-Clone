import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

const URL = 'products'
const productApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetailed: (id: string) => {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
