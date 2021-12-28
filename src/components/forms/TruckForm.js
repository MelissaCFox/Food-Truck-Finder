import { useState, useEffect } from "react"
import { Button, FormGroup, Label, Modal, ModalBody, ModalFooter } from "reactstrap"
import CreatableSelect from "react-select/creatable";
import FoodTypeRepository from "../../repositories/FoodTypeRepository"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import TruckFoodTypeRepository from "../../repositories/TruckFoodTypeRepository"
import WebsiteIcon from "./WebsiteIcon.png"


export const TruckForm = ({ userId, toggle, setTrucks, setUser }) => {
    const [foodTypes, setFoodTypes] = useState([])
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [websiteURL, setWebsiteURL] = useState("")
    const [instagramURL, setInstagramURL] = useState("")
    const [profileImgSrc, setProfileImgSrc] = useState("")
    const [hours, setHours] = useState("")
    const [dollars, setDollars] = useState(0)

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
        const truck = {
            name: name,
            description: description,
            websiteURL: websiteURL,
            instagramURL: instagramURL,
            profileImgSrc: profileImgSrc,
            hours: hours,
            dollars: parseInt(dollars),
            userRating: 0
        }
        if (name && description && websiteURL && instagramURL && profileImgSrc && hours && dollars && userSelectedFoodtypes.length > 0) {
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
                            TruckRepository.getAll().then(setTrucks)
                            UserRepository.get(userId).then(setUser)
                            toggle()
                        })
                })
        } else {
            toggleFormCheck()
        }
    }

    return (
        <form autoComplete="on" className="truckForm">
            <div className="form-group">
                <label htmlFor="truckName">Truck Name</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    id="truckName"
                    autoComplete="on"
                    placeholder="Truck Name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setDescription(e.target.value)}
                    id="description"
                    placeholder="Description"
                />
            </div>
            <div className="form-group">
                <FormGroup>
                    <Label>Food Type(s)</Label>
                    <CreatableSelect
                        required
                        isMulti
                        isClerable
                        value={userSelectedFoodtypes}
                        options={foodTypes.map(type => ({ label: type.type, value: type.id }))}
                        onChange={tagChoices => {
                            setUserSelectedFoodTypes(tagChoices)
                        }}
                        id="tagSelect"
                        placeholder="Select food types..."
                    />
                </FormGroup>
            </div>
            <div className="form-group">
                <label htmlFor="websiteURL"><img alt="web-logo" className="link__logo" src={WebsiteIcon} /></label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setWebsiteURL(e.target.value)}
                    id="websiteURL"
                    placeholder="Website URL"
                />
            </div>
            <div className="form-group">
                <label htmlFor="instaURL">Instagram URL</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setInstagramURL(e.target.value)}
                    id="instaURL"
                    placeholder="Instagram URL"
                />
            </div>
            <div className="form-group">
                <label htmlFor="profileImg">Profile Image URL</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setProfileImgSrc(e.target.value)}
                    id="profileImg"
                    placeholder="Profile Image URL"
                />
            </div>
            <div className="form-group">
                <label htmlFor="hours">Hours</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setHours(e.target.value)}
                    id="hours"
                    placeholder="10am-4pm"
                />
            </div>
            <div className="form-group">
                <label htmlFor="cost">Cost: </label>
                <select
                    defaultValue=""
                    required
                    name="cost"
                    id="cost"
                    onChange={e => setDollars(e.target.value)}
                    className="form-control"
                >
                    <option value="">$-$$$</option>
                    <option value={1}>$</option>
                    <option value={2}>$$</option>
                    <option value={3}>$$$</option>

                </select>
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