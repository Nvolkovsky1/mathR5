const questions = [
  {
    topic: "Дроби",
    text: "Что больше: 3/4 или 5/8?",
    answers: ["3/4", "5/8", "они равны", "нельзя сравнить"],
    correct: 0,
    explanation:
      "3/4 больше. Если привести к восьмым, получится 6/8 и 5/8. Здесь важно не выбирать дробь только по большему знаменателю.",
  },
  {
    topic: "Дроби",
    text: "Сколько будет 1/2 + 1/3?",
    answers: ["2/5", "2/6", "5/6", "1/5"],
    correct: 2,
    explanation:
      "Перед сложением части должны быть одного размера: 1/2 = 3/6, 1/3 = 2/6, всего 5/6.",
  },
  {
    topic: "Проценты",
    text: "Найдите 20% от 150.",
    answers: ["20", "25", "30", "35"],
    correct: 2,
    explanation:
      "20% означает 20 из 100, то есть 0.2. Поэтому 150 × 0.2 = 30.",
  },
  {
    topic: "Проценты",
    text: "Цена 1 000 ₽ выросла на 15%. Какая новая цена?",
    answers: ["1 015 ₽", "1 150 ₽", "850 ₽", "150 ₽"],
    correct: 1,
    explanation:
      "15% от 1 000 ₽ это 150 ₽. При росте прибавляем изменение к исходной цене: 1 150 ₽.",
  },
  {
    topic: "Пропорции",
    text: "3 тетради стоят 150 ₽. Сколько стоят 5 тетрадей?",
    answers: ["200 ₽", "250 ₽", "300 ₽", "350 ₽"],
    correct: 1,
    explanation:
      "Одна тетрадь стоит 150 / 3 = 50 ₽. Пять тетрадей стоят 5 × 50 = 250 ₽.",
  },
  {
    topic: "Пропорции",
    text: "Решите: x / 12 = 5 / 6.",
    answers: ["8", "10", "12", "14"],
    correct: 1,
    explanation:
      "Если x / 12 = 5 / 6, то x = 12 × 5 / 6 = 10. Здесь отношение должно сохраниться.",
  },
];

let current = 0;
let score = 0;
const answersNode = document.querySelector("#answers");
const questionText = document.querySelector("#questionText");
const topicLabel = document.querySelector("#topicLabel");
const stepLabel = document.querySelector("#stepLabel");
const feedback = document.querySelector("#feedback");

function renderQuestion() {
  const q = questions[current];
  questionText.textContent = q.text;
  topicLabel.textContent = q.topic;
  stepLabel.textContent = `Вопрос ${current + 1} из ${questions.length}`;
  feedback.textContent = "";
  answersNode.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => handleAnswer(button, index));
    answersNode.appendChild(button);
  });
}

function handleAnswer(button, index) {
  const q = questions[current];
  const buttons = Array.from(document.querySelectorAll(".answer"));
  buttons.forEach((item) => {
    item.disabled = true;
    if (buttons.indexOf(item) === q.correct) item.classList.add("correct");
  });

  if (index === q.correct) {
    score += 1;
    feedback.textContent = `Верно. ${q.explanation}`;
  } else {
    button.classList.add("wrong");
    feedback.textContent = `Пока нет. ${q.explanation}`;
  }

  window.setTimeout(() => {
    current += 1;
    if (current < questions.length) {
      renderQuestion();
    } else {
      renderResult();
    }
  }, 1800);
}

function renderResult() {
  questionText.textContent = `Результат: ${score} из ${questions.length}`;
  topicLabel.textContent = "Готово";
  stepLabel.textContent = "Диагностика завершена";
  answersNode.innerHTML = "";
  const level =
    score <= 2
      ? "нужен разбор базовых представлений"
      : score <= 4
        ? "есть точечные пробелы"
        : "можно давать смешанную практику";
  feedback.textContent = `Следующий шаг: ${level}. Для теста это событие нужно залогировать как diagnostic_completed.`;

  const restart = document.createElement("button");
  restart.type = "button";
  restart.className = "answer";
  restart.textContent = "Пройти еще раз";
  restart.addEventListener("click", () => {
    current = 0;
    score = 0;
    renderQuestion();
  });
  answersNode.appendChild(restart);
}

document.querySelector("#waitlistForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#formNote").textContent =
    "Интерес зафиксирован в прототипе. В реальном тесте перенесите контакт в таблицу проверки гипотез.";
});

renderQuestion();
