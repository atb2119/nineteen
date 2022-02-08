export const canPlay = (playerCard, pile) => {
  if (playerCard.value < pile[pile.length - 1].value) {
    switch (playerCard.value) {
      case 2:
        return true;
      case 7:
        return true;
      case 10:
        return true;
      default:
        return false;
    }
  }
  return true;
};
