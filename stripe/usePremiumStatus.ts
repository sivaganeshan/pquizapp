import {useState, useEffect} from "react";
import firebase from "../firebase/firebaseClient";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user:firebase.User){
    const[premiumStatus, SetPremiumStatus] = useState<boolean>(false);
    useEffect(()=>{

        if(user){
            const checkPremiumStatus = async function(){
                SetPremiumStatus(await isUserPremium());
            }
            checkPremiumStatus();
        }
    },[user]);
    return premiumStatus;   
}