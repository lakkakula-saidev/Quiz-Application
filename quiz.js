      /*  QUIZ GAME!

        RULES:
        / The player must guess correctly a certain amount of questions
        / Each correct answer gives him one point
        / Answers could be multiple or true/false
        / At the end of the game, the user must know his total score

        QUESTIONS:
        / You can get them from this URL ( http://bit.ly/strive_QUIZZ ) or you can write your own
        / Could be multiple of boolean (true / false)
        / [EXTRA] Show if the answer was wrong or correct after clicking
        / [EXTRA] Present them one a time

        HINTS:
        / Keep a global variable score for the score
        / Keep a variable questionNumber for the question the user is answering
        / When questionNumber is bigger then the available questions, present the score
        / Start working with the question saved in a variable, and then include AJAX etc
        / Start with the easier version and THEN implement the EXTRAs
        / Please debug everything / try it on the console to be sure of what to expect from your code

        EXTRA:
        / Show if the answer was wrong or correct after clicking
        / Present questions one a time
        / Let the user select difficulty and number of questions (you can get q/a from https://opentdb.com/api.php?amount=10&category=18&difficulty=easy modifying amount and difficulty)
*/

var questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let overallScore=0
let questionNumber = 0; 

function shuffle(a) {
    for (let k = a.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
}

var myArray = [0,1,2,3,4,5,6,7,8,9];
let shuffleArray = shuffle(myArray)


function createQuestions(){
    let q = questions[shuffleArray[questionNumber]].question
    return [q]
}


function createOptions(index){
    let temp = []
    temp.push(questions[shuffleArray[index]].correct_answer)
    for(let j=0; j< questions[shuffleArray[index]].incorrect_answers.length; j++){
        temp.push(questions[shuffleArray[index]].incorrect_answers[j])
    }
    return shuffle(temp)  
}

function nxtButton(){
    let nextButton = document.getElementById('nextButton')
    nextButton.style.display = 'block'
    questionNumber +=1
}

function getAnswerId(givenArray){
    for(let i=0; i< givenArray.length; i++){
        if(questions[shuffleArray[questionNumber]].correct_answer=== givenArray[i].value){
            return i
        }
    }
}


function createVars(){

    let oldDiv = document.getElementsByTagName('div')
    if(oldDiv.length){
        oldDiv[0].remove()
    }
    if(questionNumber<10){
        let [newQuestion] = createQuestions()
        let options = createOptions(questionNumber)
        let newDiv = document.createElement('div')
        newDiv.className = 'questionDiv'
        newDiv.innerHTML = `${questionNumber+1}. ${newQuestion}`

        for(let j= 0; j< options.length; j++){
            let newOption = document.createElement('input')
            newOption.setAttribute('type', 'button')
            newOption.id = `button${j}`
            newOption.setAttribute('value',options[j])
            newOption.addEventListener('click',answerCheck)
            newDiv.appendChild(newOption)
        }
        let nextButton = document.createElement('input')
        nextButton.setAttribute('type', 'button')
        nextButton.id = `nextButton`
        nextButton.setAttribute('value','Next Question')
        nextButton.style.display = 'none'
        nextButton.addEventListener('click',createVars)
        newDiv.appendChild(nextButton)
        document.body.appendChild(newDiv)
        console.log(overallScore) 

    }else{
        let newDiv = document.createElement('div')
        newDiv.innerHTML = `Thank you for the participation. Your score is ${overallScore} of 10`
        document.body.appendChild(newDiv) 
    }
}

function answerCheck(event){
    
    if(event.target.value === questions[shuffleArray[questionNumber]].correct_answer){
        let temp = document.getElementById(event.target.id)
        temp.style.backgroundColor = '#90ee90'
        overallScore += 1
        nxtButton()
    }else{
        let temp1 = document.getElementById(event.target.id)
        temp1.style.backgroundColor = '#ff918f'
        let answerId = getAnswerId(document.querySelectorAll('input'))
        let temp2 = document.getElementById(`button${answerId}`)
        temp2.style.backgroundColor = '#90ee90'
        nxtButton()
    }
}


function startQuestions(){
    createVars()
}

 

function startQuiz(){
     let divRemove = document.getElementsByClassName('introPage')
     divRemove[0].remove()
    startQuestions()
}

window.onload = function () {
    
};  
