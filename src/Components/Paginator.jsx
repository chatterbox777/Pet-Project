import React, { useState } from "react";
import classTags from "../App.module.css";

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let [portionNumber, setPortionNumber] = useState(1);

  let leftPagePortionNumber = (portionNumber - 1) * props.portionSize + 1;

  let rightPagePortionNumber = portionNumber * props.portionSize;

  return (
    <div className={classTags.hoverEffect}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPagePortionNumber && page <= rightPagePortionNumber
        )
        .map((page) => (
          <span
            onClick={() => props.changePage(page)}
            className={props.currentPage === page && classTags.selectedPage}
          >
            {page}
          </span>
        ))}
      <button
        onClick={() => {
          setPortionNumber(portionNumber + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
