export class Deck {
  constructor() {
    this.deck = [];
    const suitNames = ["Spades", "Diamonds", "Club", "Heart"];
    const suits = ["♠", "♦", "♣", "♥"];
    const names = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < names.length; x++) {
        let card = {
          value: x + 2,
          suit: suits[i],
          suitName: suitNames[i],
          name: names[x],
        };
        this.deck.push(card);
      }
    }
  }
  shuffle(times) {
    const { deck } = this;
    for (let k = 0; k < times; k++) {
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
    }
    return deck;
  }
  dealOne() {
    return this.deck.pop;
  }
  //will not work without card class
  assignTraits() {
    const { deck } = this;
    deck.forEach((ele) => {
      if (ele.value === 2) ele.traits.push("reset");
      else if (ele.value === 7) ele.traits.push("invis");
      else if (ele.value === 10) ele.traits.push("clear");
      else if (ele.value === 8) ele.traits.push("under");
    });
  }
}
