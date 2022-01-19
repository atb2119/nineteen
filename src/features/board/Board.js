import React from "react";
import styles from "./Board.module.css";
import { Deck } from "../deck/Deck";
import Hand from "../hand/Hand";

const Board = () => {
  const newDeck = new Deck();
  const gameDeck = newDeck.shuffle(8);

  const hands = [];
  for (let i = 0; i < 4; i++) {
    hands.push(<Hand horizontal={i % 2 === 0 ? true : false} key={i} />);
  }

  return <div className={styles.board}>{hands}</div>;
};

export default Board;
