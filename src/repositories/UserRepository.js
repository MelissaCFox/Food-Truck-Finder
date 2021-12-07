import Settings from "./Settings";
import { fetchIt } from "./Fetch";

export default {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}?`)
    },
    
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users?`)
    }


}