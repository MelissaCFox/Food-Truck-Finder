import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const TruckLocationRepository = {

    async getTruckLocationsByDay(dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}`)
        // return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}&_expand=truck`)
    },

    async getTruckLocationsByTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?truckId=${truckId}`)
        // return await fetchIt(`${Settings.remoteURL}/truckLocations?truckId=${truckId}&_expand=truck&_expand=day&_expand=neighborhood&_sort=dayId`)
    },

    async getTruckLocationsByTruckAndDay(truckId, dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}&truckId=${truckId}`)
        // return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}&truckId=${truckId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async getTruckLocationsByNeighborhood(neighborhoodId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}`)
        // return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async getTruckLocationsByNeighborhoodAndDay(neighborhoodId, dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&dayId=${dayId}`)
        // return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&dayId=${dayId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async add(truckLocation) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations`, "POST", JSON.stringify(truckLocation))
    },

    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations/${id}`, "DELETE")
    },

    async update(truckLocationId, newTruckLocationObj) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations/${truckLocationId}`, "PUT", JSON.stringify(newTruckLocationObj))
    },

    async getAllDays() {
        return await fetchIt(`${Settings.remoteURL}/days`)
    }
}

export default TruckLocationRepository