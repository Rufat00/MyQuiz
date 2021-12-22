let startBtn = document.querySelector('#startBtn')
let startBlock = document.querySelector('.startBlock')
let infoBlock = document.querySelector('.block1')
let quizBlock = document.querySelector('.block2')
let resultBlock = document.querySelector('.block3')
let infoExit = document.querySelector('.exit')
let infoNext = document.querySelector('.infoNext')
let resultExit = document.querySelector('#resultExit')
let replayBtn = document.querySelector('#replay')
let next = document.querySelector('.next')
let i = 0;
let score = 0;
let timeWork
let timeLineWork

startBtn.addEventListener('click', ()=>{
    startBlock.classList.remove('active')
    infoBlock.classList.add('active')
})
infoExit.addEventListener('click', ()=>{
    startBlock.classList.add('active')
    infoBlock.classList.remove('active')
})
infoNext.addEventListener('click', ()=>{
    i = 0
    score = 0
    infoBlock.classList.remove('active')
    quizBlock.classList.add('active')
    quizBegin()
})
resultExit.addEventListener('click', ()=>{
    startBlock.classList.add('active')
    resultBlock.classList.remove('active')
})
replayBtn.addEventListener('click', ()=>{
    resultBlock.classList.remove('active')
    infoBlock.classList.add('active')
})
function quizBegin(){
    startTimer(14)
    startTimeLine(0)
    let title = document.querySelector('.question');
    let options = document.querySelector('.options')
    let number = document.querySelector('.number')
    let totalNumber = document.querySelector('.totalNumber')
    let num = 0

    title.innerHTML = `${questions[i].numb}. ${questions[i].question}`;
    number.innerHTML = questions[i].numb
    totalNumber.innerHTML = questions.length
    options.innerHTML = ""

    questions[i].options.forEach(element => {
        options.insertAdjacentHTML('beforeend',`<div class="option" onclick="selected(${num})">${element}</div>`)
        num += 1
    });
}
function startTimer(time){
    let timeLeft = document.querySelector('.timeLeft')
    timeWork = setInterval(timer, 1000);
    function timer(){
        if(time <= 0){
            let option = document.querySelectorAll('.option')

            clearInterval(timeWork)
            clearInterval(timeLineWork)
            option.forEach(child => {
                child.removeAttribute('onclick')
                if(child.textContent == questions[i].answer){
                    child.insertAdjacentHTML('beforeend',`<i class='bx bx-check-circle'></i>`)
                    child.classList.add('correct')
                }
            });
            next.classList.add('ready')
            i += 1
        }

        if(time < 9){
            timeLeft.innerHTML = '0' + time
        }
        else{
            timeLeft.innerHTML = time;
        }
        time -= 1;
    }
}
function startTimeLine(time){
    let timeLine = document.querySelector('.timeLine')
    timeLineWork = setInterval(showLine, 50)
    function showLine(){
        time += 0.25075
        timeLine.style.width = time + 'vh'
    }
}
function selected(num){
    clearInterval(timeWork)
    clearInterval(timeLineWork)
    let options = document.querySelector('.options')
    let option = document.querySelectorAll('.option')
    options.children[num].classList.add('selected')
    
    option.forEach(child => {
        child.removeAttribute('onclick')
    });
    let selected = document.querySelector('.selected')
    if(selected.textContent == questions[i].answer){
        selected.insertAdjacentHTML('beforeend',`<i class='bx bx-check-circle'></i>`)
        selected.classList.add('correct')
        score += 1
    }
    else{
        selected.insertAdjacentHTML('beforeend',`<i class='bx bx-x-circle' ></i>`)
        selected.classList.add('incorrect')
        option.forEach(value =>{
            if(value.textContent == questions[i].answer){
                value.insertAdjacentHTML('beforeend',`<i class='bx bx-check-circle'></i>`)
                value.classList.add('correct')
            }
        })
    }
    next.classList.add('ready')
    i += 1
}
function showResult(){
    let smile = document.querySelector('.awards')
    let s = document.querySelector('.score')
    smile.innerHTML = ''
    if(score < (questions.length + 1)*0.33){
        smile.insertAdjacentHTML('beforeend', `<i class='bx bx-confused'></i>`)
        s.innerHTML = `Try Better!, You got only ${score} out of ${questions.length} :(`
    }
    else if(score < (questions.length + 1)*0.66){
        smile.insertAdjacentHTML('beforeend',`<i class='bx bx-wink-smile' ></i>`)
        s.innerHTML = `Well Done !, You got ${score} out of ${questions.length} :)`
    }
    else if(score <= (questions.length + 1)*0.99){
        smile.insertAdjacentHTML('beforeend', `<i class='bx bx-trophy' ></i>`)
        s.innerHTML = `Thats Wonderful !, You got ${score} out of ${questions.length} :D`
    }
    else{
        smile.insertAdjacentHTML('beforeend', `<i class='bx bx-error-alt'></i>`)
        s.innerHTML = 'Score Error !!!'
    }
}
next.addEventListener('click',()=>{
    if(i == questions.length){
        clearInterval(timeWork)
        clearInterval(timeLineWork)
        next.classList.remove('ready')
        quizBlock.classList.remove('active')
        resultBlock.classList.add('active')
        showResult()
    }
    else{
        clearInterval(timeWork)
        clearInterval(timeLineWork)
        quizBegin()
        next.classList.remove('ready')
    }
    let timeLeft = document.querySelector('.timeLeft')
    timeLeft.innerHTML = "15"
})























































































questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  }
]