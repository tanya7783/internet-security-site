document.addEventListener('DOMContentLoaded', function () {
    // 1. Обробка вибору відповіді
    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', function () {
            const answers = this.closest('.question').querySelectorAll('.answer');
            answers.forEach(ans => ans.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // 2. Обробка форми тесту
    const testForm = document.getElementById('testForm');
    if (testForm) {
        testForm.addEventListener('submit', function (event) {
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

            startTimer(5 * 60); // Таймер: 5 хв
        });
    } else {
        console.log("Елемент 'testForm' не знайдений.");
    }

    // 3. Таймер
    let timerInterval;
    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        timerInterval = setInterval(function () {
            minutes = Math.floor(timer / 60);
            seconds = timer % 60;
            const timerEl = document.getElementById('timer');
            if (timerEl) {
                timerEl.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            }

            if (--timer < 0) {
                clearInterval(timerInterval);
                alert("Час вийшов!");
            }
        }, 1000);
    }

    // 4. Обробка форми контактів
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
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

    // 5. Бургер-меню
    const burgerButton = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerButton.classList.toggle('open');
    });

    // 6. Респонсивність: медіа-запит для адаптивного меню та інших елементів
    function adjustLayoutForMobile() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768) {
            document.querySelectorAll('.test-button').forEach(button => {
                button.style.width = '100%';  // Кнопки займають всю ширину на мобільних пристроях
            });

            document.querySelectorAll('section h2').forEach(h2 => {
                h2.style.fontSize = '1.6rem';  // Зменшення шрифта для заголовків
            });

            document.querySelectorAll('section p').forEach(p => {
                p.style.fontSize = '1rem';  // Зменшення шрифта для тексту
            });

            document.querySelector('.nav-links').style.display = 'none'; // Приховуємо меню за замовчуванням
        } else {
            // Для великих екранів
            document.querySelectorAll('.test-button').forEach(button => {
                button.style.width = 'auto';  // Відновлюємо стандартну ширину кнопок
            });

            document.querySelectorAll('section h2').forEach(h2 => {
                h2.style.fontSize = '2rem';  // Відновлюємо стандартний шрифт для заголовків
            });

            document.querySelectorAll('section p').forEach(p => {
                p.style.fontSize = '1.2rem';  // Відновлюємо стандартний шрифт для тексту
            });

            document.querySelector('.nav-links').style.display = 'flex';  // Відновлюємо видимість меню
        }
    }

    // Перевіряємо респонсивність при зміні розміру вікна
    window.addEventListener('resize', adjustLayoutForMobile);
    adjustLayoutForMobile();  // Спочатку виконуємо функцію, щоб налаштувати елементи при завантаженні сторінки
});
