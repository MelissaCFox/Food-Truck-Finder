import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { Truck } from "../trucks/Truck"
import { TruckForm } from "../forms/TruckForm"
import { Favorites } from "./Favorites"
import { Suggestions } from "./Suggestions"
import SuggestionRepository from "../../repositories/SuggestionsRepository"

export const Owner = ({ userId }) => {
    const [user, setUser] = useState({})
    const [trucks, setTrucks] = useState([])

    const [register, setRegister] = useState(false)
    const toggleRegister = () => setRegister(!register)
    const [collapse, setCollapse] = useState(false)
    const toggleCollapse = () => setCollapse(!collapse)
    const [suggestions, setSuggestions] = useState(false)
    const toggleSuggestions = () => setSuggestions(!suggestions)

    const [newUnreadSuggestions, setUnreadSuggestions] = useState([])
    const [readStateChange, setReadStateChange] = useState(false)
    const updateReadStateChange = () => setReadStateChange(!readStateChange)

    useEffect(() => {
        TruckRepository.getAll()
            .then((trucks) => {
                const truckFetchArray = []
                const allTruckSuggestions = []
                const ownedTrucks = trucks.filter((truck) => {
                    const foundOwner = truck.truckOwners.find(owner => owner.userId === userId)
                    if (foundOwner) {
                        return truck
                    } else return false
                })
                for (const truckObj of ownedTrucks) {

                    truckFetchArray.push(SuggestionRepository.getAllUnreadForTruck(truckObj.id).then((response) => {
                        response.forEach(suggestion => {
                            allTruckSuggestions.push(suggestion)
                        });
                    }))
                }
                Promise.all(truckFetchArray)
                    .then(() => {
                        setUnreadSuggestions(allTruckSuggestions)
                    })
            })
    }, [readStateChange, userId])

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [user])


    useEffect(() => {
        UserRepository.get(userId).then(setUser)

    }, [userId])

    return (
        <>
            <div className="owner-header">

                <div className="buttons">
                    <Button className="owner-buttons" color="success" outline onClick={toggleRegister} > Register Truck </Button>
                    <Modal isOpen={register} fullscreen="lg" size="lg" toggle={toggleRegister}>
                        <ModalHeader toggle={toggleRegister}>
                            Register New Truck
                        </ModalHeader>
                        <ModalBody>
                            <TruckForm userId={userId} toggle={toggleRegister} setTrucks={setTrucks} setUser={setUser} />
                        </ModalBody>
                        <ModalFooter> <Button onClick={toggleRegister}> Cancel </Button>
                        </ModalFooter>
                    </Modal>

                    <Button color="success" className="owner-buttons" outline onClick={() => {
                        if (suggestions) {
                            toggleSuggestions()
                        }
                        toggleCollapse()
                    }}>Favorites</Button>

                    <Button
                        className="owner-buttons"
                        color="success"
                        outline
                        onClick={() => {
                            if (collapse) {
                                toggleCollapse()
                            }
                            toggleSuggestions()
                        }}>
                        Suggestions
                        {
                            newUnreadSuggestions?.length > 0
                                ? <div>({newUnreadSuggestions.length} New)</div>
                                : ""
                        }
                    </Button>
                </div>

                <div>
                    <Collapse  isOpen={collapse}>
                        <ul className="favorites card">
                            <div className="profile-container"><Favorites userId={userId} /></div>
                        </ul>
                    </Collapse>

                    <Collapse  isOpen={suggestions}>
                        <ul className="suggestions">
                            <div className="suggestion--messages"><Suggestions key={readStateChange} updateReadStateChange={updateReadStateChange} /></div>
                        </ul>
                    </Collapse>
                </div>
            </div>

            <div className="owner-trucks">
                <ul className="truck-list">
                    {
                        user.truckOwners?.map(truckOwner => {
                            let foundTruck = trucks?.find(truck => truck.id === truckOwner.truckId)
                            if (foundTruck) {
                                return <li key={truckOwner.id}>
                                    <Truck key={foundTruck.id} truckID={foundTruck.id} setTrucks={setTrucks} setUser={setUser} userId={userId} updateReadStateChange={updateReadStateChange} />

                                </li>
                            } else return false
                        })
                    }
                </ul>
            </div>
        </>
    )
}