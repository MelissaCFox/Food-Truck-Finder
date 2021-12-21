import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const SuggestionRepository = {

    async add(suggestionObj) {
        return await fetchIt(`${Settings.remoteURL}/suggestions`, "POST", JSON.stringify(suggestionObj))
    },

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/suggestions/${id}`)
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/suggestions?_expand=user&_expand=truck&_expand=neighborhood`)
    },

    async getAllForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/suggestions?truckId=${truckId}&_expand=user&_expand=truck&_expand=neighborhood`)
    },

    async getAllUnreadForTruck(truckId) {
        return await fetchIt(`${Settings.remoteURL}/suggestions?truckId=${truckId}&_expand=user&_expand=truck&_expand=neighborhood&read=false`)
    },

    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/suggestions/${id}`, "DELETE")
    },

    async update(suggestionId, newSuggestionObj) {
        return await fetchIt(`${Settings.remoteURL}/suggestions/${suggestionId}`, "PUT", JSON.stringify(newSuggestionObj))
    }


}

export default SuggestionRepository