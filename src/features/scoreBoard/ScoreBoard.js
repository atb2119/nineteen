import React from "react";
import styles from "./ScoreBoard.module.css";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  //what if you play a seven on a seven?
  const gameState = useSelector((state) => state.board);
  const sevenCheck = gameState.playArea[gameState.playArea.length - 2];
  const topCard = gameState.playArea[gameState.playArea.length - 1];
  return (
    <div className={styles.wrapper}>
      <div>Turn: Player {gameState.turn + 1}</div>
      <div>{gameState.playArea.length} cards in stack</div>
      {gameState.playArea.length > 1 && topCard.value === 7 && (
        <div>Card under 7: {sevenCheck.name}</div>
      )}
    </div>
  );
};

export default ScoreBoard;
