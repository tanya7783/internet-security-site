document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', function () {
            const answers = this.closest('.question').querySelectorAll('.answer');
            answers.forEach(ans => ans.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.getElementById('testForm').addEventListener('submit', function (event) {
        event.preventDefault();
        let score = 0;
        
        document.querySelectorAll('.question').forEach(question => {
            const selectedAnswer = question.querySelector('.answer.selected');
            const answers = question.querySelectorAll('.answer');
            const correctAnswerText = question.querySelector('.correct-answer');

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

            answers.forEach(answer => {
                if (answer.getAttribute('data-correct') === 'true') {
                    answer.classList.add('correct');
                }
            });
        });

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `Ваш результат: ${score} з ${document.querySelectorAll('.question').length}`;
        document.querySelector('section').appendChild(resultDiv);

        setTimeout(() => {
            resultDiv.classList.add('fade-in');
        }, 100);

        startTimer(5 * 60);
    });

    let timerInterval;

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

    document.getElementById('contactForm').addEventListener('submit', function (event) {
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

    const burgerMenu = document.getElementById('burgerMenu');
    const navList = document.querySelector('nav ul');

    burgerMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
});
