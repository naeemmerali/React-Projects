import { decode } from 'he'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import Landing from '../components/Landing'
import Question from '../components/Question'
import './App.css'
import { Helmet } from 'react-helmet'

function App() {
  
  // values used throughout the quiz app to keep track of the applications state
  const [startQuiz, setStartQuiz] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [nextQuizData, setNextQuizData] = useState([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [userScore, setUserScore] = useState(0)
  const questions = createQuestions(quizData)

  // helper function to create the question components for the quiz
  function createQuestions(data){
    if (data.length !== 0) {
      return data.map(question => 
        <Question key={nanoid()} 
                  question={decode(question.question)} 
                  id={question.id}
                  correctAns={question.correct_answer}
                  incorrectAns={question.incorrect_answers}
                  updateSelection={updateSelection}
                  selected={question.selected}
                  options={question.options}
                  showAnswers={showAnswers}
        />)
    }
    else {
      return {}
    }
  }

  // api request to obtain 10 quiz questions
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, [])

  // once the user starts the quiz by hitting the button, a onclick event is triggered causing the data from the api to be formatted so it is easier to use
  function beginQuiz(){
    setQuizData(prevQuizData => {

    let cleandedData = prevQuizData.map(data => {
      
      let wrongAns = data.incorrect_answers.map(wrongChoice => decode(wrongChoice))
      let correctAns = decode(data.correct_answer)

      let answers = shuffle([...wrongAns, correctAns])

      return{
        ...data,
        question: decode(data.question),
        correct_answer: correctAns,
        incorrect_answers: wrongAns,
        id: nanoid(),
        selected: "",
        options: answers
        }
      })
      return cleandedData
    })
    // starts the quiz
    setStartQuiz(true)
  }

// fisher-yates shuffle algorithm
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

  // user chooses an answer and that value is added to the question object we are using to track results 
  function updateSelection(questionID, divValue){

    // if statement prevents user from being able to change answers and improving their score after seeing results 
    if (!showAnswers){

      setQuizData(prevQuizData => {
        let newData = []
  
        for (let i = 0; i<prevQuizData.length; i++){
          let question = prevQuizData[i]
  
          if (questionID === question.id){
            let updatedQuestion = {
              ...question,
              selected: divValue
            }
            newData.push(updatedQuestion)
          }
          else{
            newData.push(question)
          }
  
        }
  
        return newData
  
      })
    }
    
  }


// shows the answers for the quiz and updates the users score
  function showQuizResults(){
    setShowAnswers(true)
    setUserScore(prevScore => {
      let newScore = 0

      for (let i = 0; i<quizData.length; i++){
        if (quizData[i].correct_answer === quizData[i].selected) newScore++
      }
      return newScore
    })

    // grabs the next set of questions incase a user wants to repeat the quiz
    fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(data => setNextQuizData(data.results))
  }

  // if the user wants to play again go back to the beginning and set all state variables back to their default
  function restartGame(){
    setStartQuiz(false)
    setQuizData(nextQuizData)
    setShowAnswers(false)
  }

  return (
    // conditional rendering to show specific pages/parts of the quiz
        <main>
          {!startQuiz ? 
          <Landing beginQuiz={beginQuiz}/>
          
        :
        <div className="questions-container">
            <Helmet>
              <meta name="theme-color" content='#DDE0EA'/>
            </Helmet>
          {questions}
          {showAnswers && <h1 className='user-score'>{`You scored ${userScore} out of 10!`}</h1>}
          {showAnswers ? <button onClick={restartGame}>Play Again</button> : <button onClick={showQuizResults}>Check Answers</button>}
        </div>
        }
        </main>
    )
}

export default App
