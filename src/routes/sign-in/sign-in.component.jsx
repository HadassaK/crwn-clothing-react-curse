import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = ()=>{
    const logGoogleUser = async() => {
        try{
            const response =await signInWithGooglePopup();
            console.log(response);
        }
        catch (error) { console. error(error);
     }
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with google Popup</button>
        </div>
    )
}

export default SignIn;