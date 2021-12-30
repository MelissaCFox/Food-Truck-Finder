import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"
import { TruckCard } from "../trucks/TruckCard"


export const SearchResults = () => {
    const location = useLocation()
    const trucks = Array.from(location.state?.trucks)

    const displayTrucks = () => {
        if (trucks.length > 0) {
            return (
                <>
                    <div className="section">
                        <div className="truck-results">

                            {
                                trucks.map(truck => <div className="card truck" key={truck.id}><TruckCard key={truck.id} truckId={truck.id} /></div>)
                            }

                        </div>
                    </div>
                </>
            )
        } else {
            return <div className="truck-results">
            <div className="card noMatch">No Matching Trucks</div>
        </div>
        }
    }

    const displayNeighborhoods = () => {
        if (location.state?.neighborhoods.length > 0) {
            return (
                <>
                    <div className="section">
                        <div className="truck-results">
                            {
                                location.state.neighborhoods.map(neighborhood => <li className="card neighborhood" key={neighborhood.id}><NeighborhoodCard key={neighborhood.id} thisNeighborhood={neighborhood} /></li>)
                            }
                        </div>
                    </div>
                </>
            )
        } else {
            return <div className="truck-results">
                <div className="card noMatch">No Matching Neighborhoods</div>
            </div>
        }
    }

    return (
        <div className="search-results">

            <div>
                <h2 className="search-heading">Matching Trucks</h2>
                <div>{displayTrucks()}</div>
            </div>

            <div>
                <h2 className="search-heading">Matching Neighborhoods</h2>
                <div>{displayNeighborhoods()}</div>
            </div>
        </div>
    )
}