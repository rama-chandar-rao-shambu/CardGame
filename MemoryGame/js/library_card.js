export default class Card {
  image = null;
  selected_id = null;

  //  Card constructor for initialising the instance variables
  constructor(anchor) {
    this.image = anchor.firstElementChild;
    this.selected_id = anchor.id;
  }

  //  method to check if the user clicked on blank card
  check_for_blank_card(eliminatedImages = []) {
    return eliminatedImages.includes(this.selected_id) || !this.selected_id;
  }

  // method to check if the user clicked on matching card
  check_for_matching_card(card) {
    return this.selected_id == card.selected_id && card.image != this.image;
  }
}
