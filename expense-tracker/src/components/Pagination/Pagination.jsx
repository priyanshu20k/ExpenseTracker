import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Styles from "./Pagination.module.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePreviousPage = ()=>{
        if(currentPage>1){
            setCurrentPage(prev => prev-1)
        }
    }

    const handleNextPage = ()=>{
        if(currentPage != totalPages){
            setCurrentPage(prev => prev+1)
        }
    }
  return (
    <div className={Styles.paginationWrapper}>
      <button disabled={currentPage===1} onClick={handlePreviousPage}>
        <IoIosArrowRoundBack />
      </button>
      <p>{currentPage}</p>
      <button disabled={currentPage===totalPages} onClick={handleNextPage}>
        <IoIosArrowRoundForward />
      </button>
    </div>
  );
};

export default Pagination;
