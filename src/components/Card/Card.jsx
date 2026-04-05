import React from 'react'
import Styles from "./Card.module.css";
import Button from '../Button/Button';

const Card = ({title, money, buttonText, buttonType, handleButton}) => {
  return (
    <div className={Styles.card}>
        <h3 className={Styles.cardTitle}>{title}:{" "}
          <span className={Styles[buttonType]}>{`₹${money}`}</span></h3>
        <Button buttonType={buttonType} handleButton={handleButton}>{buttonText}</Button>
    </div>
  )
}

export default Card