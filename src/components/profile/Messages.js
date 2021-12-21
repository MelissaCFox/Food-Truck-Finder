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
    }, [messageList, readStateChange])

    useEffect(() => {
        const foundTruck = UserRepository.getAllTruckOwners()
            .then((res) => {
                res.find(truckOwner => truckOwner.userId === getCurrentUser().id)
                if (foundTruck) {
                    SuggestionRepository.getAllUnreadForTruck(foundTruck.id).then(setUnreadSuggestions)
                } else return false
            })
    }, [readStateChange, suggestions])

    const updateMessage = (suggestion) => {
        SuggestionRepository.get(suggestion.id)
            .then((res) => {
                if (res.read === false) {
                    let updatedSuggestion = { ...res }
                    updatedSuggestion.read = true
                    SuggestionRepository.update(suggestion.id, updatedSuggestion)
                        .then(triggerReadStateChange)
                } else {
                    let updatedSuggestion = { ...res }
                    updatedSuggestion.read = false
                    SuggestionRepository.update(suggestion.id, updatedSuggestion)
                        .then(triggerReadStateChange)
                }
            })
    }

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
                    suggestions.map(suggestion => {
                        return <div>
                            <div className="suggestion-message">{suggestion.message}</div>
                            <Button onClick={() => updateMessage(suggestion)}>Mark Read/Unread</Button>
                            <Button onClick={() => SuggestionRepository.delete(suggestion.id).then(triggerReadStateChange)}>Delete</Button>
                        </div>
                    })
                }

            </div>

        </div>
    )

}