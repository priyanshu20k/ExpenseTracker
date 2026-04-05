import React, { useEffect, useState } from "react";
import Styles from "./ExpenseList.module.css";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import Modal from "../Modal/Modal";
import ExpenseForm from "../Form/ExpenseForm/ExpenseForm";
import Pagination from "../Pagination/Pagination";

const ExpenseList = ({ expenseData, setExpenseData, balance, setBalance }) => {
  const [editId, setEditId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentRecords, setCurrentRecord] = useState([]);
  const recordsPerPage = 3;

  const handleDelete = (id) => {
    const deleteItem = expenseData.find((item) => item.id === id);
    setBalance((prev) => prev + Number(deleteItem.price));
    setExpenseData((prev) => prev.filter((item) => item.id != id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsOpen(true);
  };

  useEffect(() => {
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    setCurrentRecord([...expenseData].slice(firstIndex, lastIndex));
    setTotalPages(Math.ceil(expenseData.length / recordsPerPage));
  }, [currentPage, expenseData]);

  useEffect(()=>{
    if(totalPages<currentPage && currentPage>1){
      setCurrentPage(prev => prev - 1)
    }
  },[totalPages])

  return (
    <div className={Styles.expenseWrapper}>
      <h2>Recent Transactions</h2>
      {expenseData.length > 0 ? (
        <div className={Styles.expenseList}>
          <div>
            {currentRecords.map((item) => {
              return (
                <ExpenseCard
                  details={item}
                  key={item.id}
                  handleDelete={() => handleDelete(item.id)}
                  handleEdit={() => handleEdit(item.id)}
                />
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className={Styles.expenseList}>
          <p>No Transactions!</p>
        </div>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <ExpenseForm
          setIsOpen={setIsOpen}
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          balance={balance}
          setBalance={setBalance}
          editId={editId}
        />
      </Modal>
    </div>
  );
};

export default ExpenseList;
