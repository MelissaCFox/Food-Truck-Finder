import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}?_embed=truckOwners&_embed=userTruckFavorites&_embed=userTruckReviews`)
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users?_embed=truckOwners&_embed=userTruckFavorites&_embed=userTruckReviews`)
    },

    async addTruckOwner(truckOwner) {
        return await fetchIt(`${Settings.remoteURL}/truckOwners`, "POST", JSON.stringify(truckOwner))
    }



}