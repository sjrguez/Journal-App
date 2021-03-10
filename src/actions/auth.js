import { Types } from "../types/types";

import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { uiFinishLoading, uiStartLoading } from "./ui";
import { noteLogout } from "./notes";





export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            
            dispatch( 
                login(user.uid, user.displayName)
            )
        })
        .catch(e => {
            Swal.fire('Error', e.message, 'error');
        })
        .finally(() => {
            dispatch(uiFinishLoading())
        })
    }
}
    

export const startRegisterWithEmailPasswordName =  (email, password, name) => {
    
    return (dispatch) => {
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user}) => {
                await user.updateProfile({displayName: name})
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(e => {
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {
    return async (dispatch) => {
        try {
            const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)
            dispatch(
                login(user.uid, user.displayName)
            )
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    }
}


export const login = (uid, displayName) => {
    return {
        type: Types.login,
        payload: {
            uid,
            displayName
        }
    }
}


export const startLogOut = () => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut()
            dispatch(
                logout()
            )
            dispatch(
                noteLogout()
            )
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    }
}


export const logout = () => {
    return {
        type: Types.logout
    }
}