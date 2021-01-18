const game = {

  lockMode: false,
  firstCard: null,
  secondCard: null,
  techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
  ],

  cards: null,

  setCard(id) {

    const card = this.cards.filter(card => card.id === id)[0];

    if(card.flipped || this.lockMode) return false;

    if(!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.lockMode = true;
      this.secondCard.flipped = true;
      return true;
    }
  },

  checkMatch() {
    if(!this.firstCard || !this.secondCard) return false;
    return this.firstCard.icon == this.secondCard.icon;
  },

  clearCards() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    const unflippedCards = this.cards.filter(card => !card.flipped);

    return unflippedCards.length == 0;
  },

  

  createCardsFromTechs() {

    this.cards = [];
  
    this.techs.forEach(tech => {
      this.cards.push(this.createPairFromTechs(tech));
    });
  
    this.cards =  this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromTechs(tech) {
    return [
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false
      },
  
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false
      }
    ]
  },
  
  createIdWithTech(tech) {
    return tech + Math.floor(Math.random() * 1000);
  },

  shuffleCards() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;
  
    while(currentIndex != 0) {
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      //trocando o valor das variáveis
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }

};