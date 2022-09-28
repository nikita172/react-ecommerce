import React, { useRef, useState } from 'react'
import { CircularProgress } from "@material-ui/core"
import { AlternateEmail, Lock } from '@material-ui/icons';
import axios from "axios";
import "./login.css"
import ErrorMsg from '../../components/errorMsg/ErrorMsg';
import { Link } from "react-router-dom"
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
            const res = await axios.post("/admin/login", user)
            console.log(res)
            if (!res.data.status) {
                setIsError(true)
                setTimeout(() => {
                    setIsError(false)
                }, 2000)
            }
            else {
                const info = [res.data.token, res.data.user.email]
                localStorage.setItem('user', JSON.stringify(info))
                window.location.reload(true);

            }
            setError(res.data.message)
        }
        catch (err) {
            console.log(err)
        }
        setIsFetching(false)
    }
    return (
        <section id="loginContainer">
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
                    <button type="submit" className="primary" id="loginBtn">
                        {isFetching ? <CircularProgress color="white" size="12px" /> : "LogIn"}
                    </button>
                    <Link to="/register" style={{ textDecoration: "none" }} >
                        <button className="secondary" id="navigate-signup" type="button">Sign Up</button>
                    </Link>




                </div>
            </form>
            {isError ? <ErrorMsg error={error} /> : null}
        </section>
    )
}
