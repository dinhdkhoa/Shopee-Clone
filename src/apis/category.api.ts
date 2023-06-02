import { CategoryType } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

const URL = 'categories'

const categoryApi = {
  getCategories: () => {
    return http.get<SuccessResponse<CategoryType[]>>(URL)
  }
}

export default categoryApi
