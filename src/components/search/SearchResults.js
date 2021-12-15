import react from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"
import { TruckCard } from "../trucks/TruckCard"


export const SearchResults = () => {
    const location = useLocation()

    const displayTrucks = () => {

        if (location.state?.trucks.length > 0) {
            return (
                <>
                    <div className="card">
                        <div>
                            {
                                location.state.trucks.map(truck => <TruckCard key={truck.id} truckId={truck.id} />)
                            }
                        </div>
                    </div>
                </>
            )
        } else {
            return <div>No Matching Trucks</div>
        }
    }

    const displayNeighborhoods = () => {

        if (location.state?.neighborhoods.length > 0) {
            return (
                <>
                    <div className="card">
                        <div>
                            {
                                location.state.neighborhoods.map(neighborhood => <NeighborhoodCard key={neighborhood.id} neighborhoodId={neighborhood.id} />)
                            }
                        </div>
                    </div>
                </>
            )
        } else {
            return <div>No Matching Neighborhoods</div>
        }
    }

    return (
        <div className="searchResults">

            <div>
                <h2>Matching Trucks</h2>
                <div>{displayTrucks()}</div>
            </div>

            <div>
                <h2>Matching Neighborhoods</h2>
                <div>{displayNeighborhoods()}</div>
            </div>
        </div>
    )
}