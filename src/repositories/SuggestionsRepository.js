import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const SuggestionRepository = {

    async add(suggestionObj) {
        return await fetchIt(`${Settings.remoteURL}/suggestions`, "POST", JSON.stringify(suggestionObj))
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/suggestions?_expand=user&_expand=truck&_expand=neightborhood`)
    },

    async getAllForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/suggestions?truck=${truckId}&_expand=user&_expand=truck&_expand=neightborhood`)
    },

    async getAllUnreadForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/suggestions?truck=${truckId}&_expand=user&_expand=truck&_expand=neightborhood&read=false`)
    }


}

export default SuggestionRepository