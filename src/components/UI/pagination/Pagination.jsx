import React from "react"
import { getPagesArray } from "../../../utils/page"

const Pagination = ({ totalPages, page, changePage }) => {
  // переписать на хук usePagination
  let pagesArray = getPagesArray(totalPages)
  console.log("###pagesArray:", pagesArray)
  return (
    <div className="page__wrapper">
      {pagesArray.map(p => (
        <span
          onClick={() => changePage(p)}
          className={p === page ? "page page__current" : "page"}
          key={p}
        >
          {p}
        </span>
      ))}
    </div>
  )
}

export default Pagination
