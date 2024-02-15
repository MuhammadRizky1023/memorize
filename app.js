const cards = document.querySelectorAll(".memory-card")

let cardIsFlip = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add("flip");

    if (!cardIsFlip) {
        
        cardIsFlip = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatched = firstCard.dataset.name === secondCard.dataset.name
    isMatched ? disableCard() : unFlipCard();
}

function disableCard() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard()
}


function unFlipCard() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        resetBoard();
    }, 1500);
}

function resetBoard() {

    [cardIsFlip, lockBoard] = [false, false];
    [firstCard, secondCard] = [null,null]
}


// IIFE -> Immediately Invoked Function Expression => function is called immediately after its definition

(function shuffle() {
    cards.forEach(function (card) {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach(function (card) {
    card.addEventListener("click",flipCard)
})