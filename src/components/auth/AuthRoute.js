import React from "react"
import { Route, Redirect } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const AuthRoute = ({ path, component: TargetComponent }) => {
    const { isAuthenticated } = useSimpleAuth()

    return (
        <Route exact path={path} render={props => {
            if (isAuthenticated()) {
                return <TargetComponent {...props} />
            } else {
                return <Redirect to="/login" />
            }
        }} />
    )
}

export default AuthRoute
