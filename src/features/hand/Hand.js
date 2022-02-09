import React from "react";
import styles from "./Hand.module.css";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { playFromHand, testFn, playTen, pickup } from "../board/boardSlice";
import { useDispatch } from "react-redux";
import { canPlay } from "../util/gameLogic";
import { useEffect, useRef } from "react";
import { cpu } from "../util/cpu";

const Hand = ({ horizontal, playerNum, cpuMode }) => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.board);
  const playerHand = gameState.players[playerNum];
  const pile = gameState.playArea;

  useEffect(() => {
    if (cpuMode) {
      cpu(playerNum, gameState);
    }
  });

  const handlePlayCard = (playerCard, payload) => {
    let topCard;
    pile.length > 0 ? (topCard = pile[pile.length - 1].value) : (topCard = 0);
    //check top of pile for 7, if so, set topcard to the one under it
    if (topCard === 7) topCard = pile[pile.length - 2].value;
    //check if we're playing a 10, if so, clear the playArea
    if (playerCard.value === 10) {
      dispatch(playTen(payload));
    }
    //if its larger, 2, or 7
    else if (
      playerCard.value >= topCard ||
      playerCard.value === 2 ||
      playerCard.value === 7
    ) {
      dispatch(playFromHand(payload));
    } else {
      console.log(
        `you cannot play that, you played ${playerCard.value}, top card is ${topCard}`
      );
    }
  };

  const handlePlayDownCard = (playerCard, payload) => {
    if (playerHand.hand.length > 0) {
      console.log("you must clear your hand first!");
    } else {
      handlePlayCard(playerCard, payload);
    }
  };

  const handlePlayBlindCard = (playerCard, payload) => {
    if (playerHand.down.length > 0) {
      console.log("you must clear all other cards first!");
    } else {
      handlePlayCard(playerCard, payload);
    }
  };
  // const handlePlayCard = (playerCard, payload) => {
  //   if (pile.length === 0) dispatch(playFromHand(payload));
  //   else if (canPlay(playerCard, pile)) {
  //     dispatch(playFromHand(payload));
  //   } else {
  //     console.log("you cant play that");
  //   }
  // };

  const playerClass =
    playerNum === 0 ? styles.playerSpace : `${styles.playerSpace} ${styles.p2}`;

  const downCards = playerHand.down.map((ele) => {
    const payload = { card: ele, player: playerNum, loc: "down" };
    //inputRef.current.value = `${ele.name} + ${ele.suitName}`;
    return (
      <Card
        key={ele.name + ele.suitName}
        //id={`${ele.name} + ${ele.suitName}`}
        name={ele.name}
        value={ele.value}
        suit={ele.suit}
        suitName={ele.suitName}
        handleClick={() => handlePlayDownCard(ele, payload)}
      />
    );
  });

  const blindCards = playerHand.blind.map((ele) => {
    const payload = { card: ele, player: playerNum, loc: "blind" };
    //inputRef.current.value = `${ele.name} + ${ele.suitName}`;
    return (
      <Card
        blind={true}
        key={ele.name + ele.suitName}
        name={ele.name}
        value={ele.value}
        suit={ele.suit}
        suitName={ele.suitName}
        handleClick={() => handlePlayBlindCard(ele, payload)}
      />
    );
  });

  const inHand = playerHand.hand.map((ele) => {
    const payload = { card: ele, player: playerNum, loc: "hand" };
    return (
      <Card
        key={ele.name + ele.suitName}
        id={`${ele.name} + ${ele.suitName}`}
        name={ele.name}
        value={ele.value}
        suit={ele.suit}
        suitName={ele.suitName}
        handleClick={() => handlePlayCard(ele, payload)}
      />
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={playerClass}>
        <div className={styles.downCards}>
          {downCards}
          {blindCards}
        </div>
        <div className={styles.inHand}>{inHand}</div>
      </div>
      <button
        id={`pickup${playerNum}`}
        onClick={() => dispatch(pickup(playerNum))}
      >
        Pickup Cards :(
      </button>
    </div>
  );
};

export default Hand;
