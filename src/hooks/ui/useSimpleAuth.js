import { useHistory } from "react-router-dom"
import Settings from "../../repositories/Settings"
import UserRepository from "../../repositories/UserRepository"


const useSimpleAuth = () => {

    const isAuthenticated = () => localStorage.getItem("ftf__token") !== null
        || sessionStorage.getItem("ftf__token") !== null

    const register = (user) => {
        return fetch(`${Settings.remoteURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(_ => _.json())
        .then(response => {
            if ("token" in response) {
                localStorage.setItem("ftf__token", response.token)
                localStorage.setItem('userId', response.user_id)
            }
        })
    }

    // const login = (email) => {
    //     return fetch(`${Settings.remoteURL}/users?email=${email}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then(_ => _.json())
    //     .then(matchingUsers => {
    //         if (matchingUsers.length > 0) {
    //             const baseUserObject = JSON.stringify(matchingUsers[0])
    //             let encoded = Buffer.from(baseUserObject).toString("base64")
    //             localStorage.setItem("truck__token", encoded)
    //             return true
    //         }
    //         return false
    //     })
    // }

    const login = (user) => {
        return fetch(`${Settings.remoteURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        .then(res => res.json())
        
    }

    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("ftf__token")
        sessionStorage.removeItem("ftf__token")
        localStorage.removeItem("ftf__token")
        sessionStorage.removeItem("ftf__token")
    }

    const getCurrentUser = () => {
        const userId = localStorage.getItem("userId")
        // const unencoded = Buffer.from(encoded, "base64").toString("utf8")
        // const parsed = JSON.parse(unencoded)
        // const bare = Object.assign(Object.create(null), parsed)
        // return bare
        return UserRepository.get(userId)
        .then(res => {
            const user = {
                id: res.user.id,
                firstName: res.user.first_name,
                lastName: res.user.last_name,
                email: res.user.email,
                owner: res.owner,
                favorites: res.favorites,
                reviews: res.reviews,
                trucks: res.trucks
            }
            return user
        })
    }

    return { isAuthenticated, logout, login, register, getCurrentUser }
}

export default useSimpleAuth
