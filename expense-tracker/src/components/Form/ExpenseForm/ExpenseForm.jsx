import React, { useEffect, useState } from "react";
import Styles from "./ExpenseForm.module.css";
import Button from "../../Button/Button";
import { useSnackbar } from "notistack";

const ExpenseForm = ({
  setIsOpen,
  expenseData,
  setExpenseData,
  balance,
  setBalance,
  editId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isRequired, setIsRequired] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (balance < Number(formData.price)) {
      enqueueSnackbar(`Can not spend more than wallet balance`, {
        variant: "warning",
      });
      setIsOpen(false);
      return;
    }
    if (formData.price <= 0) {
      enqueueSnackbar("Amount Should be greater than 0", {
        variant: "warning",
      });
      setIsOpen(true);
      return;
    }
    setBalance((prev) => prev - Number(formData.price));
    const latestId = expenseData.length > 0 ? expenseData[0].id : 0;
    setExpenseData([{ ...formData, id: latestId + 1 }, ...expenseData]);
    enqueueSnackbar(`Expense added Successfully`, { variant: "success" });
    setIsOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (Number(formData.price) <= 0) {
      enqueueSnackbar("Price should be greater than 0", { variant: "warning" });
      setIsOpen(true);
      return { ...formData, id: editId };
    }

    const originalExpenseItem = expenseData.find((item) => item.id === editId);
    let hasChanged = false;
    if (
      originalExpenseItem.title !== formData.title ||
      originalExpenseItem.price !== formData.price ||
      originalExpenseItem.category !== formData.category ||
      originalExpenseItem.date !== formData.date
    ) {
      hasChanged = true;
    }
    if (!hasChanged) {
      enqueueSnackbar("No changes made", { variant: "warning" });
      setIsOpen(true);
      return;
    }
    let priceExceedFlag = false;
    const updatedExpenseItem = expenseData.map((item) => {
      if (item.id === editId) {
        const priceDiff = item.price - Number(formData.price);
        if (priceDiff < 0 && Math.abs(priceDiff) > balance) {
          enqueueSnackbar("Price should not exceed the wallet balance", {
            variant: "warning",
          });
          priceExceedFlag = true;
          return { ...item };
        }
        setBalance((prev) => prev + priceDiff);
        return { ...formData, id: editId };
      }
      return item;
    });
    setExpenseData(updatedExpenseItem);
    if(priceExceedFlag){
      setIsOpen(true)
    }
    else{
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (editId) {
      const expenseItem = expenseData.find((item) => item.id === editId);
      setFormData({
        title: expenseItem.title,
        price: expenseItem.price,
        category: expenseItem.category,
        date: expenseItem.date,
      });
    }
  }, [editId]);

  return (
    <div className={Styles.formWrapper}>
      <h3>{editId ? `Edit Expenses` : `Add Expenses`}</h3>
      <form onSubmit={editId ? handleEdit : handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required={isRequired}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required={isRequired}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required={isRequired}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required={isRequired}
        />
        <Button type="submit" buttonType={"success"} shadow>
          {editId ? "Edit Expense" : "Add Expense"}
        </Button>
        <Button
          buttonType={"cancel"}
          shadow
          handleButton={() => {
            setIsOpen(false);
            setIsRequired(false);
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
