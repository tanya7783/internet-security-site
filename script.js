document.querySelectorAll('.answer').forEach(answer => {
    answer.addEventListener('click', function() {
        
        const answers = this.closest('.question').querySelectorAll('.answer');

        
        answers.forEach(ans => ans.classList.remove('selected'));

        
        this.classList.add('selected');
    });
});

document.getElementById('testForm').addEventListener('submit', function(event) {
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
    resultDiv.innerHTML = 'Ваш результат: ' + score + ' з ' + document.querySelectorAll('.question').length;
    document.querySelector('section').appendChild(resultDiv);
});

function sendEmail() {
    window.location.href = "mailto:tania.hrynda@gmail.com";
}