import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from "../components/Login";
import firebase from "../firebase/firebaseClient";
import {useAuthState} from "react-firebase-hooks/auth";
import {createCheckoutSession} from "../stripe/createCheckoutSession";
import usePremiumStatus from "../stripe/usePremiumStatus";
import Router from 'next/router'



export default function Home() {

  const[user, userLoading] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(user);

  function RouteToQuizApp(){
    Router.push('/quizapp')
  }

  return (
    <div className={styles.container}>
     {!user && userLoading && <h1>Loading</h1>}
    {!user && !userLoading && <Login />}
    {user && !userLoading &&(
      <div>
        <h1>
          Hello, {user.displayName}
          {!userIsPremium?
          (
            <>
            <br></br>
            <p>Only premium members can view and play Quiz</p>
            <p>Don't worry, its just a stripe test account, you know the drills!!!<br/> use 4242 4242 4242 as a card, and choose india address in stripe checkout session</p>
            <button className={styles.premiumbutton} onClick={()=>createCheckoutSession(user.uid)}>
              Upgrade to premium
            </button>
            </>
          ):(
            RouteToQuizApp()
          )}
        </h1>
        </div>
    )}
    </div>
  )
}
