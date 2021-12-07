import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async getTruckLocationsByDay(dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?dayId=${dayId}&_expand=truck`)
    },

    async getTruckLocationsByTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?truckId=${truckId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async getTruckLocationsByNeighborhood(neighborhoodId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&_expand=truck&_expand=day&_expand=neighborhood`)
    },

    async getTodaysTruckLocationsByNeighborhood(neighborhoodId, dayId) {
        return await fetchIt(`${Settings.remoteURL}/truckLocations?neighborhoodId=${neighborhoodId}&dayId=${dayId}&_expand=truck&_expand=day&_expand=neighborhood`)
    }
}