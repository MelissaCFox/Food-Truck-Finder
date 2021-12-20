import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const FoodTypeRepository = {

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/foodTypes`)
    },


    async get(foodtypeId) {
        return await fetchIt(`${Settings.remoteURL}/foodTypes/${foodtypeId}?_embed=trucks`)
    },

    async getForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes?truckId=${truckId}&_expand=foodType`)
       
    },

    async add(foodTypeObj) {
        return await fetchIt(`${Settings.remoteURL}/foodTypes`, "POST", JSON.stringify(foodTypeObj))
    }
}

export default FoodTypeRepository