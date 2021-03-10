import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    const uiState = useSelector(state => state.ui)

    const initialForm = {
        email: 'rando@gmail.com',
        password: '123456'
    };
    
    const [ formValues, handleInputChange ] = useForm( initialForm );

    const { email, password} = formValues;


    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLoginEmailPassword(email, password))
    }
 
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }
    return (
        <>
            <h3 className="auth__title"> Login </h3>

            <form 
                onSubmit={handleLogin} 
                className="animate__animated animate__fadeIn animate__faster"
            >
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

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={uiState.loading}
                >
                    Log in
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        onClick={handleGoogleLogin}
                        className="google-btn"
                        >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text ">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    className="link"
                    to="/auth/register"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
