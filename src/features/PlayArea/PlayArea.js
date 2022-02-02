import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Card from "../card/Card";

const PlayArea = () => {
  const gameState = useSelector((state) => state.board);
  const cards = gameState.playArea;
  const top = gameState.playArea[gameState.playArea.length - 1];

  return (
    <div className="playArea">
      {top && (
        <Card
          name={top.name}
          value={top.value}
          suit={top.suit}
          suitName={top.suitName}
        />
      )}
    </div>
  );
};

export default PlayArea;
