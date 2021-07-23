import {Stripe , loadStripe } from "@stripe/stripe-js";

let stripePromise : Stripe | null;

let initializeStripe = async ()=>{
    if(!stripePromise){
        stripePromise = await loadStripe(
        "pk_test_51JFBmNSCGBDpITx0LVtUezI6w0mvsUAr2ARW65VFbxM41N6rhT7P425y961qFgsRQtsm3ORlBs14iODVf7XRgJYu00hHVDsk3l"
        );
    }
    return stripePromise;
}

export default initializeStripe;
