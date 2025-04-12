document.addEventListener('DOMContentLoaded', function() {

    // Код для сторінки тестів (якщо є)
    const answerElements = document.querySelectorAll('.answer');
    if (answerElements.length > 0) {
        answerElements.forEach(answer => {
            answer.addEventListener('click', function() {
                const answers = this.closest('.question').querySelectorAll('.answer');
                answers.forEach(ans => ans.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        const testForm = document.getElementById('testForm');
        if (testForm) {
            testForm.addEventListener('submit', function(event) {
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
            });
        }
    }

    // Код для сторінки контактів (якщо є)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.textContent = 'Ваше повідомлення успішно надіслано!';
                    successMessage.style.display = 'block';
                }
                contactForm.reset();
            } else {
                alert('Будь ласка, заповніть всі поля.');
            }
        });
    }

    // Код для бургер-меню
    const burgerButton = document.getElementById('burgerButton');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const body = document.body;

    if (burgerButton && sidebar && content) {
        burgerButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            burgerButton.classList.toggle('open');
            content.classList.toggle('sidebar-open');
            body.classList.toggle('sidebar-open'); // Додаємо клас до body для можливих стилів
        });

        // Закриття бічного меню при кліку поза ним (опціонально)
        document.addEventListener('click', function(event) {
            const isClickInside = sidebar.contains(event.target) || burgerButton.contains(event.target);
            if (!isClickInside && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                burgerButton.classList.remove('open');
                content.classList.remove('sidebar-open');
                body.classList.remove('sidebar-open');
            }
        });
    }

    // Додаткові функції для адаптивного сайту (якщо є)
    const sidebarToggle = document.querySelector('.burger-button');
    const contentArea = document.querySelector('.content');

    if (sidebarToggle && contentArea) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            contentArea.classList.toggle('sidebar-open');
        });
    }

    // Таймер для тесту
    let timer;
    let timeLeft = 30 * 60; // Таймер на 30 хвилин

    function startTimer() {
        timer = setInterval(function() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            // Форматуємо таймер
            document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Час вичерпано!');
            } else {
                timeLeft--;
            }
        }, 1000);
    }

    // Запуск таймера при завантаженні сторінки
    window.onload = function() {
        startTimer();
    };

});
