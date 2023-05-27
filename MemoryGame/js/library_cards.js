export const cards = (() => {
  const images_array = [];

  // preloading images in the cache
  const pre_load_images = (src, alt = "") => {
    const image = new Image();
    image.src = src;
    image.alt = alt;
    return image;
  };
  const blank_card = "./images/blank.png";
  const back_card = "./images/back.png";

  //  adding cards to an array
  const add_cards = (max_length) => {
    for (let i = 1; i <= max_length; i++) {
      images_array.push(pre_load_images(`./images/card_${i}.png`));
    }
    return images_array;
  };

  // creates a markup for each row of cards
  const create_card_element = (randIdx, id) => {
    let card_markup = `<div class="card-item" id=${id}>
                                  <a href="#" class="img-holder" id=${
                                    images_array[randIdx].src
                                  }>
                                      ${pre_load_images(back_card).outerHTML}
                                  </a>
                              </div>`;
    if (id == 0 || id % 8 == 0) {
      card_markup = '<div id="cards">' + card_markup;
    } else if ((id + 1) % 8 == 0) {
      card_markup = card_markup + "</div>";
    }
    return card_markup;
  };

  return {
    // getter for blank card
    get blank_card() {
      return pre_load_images(blank_card);
    },
    // getter for back card
    get back_card() {
      return pre_load_images(back_card);
    },

    //  to load the total cards as per the user choice
    load_cards: (max_length) => {
      add_cards(max_length);
      const cardContainer = $("#tabs-1");
      cardContainer.empty();

      let randomNumber;
      let cards = "";
      const loadedIndex = [];
      while (loadedIndex.length < max_length) {
        // get random index function
        randomNumber = Math.floor(Math.random() * max_length);
        if (!loadedIndex.includes(randomNumber)) loadedIndex.push(randomNumber);
      }
      while (loadedIndex.length < max_length * 2) {
        // get random index function
        randomNumber = Math.floor(Math.random() * max_length);
        if (loadedIndex.lastIndexOf(randomNumber) < max_length)
          loadedIndex.push(randomNumber);
      }
      for (let i = 0; i < max_length * 2; i++) {
        cards += create_card_element(loadedIndex[i], i);
      }
      cardContainer.append(cards);
    },
  };
})();
