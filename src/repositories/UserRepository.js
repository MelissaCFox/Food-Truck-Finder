import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const UserRepository = {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`)
        // return await fetchIt(`${Settings.remoteURL}/users/${id}?_embed=truckOwners&_embed=userTruckFavorites&_embed=userTruckReviews`)
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users`)
        // return await fetchIt(`${Settings.remoteURL}/users?_embed=truckOwners&_embed=userTruckFavorites&_embed=userTruckReviews`)
    },

    async addTruckOwner(truckOwner) {
        return await fetchIt(`${Settings.remoteURL}/truckOwners`, "POST", JSON.stringify(truckOwner))
    },

    async getAllTruckOwners() {
        return await fetchIt(`${Settings.remoteURL}/truckOwners`)
    }


}

export default UserRepository