class MemoryGame {

    constructor(opts) {
        this.node = opts.selector;
        this.cards = opts.cards.concat(opts.cards);
  
        this.clickedCards = [];
        this.timeout = null;
  
        this.cardMoves = 0;
  
        // Wieviele Karten wurden bis jetzt gesammelt
        this.cardsCollected = 0;
        this.cardsMatch = 0;
  
        this.board = this.node.querySelector('.memory-board');
        this.modal = this.node.querySelector('.modal');
        this.playBtn = this.node.querySelector('.playBtn');
        this.memoryMoves = this.node.querySelector('#memoryMoves');
        this.memoryMatches = this.node.querySelector('#memoryMatches');
  
        this.playBtn.addEventListener('click', (e) => {
            this.closeModal();
            this.startGame();
        });
  
        this.startGame();
    }
  
    startGame() {
        this.reset();
        this.shuffleCards();
        this.render();
        this.updateUI();
  
       // Bildpfad aktualisieren basierend auf der Bilderauswahl
      //MemoryCards.updateDir(selectedImageType);
     
  
        this.cardCollectionBox = document.getElementById('memoryMatchesCards').getBoundingClientRect();
  
        const cardElements = this.node.querySelectorAll('.memory-card-item');
        cardElements.forEach(cardElement => {
            cardElement.addEventListener('click', (e) => {
                e.preventDefault()
                // hier wird das Doppelklick verhindert
                if (!e.detail || e.detail === 1) {
                    this.cardClicked(e);
                }
            });
        });
    }
  
    /**
     * Event-Handler für Kartenelemente
     * @param e - click event
     * @returns {boolean}
     */
    cardClicked(e) {
        const clickedCard = e.currentTarget;
  
        if (clickedCard.classList.contains('solved') || clickedCard.classList.contains('visible')) {
            return false;
        }
  
        if (this.clickedCards.length >= 2) {
            return false;
        }
  
        if (this.clickedCards.length <= 1) {
            clickedCard.classList.toggle('visible');
            this.clickedCards.push(clickedCard);
  
            if (this.clickedCards.length < 2) {
                return false;
            }
        }
  
        if (this.matchCards(this.clickedCards[0].getAttribute('data-card'), this.clickedCards[1].getAttribute('data-card'))) {
            this.cardsCollected += 2;
            this.cardsMatch++;
  
            setTimeout(() => {
                this.moveSlide('#match');
            }, 300);
  
            setTimeout(() => {
                this.clickedCards.forEach(card => {
                    card.classList.add('solved');
                    this.collectCard(card);
                });
  
                this.clickedCards = [];
                this.checkGameEnd();
            }, 1000);
  
        } else {
  
            setTimeout(() => {
                this.clickedCards.forEach(card => {
                    card.classList.add('visible');
                });
                this.moveSlide('#noMatch');
            }, 300);
  
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
  
                this.clickedCards.forEach(card => {
                    card.classList.remove('visible');
                    card.classList.remove('no-match');
                });
                this.clickedCards = [];
            }, 1000);
        }
  
        this.cardMoves++;
        this.updateUI();
    }
  
    /*
     * Reset der Variablen fürs Spiel
     */
    reset() {
        this.cardMoves = 0;
        this.cardsCollected = 0;
        this.cardsMatch = 0;
    }
  
    /**
     * haben Karten doppelte id 
     * @param a - card a
     * @param b - card b
     * @returns {boolean}
     */
    matchCards(a, b) {
        return a === b;
    }
  
    /**
     * Die Karten in die Sammelbox stecken.
     * 
     * @param card
     */
    collectCard(card) {
        const cardBox = card.getBoundingClientRect();
        const cardPosX = window.scrollX + cardBox.left;
        const cardPosY = window.scrollY + cardBox.top;
  
        let moveItemA = document.createElement('div');
        moveItemA.className = 'move-item';
        moveItemA.style.width = cardBox.width + 'px';
        moveItemA.style.height = cardBox.height + 'px';
        moveItemA.style.left = `${cardPosX}px`;
        moveItemA.style.top = `${cardPosY}px`;
        moveItemA.appendChild(card.querySelector('img').cloneNode());
        document.body.appendChild(moveItemA);
  
        setTimeout(() => {
            moveItemA.style.left = `${window.scrollX + this.cardCollectionBox.left}px`;
            moveItemA.style.top = `${window.scrollY + this.cardCollectionBox.top}px`;
            moveItemA.style.opacity = '0.0';
            moveItemA.style.scale = '0.5';
        }, 50);
    }
  
  
       /**
       * Die Methode shuffleCards() mischt das Kartenarray, 
       * um die Reihenfolge der Karten zufällig zu ändern.
       */
    shuffleCards() {
        this.cards.sort(() => Math.random() - 0.5);
    }
  
    /**
     * die Karten wiedergeben und sie auf das Brettelement legen
     */
    render() {
        this.board.innerHTML = '';
        this.cards.forEach((card, i) => {
            this.board.innerHTML += this.renderCard(card, i);
        });
    }
  
    /**
     * für html Kartenelemt definieren
     * @param card 
     * @returns {string} - Kartenelement für html
     */
    renderCard(card) {
        return `
            <div class="memory-card-item" data-card="${card.id}">
                <div class="memory-card-item-inner">
                    <div class="memory-card-item-front"></div>
                    <div class="memory-card-item-back">
                        <img src="../${card.img}" />
                    </div>
                </div>
            </div>
        `;
    }
  
    updateUI() {
        this.memoryMoves.innerHTML = this.cardMoves;
        this.memoryMatches.innerHTML = this.cardsMatch;
    }
  
    /**
     * Prüfen, ob wir alle Karten gesammelt haben und das Spiel beenden
     */
    checkGameEnd() {
        if (this.cards.length === this.cardsCollected) {
            this.openModal('#modal-finish');
        }
    }
  
    moveSlide(slideId) {
        let moveSlide = this.node.querySelector(slideId);
        moveSlide.classList.add('show');
        setTimeout(() => {
            moveSlide.classList.remove('show');
        }, 1000);
    }
  
    openModal() {
        this.modal.classList.add('modal-show');
    }
  
    closeModal() {
        this.modal.classList.remove('modal-show');
    }
  }