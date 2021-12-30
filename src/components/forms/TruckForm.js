import { useState, useEffect } from "react"
import { Button, FormGroup, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter } from "reactstrap"
import CreatableSelect from "react-select/creatable";
import FoodTypeRepository from "../../repositories/FoodTypeRepository"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import TruckFoodTypeRepository from "../../repositories/TruckFoodTypeRepository"
import WebsiteIcon from "../images/WebsiteIcon.png"
import FacebookIcon from "../images/FacebookIcon.png"
import TwitterIcon from "../images/TwitterIcon.png"
import InstagramIcon from "../images/InstagramIcon.png"
import './Form.css';



export const TruckForm = ({ userId, toggle, setTrucks, setUser }) => {
    const [foodTypes, setFoodTypes] = useState([])
    const [truck, setTruck] = useState({
        name: "",
        description: "",
        websiteURL: "",
        instagramURL: "",
        facebookURL: "",
        twitterURL: "",
        profileImgSrc: "",
        hours: "",
        dollars: 1,
        userRating: 0
    })

    const [formCheck, setFormCheck] = useState(false)
    const toggleFormCheck = () => setFormCheck(!formCheck)

    const [userSelectedFoodtypes, setUserSelectedFoodTypes] = useState([])

    useEffect(() => {
        FoodTypeRepository.getAll().then(setFoodTypes)
    }, [])

    const registerTruck = (event) => {
        event.preventDefault()

        if (truck.name && truck.description && truck.profileImgSrc && truck.hours && truck.dollars && userSelectedFoodtypes.length > 0) {
            TruckRepository.add(truck)
                .then((truck) => {
                    const truckOwner = {
                        userId: userId,
                        truckId: truck.id
                    }
                    UserRepository.addTruckOwner(truckOwner)

                    const newFoodTypesArray = []
                    const truckTypesPostArray = []
                    for (const selection of userSelectedFoodtypes) {
                        if (typeof selection.value === "string") {
                            const newFoodTypeObj = {
                                type: selection.value
                            }
                            newFoodTypesArray.push(FoodTypeRepository.add(newFoodTypeObj).then(foodType => {
                                const truckFoodTypeObj = {
                                    truckId: truck.id,
                                    foodTypeId: foodType.id
                                }
                                truckTypesPostArray.push(TruckFoodTypeRepository.add(truckFoodTypeObj))
                            }))
                        } else {
                            const truckFoodTypeObj = {
                                truckId: truck.id,
                                foodTypeId: selection.value
                            }
                            truckTypesPostArray.push(TruckFoodTypeRepository.add(truckFoodTypeObj))
                        }
                    }
                    Promise.all(newFoodTypesArray)
                        .then(Promise.all(truckTypesPostArray))
                        .then(() => {
                            TruckRepository.getAll()
                                .then((trucks) => {
                                    setTrucks(trucks)
                                })
                                .then(() => {
                                    UserRepository.get(userId)
                                        .then((user) => {
                                            setUser(user)
                                            toggle()
                                        })
                                })
                        })
                })
        } else {
            toggleFormCheck()
        }
    }

    return (
        <form autoComplete="on" className="truckForm">
            <InputGroup className="form-group">
                <InputGroupText className="input-label" >Truck Name</InputGroupText>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => {
                        const copy = { ...truck }
                        copy.name = e.target.value
                        setTruck(copy)
                    }}
                    id="truckName"
                    autoComplete="on"
                    placeholder="Name"
                />
            </InputGroup>
            <InputGroup className="form-group">
                <InputGroupText className="input-label" >Description</InputGroupText>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    onChange={e => {
                        const copy = { ...truck }
                        copy.description = e.target.value
                        setTruck(copy)
                    }}
                />
            </InputGroup>

            <InputGroup className="form-group">
                <InputGroupText className="input-label">Profile Image</InputGroupText>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    id="profileImg"
                    placeholder="URL"
                    onChange={e => {
                        const copy = { ...truck }
                        copy.profileImgSrc = e.target.value
                        setTruck(copy)
                    }}
                />
            </InputGroup>
            <InputGroup className="form-group">
                <InputGroupText className="input-label">Typical Hours</InputGroupText>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    id="hours"
                    placeholder="10am-4pm"
                    onChange={e => {
                        const copy = { ...truck }
                        copy.hours = e.target.value
                        setTruck(copy)
                    }}
                />
            </InputGroup>
            <InputGroup className="form-group">
                <InputGroupText className="input-label">Price Range</InputGroupText>
                <select
                    defaultValue=""
                    required
                    name="cost"
                    id="cost"
                    className="form-control"
                    onChange={e => {
                        const copy = { ...truck }
                        copy.dollars = parseInt(e.target.value)
                        setTruck(copy)
                    }}
                >
                    <option value="">$-$$$</option>
                    <option value={1}>$</option>
                    <option value={2}>$$</option>
                    <option value={3}>$$$</option>

                </select>
            </InputGroup>
            <div className="form-group">
                <FormGroup className="input-group">
                    <div className ="input-group-prepend">
                    <label className="input-group-text" for="tagSelect">Food Type(s)</label>
                    </div>
                    <CreatableSelect
                        required
                        isMulti
                        isClerable
                        className="create-select"
                        value={userSelectedFoodtypes}
                        options={foodTypes.map(type => ({ label: type.type, value: type.id }))}
                        id="tagSelect"
                        placeholder="Select food types..."
                        onChange={tagChoices => {
                            setUserSelectedFoodTypes(tagChoices)
                        }}
                    />
                </FormGroup>
            </div>
            

            <div className="social-media-links">
                <div className="sub-heading">Social Media Links (optional)</div>
                <InputGroup className="form-group-links">
                    <InputGroupText className="icon-label"><img alt="web-logo" className="form-link__logo" src={WebsiteIcon} /></InputGroupText>
                    <input
                        type="text"
                        autoFocus
                        className="form-control"
                        id="websiteURL"
                        placeholder="Website URL"
                        onChange={e => {
                            const copy = { ...truck }
                            copy.websiteURL = e.target.value
                            setTruck(copy)
                        }}
                    />
                </InputGroup>
                <InputGroup className="form-group-links">
                <InputGroupText className="icon-label"><img alt="web-logo" className="form-link__logo" src={FacebookIcon} /></InputGroupText>
                    <input
                        type="text"
                        autoFocus
                        className="form-control"
                        id="facebookURL"
                        placeholder="Facebook URL"
                        onChange={e => {
                            const copy = { ...truck }
                            copy.facebookURL = e.target.value
                            setTruck(copy)
                        }}
                    />
                </InputGroup>
                <InputGroup className="form-group-links">
                <InputGroupText className="icon-label"><img alt="web-logo" className="form-link__logo" src={InstagramIcon} /></InputGroupText>
                    <input
                        type="text"
                        autoFocus
                        className="form-control"
                        id="instaURL"
                        placeholder="Instagram URL"
                        onChange={e => {
                            const copy = { ...truck }
                            copy.instagramURL = e.target.value
                            setTruck(copy)
                        }}
                    />
                </InputGroup>
                <InputGroup className="form-group-links">
                <InputGroupText className="icon-label"><img alt="web-logo" className="form-link__logo" src={TwitterIcon} /></InputGroupText>
                    <input
                        type="text"
                        autoFocus
                        className="form-control"
                        id="twitterURL"
                        placeholder="Twitter URL"
                        onChange={e => {
                            const copy = { ...truck }
                            copy.twitterURL = e.target.value
                            setTruck(copy)
                        }}
                    />
                </InputGroup>
            </div>

            <Button type="register"
                color="blue"
                onClick={registerTruck}
                className="btn btn-primary"> Register Truck </Button>

            <Modal isOpen={formCheck} centered fullscreen="sm" size="sm" toggle={toggleFormCheck}>
                <ModalBody>
                    Please Fill Out All Fields
                    <ModalFooter>
                        <Button onClick={toggleFormCheck}>
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal >

        </form>
    )
}