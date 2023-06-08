// buttons dom
const startButton = document.querySelector('.start-button')
const exitButton = document.querySelector('.exit-button')
const continueButton = document.querySelector('.continue-button')
const nextButton = document.querySelector('.next-button')
const replayButton = document.querySelector('.replay-button')
const quitButton = document.querySelector('.quit-button')
// pages dom
const startPage = document.querySelector('.startPage')
const msgPage = document.querySelector('.msgPage')
const questionsPage = document.querySelector('.questions')
const resultPage = document.querySelector('.result-message')

//
let questionText = document.querySelector('.questionText')
let questionNumber = document.querySelector('.questionNumber')
let answers = document.querySelectorAll('.answers li')
let result = document.querySelector('.result')
let questionStart = document.querySelector('.questionStart')
let score = document.querySelector('.score')
let rightAnswer = document.querySelector('.rightAnswer')
let right = 0
let wrong = 0

// page operations
startButton.onclick = function(e)  {
    msgPage.style.display = 'block'
}
continueButton.onclick = () => {
    questionsPage.style.display = 'block'
}
exitButton.onclick = () => {
    window.location.reload()
}
quitButton.onclick = () => {
    window.location.reload()
}
replayButton.onclick = () => {
    window.location.reload()
}
function addQuestion (question , number) {
    let doneQues = true
    rightAnswer.textContent = ''
    questionText.textContent = question.title
    questionNumber.textContent = number
    answers.forEach((elemnt , index) => {
        elemnt.classList.remove('right')
        elemnt.classList.remove('wrong')
        elemnt.textContent = question[`answer_${index + 1}`]
    })
    answers.forEach(elemnt => {
        elemnt.onclick = () => {
            if(doneQues) {
                if (elemnt.innerHTML == question.right_answer) {
                    elemnt.classList.add('right')
                    right++
                    
                }else {
                    elemnt.classList.add('wrong')
                    wrong++
                    rightAnswer.textContent = `Right answer: ${question.right_answer}`
                }
                score.textContent = right 
                doneQues = false
                result.textContent = right 
                
            }
        }
    })
}


function  fetchData  () {
    return fetch('questions.json').then((res) => {
        if(res.ok) {
            return res.json()
        }else {
            throw Error('somthing is wrong')
        }
    })

}
let index = 1
let doneQuestions = []
let mainFun = () => {

fetchData().then(function(result) {
    
    addQuestion(result[Math.floor(Math.random() * result.length)] , index)
    questionStart.innerHTML = index
    index++
    
})} 
mainFun()

    nextButton.onclick = () => {   
        console.log(index - 1 , right+wrong) 
        if (index - 1 === right + wrong) {
            console.log('yes')
            if (index <= 5  ) {
                mainFun()
            }else {
                resultPage.style.display = 'block'
            }            
        }

        
    } 
