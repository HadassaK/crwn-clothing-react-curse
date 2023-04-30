import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = ()=>{
    const logGoogleUser = async() => {
        try{
            const {user} =await signInWithGooglePopup();
            console.log(user);
            const userDocRef = await createUserDocumentFromAuth(user)
        }
        catch (error) { console. error(error);
     }
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with google Popup</button>
            <SignUpForm/>
        </div>
    )
};

export default SignIn;