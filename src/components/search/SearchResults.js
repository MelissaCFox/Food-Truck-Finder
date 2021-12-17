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
                        <ul className="trucks search-results">

                            {
                                location.state.trucks.map(truck => <li className="card truck" key={truck.id}><TruckCard key={truck.id} truckId={truck.id} /></li>)
                            }

                        </ul>
                    </div>
                </>
            )
        } else {
            return <div className="card"><ul className="trucks search-results">
            <div className="card noMatch">No Matching Trucks</div>
        </ul></div>
        }
    }

    const displayNeighborhoods = () => {

        if (location.state?.neighborhoods.length > 0) {
            return (
                <>
                    <div className="card">
                        <ul className="trucks search-results">
                            {
                                location.state.neighborhoods.map(neighborhood => <li className="card neighborhood" key={neighborhood.id}><NeighborhoodCard key={neighborhood.id} neighborhoodId={neighborhood.id} /></li>)
                            }
                        </ul>
                    </div>
                </>
            )
        } else {
            return <div className="card"><ul className="trucks search-results">
                <div className="card noMatch">No Matching Neighborhoods</div>
            </ul></div>
        }
    }

    return (
        <div className="searchResults">

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