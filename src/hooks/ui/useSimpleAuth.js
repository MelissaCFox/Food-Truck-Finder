import Settings from "../../repositories/Settings"


const useSimpleAuth = () => {

    const isAuthenticated = () => localStorage.getItem("kennel_token") !== null
        || sessionStorage.getItem("kennel_token") !== null

    const register = (user) => {
        return fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(_ => _.json())
        .then(response => {
            if ("id" in response) {
                const baseUserObject = JSON.stringify(response)
                let encoded = Buffer.from(baseUserObject).toString("base64")
                localStorage.setItem("kennel_token", encoded)
            }
        })
    }

    const login = (email) => {
        return fetch(`${Settings.remoteURL}/users?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(_ => _.json())
        .then(matchingUsers => {
            if (matchingUsers.length > 0) {
                const baseUserObject = JSON.stringify(matchingUsers[0])
                let encoded = Buffer.from(baseUserObject).toString("base64")
                localStorage.setItem("kennel_token", encoded)
                return true
            }
            return false
        })
    }

    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("kennel_token")
        sessionStorage.removeItem("kennel_token")
    }

    const getCurrentUser = () => {
        const encoded = localStorage.getItem("kennel_token")
        const unencoded = Buffer.from(encoded, "base64").toString("utf8")
        const parsed = JSON.parse(unencoded)
        const bare = Object.assign(Object.create(null), parsed)
        return bare
    }

    return { isAuthenticated, logout, login, register, getCurrentUser }
}

export default useSimpleAuth
