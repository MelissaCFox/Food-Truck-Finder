import { useState, useEffect } from "react"
import { Button } from "reactstrap"
import FoodTypeRepository from "../../repositories/FoodTypeRepository"


export const TruckForm = (props) => {
    const [foodTypes, setFoodTypes] = useState([])

    useEffect(() => {
        FoodTypeRepository.getAll().then(setFoodTypes)
    }, [])

    return (
        <>
            Register a New Truck For User # {props.userId}


            <form className="truckForm">

                <div className="form-group">
                    <label htmlFor="truckName">Truck Name</label>
                    <input
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        onChange={() => { }}
                        id="truckName"
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
                        onChange={() => { }}
                        id="description"
                        placeholder="Description"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="foodType">Food Type</label>
                    <select
                        defaultValue=""
                        name="foodType"
                        id="foodTypeId"
                        onChange={() => { }}
                        className="form-control"
                    >
                        <option value="">Select a Food Type</option>
                        {
                            foodTypes.map(type => {
                                return <option key={type.id} id={type.id} value={type.id}>{type.type}</option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="websiteURL">Website URL</label>
                    <input
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        onChange={() => { }}
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
                        onChange={() => { }}
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
                        onChange={() => { }}
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
                        onChange={() => { }}
                        id="hours"
                        placeholder="10am-4pm"
                    />
                </div>

                <Button type="register"
                    color="success"
                    onClick={() => { }}
                    className="btn btn-primary"> Register Truck </Button>
            </form>


        </>

    )
}