import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const FoodTypeRepository = {

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/foodTypes`)
    },


    async get(foodtypeId) {
        return await fetchIt(`${Settings.remoteURL}/foodTypes/${foodtypeId}?_embed=trucks`)
    }
}

export default FoodTypeRepository