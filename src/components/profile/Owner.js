import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { Truck } from "../trucks/Truck"
import { TruckForm } from "./TruckForm"
import { Favorites } from "./Favorites"
import { Messages } from "./Messages"

export const Owner = ({ userId }) => {
    const [user, setUser] = useState({})
    const [trucks, setTrucks] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [collapse, setCollapse] = useState(false)
    const toggle2 = () => setCollapse(!collapse)
    const [suggestions, setSuggestions] = useState(false)
    const toggleSuggestions = () => setSuggestions(!suggestions)

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
                    <Button
                        color="success"
                        outline
                        onClick={toggle}
                    >
                        Register Truck
                    </Button>
                    <Modal
                        isOpen={modal}
                        fullscreen="lg"
                        size="lg"
                        toggle={toggle}
                    >
                        <ModalHeader toggle={toggle}>
                            Register New Truck
                        </ModalHeader>
                        <ModalBody>
                            <TruckForm userId={userId} toggle={toggle} setTrucks={setTrucks} setUser={setUser} />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Button color="success" outline onClick={()=> {
                        if (suggestions) {
                            toggleSuggestions()
                        }
                        toggle2()
                    }}>Favorites</Button>

                    <Button
                    color="success"
                    outline
                    onClick={()=>{
                        if (collapse) {
                            toggle2()
                        }
                        toggleSuggestions()
                    }}>
                        Suggestions
                    </Button>

                </div>
                <div>
                    <Collapse animation="false" isOpen={collapse}>
                        <ul className="favorites card">

                            <div className="profile-container"><Favorites userId={userId} /></div>
                        </ul>
                    </Collapse>

                    <Collapse animation="false" isOpen={suggestions}>
                        <ul className="suggestions">

                            <div className="suggestion--messages"><Messages /></div>
                        </ul>
                    </Collapse>

                </div>


            </div>

            <div className="owner-trucks">
                <ul className="truck-list">
                    {
                        user.truckOwners?.map(truckOwner => {
                            let foundTruck = trucks?.find(truck => truck.id === truckOwner.truckId)
                            return <li key={truckOwner.id}>
                                <Truck key={foundTruck?.id} truckID={foundTruck?.id} setTrucks={setTrucks} setUser={setUser} userId={userId} />

                            </li>
                        })
                    }

                </ul>
            </div>
        </>
    )
}