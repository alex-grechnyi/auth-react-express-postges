import React, { useState } from 'react';
import {authAPI} from "../../api/api";
import {Redirect} from "react-router-dom";
import "../app/form.css"
import Input from "../formInp/Input";

const SignUp = (props) => {
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState('');

    let form = {
        username: undefined,
        email: undefined,
        password: undefined
    };

    let { username, email, password } = form;
    const setForm = (type, value) => {
        switch (type) {
            case 'username':
                return form.username = value;
            case 'email':
                return form.email = value;
            case 'password':
                return form.password = value;
            default: return
        }
    };

    const onSubmit = (e, data) => {
        e.preventDefault();
        authAPI.signUp(data)
            .then(data => {
                /*let { errors } = data;
                if (errors) {
                    throw (errors);
                }
                setError(false);
                setIsSuccess(true);*/
            })
            .catch((err) => setError(err));
    };

    return (
        <div className="login-form">
            <h2 className="heading">Create a new account</h2>


            <form onSubmit={e => onSubmit(e, form)}>
                <Input id='username' type={'text'} value={username} onValueChange={setForm} />
                <Input id='email' type={'email'} value={email} onValueChange={setForm} />
                <Input id='password' type={'password'} value={password} onValueChange={setForm} />
                <div className="form__group">
                    <button className="btn btn--green">Register</button>
                </div>
            </form>
            {error && <p className="error">Error: {error}</p>}
            {isSuccess && <Redirect to='/login'/>}
        </div>
    );
};

export default SignUp;