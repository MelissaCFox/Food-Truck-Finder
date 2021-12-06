import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Settings from "../../repositories/Settings";




export const NavBar = () => {
    const [ searchTerms, setTerms ] = useState("")
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const history = useHistory()

    const search = (e) => {
        if (e.keyCode === 13) {
            const terms = document.querySelector("#searchTerms").value
            const foundItems = {
                trucks: [],
                foodTypes: [],
                neighborhoods: []
            }


        }
        else {
            setTerms(e.target.value)
        }
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top onTop">
                
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Food Truck Finder</Link>
                        </li>
                        
                        <li className="nav-item">
                            <input id="searchTerms"
                                onKeyUp={search}
                                className="form-control w-100"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link className="nav-link" to="/profile">Welcome {getCurrentUser().name}</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                        
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link onClick={() => {
                                        logout()
                                    }} className="nav-link" to="/login">Logout {getCurrentUser().name}</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}
