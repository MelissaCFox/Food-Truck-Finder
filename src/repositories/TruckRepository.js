import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const TruckRepository = {

    async getBasic(id) {
        return await fetchIt(`${Settings.remoteURL}/trucks/${id}`)
    },

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/trucks/${id}?_embed=truckLocations&_embed=truckOwners&_embed=userTruckReviews&_embed=truckFoodTypes`)
    },
    
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/trucks?_embed=truckLocations&_embed=truckOwners&_embed=userTruckReviews`)
    },

    async add(truck) {
        return await fetchIt(`${Settings.remoteURL}/trucks`, "POST", JSON.stringify(truck))
    },

    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/trucks/${id}`, "DELETE")
    },

    async update(truckId, newTruckObj) {
        return await fetchIt(`${Settings.remoteURL}/trucks/${truckId}`, "PUT", JSON.stringify(newTruckObj))
    }

}

export default TruckRepository