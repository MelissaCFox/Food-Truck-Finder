import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async getTruckLocationsByDay(dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}&_expand=truck`)
    },

    async getTruckLocationsByTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?truckId=${truckId}&_expand=truck&_expand=day&_expand=neighborhood&_sort=dayId`)
    },

    async getTruckLocationsByNeighborhood(neighborhoodId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async getTruckLocationsByNeighborhoodAndDay(neighborhoodId, dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&dayId=${dayId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async add(truckLocation) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations`, "POST", JSON.stringify(truckLocation))
    },

    async update(truckLocationId, newTruckLocationObj) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations/${truckLocationId}`, "PUT", JSON.stringify(newTruckLocationObj))
    }
}