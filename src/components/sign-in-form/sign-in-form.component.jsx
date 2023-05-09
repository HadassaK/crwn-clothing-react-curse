import './sign-in-form.styles.scss'
import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FromInput from "../form-input/form-input.components";
import Button from "../button/botton.component.jsx"

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm=()=>{
    const[formFields, setFormFields] = useState(defaultFormFields);
    const{email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        try{
            await signInWithGooglePopup();            
        }
        catch (error) { console. error(error);
     }
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch(error){  
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/wrong-password':
                    alert("incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with email');
                    break;
                default:
                    console.log(error);
            }
        }
        

    }
    
    const handleChange = (event)=> {
        const {name, value} = (event).target;
        
        setFormFields({...formFields, [name]: value });
    }
    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FromInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}/>
                
                <FromInput 
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}/>

            <div className='buttons-container'>
                <Button type="submit">Sign In</Button>
                <Button type="button" onClick={signInWithGoogle} buttonType="google">Google sign in</Button>
            </div>
            </form>
        </div>
    );
}

export default SignInForm;