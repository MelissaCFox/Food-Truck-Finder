import React, { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import UserRepository from "../../repositories/UserRepository";




export const NavBar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        UserRepository.get(getCurrentUser().id).then(setCurrentUser)
    },[])


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
                                onKeyUp={() => {}}
                                className="form-control w-100"
                                type="search"
                                placeholder="No Search Feature Yet"
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
