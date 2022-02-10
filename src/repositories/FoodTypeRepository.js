import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const FoodTypeRepository = {

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/foodtypes`)
        // return await fetchIt(`${Settings.remoteURL}/foodTypes?_sort=type`)
    },


    async get(foodTypeId) {
        return await fetchIt(`${Settings.remoteURL}/foodtypes/${foodTypeId}`)
        // return await fetchIt(`${Settings.remoteURL}/foodTypes/${foodTypeId}?_sort=type`)
    },

    // async getForTruck(truckId) {
    //     return await fetchIt(`${Settings.remoteURL}/truckFoodTypes?truckId=${truckId}`)
       
    // },

    async add(foodTypeObj) {
        return await fetchIt(`${Settings.remoteURL}/foodtypes`, "POST", JSON.stringify(foodTypeObj))
    }
}

export default FoodTypeRepository