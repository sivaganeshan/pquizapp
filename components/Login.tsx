import React, { ReactElement} from "react";
import firebase from "../firebase/firebaseClient";
import styles from '../styles/Home.module.css';


interface Props{

}

export default function Login({}: Props):ReactElement{
    async function signInWithGitHub(){
        let userCredentials =  await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
        firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: userCredentials.user.displayName,
            provider:userCredentials.user.providerData[0].providerId,
            photoUrl:userCredentials.user.photoURL
        });
    }

    async function signInWithTwitter(){
        let userCredentials =   await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider());
        firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: userCredentials.user.displayName,
            provider:userCredentials.user.providerData[0].providerId,
            photoUrl:userCredentials.user.photoURL
        });
    }

    async function signInWithGoogle(){
        let userCredentials =   await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
            uid: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: userCredentials.user.displayName,
            provider:userCredentials.user.providerData[0].providerId,
            photoUrl:userCredentials.user.photoURL
        });
    }
    return (
        <div>
            <h3 className={styles.textcenter}>To start Quiz, sign in with the following options</h3>
            <span className={styles.loginoptions}>
                 <button className={styles.signinbutton} onClick={()=>signInWithGitHub()}>
                     <div className={styles.buttoncontent}>
                     <div className={styles.signinimg}>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M0 320 l0 -320 120 0 120 0 0 40 c0 36 -3 40 -24 40 -44 0 -73 18
-105 65 -33 49 -17 49 28 1 35 -37 93 -37 110 0 6 15 10 27 9 28 -2 1 -25 11
-53 22 -66 26 -95 69 -95 138 1 28 7 62 15 76 8 14 14 44 15 68 0 47 11 52 58
29 34 -18 216 -15 254 3 40 19 55 8 61 -47 3 -26 11 -67 18 -90 25 -82 -22
-163 -108 -184 -28 -8 -40 -15 -35 -23 4 -6 9 -45 12 -86 l5 -75 118 -3 117
-3 0 321 0 320 -320 0 -320 0 0 -320z"/>
</g>
</svg>
                </div>

            <span className="sign-text">Sign in with Github</span>
                     </div>
               
            </button>
                 <button className={styles.signinbutton} onClick={()=>signInWithTwitter()}>
                 <div className={styles.buttoncontent}>
            <div className="signin-img">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M192 619 c-204 -79 -260 -370 -102 -529 124 -123 336 -123 460 0 159
160 102 452 -105 529 -74 28 -180 28 -253 0z m238 -172 c33 -11 35 -14 33 -52
-10 -130 -91 -215 -205 -215 -75 0 -86 10 -36 32 l43 19 -33 16 c-32 15 -43
33 -21 33 7 0 0 11 -15 25 -30 28 -34 45 -9 45 15 0 15 1 0 18 -10 10 -17 28
-17 40 0 22 0 22 39 -4 46 -30 124 -45 120 -23 -5 25 11 56 34 67 28 14 26 14
67 -1z"/>
</g>
</svg>
            </div>
            <span className="sign-text">Sign in with Twitter</span>
            </div>
            </button>
            <button className={styles.signinbutton} onClick={()=>signInWithGoogle()}>
            <div className={styles.buttoncontent}>
            <div className="signin-img">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M223 622 c-109 -39 -178 -112 -210 -221 -41 -144 35 -304 176 -370
79 -37 183 -37 262 0 111 52 178 153 187 281 l5 68 -162 0 -161 0 0 -60 0 -60
95 0 96 0 -15 -29 c-22 -42 -80 -89 -127 -101 -73 -20 -143 3 -197 64 -141
161 50 398 241 299 17 -8 32 -11 36 -6 3 5 19 26 34 46 16 20 26 40 23 45 -3
6 -27 20 -52 32 -66 30 -165 36 -231 12z"/>
</g>
</svg>
                </div> 
                <span className="sign-text">Sign in with Google</span>
                </div>
                </button>
                        </span>
           
        </div>
    );
}