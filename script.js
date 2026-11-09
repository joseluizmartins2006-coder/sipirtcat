
const TOTAL_QUESTIONS = 10;
const INITIAL_LIVES = 3;

// ESTADO DO JOGO
let playerName = "";
let lives = INITIAL_LIVES;
let score = 0;
let questionIndex = 0;
let correctAnswer = 0;
let answered = false;
let gameOver = false;
let catPosition = 65;
let spiritPosition = 12;
let questions = [];

// TELAS
const loginScreen = document.getElementById("login-screen");
const tutorialScreen = document.getElementById("tutorial-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

// LOGIN E TUTORIAL
const loginForm = document.getElementById("login-form");
const playerNameInput = document.getElementById("player-name");
const tutorialPlayer = document.getElementById("tutorial-player");
const startGameButton = document.getElementById("start-game-btn");
const livesBox = document.getElementById("lives-box");

// ELEMENTOS DO JOGO
const livesElement = document.getElementById("lives");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const feedbackElement = document.getElementById("feedback");
const answersElement = document.getElementById("answers");
const progressBar = document.getElementById("progress-bar");
const catElement = document.getElementById("cat");
const spiritElement = document.getElementById("spirit");
const sceneMessage = document.getElementById("scene-message");
const nextButton = document.getElementById("next-btn");

// ELEMENTOS DA TELA FINAL
const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const finalLives = document.getElementById("final-lives");
const resultPlayer = document.getElementById("result-player");
const playAgainButton = document.getElementById("play-again-btn");
const changePlayerButton = document.getElementById("change-player-btn");

// BANCO DE PERGUNTAS
const questionsBank = [
    {
        text: "Considere A = {1, 2, 3} e B = {3, 4, 5}. Qual é A ∪ B?",
        options: [
            "{3}",
            "{1, 2, 3, 4, 5}",
            "{1, 2}",
            "{4, 5}"
        ],
        answer: 1
    },
    {
        text: "Considere A = {a, b, c} e B = {b, c, d}. Qual é A ∩ B?",
        options: [
            "{a, d}",
            "{a, b, c, d}",
            "{b, c}",
            "∅"
        ],
        answer: 2
    },
    {
        text: "Se P é verdadeira e Q é falsa, qual é o valor lógico de P ∧ Q (P E Q)?",
        options: [
            "Verdadeiro",
            "Falso",
            "Depende de P",
            "Não é possível determinar"
        ],
        answer: 1
    },
    {
        text: "Qual é a representação decimal do número binário 1011₂?",
        options: [
            "9",
            "10",
            "11",
            "13"
        ],
        answer: 2
    },
    {
        text: "Qual é a representação binária do número decimal 10₁₀?",
        options: [
            "1010₂",
            "1001₂",
            "1100₂",
            "1110₂"
        ],
        answer: 0
    },
    {
        text: "Quantas permutações diferentes podem ser feitas com os três elementos distintos {1, 2, 3}?",
        options: [
            "3",
            "5",
            "6",
            "9"
        ],
        answer: 2
    },
    {
        text: "Usando as letras A, B e C, quantas sequências de 2 letras diferentes podem ser formadas sem repetir letras?",
        options: [
            "3",
            "6",
            "8",
            "9"
        ],
        answer: 1
    },
    {
        text: "Dada a função f(x) = 3x + 2, qual é o valor de f(4)?",
        options: [
            "10",
            "12",
            "14",
            "16"
        ],
        answer: 2
    },
    {
        text: "Resolva: 2x + 5 = 17. Qual é o valor de x?",
        options: [
            "5",
            "6",
            "7",
            "11"
        ],
        answer: 1
    },
    {
        text: "Uma caixa contém 3 bolas vermelhas e 2 azuis. Ao retirar uma bola ao acaso, qual é a probabilidade de ela ser azul?",
        options: [
            "2/5",
            "3/5",
            "1/2",
            "2/3"
        ],
        answer: 0
    }
];

// MOSTRA APENAS UMA TELA POR VEZ
function showScreen(screen) {
    loginScreen.hidden = true;
    tutorialScreen.hidden = true;
    gameScreen.hidden = true;
    resultScreen.hidden = true;

    screen.hidden = false;
}

// LOGIN
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = playerNameInput.value.trim();

    if (!name) {
        playerNameInput.focus();
        return;
    }

    playerName = name;
    tutorialPlayer.textContent = playerName;

    showScreen(tutorialScreen);
});

// TUTORIAL
startGameButton.addEventListener("click", function() {
    startGame();
});

// GERA AS PERGUNTAS
function generateQuestions() {
    return [...questionsBank];
}

// ATUALIZA AS VIDAS
function updateLives() {
    livesElement.textContent =
        "❤️ ".repeat(lives) +
        "🖤 ".repeat(INITIAL_LIVES - lives);
}

// ATUALIZA A POSIÇÃO DOS PERSONAGENS
function updateCharacters() {
    catElement.style.left = `${catPosition}%`;
    spiritElement.style.left = `${spiritPosition}%`;
}

// ATUALIZA A BARRA DE PROGRESSO
function updateProgress() {
    const progress = (questionIndex / TOTAL_QUESTIONS) * 100;
    progressBar.style.width = `${progress}%`;
}

