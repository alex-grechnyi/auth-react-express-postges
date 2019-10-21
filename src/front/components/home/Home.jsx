import React, { useState, useEffect } from 'react';
import {authAPI} from "../../api/api";
import "./home.css"

const Home = (props) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUser = () => {
            const jwt = getJwt();
            if (!jwt) {
                setUser({
                    user: null
                });
                return;
            }

            authAPI.getUser(jwt)
                .then(data => {
                    setUser(data.authData.user);
                })
                .catch(() => setUser(''))
        };
        getUser();
        }, []);

    const getJwt = () => {
        return 'bearer ' + localStorage.getItem('jwt-token');
    };

    return (
        <header className="header">
            {user && <div className="heading">Welcome, {user.username}</div>}
            {!user && <nav className="nav"><a className="nav__el" href="/login">Log in</a><a
                className="nav__el nav__el--cta" href="/register">Sign up</a></nav>}
        </header>
    )
};

export default Home;