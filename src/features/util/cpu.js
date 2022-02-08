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
  while (playerNum === gameState.turn) {
    const { playArea } = gameState;
    const hand = gameState.players[playerNum].hand;
    const topCard = playArea[playArea.length - 1];
    //get the list of playable cards (IF ANY)
    const playable = hand.filter((ele) => canPlay(ele));
    if (playable.length) {
      //figure out which is the best to play
      playable.sort((el1, el2) => el1.value - el2.value);
      const target = playable[0];
      //click it
      const clickMe = document.getElementById(
        `${target.name} + ${target.suitName}`
      );
      clickMe.click();
    } else {
      //click the pickup button
      const pickup = document.getElementById(`pickup${playerNum}`);
      pickup.click();
    }
  }
};
