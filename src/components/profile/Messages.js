import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import SuggestionRepository from "../../repositories/SuggestionsRepository"
import UserRepository from "../../repositories/UserRepository"


export const Messages = () => {
    const { getCurrentUser } = useSimpleAuth()
    const [unreadSuggestions, setUnreadSuggestions] = useState([])

    const [suggestions, setSuggestions] = useState([])

    const [messageList, setMessageList] = useState("unread")

    const [readStateChange, setReadStateChange] = useState(false)
    const triggerReadStateChange = () => setReadStateChange(!readStateChange)


    useEffect(() => {
        const foundTruck = UserRepository.getAllTruckOwners()
            .then((res) => {
                res.find(truckOwner => truckOwner.userId === getCurrentUser().id)
                if (foundTruck) {
                    if (messageList === "all") {
                        SuggestionRepository.getAllForTruck(foundTruck.id).then(setSuggestions)
                    } else {
                        SuggestionRepository.getAllUnreadForTruck(foundTruck.id).then(setSuggestions)
                    }

                } else return false
            })
    }, [messageList])

    useEffect(() => {
        const foundTruck = UserRepository.getAllTruckOwners()
            .then((res) => {
                res.find(truckOwner => truckOwner.userId === getCurrentUser().id)
                if (foundTruck) {
                    SuggestionRepository.getAllUnreadForTruck(foundTruck.id).then(setUnreadSuggestions)
                } else return false
            })
    }, [readStateChange])

    return (
        <div>
            <div className="messageList--options"></div>
            <Button onClick={() => { setMessageList("unread") }}>Unread Suggestions ({unreadSuggestions.length})</Button>
            <Button onClick={() => { 
                triggerReadStateChange()
                setMessageList("all") 
                }}>All Suggestions</Button>
            <div className="messagesList">

                {
                    suggestions.map(suggestion => <div className="suggestion-message">{suggestion.message}</div>)
                }

            </div>

        </div>
    )

}