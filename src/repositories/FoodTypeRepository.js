import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const FoodTypeRepository = {

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/foodTypes?_sort=type`)
    },


    async get(foodtypeId) {
        return await fetchIt(`${Settings.remoteURL}/foodTypes/${foodtypeId}?_sort=type`)
    },

    async getForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes?truckId=${truckId}`)
       
    },

    async add(foodTypeObj) {
        return await fetchIt(`${Settings.remoteURL}/foodTypes`, "POST", JSON.stringify(foodTypeObj))
    }
}

export default FoodTypeRepository