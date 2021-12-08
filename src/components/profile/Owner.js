import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { Truck } from "../trucks/Truck"
import { TruckForm } from "./TruckForm"

export const Owner = (props) => {
    const [user, setUser] = useState({})
    const [trucks, setTrucks] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [])

    useEffect(() => {
        UserRepository.get(props.userId).then(setUser)
    }, [])

    return (
        <>
            <div className="header">

                <div>
                    <Button
                        color="success"
                        outline
                        onClick={toggle}
                    >
                        Register Truck
                    </Button>
                    <Modal
                        isOpen={modal}
                        fullscreen="xl"
                        size="lg"
                        toggle={toggle}
                    >
                        <ModalHeader toggle={toggle}>
                            Register New Truck
                        </ModalHeader>
                        <ModalBody>
                            <TruckForm userId={props.userId}/>
                        </ModalBody>
                        <ModalFooter>

                            <Button onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>


                <Button color="success" outline onClick={() => { }}>Favorites</Button>
            </div>

            <div className="owner-trucks">
                <h3>My Truck(s)</h3>
                <div className="truck-list">
                    {
                        user.truckOwners?.map(truckOwner => {
                            const foundTruck = trucks.find(truck => truck.id === truckOwner.truckId)
                            if (foundTruck) {
                                return <li className="card" key={truckOwner.id}>
                                    <Truck truckId={foundTruck.id} />
                                </li>
                            }
                        })

                    }
                </div>
            </div>
        </>
    )
}