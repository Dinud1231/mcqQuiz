
document.getElementById('selectquizbtn').onclick = function(){
    var script = document.createElement('script');
    script.onload = function () {
    loadQuiz()
    console.log(quizData.length);
    };
    script.src = 'quizzes/' + document.getElementById('selectquiz').value + '.js';
    document.head.appendChild(script);
    document.getElementById('maincontainer').style.visibility = 'hidden';
    document.getElementById('quiz').style.visibility = 'visible';
}

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
var wrongquestions = []
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = (currentQuiz+1) + '. ' + currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
document.addEventListener("keypress", function(event) {
    if (event.key == 'Enter') {
        check()
    }
  });
submitBtn.addEventListener('click', () => {
   check()
})
function check() {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       } else {
        wrongquestions.push(currentQuiz+1);
        console.log((currentQuiz+1) + '. ' + quizData[currentQuiz].question);
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
            var percentage = Math.floor((score/quizData.length)*100);
           quiz.innerHTML = `
           <h2>You answered ${percentage}% of the questions correctly</h2>
           <button class="submit" onclick="location.reload()">Reload</button>
           `
           quiz.style.color = 'red';  
            if (percentage>=50) {
            quiz.style.color = 'orange';
            quiz.innerHTML = `
           <h2>You answered ${percentage}% of the questions correctly</h2>
           <p>Questions that you got incorrect: ${wrongquestions}</p>
           <button class="submit" onclick="location.reload()">Reload</button>
           `
           } 
           if (percentage>=80) {
            quiz.style.color = 'green';
            quiz.innerHTML = `
           <h2>You answered ${percentage}% of the questions correctly</h2>
           <p>Questions that you got incorrect: ${wrongquestions}</p>
           <button class="submit" onclick="location.reload()">Reload</button>
           `
           }
           if (percentage==100) {
            quiz.style.color = 'green';
            quiz.innerHTML = `
           <h2>You answered ${percentage}% of the questions correctly</h2>
           <button class="submit" onclick="location.reload()">Reload</button>
           `
           }
       }
    }
}