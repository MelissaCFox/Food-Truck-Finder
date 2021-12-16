import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Settings from "../../repositories/Settings";
import UserRepository from "../../repositories/UserRepository";
import FoodTruckFinderLogo from './FoodTruckFinderLogo.png';
import './NavBar.css';




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
                <div id="navbarNavDropdown" className="navbar-collapse collapse header">
                    <ul className="navbar-nav mr-auto appLogo">
                        <button onClick={() => { history.push(`/trucks`) }}>
                            <img src={FoodTruckFinderLogo} alt="Food Truck Finder Logo" id="logo" />
                        </button>
                    </ul>
                    <ul className="navbar-nav profile">
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <div className="name-btn"><button className="nav-link name-btn" onClick={()=>{history.push("/profile")}}><div className="name">Welcome, {currentUser.firstName} {currentUser.lastName}!</div></button></div>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                    </ul>
                    <ul className="navbar-nav search">
                        <li className="nav-item search">
                            <input id="searchTerms"
                                onKeyUp={search}
                                className="form-control w-100"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                        </li>
                    </ul>
                    <ul className="navbar-nav logout">
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <div className="logout-btn"><button className="nav-link logout-btn" onClick={() => {
                                        logout()
                                        history.push("/login")
                                    }}><div className="logout-btn">Logout</div></button></div>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}
