const Navigation = {
  navigationButtons: {
    newGame: null,
    ranking: null,
    settings: null,
    return: null,
  },

  views: {
    startMenu: null,
    gameboard: null,
    ranking: null,
    settings: null,
  },

  properties: {
    currentlyDisplayedView: null,
  },

  init: (function() {
    let executed = false;
    return () => {
      if(!executed) {
        this.navigationButtons.newGame = document.querySelector(".new-game-btn");
        this.navigationButtons.ranking = document.querySelector(".ranking-btn");
        this.navigationButtons.settings = document.querySelector(".settings-btn");
        this.navigationButtons.return = document.querySelectorAll(".return-btn");

        this.views.startMenu = document.getElementById("start-menu");
        this.views.gameboard = document.getElementById("gameboard");
        this.views.ranking = document.getElementById("ranking");
        this.views.settings = document.getElementById("settings");


        this.navigationButtons.newGame.addEventListener("click", () => {
          this.views.startMenu.style.display = "none";
          this.views.gameboard.style.display = "block";
          this.properties.currentlyDisplayedView = this.views.gameboard;
        });

        this.navigationButtons.ranking.addEventListener("click", () => {
          this.views.startMenu.style.display = "none";
          this.views.ranking.style.display = "block";
          this.properties.currentlyDisplayedView = this.views.ranking;
        });

        this.navigationButtons.settings.addEventListener("click", () => {
          this.views.startMenu.style.display = "none";
          this.views.settings.style.display = "block";
          this.properties.currentlyDisplayedView = this.views.settings;
          Settings.init()();
        });

        this.navigationButtons.return.forEach(button => {
          button.addEventListener("click", () => {
            this.properties.currentlyDisplayedView.style.display = "none";
            this.views.startMenu.style.display = "flex";
          });
        });
      }
    }
  }),
}

const Settings = {
  domElements: {
    cardsNumberSlider: null,
    cardsNumberOutput: null,
  },

  init: (function() {
    let executed = false;
    return () => {
      if(!executed) {
        this.domElements.cardsNumberSlider = document.getElementById("numberOfCardsSlider");
        this.domElements.cardsNumberOutput = document.getElementById("numberOfCards");

        this.domElements.cardsNumberOutput.innerHTML = this.domElements.cardsNumberSlider.value;

        this.domElements.cardsNumberSlider.oninput = () => {
          this.domElements.cardsNumberOutput.innerHTML = this.domElements.cardsNumberSlider.value;
        }
      }
    }
  }),
};

window.addEventListener("DOMContentLoaded", () => {
  Navigation.init()();
});

