import { settings } from "./library_settings.js";
import { scores } from "./library_scores.js";
import { cards } from "./library_cards.js";
import Card from "./library_card.js";

const eliminatedImages = [];
let card1 = null;
let card2 = null;

// resets the variables before starting a new game
const resetGame = () => {
  eliminatedImages.length = 0;
  card1 = null;
  card2 = null;
};

// on ready function to display the 3 tabs - Play Game, View Rules and Settings
// calls the function to generate the markup for the number the number of cards chosen by the player
// button click handler to call saveSettings function
$(function () {
  $("#tabs").tabs();
  generateCardHTML(settings.get_player_name());
  $("#save_settings").click(saveSettings);

  //to start new game
  $("#new_game").click((e) => {
    e.preventDefault();
    resetGame();
    if (!settings.is_player_defined(errorObj.noPlayerDefined)) {
      return;
    } else {
      settings.set_player_name();
      const playerName = settings.get_player_name();
      scores.display_high_score(playerName);
      generateCardHTML(playerName);
    }
  });
});

// Logic to flip cards when user plays the game
// If the current image that is clicked matches the previously clicked image, then replace both cards with blank cards
// If the current image that is clicked does not match the previously clicked image, then replaced both cards with back cards
const playGameHandler = (playerName) => {
  const cardsHTML = document.querySelectorAll(".img-holder");
  cardsHTML.forEach((card) =>
    card.addEventListener("click", (e) => {
      e.preventDefault();
      if (!playerName) {
        $("#instruction")
          .text(
            "To play a new game, please enter your details in the Settings tab"
          )
          .show();
        return;
      } else {
        $("#instruction").hide();
      }
      if (!card1) {
        card1 = new Card(e.currentTarget);
      } else {
        card2 = new Card(e.currentTarget);
      }
      if (
        card1?.check_for_blank_card(eliminatedImages) ||
        card2?.check_for_blank_card(eliminatedImages)
      )
        return;
      if (card2) {
        card2.image.src = card2.selected_id;
      } else if (card1) {
        card1.image.src = card1.selected_id;
      }
      scores.total_turns();
      if (card2?.selected_id) {
        if (card2?.check_for_matching_card(card1)) {
          setTimeout(() => {
            eliminatedImages.push(card2.selected_id);
            card2.image.src = cards.blank_card.src;
            card1.image.src = cards.blank_card.src;
            card1 = null;
            card2 = null;
            scores.increment();
            scores.display_high_score(settings.get_player_name());
          }, 500);
        } else {
          setTimeout(() => {
            card1.image.src = cards.back_card.src;
            card2.image.src = cards.back_card.src;
            card1 = null;
            card2 = null;
          }, 500);
        }
      }
    })
  );
};

// navigate to the Play Game tab
// clear the Play Game tab
// Call a function to display their highest score
function generateCardHTML(playerName) {
  const total_cards = settings.get_total_cards();
  cards.load_cards(total_cards / 2);
  playGameHandler(playerName);
  if (playerName) {
    settings.set_player_name();
    scores.display_high_score(playerName);
  }
}

// function definition for saveSettings
// Adds the Player name and the Number of Cards to the session storage
// If the player has played the game before, then fetch the corresponding highScore from the localStorage
// Navigate to the Play Game Tab
function saveSettings() {
  resetGame();
  settings.save();
  const playerName = settings.get_player_name();
  scores.display_high_score(playerName);
  scores.display_correct_moves(0);

  if (!playerName) {
    return;
  }
  generateCardHTML(playerName);
}

// check if the player exists, if not add a instruction on the page to navigate to settings tab
const errorObj = {
  playerNameNotDefined: "Please enter a Player Name",
  noPlayerDefined:
    "To play a new game, please enter your details in the Settings tab",
};
