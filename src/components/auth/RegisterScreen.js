import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {
    
    const dispatch = useDispatch()
    const uiState = useSelector(state => state.ui)

    
    console.log(uiState);
    const [ formValues, handleInputChange ] = useForm( {
        email: "rando@gmail.com",
        name: "starlinD",
        password: "1234",
        password2: "1234",
    } );

    const { email, password, name,password2} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!isFormValid()) return
        console.log({email, password, name,password2});
        dispatch(
            startRegisterWithEmailPasswordName(email, password, name)
        )
    }

    const isFormValid = () => {
        if(name.trim().length === 0) {
            dispatch(
                setError("Name is required")
            )
            console.log("Name is required");
            return false;
        }

        if(!validator.isEmail(email)) {
            dispatch(
                setError("Email is not valid")
            )
            console.log("Email is not valid");
            return false;
        }

        if(password !== password2 || password.length < 5) {
            dispatch(
                setError("Password should be at least 6 characters and match")
            )
            console.log("Password should be at least 6 characters and match");
            return false;
        }
        
        dispatch(
            removeError()
        )
        return true;
    }

    return (
        <>
            <h3 className="auth__title"> Login </h3>

            <form
                onSubmit={handleSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    uiState.msgError &&
                    (
                        <div className="auth__alert-error">
                            {uiState.msgError}
                        </div>
                    )
                }
                

                 <input
                    type="text"
                    className="auth__input"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

               <input
                    type="text"
                    className="auth__input"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />


                <input
                    type="password"
                    className="auth__input"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    className="auth__input"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-1"
                >
                    Log in
                </button>



                <Link
                    className="link"
                    to="/auth/login"
                >
                    Already registered
                </Link>
            </form>
        </>
    )
}
