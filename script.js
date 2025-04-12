document.addEventListener('DOMContentLoaded', function() {
    // Обробка вибору відповіді
    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', function() {
            const answers = this.closest('.question').querySelectorAll('.answer');
            answers.forEach(ans => ans.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Перевірка та обробка відправки форми для тесту
    const testForm = document.getElementById('testForm');
    if (testForm) {
        testForm.addEventListener('submit', function(event) {
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
    } else {
        console.log("Елемент 'testForm' не знайдений.");
    }

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
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                const successMessage = document.getElementById('successMessage');
                successMessage.textContent = 'Ваше повідомлення успішно надіслано!';
                successMessage.style.display = 'block';
                contactForm.reset();
            } else {
                alert('Будь ласка, заповніть всі поля.');
            }
        });
    } else {
        console.log("Елемент 'contactForm' не знайдений.");
    }

    // Отримуємо елементи меню та кнопку бургер-меню
    const burgerButton = document.querySelector('.burger-button');
    const sidebarMenu = document.querySelector('nav ul');

    // Додаємо обробник подій на клік по кнопці бургер-меню
    if (burgerButton && sidebarMenu) {
        burgerButton.addEventListener('click', () => {
            // Перемикаємо клас для відкриття/закриття меню
            sidebarMenu.classList.toggle('active');
        });
    } else {
        console.log("Бургер-меню або бічне меню не знайдено.");
    }

    // Обробка бургер-меню для мобільної версії
    const mobileMenuButton = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const nav = document.getElementById('mainNav');
            if (nav) {
                nav.classList.toggle('active'); // Перемикає клас "active" для меню
                mobileMenuButton.classList.toggle('active'); // Перемикає клас "active" для бургер-меню
            } else {
                console.log("Меню не знайдено.");
            }
        });
    } else {
        console.log("Кнопка мобільного меню не знайдена.");
    }
});
