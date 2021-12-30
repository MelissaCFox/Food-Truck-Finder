import React from "react"
import { Route } from "react-router-dom"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import { Neighborhood } from "./neighborhoods/Neighborhood"
import { Profile } from "./profile/Profile"
import { TruckReviewList } from "./reviews/TruckReviewList"
import { SearchResults } from "./search/SearchResults"
import { NeighborhoodTruckList } from "./trucks/NeighborhoodTrucks"
import { Truck } from "./trucks/Truck"

export const ApplicationViews = () => {
    const {getCurrentUser} = useSimpleAuth()
    
    return (
        <>

        <Route exact path="/" render={() => {
            if (getCurrentUser().owner) {
                return <Profile />
            } else {
                return <NeighborhoodTruckList />
            }
        }} />

        <Route exact path = "/trucks">
            <NeighborhoodTruckList />
        </Route>

        <Route path="/trucks/:truckId(\d+)">
            <Truck />
        </Route>

        <Route exact path = "/reviews/:truckId(\d+)">
            <TruckReviewList />
        </Route>

        <Route path="/neighborhoods/:neighborhoodId(\d+)">
            <Neighborhood />
        </Route>

        <Route path="/profile">
            <Profile />
        </Route>

        <Route path="/search">
            <SearchResults />
        </Route>
            
            
        </>
    )
}
