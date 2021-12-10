import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"


export const TruckSchedule = ({ dayId, truckId, truckPage, createNewLocationId, neighborhoods }) => {

    const [truckNeighborhoods, setTruckNeighborhoods] = useState([])
    const [truckNeighborhood, setTruckNeighborhood] = useState({})

    useEffect(() => {
        if (truckId) {
            TruckLocationRepository.getTruckLocationsByTruckAndDay(truckId, dayId).then(setTruckNeighborhoods)
        }
    }, [])

    useEffect(() => {
        if (truckNeighborhoods && neighborhoods) {
            const foundNeighborhood = neighborhoods?.find(neighborhood => neighborhood.id === truckNeighborhoods[0]?.neighborhoodId)
            setTruckNeighborhood(foundNeighborhood)
        }
    }, [truckNeighborhoods, neighborhoods])



    return (
        <>
            {
                truckId
                    ? truckPage
                        ? truckNeighborhood
                            ? <NeighborhoodCard key={truckNeighborhood.id} neighborhoodId={truckNeighborhood.id} />
                            : <div className="card card-body">Off Today</div>


                        : truckNeighborhood
                            ? (
                                <>
                                    <div>{truckNeighborhood.name}</div>
                                    <NeighborhoodCard key={`Profile--${truckId}--${dayId}--${truckNeighborhood?.id}`} neighborhoodId={truckNeighborhood.id} />
                                    <div className="form-group">
                                        <select
                                            key={truckNeighborhood.id}
                                            defaultValue=""
                                            name="location"
                                            id="locationId"
                                            onChange={e => createNewLocationId(truckId, e.target.value, dayId)}
                                            className="form-control"
                                        >
                                            <option value="">--Change Location--</option>
                                            {
                                                neighborhoods.map(neighborhood => {
                                                    return <option key={`neighborhood--${dayId}--${neighborhood.id}`} id={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </>
                            )

                            : <><div className="card card-body">Off Today</div>
                                <div className="form-group">
                                    <select
                                        key={dayId}
                                        defaultValue=""
                                        name="location"
                                        id="locationId"
                                        onChange={e => createNewLocationId(truckId, e.target.value, dayId)}
                                        className="form-control"
                                    >
                                        <option value="">--Change Location--</option>
                                        {
                                            neighborhoods.map(neighborhood => {
                                                return <option key={neighborhood.id} id={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                            })
                                        }
                                    </select>
                                </div></>

                    : ""
            }
        </>
    )
}


