import React from "react";
import styles from "./Hand.module.css";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { playFromHand, testFn } from "../board/boardSlice";
import { useDispatch } from "react-redux";

const Hand = ({ horizontal, playerNum }) => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.board);
  const playerHand = gameState.players[playerNum];

  const playerClass =
    playerNum === 0 ? styles.playerSpace : `${styles.playerSpace} ${styles.p2}`;

  const downCards = playerHand.down.map((ele) => {
    const payload = { card: ele, player: playerNum };
    return (
      <Card
        name={ele.name}
        value={ele.value}
        suit={ele.suit}
        suitName={ele.suitName}
        //handleClick={() => dispatch(playCard(payload))}
        handleClick={() => console.log("im not in your hand")}
      />
    );
  });

  const inHand = playerHand.hand.map((ele) => {
    const payload = { card: ele, player: playerNum };
    return (
      <Card
        name={ele.name}
        value={ele.value}
        suit={ele.suit}
        suitName={ele.suitName}
        handleClick={() => dispatch(playFromHand(payload))}
      />
    );
  });

  return (
    <div className={playerClass}>
      <div className={styles.downCards}>{downCards}</div>
      <div className={styles.inHand}>{inHand}</div>
    </div>
  );
};

export default Hand;
