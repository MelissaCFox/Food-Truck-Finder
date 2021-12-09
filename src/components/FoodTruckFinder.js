import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import { Register } from "./auth/Register"
import {ApplicationViews} from "./ApplicationViews"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import { NavBar } from "./nav/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'

export const FoodTruckFinder = () => {
    const { isAuthenticated } = useSimpleAuth()

    return <>
        <Route render={() => {
            if (isAuthenticated()) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
}