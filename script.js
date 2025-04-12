document.addEventListener('DOMContentLoaded', function() {
    // Обробка вибору відповіді
    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', function() {
            const answers = this.closest('.question').querySelectorAll('.answer');
            answers.forEach(ans => ans.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Обробка відправки форми
    document.getElementById('testForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let score = 0;
        document.querySelectorAll('.question').forEach(question => {
            const selectedAnswer = question.querySelector('.answer.selected');
            const answers = question.querySelectorAll('.answer');
            const correctAnswerText = question.querySelector('.correct-answer');

            // Очищення старих класів
            answers.forEach(answer => {
                answer.classList.remove('correct', 'incorrect');
            });

            if (selectedAnswer) {
                if (selectedAnswer.getAttribute('data-correct') === 'true') {
                    score++;
                    selectedAnswer.classList.add('correct');
                } else {
                    selectedAnswer.classList.add('incorrect');
                }
            }
            if (correctAnswerText) {
                correctAnswerText.style.display = 'block';
            }

            // Відображення правильних відповідей
            answers.forEach(answer => {
                if (answer.getAttribute('data-correct') === 'true') {
                    answer.classList.add('correct');
                }
            });
        });

        // Виведення результату
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `Ваш результат: ${score} з ${document.querySelectorAll('.question').length}`;
        document.querySelector('section').appendChild(resultDiv);
        setTimeout(() => {
            resultDiv.classList.add('fade-in');
        }, 100);

        startTimer(5 * 60);  // Запуск таймера на 5 хвилин
    });

    let timerInterval;
    // Функція для запуску таймера
    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        timerInterval = setInterval(function () {
            minutes = Math.floor(timer / 60);
            seconds = timer % 60;

            document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

            if (--timer < 0) {
                clearInterval(timerInterval);
                alert("Час вийшов!");
            }
        }, 1000);
    }

    // Функція для відправки email
    function sendEmail() {
        window.location.href = "mailto:tania.hrynda@gmail.com";
    }

    // Обробка форми контактів
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = 'Ваше повідомлення успішно надіслано!';
            successMessage.style.display = 'block';
            document.getElementById('contactForm').reset();
        } else {
            alert('Будь ласка, заповніть всі поля.');
        }
    });
});
