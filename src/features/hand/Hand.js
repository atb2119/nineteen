import React from "react";
import styles from "./Hand.module.css";
import Card from "../card/Card";

const Hand = ({ horizontal }) => {
  const orientation = horizontal ? styles.containerH : styles.containerV;

  return <div className={orientation}></div>;
};

export default Hand;
