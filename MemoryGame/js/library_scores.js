export const scores = (function () {
  let number_of_turns = 0;
  let number_of_matches = 0;

  // private functions
  function saveHighScore(player_name, score) {
    localStorage.setItem(player_name, score);
  }
  // private functions
  function getHighScore(player_name) {
    const score = localStorage.getItem(player_name);
    return !isNaN(score) ? score : 0;
  }

  return {
    // increment function
    increment: () => {
      number_of_matches += 2;
      number_of_turns++;
    },
    // total number of turns
    total_turns: () => {
      return number_of_turns++;
    },

    // to calculate the total score;
    calcuate_score: (match = number_of_matches) => {
      if (match == 0 || match == 0) return 0;
      return ((match / number_of_turns) * 100)?.toFixed(2);
    },

    // to calculate the correct moves
    display_correct_moves: () => {
      const score = scores.calcuate_score();
      $("#correct").text(`Correct Moves: ${score}%`);
    },

    // calculates the high score of the player and displays the value

    display_high_score: (player_name) => {
      if (!player_name) return;
      const score = scores.calcuate_score();
      const high_score =
        parseFloat(getHighScore(player_name)) > score
          ? getHighScore(player_name)
          : score;
      saveHighScore(player_name, high_score);
      $("#correct").text(`Correct Moves: ${score}%`);
      $("#high_score").text(`High Score: ${high_score}%`);
    },
  };
})();
