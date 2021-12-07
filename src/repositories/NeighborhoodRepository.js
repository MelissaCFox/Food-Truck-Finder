import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/neighborhoods?_embed=truckLocations`)
    },


    async getNeighborhoodWithTruckLocations(neighborhoodId) {
        return await fetchIt(`${Settings.remoteURL}/neighborhoods/${neighborhoodId}?_embed=truckLocations`)
    }
}