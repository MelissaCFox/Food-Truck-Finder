import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const TruckFoodTypeRepository = {
    
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes`)
    },
    
    async add(truckFoodTypeObj) {
        return await fetchIt(`${Settings.remoteURL}/truckFoodTypes`, "POST", JSON.stringify(truckFoodTypeObj))
    }

}

export default TruckFoodTypeRepository