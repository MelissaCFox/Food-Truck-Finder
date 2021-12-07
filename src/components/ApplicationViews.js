import React from "react"
import { Route } from "react-router-dom"
import { NeighborhoodTruckList } from "./trucks/NeighborhoodTrucks"
import { TruckList } from "./trucks/TruckList"

export default () => {
    return (
        <>
            <NeighborhoodTruckList />
            <TruckList />
        </>
    )
}
