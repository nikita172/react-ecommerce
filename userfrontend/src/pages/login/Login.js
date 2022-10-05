import React, { useRef, useState } from 'react'
import { CircularProgress } from "@material-ui/core"
import { AlternateEmail, Lock } from '@material-ui/icons';
import axios from "axios";
import "./login.css"
import ErrorMsg from '../../components/errorMsg/ErrorMsg';
import { Link } from "react-router-dom"
import LoginHeader from '../../components/loginHeader/LoginHeader';
export default function Login() {
    const email = useRef();
    const password = useRef();
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false)
    const handleClick = async (e) => {
        setIsFetching(true)
        e.preventDefault()
        const user = {
            email: email.current.value,
            password: password.current.value
        }
        try {
            const res = await axios.post("/user/login", user)
            if (!res.data.status) {
                setIsError(true)
                setTimeout(() => {
                    setIsError(false)
                }, 2000)
            }
            else {
                const info = [res.data.token, res.data.user.email]
                localStorage.setItem('user', JSON.stringify(info))
                window.location.reload(true)
            }
            setError(res.data.message)
        }
        catch (err) {
            console.log(err)
        }
        setIsFetching(false)
    }
    return (
        <div className='loginSection'>
            <LoginHeader />
            <section id="loginContainer">
                <div className="loginContainerLeft">
                    <form id="loginForm" onSubmit={handleClick}>
                        <h2 className='loginHeading'>Login</h2>
                        <div className="inputGroup inputEmail">
                            <AlternateEmail className='icons' />
                            <input type="email" name="email" required placeholder="Email" ref={email} />
                        </div>
                        <div className="inputGroup inputPassword">
                            <Lock className='icons' />
                            <input type="password" required name="password" minLength='6' placeholder="Password" ref={password} />
                        </div>
                        <div className="buttonGroup">
                            <button type="submit" className="primary" id="loginBtn" disabled={isFetching}>
                                {isFetching ? <CircularProgress color="white" size="12px" /> : "LogIn"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="loginContainerRight">
                    <img className='rightImg' src="/assets/fastShop.jpg" />
                </div>
                {isError ? <ErrorMsg error={error} /> : null}
            </section>
        </div>
    )
}
