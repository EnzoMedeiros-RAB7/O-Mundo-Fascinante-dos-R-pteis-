document.addEventListener('DOMContentLoaded', () => {
    // 10 Perguntas baseadas no texto
    const questions = [
        {
            question: "Qual característica física as serpentes NÃO possuem, que as diferencia de muitos outros répteis?",
            options: ["Corpo alongado", "Escamas", "Patas", "Órgão de Jacobson"],
            answer: "Patas"
        },
        {
            question: "Como as serpentes conseguem engolir presas maiores que a sua cabeça?",
            options: ["Pela força muscular", "Pela habilidade de deslocar a mandíbula", "Usando o bico córneo", "Comendo em pedaços pequenos"],
            answer: "Pela habilidade de deslocar a mandíbula"
        },
        {
            question: "Qual é o nome do processo de troca de pele das serpentes?",
            options: ["Eclosão", "Metamorfose", "Ecdise", "Hibridação"],
            answer: "Ecdise"
        },
        {
            question: "Qual é o nome da proteção óssea que os crocodilianos possuem sob a pele?",
            options: ["Carapaça", "Derme", "Osteodermos", "Escudetes"],
            answer: "Osteodermos"
        },
        {
            question: "Qual grupo de répteis é conhecido por um comportamento parental, onde a mãe cuida dos ovos e dos filhotes após o nascimento?",
            options: ["Serpentes", "Quelônios", "Crocodilianos", "Lagartos"],
            answer: "Crocodilianos"
        },
        {
            question: "Os crocodilianos são classificados como predadores em qual tipo de ambiente, principalmente?",
            options: ["Aéreos", "Subterrâneos", "Semi-aquáticos", "Desérticos"],
            answer: "Semi-aquáticos"
        },
        {
            question: "Qual é a característica mais distintiva dos quelônios (tartarugas, cágados e jabutis)?",
            options: ["O bico córneo", "A vida longa", "A carapaça óssea protetora", "A determinação de sexo por temperatura"],
            answer: "A carapaça óssea protetora"
        },
        {
            question: "Qual parte do corpo dos quelônios está fundida à sua carapaça?",
            options: ["O crânio e a cauda", "A coluna vertebral e as costelas", "As patas e a mandíbula", "O esôfago e o estômago"],
            answer: "A coluna vertebral e as costelas"
        },
        {
            question: "O que os quelônios usam para cortar os alimentos, visto que não possuem dentes?",
            options: ["Garras afiadas", "Mandíbulas poderosas", "Bico córneo", "Língua preênsil"],
            answer: "Bico córneo"
        },
        {
            question: "O sexo dos filhotes de muitos quelônios é determinado por qual fator ambiental?",
            options: ["A salinidade da água", "O tipo de alimento da mãe", "A luz solar na eclosão", "A temperatura de incubação dos ovos"],
            answer: "A temperatura de incubação dos ovos"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let quizActive = true;

    const questionArea = document.getElementById('question-area');
    const optionsArea = document.getElementById('options-area');
    const nextButton = document.getElementById('next-button');
    const resultArea = document.getElementById('result-area');

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionArea.innerHTML = `<p><strong>Pergunta ${currentQuestionIndex + 1} de ${questions.length}:</strong> ${currentQuestion.question}</p>`;
            optionsArea.innerHTML = '';
            nextButton.style.display = 'none';
            quizActive = true;

            // Cria e exibe os botões de opção
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option;
                button.onclick = () => selectOption(option, currentQuestion.answer, button);
                optionsArea.appendChild(button);
            });
        } else {
            // Fim do Quiz
            showResults();
        }
    }

    function selectOption(selectedOption, correctAnswer, clickedButton) {
        if (!quizActive) return; // Impede cliques múltiplos

        quizActive = false;
        
        // Desativa todos os botões e aplica classes de cor
        const allButtons = optionsArea.querySelectorAll('.option-button');
        allButtons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else if (button === clickedButton) {
                button.classList.add('incorrect');
            }
        });

        // Verifica a resposta e atualiza o score
        if (selectedOption === correctAnswer) {
            score++;
            resultArea.textContent = "Correto! 🎉";
        } else {
            resultArea.textContent = "Incorreto. A resposta correta está destacada.";
        }

        nextButton.style.display = 'block';
        nextButton.textContent = 'Próxima Pergunta';
    }

    function nextQuestion() {
        currentQuestionIndex++;
        resultArea.textContent = ''; // Limpa a mensagem de resultado
        loadQuestion();
    }

    function showResults() {
        questionArea.innerHTML = `<h2>Quiz Finalizado!</h2>`;
        optionsArea.innerHTML = '';
        resultArea.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
        
        nextButton.style.display = 'block';
        nextButton.textContent = 'Recomeçar Quiz';
        nextButton.onclick = restartQuiz;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultArea.textContent = '';
        nextButton.onclick = nextQuestion; // Restaura a função do botão
        loadQuestion();
    }

    // Inicia o Quiz
    nextButton.onclick = nextQuestion;
    loadQuestion();

});

