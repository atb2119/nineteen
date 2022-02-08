import React from "react";
import styles from "./Hand.module.css";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { playFromHand, testFn, playTen, pickup } from "../board/boardSlice";
import { useDispatch } from "react-redux";
import { canPlay } from "../util/gameLogic";

const Hand = ({ horizontal, playerNum }) => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.board);
  const playerHand = gameState.players[playerNum];
  const pile = gameState.playArea;

  //FN TO HANDLE PLAYING A CARD
  //check whos turn it is
  //check if card can be played
  //if yes, dispatch the play
  //if no, dispatch a console .log
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
    const payload = { card: ele, player: playerNum };
    return (
      <Card
        key={ele.name + ele.suitName}
        id={ele.name + ele.suitName}
        name={ele.name}
        value={ele.value}
        suit={ele.suit}
        suitName={ele.suitName}
        //handleClick={() => dispatch(playCard(payload))}
        handleClick={() => handlePlayCard(ele, payload)}
      />
    );
  });

  const inHand = playerHand.hand.map((ele) => {
    const payload = { card: ele, player: playerNum };
    return (
      <Card
        key={ele.name + ele.suitName}
        id={ele.name + ele.suitName}
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
        <div className={styles.downCards}>{downCards}</div>
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
