import { createSlice, current } from "@reduxjs/toolkit";

/**
 * TODO:
 * Implement turn logic
 * AI (lol)
 */

const initialState = {
  //number of players
  numPlayers: 2,
  //cards remaining in deck
  deck: [],
  //array of player objects (starts with only one)
  players: [
    {
      hand: [],
      down: [],
      blind: [],
    },
    {
      hand: [],
      down: [],
      blind: [],
    },
  ],
  //cards in play pile
  playArea: [],
  //cards in discard pile
  discard: [],
  turn: 0,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    deal: (state, action) => {
      console.log(action);
      state.deck = action.payload;
      //deal down and up cards
      state.players.forEach((player) => {
        for (let i = 0; i < 3; i++) {
          player.down.push(state.deck.pop());
          player.blind.push(state.deck.pop());
          player.hand.push(state.deck.pop());
        }
      });
    },
    playFromHand: (state, action) => {
      const { player, card, loc } = action.payload;
      if (player !== state.turn) {
        console.log("not your turn");
      } else {
        state.playArea.push(card);
        const snapshot = current(state.players[player][loc]).filter(
          (ele) => card !== ele
        );
        state.players[player][loc] = snapshot;
        state.turn = state.turn === 0 ? 1 : 0;
      }
    },
    playTen: (state, action) => {
      const { player, card, loc } = action.payload;
      if (player !== state.turn) {
        console.log("not your turn");
      } else {
        console.log("you played a ten");
        state.playArea = [];
        const snapshot = current(state.players[player][loc]).filter(
          (ele) => card !== ele
        );
        state.players[player][loc] = snapshot;
      }
    },
    pickup: (state, action) => {
      const playerNum = action.payload;
      const snapshot = state.playArea;
      state.players[playerNum].hand = [
        ...state.players[playerNum].hand,
        ...snapshot,
      ];
      state.playArea = [];
    },
    testFn: () => {
      console.log("testfn success");
    },
  },
});

export const { deal, playFromHand, testFn, playTen, pickup } =
  boardSlice.actions;

export default boardSlice.reducer;