// INICIA OU REINICIA O JOGO
function startGame() {
    lives = INITIAL_LIVES;
    score = 0;
    questionIndex = 0;
    answered = false;
    gameOver = false;

    catPosition = 65;
    spiritPosition = 12;

    questions = generateQuestions();

    livesBox.hidden = false;

    document.getElementById("player-display").textContent = playerName;

    updateLives();
    updateCharacters();

    sceneMessage.textContent =
        "O espírito está chegando! Corra!";

    showScreen(gameScreen);

    showQuestion();
}

// EXIBE A PERGUNTA ATUAL
function showQuestion() {
    if (gameOver) return;

    if (questionIndex >= TOTAL_QUESTIONS) {
        finishGame(true);
        return;
    }

    answered = false;

    const currentQuestion = questions[questionIndex];

    correctAnswer = currentQuestion.answer;

    questionNumber.textContent =
        `Pergunta ${questionIndex + 1} de ${TOTAL_QUESTIONS}`;

    scoreElement.textContent = `Acertos: ${score}`;

    questionElement.textContent = currentQuestion.text;

    feedbackElement.textContent =
        "Escolha a resposta correta!";

    feedbackElement.className = "";

    answersElement.innerHTML = "";
    answersElement.hidden = false;

    nextButton.hidden = true;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent =
            `${String.fromCharCode(65 + index)}) ${option}`;

        button.type = "button";

        button.addEventListener("click", function() {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });

    updateProgress();
}

// CONFERE A RESPOSTA
function checkAnswer(answer, selectedButton) {
    if (answered || gameOver) return;

    answered = true;

    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctAnswer) {
            button.classList.add("correct-answer");
        }
    });

    if (answer === correctAnswer) {
        score++;

        // O GATO AVANÇA QUANDO ACERTA
        catPosition = Math.min(catPosition + 3, 88);

        feedbackElement.textContent =
            "🎉 Correto! O gatinho está escapando!";

        feedbackElement.className = "correct";

        sceneMessage.textContent =
            "Boa! Continue respondendo!";

    } else {
        // PERDE UMA VIDA QUANDO ERRA
        lives--;

        // O ESPÍRITO SE APROXIMA
        spiritPosition = Math.min(spiritPosition + 12, 72);

        selectedButton.classList.add("wrong-answer");

        const correctOption =
            questions[questionIndex].options[correctAnswer];

        feedbackElement.textContent =
            `❌ Errado! A resposta correta era ${String.fromCharCode(65 + correctAnswer)}) ${correctOption}.`;

        feedbackElement.className = "wrong";

        sceneMessage.textContent =
            "Cuidado! O espírito está mais perto!";

        updateLives();
    }

    updateCharacters();

    scoreElement.textContent = `Acertos: ${score}`;

    // DERROTA SE PERDER TODAS AS VIDAS
    if (lives <= 0) {
        finishGame(false);
        return;
    }

    if (questionIndex === TOTAL_QUESTIONS - 1) {
        nextButton.textContent = "Ver resultado 🏆";
    } else {
        nextButton.textContent = "Próxima pergunta →";
    }

    nextButton.hidden = false;
}

// AVANÇA PARA A PRÓXIMA PERGUNTA
function nextQuestion() {
    if (!answered || gameOver) return;

    questionIndex++;

    if (questionIndex >= TOTAL_QUESTIONS) {
        finishGame(true);
        return;
    }

    showQuestion();
}

nextButton.addEventListener("click", nextQuestion);

// TELA FINAL DE VITÓRIA OU DERROTA
function finishGame(won) {
    gameOver = true;

    answersElement.hidden = true;
    nextButton.hidden = true;

    progressBar.style.width =
        `${(questionIndex + (won ? 1 : 0)) / TOTAL_QUESTIONS * 100}%`;

    finalScore.textContent =
        `${score}/${TOTAL_QUESTIONS}`;

    finalLives.textContent =
        "❤️ ".repeat(lives) +
        "🖤 ".repeat(INITIAL_LIVES - lives);

    resultPlayer.textContent =
        `Jogador: ${playerName}`;

    if (won) {
        resultIcon.textContent = "🏆";

        resultTitle.textContent =
            "Você me salvou! E eu te amo! 😻";

        resultMessage.textContent =
            `Parabéns, ${playerName}! Você respondeu às 10 perguntas e conseguiu escapar do espírito com ${lives} vida(s) restante(s)!`;

        sceneMessage.textContent =
            "O gatinho está a salvo!";

        catPosition = 88;
        spiritPosition = 5;

    } else {
        resultIcon.textContent = "👻";

        resultTitle.textContent =
            "Você me deixou morrer! Seu monstro 😿";

        resultMessage.textContent =
            `${playerName}, o espírito alcançou o gatinho! Você acertou ${score} pergunta(s). Tente novamente para salvá-lo!`;

        sceneMessage.textContent =
            "O espírito alcançou o gato!";

        spiritPosition = Math.min(spiritPosition + 15, 85);
    }

    updateCharacters();

    showScreen(resultScreen);
}

// JOGAR NOVAMENTE COM O MESMO NOME
playAgainButton.addEventListener("click", function() {
    startGame();
});

// VOLTAR PARA A TELA DE LOGIN
changePlayerButton.addEventListener("click", function() {
    playerNameInput.value = "";

    livesBox.hidden = true;

    showScreen(loginScreen);

    playerNameInput.focus();
});
