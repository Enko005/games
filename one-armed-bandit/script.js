
const icons = [
    { id: 1, name: "яблуко", image: "apple.png" },
    { id: 2, name: "полуниця", image: "strawberry.png" },
    { id: 3, name: "груша", image: "pear.png" },
    { id: 4, name: "лимон", image: "lemon.png" },
    { id: 5, name: "помідор", image: "tomato.png" }
];

let playerName = "";
let currentRound = 1;
let totalRounds = 3;
let wins = 0;
let isSpinning = false;

const playerNameElement = document.getElementById('player-name');
const roundCounterElement = document.getElementById('round-counter');
const spinButton = document.getElementById('spin-button');
const resetButton = document.getElementById('reset-button');
const resultElement = document.getElementById('result');

const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3'),
    document.getElementById('reel4'),
    document.getElementById('reel5'),
    document.getElementById('reel6'),
    document.getElementById('reel7'),
    document.getElementById('reel8'),
    document.getElementById('reel9')
];

function getPlayerName() {  
    playerName = prompt("Введіть ваше ім'я:");
    
    while (!playerName || playerName.trim() == "") {
        playerName = prompt("Ім'я не може бути порожнім! Введіть ваше ім'я:");
    }
    
    playerName = playerName.trim();
    playerNameElement.textContent = playerName;
    roundCounterElement.textContent = currentRound;
}

function addIconsToReel(reelElement, icons) {
    const reelContent = document.createElement('div');
    reelContent.className = 'reel-content';
    

    const img = document.createElement('img');
    img.src = "images/" + icons.image;
    img.className = 'reel-image spinning';
    
    reelContent.appendChild(img);
    reelElement.appendChild(reelContent);
}

function spinReels() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    
    reels.forEach(reel => reel.innerHTML = '');
    
    const selectedIcons = [];
    
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * icons.length);
        selectedIcons.push(icons[randomIndex]);
    }
    
    reels.forEach((reel, index) => {
        addIconsToReel(reel, selectedIcons[index]);
    });
    
    setTimeout(() => {
        checkResult(selectedIcons);
    }, 800);
}

function checkResult(icons) {
    let resultText = "";
    let isWin = false;

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    
    for (let combination of winCombinations) {
        const [a, b, c] = combination;
        if (icons[a].id == icons[b].id && icons[b].id == icons[c].id) {
            resultText = `Вітаємо, ${playerName}! Ви виграли з комбінацією в рядку!`;
            isWin = true;
            wins++;
            break;
        }
    }
    
    if (!isWin) {
        resultText = `На жаль, ${playerName}, цього разу не пощастило. Спробуйте ще!`;
    }
    
    resultElement.textContent = resultText;
    resultElement.className = `result ${isWin ? 'win' : 'lose'}`;
    
    roundCounterElement.textContent = currentRound;
    
    if (currentRound >= totalRounds) {
        endGame();
    } else {
        currentRound++;
        isSpinning = false;
        spinButton.disabled = false;
    }
}

function endGame() {
    spinButton.disabled = true;
    isSpinning = false;
    
    let finalResult = "";
    if (wins > 0) {
        finalResult = `Гра завершена! ${playerName}, ви виграли ${wins} раз(и) з ${totalRounds} раундів!`;
    } else {
        finalResult = `Гра завершена! ${playerName}, на жаль, ви не виграли жодного раунду. Спробуйте ще!`;
    }
    
    resultElement.textContent = finalResult;
}

function resetGame() {
    currentRound = 1;
    wins = 0;
    isSpinning = false;
    
    roundCounterElement.textContent = currentRound;
    resultElement.textContent = '';
    resultElement.className = 'result';
    
    reels.forEach(reel => reel.innerHTML = '');
    
    spinButton.disabled = false;
}

spinButton.addEventListener('click', spinReels);
resetButton.addEventListener('click', resetGame);

getPlayerName();