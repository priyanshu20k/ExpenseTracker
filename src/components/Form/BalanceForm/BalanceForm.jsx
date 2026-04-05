import React, { useEffect, useRef, useState } from "react";
import Button from "../../Button/Button";
import Styles from "./BalanceForm.module.css";
import { useSnackbar } from "notistack";

const BalanceForm = ({ setIsOpen, setBalance }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [income, setIncome] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (income <= 0) {
      enqueueSnackbar("Amount Should be greater than 0", {
        variant: "warning",
      });
      setIsOpen(true);
      return;
    }
    setBalance((prev) => prev + Number(income));
    setIsOpen(false);
    enqueueSnackbar(`₹${income} added Successfully`, {variant:"success"});
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={Styles.formWrapper}>
      <h3>Add Balance</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={inputRef}
          type="number"
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required={isRequired}
        />
        <Button buttonType={"success"} shadow type="submit">
          Add Balance
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

export default BalanceForm;
