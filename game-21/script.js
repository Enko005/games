const cards = [
    { id: 1, name: "6 пік", value: 6 },
    { id: 2, name: "7 пік", value: 7 },
    { id: 3, name: "8 пік", value: 8 },
    { id: 4, name: "9 пік", value: 9 },
    { id: 5, name: "10 пік", value: 10 },
    { id: 6, name: "Валет пік", value: 2 },
    { id: 7, name: "Дама пік", value: 3 },
    { id: 8, name: "Король пік", value: 4 },
    { id: 9, name: "Туз пік", value: 11 },
    
    { id: 10, name: "6 чирв", value: 6 },
    { id: 11, name: "7 чирв", value: 7 },
    { id: 12, name: "8 чирв", value: 8 },
    { id: 13, name: "9 чирв", value: 9 },
    { id: 14, name: "10 чирв", value: 10 },
    { id: 15, name: "Валет чирв", value: 2 },
    { id: 16, name: "Дама чирв", value: 3 },
    { id: 17, name: "Король чирв", value: 4 },
    { id: 18, name: "Туз чирв", value: 11 },
    
    { id: 19, name: "6 бубн", value: 6 },
    { id: 20, name: "7 бубн", value: 7 },
    { id: 21, name: "8 бубн", value: 8 },
    { id: 22, name: "9 бубн", value: 9 },
    { id: 23, name: "10 бубн", value: 10 },
    { id: 24, name: "Валет бубн", value: 2 },
    { id: 25, name: "Дама бубн", value: 3 },
    { id: 26, name: "Король бубн", value: 4 },
    { id: 27, name: "Туз бубн", value: 11 },
    
    { id: 28, name: "6 хрест", value: 6 },
    { id: 29, name: "7 хрест", value: 7 },
    { id: 30, name: "8 хрест", value: 8 },
    { id: 31, name: "9 хрест", value: 9 },
    { id: 32, name: "10 хрест", value: 10 },
    { id: 33, name: "Валет хрест", value: 2 },
    { id: 34, name: "Дама хрест", value: 3 },
    { id: 35, name: "Король хрест", value: 4 },
    { id: 36, name: "Туз хрест", value: 11 }
];

let userName = prompt("Введіть ваше ім'я:");
let userScore = 0;
let computerScore = 0;
let round = 0;

const userNameElement = document.getElementById('user-name');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const userCardsContainer = document.getElementById('user-cards');
const computerCardsContainer = document.getElementById('computer-cards');
const playButton = document.getElementById('play-button');
const resetButton = document.getElementById('reset-button');
const resultElement = document.getElementById('result');

while (!userName || userName.trim() == ""){
    userName = prompt("Ім’я не може бути порожнім! Введіть ваше ім’я:");
}
    userNameElement.textContent = userName;

function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    
    const cardIndex = cards.findIndex(c => c.name === card.name) + 1;
    cardElement.classList.add('card-' + card.id);
    return cardElement;
}

function playRound() {
    if (round >= 3 || userScore > 21 || computerScore > 21) {
        endGame();
        return;
    }
    
    const userCard = getRandomCard();
    const computerCard = getRandomCard();
    
    userScore += userCard.value;
    computerScore += computerCard.value;
    
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    
    userCardsContainer.appendChild(createCardElement(userCard));
    computerCardsContainer.appendChild(createCardElement(computerCard));
    
    round++;
    
    if (round >= 3 || userScore > 21 || computerScore > 21) {
        playButton.textContent = "Результат";
    }
}

function endGame() {
    let resultText;
    
    if (userScore > 21 && computerScore > 21) {
        resultText = `Обидва перебрали! Нічия з рахунком ${userScore} проти ${computerScore}.`;
    } else if (userScore > 21) {
        resultText = `${userName}, ви перебрали! Комп'ютер виграв з рахунком ${computerScore} проти ${userScore}.`;
    } else if (computerScore > 21) {
        resultText = `Комп'ютер перебрав! Вітаємо, ${userName}, ви виграли з рахунком ${userScore} проти ${computerScore}!`;
    } else if (userScore > computerScore) {
        resultText = `Вітаємо, ${userName}! Ви виграли з рахунком ${userScore} проти ${computerScore}!`;
    } else if (computerScore > userScore) {
        resultText = `Комп'ютер виграв з рахунком ${computerScore} проти ${userScore}. Спробуйте ще раз!`;
    } else {
        resultText = `Нічия! Обидва набрали ${userScore} очок.`;
    }
    
    resultElement.textContent = resultText;
    playButton.disabled = true;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    round = 0;
    
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    
    userCardsContainer.innerHTML = '';
    computerCardsContainer.innerHTML = '';
    
    resultElement.textContent = '';
    playButton.textContent = "Грати";
    playButton.disabled = false;
}

playButton.addEventListener('click', playRound);
resetButton.addEventListener('click', resetGame);

nameUser();