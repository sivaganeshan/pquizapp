import React,{useState} from 'react';
import QuestionCard from '../components/QuestionCard';
import {fetchQuizQuestions, Difficulty, QuesyionState} from '../components/API';
import {GlobalStyle,Wrapper} from '../components/App.style';
import usePremiumStatus from "../stripe/usePremiumStatus";
import firebase from "../firebase/firebaseClient";
import {useAuthState} from "react-firebase-hooks/auth";
import isUserPremium from '../stripe/isUserPremium';
import styles from '../styles/QuizApp.module.css'

export type AnswerObject ={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
  }

function QuizApp() {


const TOTAL_QUESTIONS = 10;



const [loading,setLoading] = useState(false);
const [questions,setQuestions] = useState<QuesyionState[]| []>([]);
const [number, setNumber] = useState(0);
const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
const [score, setScore] = useState(0);
const [gameOver, setGameOver] = useState(true);
const [category, setCategory] = useState("9");
const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
const [error, setError] = useState(false);

const[user, userLoading] = useAuthState(firebase.auth());
const userIsPremium = usePremiumStatus(user);

const startTrivia = async ()=>{

setLoading(true);
setGameOver(false);
const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,difficulty,category);
if(!newQuestions){
  setLoading(false);
  setError(true);
  setQuestions([]);
}
else{
setQuestions(newQuestions);
setLoading(false);
setScore(0);
setUserAnswers([]);
setNumber(0);
}

}
const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{
 if(!gameOver){
  const answer = e.currentTarget.value;
  const correct = answer === questions[number].correct_answer;
  if(correct) setScore(prev=> prev+1);
  const answerObject:AnswerObject={
    question:questions[number].question,
    answer,
    correct,
    correctAnswer:questions[number].correct_answer,
  }
  setUserAnswers(prev=> [...prev, answerObject]);
 }
  

}

const nextQuestion = ()=>{
  if(number < TOTAL_QUESTIONS-1){
    setNumber(number+1);
  }else{
    setGameOver(true);
    setScore(0);
  }
  
}
const selectCategory =(e: React.FormEvent<HTMLSelectElement>)=>{
  const selecredValue = e.currentTarget.value;
  setCategory(selecredValue);
}

const selectDifficulty =(e: React.FocusEvent<HTMLSelectElement>)=>{
  const selectedValue = e.currentTarget.value;
  if(selectedValue === 'easy'){
    setDifficulty(Difficulty.EASY);
  }
  if(selectedValue === 'medium'){
    setDifficulty(Difficulty.MEDIUM);
  }
  if(selectedValue === 'hard'){
    setDifficulty(Difficulty.HARD);
  }
  
}



  return (
    <>
    {userIsPremium &&
      <>
    <GlobalStyle />
     <Wrapper >
    <div className="App">
     <h1>Quiz App</h1>
     {gameOver || userAnswers.length === TOTAL_QUESTIONS?(
       <div>
      <label htmlFor="categories">Choose a category : </label>
     <select name="categories" id="categories" value={category} onChange={selectCategory} >
     <option value="9">General Knowledge</option>
     <option value="21">sports</option>
     <option value="17">Science</option>
     <option value="18">computers</option>
     <option value="31">Anime/Manga</option>
     <option value="26">celebrities</option>
     <option value="23">history</option>
     <option value="15">video games</option>
     <option value="20">Mythology</option>
     <option value="11">Flims</option>
     <option value="22">Geography</option>
   </select>
   </div>
   ):null}
  <br/>
   {gameOver || userAnswers.length === TOTAL_QUESTIONS ?(
     <div>
       <label htmlFor="difficulty">Difficulty Level : </label>
     <select name="difficulty" id="difficulty" value={difficulty} onChange={selectDifficulty} >
     <option value="easy">Easy</option>
     <option value="medium">Medium</option>
     <option value="hard">Hard</option>
     </select>
     </div>
   ):null}
     {gameOver || userAnswers.length === TOTAL_QUESTIONS?(<button className="start" onClick={startTrivia}>start</button>):null}
     {!gameOver?<p className="score">Score:{score}</p>:null}
     {loading && <p className="loading">questions loading , Please wait....</p>}
     {error && <p className="loading">failed to load Quiz, Try different category or difficulty level</p>}
     {!error && !loading && !gameOver && (
     <QuestionCard 
     questionNr={number+1}
     totalQuestions={TOTAL_QUESTIONS}
     question={questions?questions[number].question:undefined}
     answers = {questions?questions[number].answers:[]}
     userAnswer={userAnswers?userAnswers[number]:undefined}
     callback={checkAnswer}
     /> )}
     <br/>
     {!loading && !gameOver  && userAnswers.length === number +1 &&number !== TOTAL_QUESTIONS - 1&& <button className="next" onClick={nextQuestion}>Next</button>}
    </div>
    </Wrapper>
    </>
    }
    { !userIsPremium && 
    <div className={styles.container}>
      <div className={styles.itemone}>
        <p>Access Denied , You are not a Premium Customer!!!</p>
        </div>
        </div>}
    </>
  );
}

export default QuizApp;