import React from "react";
import Styles from "./ExpesneCard.module.css";
import { PiPizza, PiGift } from "react-icons/pi";
import { BsSuitcase2 } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

const ExpenseCard = ({ details, handleDelete ,handleEdit }) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.cardWrapper}>
        <div className={Styles.cardIcon}>
          {details.category == "food" && <PiPizza />}
          {details.category == "entertainment" && <PiGift />}
          {details.category == "travel" && <BsSuitcase2 />}
        </div>
        <div className={Styles.cardDetails}>
          <h5>{details.title}</h5>
          <p>{details.date}</p>
        </div>
      </div>
      <div className={Styles.cardWrapper}>
        <p className={Styles.cardPrice}>{`₹${details.price}`}</p>
        <div className={Styles.cardButton}>
          <button className={Styles.delete} onClick={handleDelete}>
            <IoMdCloseCircleOutline />
          </button>
          <button className={Styles.edit} onClick={handleEdit}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
