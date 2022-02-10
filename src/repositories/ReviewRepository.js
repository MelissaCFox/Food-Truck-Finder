import Settings from "./Settings";
import { fetchIt } from "./Fetch";
import TruckRepository from "./TruckRepository";

const ReviewRepository = {

    async getBasic(id) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${id}`)
    },

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${id}`)
        // return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${id}?_expand=truck&_expand=user`)
    },

    async getAllForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews?truckId=${truckId}`)
        // return await fetchIt(`${Settings.remoteURL}/userTruckReviews?truckId=${truckId}&_expand=truck&_expand=user`)
    },

    async getAllForUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews?userId=${userId}`)
        // return await fetchIt(`${Settings.remoteURL}/userTruckReviews?userId=${userId}&_expand=user&_expand=truck`)
    },

    async add(reviewObj) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews`, "POST", JSON.stringify(reviewObj))
    },

    async delete(reviewId) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${reviewId}`, "DELETE")
    },

    async update(reviewId, newReviewObj) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${reviewId}`, "PUT", JSON.stringify(newReviewObj))
    },


    async addAndUpdate(reviewObj) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews`, "POST", JSON.stringify(reviewObj))
            .then((r) => {
                TruckRepository.get(r.truckId)
                    .then((bigTruck) => {
                        let totalRating = 0
                        let averageRating = 0
                        if (bigTruck.userTruckReviews.length > 0) {
                            for (const review of bigTruck.userTruckReviews) {
                                totalRating += review.rating
                            }
                            averageRating = totalRating / bigTruck.userTruckReviews.length

                            const updatedTruck = {
                                id: bigTruck.id,
                                name: bigTruck.name,
                                foodTypeId: bigTruck.foodTypeId,
                                description: bigTruck.description,
                                websiteURL: bigTruck.websiteURL,
                                instagramURL: bigTruck.instagramURL,
                                profileImgSrc: bigTruck.profileImgSrc,
                                hours: bigTruck.hours,
                                dollars: bigTruck.dollars,
                                userRating: averageRating
                            }
                            TruckRepository.update(bigTruck.id, updatedTruck)
                        }
                    })
            })
    },

    async deleteAndUpdate(review) {
        return await fetchIt(`${Settings.remoteURL}/userTruckReviews/${review.id}`, "DELETE")
            .then(() => {
                TruckRepository.get(review.truckId)
                    .then((bigTruck) => {
                        let totalRating = 0
                        let averageRating = 0
                        if (bigTruck.userTruckReviews.length > 0) {
                            for (const review of bigTruck.userTruckReviews) {
                                totalRating += review.rating
                            }
                            averageRating = totalRating / bigTruck.userTruckReviews.length
                        } else {
                            averageRating = 0
                        }
                        const updatedTruck = {
                            id: bigTruck.id,
                            name: bigTruck.name,
                            foodTypeId: bigTruck.foodTypeId,
                            description: bigTruck.description,
                            websiteURL: bigTruck.websiteURL,
                            instagramURL: bigTruck.instagramURL,
                            profileImgSrc: bigTruck.profileImgSrc,
                            hours: bigTruck.hours,
                            dollars: bigTruck.dollars,
                            userRating: averageRating
                        }
                        TruckRepository.update(bigTruck.id, updatedTruck)

                    })
            })
    },
}

export default ReviewRepository