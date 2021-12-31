import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const TruckFoodTypeRepository = {
    
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes`)
    },
    
    async add(truckFoodTypeObj) {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes`, "POST", JSON.stringify(truckFoodTypeObj))
    },

    async delete(truckFoodTypeId) {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes/${truckFoodTypeId}`, "DELETE")
    }

}

export default TruckFoodTypeRepository