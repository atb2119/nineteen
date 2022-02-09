import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Board.module.css";
import { Deck } from "../deck/Deck";
import { deal } from "./boardSlice";
import Hand from "../hand/Hand";
import PlayArea from "../PlayArea/PlayArea";
import ScoreBoard from "../scoreBoard/ScoreBoard";

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
      <Hand playerNum={1} cpuMode={true} />
      <div className={styles.middleWrapper}>
        <ScoreBoard />
        <PlayArea />
      </div>

      <Hand playerNum={0} cpuMode={false} />
    </div>
  );
};

export default Board;
