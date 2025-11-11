// Создание элементов страницы
const title = document.createElement('h1');
title.textContent = 'Магічна куля';

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Введи своє питання...';
input.style.padding = '10px';
input.style.width = '300px';
input.style.fontSize = '18px';
input.style.borderRadius = '8px';
input.style.border = '2px solid purple';
input.style.marginTop = '20px';
input.style.textAlign = 'center';
input.style.outline = 'none';

const ballContainer = document.createElement('div');
ballContainer.className = 'ball-container';

const ball = document.createElement('div');
ball.style.width = '200px';
ball.style.height = '200px';
ball.style.borderRadius = '50%';
ball.style.background = 'radial-gradient(circle at 30% 30%, white, blue, black)';
ball.style.boxShadow = '0 0 20px blue';
ball.style.margin = '0 auto';
ball.style.transition = 'transform 0.2s ease';

// Анимация свечения шара
ball.animate(
  [
    { boxShadow: '0 0 20px blue' },
    { boxShadow: '0 0 35px cyan' },
    { boxShadow: '0 0 20px blue' }
  ],
  {
    duration: 2300,
    iterations: Infinity
  }
);

ballContainer.appendChild(ball);

const answer = document.createElement('p');
answer.className = 'answer';
answer.textContent = 'Задай питання і натисни кнопку';

const button = document.createElement('button');
button.textContent = 'Запитати';

// Добавление элементов на страницу
document.body.append(title, ballContainer, input, answer, button);

// Массив возможных ответов
const answers = [
  'Так!',
  'Ні!',
  'Може бути...',
  'Скоро дізнаєшся!',
  'Безперечно!',
  'Нажаль, ні',
  'Спитай пізніше',
  'Дуже ймовірно',
  'Маловірогідно'
];

// Функция тряски шара
function shakeBall(callback) {
  const keyframes = [
    { transform: 'translate(0, 0)' },
    { transform: 'translate(-5px, 0)' },
    { transform: 'translate(5px, 0)' },
    { transform: 'translate(-5px, 0)' },
    { transform: 'translate(5px, 0)' },
    { transform: 'translate(0, 0)' }
  ];
  const move = ball.animate(keyframes, { duration: 400, iterations: 2 });
  move.onfinish = callback;
}

// Обработчик клика на кнопку
button.addEventListener('click', () => {
  const question = input.value.trim();

  if (question === '') {
    answer.textContent = 'Введи питання!';
    return;
  }

  if (!question.endsWith('?')) {
    answer.textContent = 'Питання має закінчуватись знаком "?"';
    return;
  }

  shakeBall(() => {
    const randomIndex = Math.floor(Math.random() * answers.length);
    answer.textContent = answers[randomIndex];
  });
});

// Обработчик нажатия Enter в поле ввода
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    button.click();
  }
});