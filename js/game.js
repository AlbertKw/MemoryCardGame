const Gameboard = {
  domElements: {
    cardsContainer: null,
    startButton: null,
    cardsNumberSlider: null,
  },

  properties: {
    points: 0,
    faceUpCards: [],
    numberOfCards: null,
    cardsNames: [],
    cards: [],
  },

  init: (function() {
    let executed = false;
    return () => {
      if(!executed) {
        this.domElements.cardsContainer = document.querySelector(".cards-container");
        this.domElements.startButton = document.querySelector(".start-game");
        this.domElements.cardsNumberSlider = document.getElementById("numberOfCardsSlider");
        this.domElements.startButton.addEventListener("click", () => {
          this.properties.cards.forEach(card => {
            card.setAttribute("src", `img/card-back.jpg`);
            card.dataset.faceup = false;
            card.style.pointerEvents = "auto";
          });
          this.domElements.startButton.style.visibility = "hidden";
        })
        executed = true;
      }
      this.newGame();
    }
  }),

  newGame() {
    this.properties.numberOfCards = Math.floor(this.domElements.cardsNumberSlider.value / 2);
    this.properties.cardsNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].slice(0, this.properties.numberOfCards);      // Temporary, then cards are taken from img folder, then from database
    this.createCards();
    this.shuffleCards();

    this.properties.cards.forEach(card => {
      this.domElements.cardsContainer.appendChild(card);
    });
  },

  createCards() {
    this.properties.cardsNames.forEach(cardName => {
      this.properties.cardsNames.push(cardName);
    })
    this.properties.cards = this.properties.cardsNames.map(element => {
      const card = document.createElement("img");
      card.setAttribute("src", `img/${element}.png`);
      card.setAttribute("data-name", element);
      card.setAttribute("data-faceup", true);
      card.classList.add("card");
      card.style.pointerEvents = "none";

      card.addEventListener("click", async () => {
        card.setAttribute("src", `img/${element}.png`);
        card.dataset.faceup = true;
        card.style.pointerEvents = "none";

        this.properties.faceUpCards.push(card);
        if(this.properties.faceUpCards.length == 2) {
          this.properties.cards.forEach(card => {
            card.style.pointerEvents = "none";
          });
          await sleep(500);
          this.checkIfCardsAreTheSame();
          this.properties.cards.forEach(card => {
            if(card.dataset.faceup === "false")
              card.style.pointerEvents = "auto";
          });
          this.properties.faceUpCards = [];
        }
      });
      return card;
    })
  },

  shuffleCards() {
    let arr = this.properties.cards;
    let m = arr.length;
    let t, i;
    
    while(m) {
      i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
  },

  checkIfCardsAreTheSame() {
    let faceUpCards = this.properties.faceUpCards;
    if(faceUpCards[0].dataset.name === faceUpCards[1].dataset.name) {
      faceUpCards.forEach(card => {
        card.style.pointerEvents = "none";
      });
      this.properties.points++;
    } else {
      faceUpCards.forEach(card => {
        card.setAttribute("src", `img/card-back.jpg`);
        card.style.pointerEvents = "auto";
        card.dataset.faceup = false;
      });
      this.properties.points--;
    }
  },

  endGame() {
    this.domElements.cardsContainer.innerHTML = "";
    this.domElements.startButton.style.visibility = "visible";
  },
}

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector(".new-game-btn").addEventListener("click", () => {
  Gameboard.init()();
});