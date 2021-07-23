import firebase from "../firebase/firebaseClient";
import getStripe from "./intializeStripe";

export async function createCheckoutSession(uid: string){
    const fireStore = firebase.firestore();
    
    try{


        console.log(uid);
        //create a new checkout  session in the subcollection inside this  users document.
    let checkoutSessonRef = await fireStore.collection("users").doc(uid).collection("checkout_sessions").add({
        price:"price_1JFJRLSCGBDpITx0V2TLV6DM",
        success_url:window.location.origin,
        cancel_url:window.location.origin
    });

    console.log("checkoutsessonsExecuted");
    //wait for the checkout session get attached by the extension
    checkoutSessonRef.onSnapshot(async (snap)=>{
        const {sessionId} = snap.data();
        console.log(snap.data());
        if(sessionId){
            // we have session id, lets redirect to checkout 
            //Init stripe
            let stripe = await getStripe();
            stripe.redirectToCheckout({sessionId});
        }
    });
    }
    catch(err){
        console.log(err);
    }
    

    

}