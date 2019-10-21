import React, { useState } from 'react';
import {authAPI} from "../../api/api";
import {Redirect} from "react-router-dom";
import "../app/form.css"

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState('');

    const onSubmit = (e, data) => {
        e.preventDefault();
        authAPI.signIn(data)
            .then(data => {
                let { errors } = data;
                if (errors) {
                    throw (errors);
                }
                localStorage.setItem('jwt-token', data.token);
                setError(false);
                setIsAuth(true);
            })
            .catch((err) => setError(err));
    };

    return (
        <div className="login-form">
            <h2 className="heading">Log into your account</h2>
            <form onSubmit={e => onSubmit(e, {email, password})}>
                <div className="form__group"><label className="form__label" htmlFor="email">Email address</label><input
                    className="form__input" id="email" type="email" placeholder="you@example.com" required="required"
                    value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form__group"><label className="form__label" htmlFor="password">Password</label><input
                    className="form__input" id="password" type="password" placeholder="••••••••" required="required"
                    minLength="2"
                    value={password} onChange={e => setPassword(e.target.value)}/></div>
                <div className="form__group">
                    <button className="btn btn--green">Login</button>
                </div>
            </form>
            {error && <p className="error">Auth error: {error}</p>}
            {isAuth && <Redirect to='/' />}
        </div>
    );
};

export default SignIn;