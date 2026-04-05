import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Card from "../components/Card/Card";
import Modal from "../components/Modal/Modal";
import BalanceForm from "../components/Form/BalanceForm/BalanceForm";
import ExpenseForm from "../components/Form/ExpenseForm/ExpenseForm";
import PieChart from "../components/PieChart/PieChart";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import BarGraph from "../components/BarGraph/BarGraph";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [category, setCategory] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    const bal = localStorage.getItem("balance");
    if (bal) {
      setBalance(Number(bal));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }
    const items = JSON.parse(localStorage.getItem("expenses"));
    setExpenseData(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  useEffect(() => {
    if (expenseData.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseData));
    }
    if (expenseData.length > 0) {
      setExpense(expenseData.reduce((acc, val) => acc + Number(val.price), 0));
    } else {
      setExpense(0);
    }

    let foodSpends = 0;
    let entertainmentSpends = 0;
    let travelSpends = 0;

    expenseData.forEach((item) => {
      if (item.category == "food") {
        foodSpends += Number(item.price);
      }
      if (item.category == "entertainment") {
        entertainmentSpends += Number(item.price);
      }
      if (item.category == "travel") {
        travelSpends += Number(item.price);
      }
    });

    setCategory({
      food: foodSpends,
      entertainment: entertainmentSpends,
      travel: travelSpends,
    });
  }, [expenseData]);

  return (
    <div className={Styles.container}>
      <h1>Expense Tracker</h1>
      <div className={Styles.topSectionWrapper}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="income"
          handleButton={() => setIsBalanceOpen(true)}
        />
        <Card
          title="Expenses"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="expense"
          handleButton={() => setIsExpenseOpen(true)}
        />
        <PieChart
          data={[
            { name: "Food", value: category.food },
            { name: "Entertainment", value: category.entertainment },
            { name: "Travel", value: category.travel },
          ]}
        />
      </div>

      <div className={Styles.bottomSectionWrapper}>
        <ExpenseList
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          balance={balance}
          setBalance={setBalance}
        />
         <BarGraph
          data={[
            { name: "Food", value: category.food },
            { name: "Entertainment", value: category.entertainment },
            { name: "Travel", value: category.travel },
          ]}
        />
      </div>

      <Modal isOpen={isBalanceOpen} setIsOpen={setIsBalanceOpen}>
        <BalanceForm setIsOpen={setIsBalanceOpen} setBalance={setBalance} />
      </Modal>
      <Modal isOpen={isExpenseOpen} setIsOpen={setIsExpenseOpen}>
        <ExpenseForm
          setIsOpen={setIsExpenseOpen}
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          balance={balance}
          setBalance={setBalance}
        />
      </Modal>
    </div>
  );
};

export default Home;
