import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import FromInput from "../form-input/form-input.components";
import Button from "../button/botton.component.jsx"

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm=()=>{
    const[formFields, setFormFields] = useState(defaultFormFields);
    const{displayName, email, password, confirmPassword} = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert('password not match to confirm password');
            return;
        }
        
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert('cannnot create user, email already in use');
            }
            else{
                console.log(error);
            }
        }
        

    }
    
    const handleChange = (event)=> {
        const {name, value} = (event).target;
        
        setFormFields({...formFields, [name]: value });
    }
    return (
        <SignUpContainer className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FromInput 
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}/>
                
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
                
                <FromInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;