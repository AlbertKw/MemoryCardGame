const Navigation = {
  navigationButtons: {
    newGame: null,
    ranking: null,
    settings: null
  },

  views: {
    startMenu: null,
    gameboard: null,
    ranking: null,
    settings: null,
  },

  init() {
    this.navigationButtons.newGame = document.querySelector(".new-game-btn");
    this.navigationButtons.ranking = document.querySelector(".ranking-btn");
    this.navigationButtons.settings = document.querySelector(".settings-btn");

    this.views.startMenu = document.getElementById("start-menu");
    this.views.gameboard = document.getElementById("gameboard");
    this.views.ranking = document.getElementById("ranking");
    this.views.settings = document.getElementById("settings");


    this.navigationButtons.newGame.addEventListener("click", () => {
      this.views.startMenu.style.display = "none";
      this.views.gameboard.style.display = "block";
    });

    this.navigationButtons.ranking.addEventListener("click", () => {
      this.views.startMenu.style.display = "none";
      this.views.ranking.style.display = "block";
    });

    this.navigationButtons.settings.addEventListener("click", () => {
      this.views.startMenu.style.display = "none";
      this.views.settings.style.display = "block";
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  Navigation.init();
})