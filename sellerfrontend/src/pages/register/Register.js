import React, { useRef, useState } from 'react'
import { CircularProgress } from "@material-ui/core"
import { AlternateEmail, Lock, Person, PeopleAlt, LockOpen } from '@material-ui/icons';
import axios from "axios";
import "./register.css"
import ErrorMsg from '../../components/errorMsg/ErrorMsg';
import { Link } from "react-router-dom"
export default function Register() {

    const email = useRef();
    const username = useRef();
    const brandName = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false)

    const handleClick = async (e) => {
        setIsFetching(true)
        e.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("passwords do not match! ")
        }
        else {
            const user = {
                userName: username.current.value,
                email: email.current.value,
                password: password.current.value,
                brandName: brandName.current.value,
            }
            try {
                const res = await axios.post("/admin/signup", user)
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
        }
        setIsFetching(false)
    }
    return (
        <section className="loginContainer">
            <div className="loginWrapper">
                <form id="loginForm" onSubmit={handleClick}>
                    <h2 className='loginHeading'>Register</h2>
                    <div className="inputGroup inputUserName">
                        <Person className='icons' />
                        <input type="text" name="username" required placeholder="Username" ref={username} />
                    </div>
                    <div className="inputGroup inputbrandName">
                        <PeopleAlt className='icons' />
                        <input type="text" name="brandName" required placeholder="Brand Name" ref={brandName} />
                    </div>
                    <div className="inputGroup inputEmail">
                        <AlternateEmail className='icons' />
                        <input type="email" name="email" required placeholder="Email" ref={email} />
                    </div>

                    <div className="inputGroup inputPassword">
                        <Lock className='icons' />
                        <input type="password" required name="password" placeholder="Password" ref={password} minLength='6' />
                    </div>
                    <div className="inputGroup inputConfirmPassword">
                        <LockOpen className='icons' />
                        <input type="password" required name="confirmPassword" placeholder="Confirm Password" ref={confirmPassword} />
                    </div>
                    <div className="buttonGroup">
                        <button type="submit" className="primary" id="loginBtn">
                            {isFetching ? <CircularProgress color="white" size="12px" /> : "Create a New Account"}
                        </button>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <button className="secondary" id="navigate-signup" type="button">LogIn</button>
                        </Link>



                    </div>
                </form>
            </div >
            {isError ? <ErrorMsg error={error} /> : null
            }



        </section >
    )
}
