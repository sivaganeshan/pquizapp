import firebase from "../firebase/firebaseClient";

export default async function isUserPremium(): Promise<boolean>{
    await firebase.auth().currentUser?.getIdToken(true);
    let decodedResult = await firebase.auth().currentUser?.getIdTokenResult();

    return decodedResult?.claims?.stripeRole? true :false;
}