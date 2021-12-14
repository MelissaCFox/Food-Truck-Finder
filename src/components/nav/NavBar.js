import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Settings from "../../repositories/Settings";
import UserRepository from "../../repositories/UserRepository";




export const NavBar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory()

    useEffect(() => {
        UserRepository.get(getCurrentUser().id).then(setCurrentUser)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const search = () => {
        
            const terms = document.querySelector("#searchTerms").value
            const foundItems = {
                trucks: [],
                neighborhoods: []
            }

            fetch(`${Settings.remoteURL}/trucks?name_like=${encodeURI(terms)}`)
                .then(r => r.json())
                .then(trucks => {
                    foundItems.trucks = trucks
                    return fetch(`${Settings.remoteURL}/neighborhoods?name_like=${encodeURI(terms)}`)
                })
                .then(r => r.json())
                .then(neighborhoods => {
                    foundItems.neighborhoods = neighborhoods
                    history.push({
                        pathname: "/search",
                        state: foundItems
                    })
                })
        
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top onTop">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/trucks">Food Truck Finder</Link>
                        </li>

                        <li className="nav-item">
                            <input id="searchTerms"
                                onKeyUp={search}
                                className="form-control w-100"
                                type="search"
                                placeholder=""
                                aria-label="Search" />
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link className="nav-link" to="/profile">Welcome, {currentUser.firstName} {currentUser.lastName}!</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>

                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link onClick={() => {
                                        logout()
                                    }} className="nav-link" to="/login">Logout</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}
