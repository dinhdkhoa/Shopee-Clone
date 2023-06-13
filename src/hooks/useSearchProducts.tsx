import useQueryConfig from 'src/hooks/useQueryConfig'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constant/path'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const onSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSearch }
}
