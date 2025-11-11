    let userName = prompt("Введіть ваше ім’я:");
    while (!userName || userName.trim() === "") {
      userName = prompt("Ім’я не може бути порожнім! Введіть ваше ім’я:");
    }
    document.getElementById("userName").textContent = userName;

    let userScore = 0;
    let compScore = 0;
    let round = 0;
    let gameNumber = 1;

    const userNum = document.getElementById("userNumber");
    const compNum = document.getElementById("compNumber");
    const userScr = document.getElementById("userScore");
    const compScr = document.getElementById("compScore");
    const button = document.getElementById("generate");
    const history = document.getElementById("history");
    const notification = document.getElementById("notification");

    function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }

    function addGameSeparator() {
      const separator = document.createElement("div");
      separator.className = "game-separator";
      separator.textContent = `--- Гра ${gameNumber} ---`;
      history.appendChild(separator);
    }

    addGameSeparator();

    button.addEventListener("click", () => {
      const userValue = Math.floor(Math.random() * 10) + 1;
      const compValue = Math.floor(Math.random() * 10) + 1;
      userNum.textContent = userValue;
      compNum.textContent = compValue;
      round++;

      let resultText = "";
      let winnerClass = "";
      
      if (userValue > compValue) {
        userScore++;
        resultText = `Переможець: ${userName}`;
        winnerClass = "user-winner";
      } else if (compValue > userValue) {
        compScore++;
        resultText = "Переможець: Computer";
        winnerClass = "comp-winner";
      } else {
        resultText = "Нічия";
        winnerClass = "draw";
      }

      userScr.textContent = userScore;
      compScr.textContent = compScore;

      const record = document.createElement("p");
      record.innerHTML = `Раунд ${round}: ${userName} — ${userValue}, Computer — ${compValue} → <span class="round-winner ${winnerClass}">${resultText}</span>`;
      history.appendChild(record);
      history.scrollTop = history.scrollHeight;

      if (userScore == 3 || compScore == 3) {
        setTimeout(() => {
          const winner = userScore === 3 ? userName : 'Комп’ютер';
          const message = `${winner} переміг у грі ${gameNumber}!`;
          
          showNotification(message);
          
          userScore = 0;
          compScore = 0;
          round = 0;
          userScr.textContent = compScr.textContent = 0;
          userNum.textContent = compNum.textContent = "?";
          
          gameNumber++;
          addGameSeparator();
        }, 200);
      }
    });