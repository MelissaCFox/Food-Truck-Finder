import React from "react"
import { Route } from "react-router-dom"
import { Neighborhood } from "./neighborhoods/Neighborhood"
import { NeighborhoodTruckList } from "./trucks/NeighborhoodTrucks"
import { Truck } from "./trucks/Truck"

export default () => {
    return (
        <>

        <Route exact path = "/trucks">
            <NeighborhoodTruckList />
        </Route>

        <Route path="/trucks/:truckId(\d+)">
            <Truck />
        </Route>

        <Route path="/neighborhoods/:neighborhoodId(\d+)">
            <Neighborhood />
        </Route>
            
            
        </>
    )
}
