import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: 20
}

const RANGE = 2
export default function Pagination({ page, pageSize, setPage }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button className='mx-2 rounded border bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className='mx-2  rounded border bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) return renderDotBefore(index)
          else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) return renderDotAfter(index)
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE)
          return renderDotBefore(index)
        return (
          <button
            onClick={() => setPage(pageNumber)}
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            key={index}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Prev</button>
      {renderPagination()}
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Prev</button>
    </div>
  )
}
