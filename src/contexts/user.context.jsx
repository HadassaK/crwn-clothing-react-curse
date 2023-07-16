
import {createContext, useEffect, useReducer} from 'react';
import { createAction } from '../utils/reducer/reducer.utils';
import { 
	onAuthStateChangedListener,
	createUserDocumentFromAuth 
	} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER' ,
};

const userReducer = (state, action) => {
    console.log(action);
    const {type, payload} = action;

    switch (type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {...state, currentUser: payload};
        default:
            throw new Error(`Unhandle type ${type} in userReduce`);
    }
}

const INITIAL_STATE = {
    currentUser: null,
};

export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
   
    const setCurrentUser = (user) => {
        console.log('setCurrentUser');
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }
    
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);   

    const value = {
        currentUser,
        //setCurrentUser
      };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};