const symbols = ['{', '<', '}', '>', '+', '-', '&', '#', '$', 'ß', '¤', 'ä', ']', '[', '€', '*', '@' ];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function initGame() {
    cards = [...symbols, ...symbols];
    cards = shuffle(cards);

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    setTimeout(hideCards, 5000); 
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    const selectedCard = this;
    if (flippedCards.length < 2 && !flippedCards.includes(selectedCard)) {
        flippedCards.push(selectedCard);
        selectedCard.innerText = cards[selectedCard.dataset.index];

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    if (cards[index1] === cards[index2]) {
        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            alert("Gratulálok!");
            setTimeout(initGame, 5000);
        }
    } else {
        card1.innerText = '';
        card2.innerText = '';
    }

    flippedCards = [];
}

function hideCards() {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => card.innerText = '');
}

initGame();