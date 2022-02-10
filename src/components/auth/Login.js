import React, { useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link, useHistory } from "react-router-dom";
import FTFLogoLogin from '../images/FTFLogoLogin.png';
import "./Login.css"


const Login = () => {
    const [credentials, syncAuth] = useState({
        username: "",
        password: "",
        remember: false
    })
    const { login } = useSimpleAuth()
    const history = useHistory()
    const invalidDialog = useRef()

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()

        console.log("*** Initiate authentication ***")
        // login(credentials.password, credentials.username, storage)
        // .then(success => {
        //     if (success) {
        //         console.log("*** Rerouting to root URL ***")
        //         history.push("/")
        //     } else {
        //         window.alert("Please log in with existing credentials or register as a new user.")
        //     }
        // })
        login(credentials)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("ftf__token", res.token)
                    localStorage.setItem("userId", res.user_id)
                    // localStorage.setItem("userId", res.userId)
                    console.log("*** Authenticated! ***")
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
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
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className="form-container">
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="h3 mb-3 font-weight-normal">Please Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input type="username" onChange={handleUserInput}
                            id="username"
                            className="form-control"
                            placeholder="username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password" onChange={handleUserInput}
                            id="password"
                            className="form-control"
                            placeholder="Password"
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
