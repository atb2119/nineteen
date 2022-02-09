/**
 * AI
 * psuedocode:
 * //while cpu mode = true
 *Is it my turn?
 * Can I play a card?
 *  -Play lowest possible card that is not a special card
 * Else, pickup
 */
import { canPlay } from "./gameLogic";

export const cpu = (playerNum, gameState) => {
  if (playerNum === gameState.turn) {
    const { playArea } = gameState;
    const fullHand = gameState.players[playerNum];
    let currentHand =
      fullHand.hand.length > 0
        ? fullHand.hand
        : fullHand.down.length > 0
        ? fullHand.down
        : fullHand.blind;
    //let hand = fullHand.hand;
    //const topCard = playArea[playArea.length - 1];
    //get the list of playable cards (IF ANY)

    const playable = playArea.length
      ? currentHand.filter((ele) => canPlay(ele, playArea))
      : currentHand;
    if (playable.length) {
      //figure out which is the best to play
      let sortMe = [...playable];
      sortMe.sort((el1, el2) => el1.value - el2.value);
      let target = sortMe[0];
      console.log(target);
      //click it
      const clickMe = document.getElementById(
        `${target.name}${target.suitName}`
      );
      console.log(clickMe);
      setTimeout(() => clickMe.click(), 1000);
    } else {
      console.log("pickup");
      //click the pickup button
      const pickup = document.getElementById(`pickup${playerNum}`);
      pickup.click();
    }
  }
};
