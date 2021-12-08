import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Card, CardBody, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { Truck } from "../trucks/Truck"
import { TruckForm } from "./TruckForm"
import { Favorites } from "./Favorites"

export const Owner = (props) => {
    const [user, setUser] = useState({})
    const [trucks, setTrucks] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [collapse, setCollapse] = useState(false)
    const toggle2 = () => setCollapse(!collapse)

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [])

    useEffect(() => {
        UserRepository.get(props.userId).then(setUser)
    }, [])

    return (
        <>
            <div className="header">

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
                            <TruckForm userId={props.userId} toggle={toggle} />
                        </ModalBody>
                        <ModalFooter>

                            <Button onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Button color="success" outline onClick={toggle2}>Favorites</Button>
                    <div>
                        <Collapse isOpen={collapse}>
                            <Favorites userId={props.userId} />
                        </Collapse>
                    </div>
                </div>

            </div>

            <div className="owner-trucks">
                <h3>My Truck(s)</h3>
                <div className="truck-list">
                    {
                        user.truckOwners?.map(truckOwner => {
                            const foundTruck = trucks.find(truck => truck.id === truckOwner.truckId)
                            if (foundTruck) {
                                return <li className="card" key={truckOwner.id}>
                                    <Truck key={foundTruck.id} truckId={foundTruck.id} />

                                    <Button type="retire"
                                        color="danger"
                                        value={foundTruck.id}
                                        onClick={e => TruckRepository.delete(e.target.value).then(TruckRepository.getAll().then(setTrucks))}
                                        className="btn btn-primary"> Retire Truck </Button>

                                </li>
                            }
                        })

                    }
                </div>
            </div>
        </>
    )
}