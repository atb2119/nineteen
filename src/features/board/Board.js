import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Board.module.css";
import { Deck } from "../deck/Deck";
import { deal } from "./boardSlice";
import Hand from "../hand/Hand";
import PlayArea from "../PlayArea/PlayArea";

const Board = () => {
  const dispatch = useDispatch();
  const newDeck = new Deck();
  const gameDeck = newDeck.shuffle(8);
  console.log(gameDeck);

  useEffect(() => {
    dispatch(deal(gameDeck));
  }, []);

  const hands = [];
  //below for 4 players, concentrate on one for now
  // for (let i = 0; i < 4; i++) {
  //   hands.push(<Hand horizontal={i % 2 === 0 ? true : false} key={i} />);
  // }
  hands.push(<Hand horizontal={true} playerNum={0} />);

  return (
    <div className={styles.board}>
      <Hand playerNum={1} />
      <PlayArea />
      <Hand playerNum={0} />
    </div>
  );
};

export default Board;
