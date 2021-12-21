import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const SuggestionRepository = {

    async add(suggestionObj) {
        return await fetchIt(`${Settings.remoteURL}/suggestions`, "POST", JSON.stringify(suggestionObj))
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/suggestions`)
    }


}

export default SuggestionRepository