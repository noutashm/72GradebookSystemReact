import React, {useEffect, useState} from 'react';
import axios from "axios";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const login = () => {
        axios.post('http://localhost:8000/auth/', {
            "username": username,
            "password": password
        }).then(response => {
            console.log(response.data.token)
            localStorage.setItem("Token", response.data.token);
            setIsLoggedIn(true);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Login</h1>
            <div className={'mb-3'}>
                <label htmlFor="username" className={'form-label'}>Username</label>
                <input id={'username'} onChange={usernameHandler} type={'text'} className={'form-control'}/>
                {/*<input type="text" id="id_username" name="username" className={'form-control'}>*/}
            </div>
            <div className={'mb-3'}>
                <label htmlFor="password" className={'form-label'}>Password</label>
                {/*<input type="password" id="id_password" name="password" className={'form-control'}>*/}
                <input id={'password'} onChange={passwordHandler} type={'password'} className={'form-control'}/>
            </div>
            <br />
            {/*{{form.errors}}*/}
            <button onClick={login} className={'btn btn-primary'} type={"submit"}>Log In</button>
        </div>
    );
}

export default Login;