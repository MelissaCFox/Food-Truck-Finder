import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async getAllForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews?truckId=${truckId}`)
    },
    
    async getAllForUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews?userId=${userId}`)
    },

    async add(reviewObj) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews`, "POST", JSON.stringify(reviewObj))
    },

}