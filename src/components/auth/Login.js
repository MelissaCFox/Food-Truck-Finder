import React, { useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link, useHistory } from "react-router-dom";
import FTFLogoLogin from '../images/FTFLogoLogin.png';
import "./Login.css"


const Login = () => {
    const [credentials, syncAuth] = useState({
        email: "",
        remember: false
    })
    const { login } = useSimpleAuth()
    const history = useHistory()

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()
        const storage = credentials.remember ? localStorage : sessionStorage

        /*
            For now, just store the email and userName that
            the customer enters into local storage.
        */
        console.log("*** Initiate authentication ***")
        login(credentials.email, credentials.userName, storage)
            .then(success => {
                if (success) {
                    console.log("*** Rerouting to root URL ***")
                    history.push("/")
                } else {
                    window.alert("Please log in with existing credentials or register as a new user.")
                }
            })
    }

    const handleUserInput = (event) => {
        const copy = { ...credentials }
        copy[event.target.id] = event.target.value
        syncAuth(copy)
    }

    return (
        <main className="container--login">
            <section className="form-container">
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="h3 mb-3 font-weight-normal">Please Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email Address </label>
                        <input type="email" onChange={handleUserInput}
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input
                            onChange={
                                (event) => {
                                    const copy = { ...credentials }
                                    if (event.target.value === "on") {
                                        copy.remember = true
                                    }
                                    else {
                                        copy.remember = false
                                    }
                                    syncAuth(copy)
                                }
                            }
                            defaultChecked={credentials.remember}
                            type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember"> Remember Me </label>
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <section className="link--register">
                    <Link className="link--register" to="/register">Not a member yet?</Link>
                </section>
            </section>

            <section className="appLogo">
            <img src={FTFLogoLogin} alt="Food Truck Finder Logo" id="login-logo" />
            </section>

        </main>
    )
}
export default Login
