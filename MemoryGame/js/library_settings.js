export const settings = {
  // setter for the total number of cards
  set_total_cards: () => {
    const no_of_cards = $("#num_cards").val() || settings.get_total_cards();
    sessionStorage.setItem("numberOfCards", no_of_cards);
  },

  // setter for the player name
  set_player_name: () => {
    let player_name = $("#player_name").val() || settings.get_player_name();
    if (player_name?.trim()) {
      sessionStorage.setItem("playerName", player_name);
      $("#player").text(`Player: ${player_name}`);
    }
    settings.is_player_defined();
  },

  get_player_name: () => sessionStorage.getItem("playerName"),

  // Fetching number of cards: either the number chosen by the Player or, default number 48.
  get_total_cards: () => {
    if (!sessionStorage.getItem("numberOfCards")) {
      return 48;
    }
    return sessionStorage.getItem("numberOfCards");
  },
  //  to check if the player name is defined
  is_player_defined: (msg = "Please enter a Player Name") => {
    if (!settings.get_player_name()) {
      $("#instruction").text(msg).show();
      return false;
    }
    $("#instruction").hide();
    return true;
  },

  // to save the settings
  save: () => {
    settings.set_total_cards();
    settings.set_player_name();
    $("#tabs").tabs({ active: 0 });
  },
};
