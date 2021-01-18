const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';
let movements = 0;


startGame();

function startGame() {
  initializeCards(game.createCardsFromTechs());
}

function initializeCards() {
  let gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  game.cards.forEach(card => {
    const cardElement = document.createElement('div');
    
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);

  });

}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  const cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if(face === FRONT) {
    const iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = `./assets/images/${card.icon}.png`;
    cardElementFace.appendChild(iconElement); 
  } else {
    cardElementFace.innerHTML = '&lt/&gt';
  }

  element.appendChild(cardElementFace);
}

function flipCard() {

  if(game.setCard(this.id)) {

    this.classList.add('flip');
    if(!game.secondCard) return;

    if(game.checkMatch()){
      movementCounter();
      game.clearCards();
      if(game.checkGameOver()) {
        const gameOverLayer = document.getElementById('gameOver');
        gameOverLayer.style.display = 'flex';
      }
    } else {

      setTimeout(()=> {
        const firstCardView = document.getElementById(game.firstCard.id);
        const secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove('flip');
        secondCardView.classList.remove('flip');
        game.unflipCards();
        movementCounter();
      }, 1000);
    }
  }
}

function restart() {
  game.clearCards();
  startGame();
  const gameOverLayer = document.getElementById('gameOver');
  gameOverLayer.style.display = 'none';
}

function movementCounter() {
  const counter = document.getElementById('counter');
  movements++;
  counter.innerHTML = movements;
}