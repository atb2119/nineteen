import { createSlice, current } from "@reduxjs/toolkit";

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
      up: [],
    },
    {
      hand: [],
      down: [],
      up: [],
    },
  ],
  //cards in play pile
  playArea: [],
  //cards in discard pile
  discard: [],
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
          player.up.push(state.deck.pop());
          player.hand.push(state.deck.pop());
        }
      });
    },
    playFromHand: (state, action) => {
      console.log(action.payload);
      const { player, card } = action.payload;
      state.playArea.push(card);
      const snapshot = current(state.players[player].hand).filter(
        (ele) => card !== ele
      );
      state.players[player].hand = snapshot;
    },
    testFn: () => {
      console.log("testfn success");
    },
  },
});

export const { deal, playFromHand, testFn } = boardSlice.actions;

export default boardSlice.reducer;
