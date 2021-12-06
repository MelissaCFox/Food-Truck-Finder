import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/trucks/${id}?_expand=foodType&_embed=truckLocations&_embed=truckOwners&_embed=userTruckReviews`)
    },
    
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/trucks?_expand=foodType&_embed=truckLocations&_embed=truckOwners&_embed=userTruckReviews`)
    },

    async add(truck) {
        return await fetchIt(`${Settings.remoteURL}/trucks`, "POST", JSON.stringify(truck))
    },

    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/trucks/${id}`, "DELETE")
    },

    async getNeighborhoodWithTruckLocations(neighborhoodId) {
        return await fetchIt(`${Settings.remoteURL}/neighborhoods/${neighborhoodId}?_embed=truckLocations`)
    },

    async getTruckLocationsByDay(dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}&_expand=truck`)
    }
}