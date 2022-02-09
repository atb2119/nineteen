import React from "react";
import styles from "./Card.module.css";

const Card = ({ suit, name, value, suitName, handleClick, blind }) => {
  const colorClass =
    suitName === "Spades" || suitName === "Clubs"
      ? styles.card
      : `${styles.card} ${styles.red}`;

  const styleClass = blind ? styles.blind : colorClass;

  return (
    <div className={styleClass} onClick={handleClick} id={`${name}${suitName}`}>
      <div className={styles.cardTopLeft}>
        <div className={styles.cardCornerName}>{name}</div>
        <div className={styles.cardCornerSuit}>{suit}</div>
      </div>

      <div className={styles.cardBottomRight}>
        <div className={styles.cardCornerName}>{name}</div>
        <div className={styles.cardCornerSuit}>{suit}</div>
      </div>
    </div>
  );
};

export default Card;
