import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { Truck } from "../trucks/Truck"
import { TruckForm } from "./TruckForm"
import { Favorites } from "./Favorites"

export const Owner = ({ userId }) => {
    const [user, setUser] = useState({})
    const [trucks, setTrucks] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [collapse, setCollapse] = useState(false)
    const toggle2 = () => setCollapse(!collapse)
    const [confirm, setConfirm] = useState(false)
    const toggle3 = () => setConfirm(!confirm)
    const [truckToRetire, setTruckToRetire] = useState({})

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [user])


    useEffect(() => {
        UserRepository.get(userId).then(setUser)
    }, [userId])

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
                            <TruckForm userId={userId} toggle={toggle} setTrucks={setTrucks} setUser={setUser} />
                        </ModalBody>
                        <ModalFooter>

                            <Button onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Button color="success" outline onClick={toggle2}>Favorites</Button>
                    <div>
                        <Collapse animation="false" isOpen={collapse}>
                            <Favorites userId={userId} />
                        </Collapse>
                    </div>
                </div>

            </div>

            <div className="owner-trucks">
                <h3>My Truck(s)</h3>
                <div className="truck-list">
                    {
                        user.truckOwners?.map(truckOwner => {
                            let foundTruck = trucks?.find(truck => truck.id === truckOwner.truckId)

                            return <li className="card" key={truckOwner.id}>
                                <Truck key={foundTruck?.id} truckID={foundTruck?.id} />

                                <Button type="retire"
                                    color="danger"
                                    value={foundTruck?.id}
                                    onClick={() => {
                                        setTruckToRetire(foundTruck)
                                        toggle3()
                                    }}
                                    className="btn btn-primary"> Retire Truck </Button>


                            </li>

                        })

                    }
                    <Modal
                        isOpen={confirm}
                        centered
                        fullscreen="sm"
                        size="sm"
                        toggle={toggle}
                    >
                        <ModalHeader toggle={toggle3}>
                            Are You Sure You Want to Retire {truckToRetire.name}?
                        </ModalHeader>
                        <ModalBody>
                            <Button color="danger" onClick={() => {
                                TruckRepository.delete(truckToRetire.id).then(() => {
                                    UserRepository.get(userId).then(setUser)
                                        .then(toggle3)
                                })
                            }}>
                                Yes
                            </Button>
                            <Button onClick={toggle3}>
                                Cancel
                            </Button>
                        </ModalBody>

                    </Modal>
                </div>
            </div>
        </>
    )
}