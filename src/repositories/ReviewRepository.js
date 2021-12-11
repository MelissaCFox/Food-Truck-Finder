import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const ReviewRepository = {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${id}?_expand=truck&_expand=user`)
    },
    
    async getAllForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews?truckId=${truckId}&_expand=truck&_expand=user`)
    },
    
    async getAllForUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews?userId=${userId}&_expand=user&_expand=truck`)
    },

    async add(reviewObj) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews`, "POST", JSON.stringify(reviewObj))
    },

    async delete(reviewId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${reviewId}`, "DELETE")
    }

}

export default ReviewRepository