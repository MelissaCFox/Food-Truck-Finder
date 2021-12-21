import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import SuggestionRepository from "../../repositories/SuggestionsRepository"
import UserRepository from "../../repositories/UserRepository"


export const Messages = ({updateReadStateChange}) => {
    const { getCurrentUser } = useSimpleAuth()
    const [unreadSuggestions, setUnreadSuggestions] = useState([])

    const [suggestions, setSuggestions] = useState([])

    const [messageList, setMessageList] = useState("unread")

    const [readStateChange, setReadStateChange] = useState(false)
    const triggerReadStateChange = () => setReadStateChange(!readStateChange)


    useEffect(() => {
        UserRepository.getAllTruckOwners()
            .then((res) => {
                const foundTruckOwner = res.find(truckOwner => truckOwner.userId === getCurrentUser().id)
              
                if (foundTruckOwner) {
                    if (messageList === "all") {
                        SuggestionRepository.getAllForTruck(foundTruckOwner.truckId).then(setSuggestions)
                    } else {
                        SuggestionRepository.getAllUnreadForTruck(foundTruckOwner.truckId).then(setSuggestions)
                    }

                } else return false
            })
    }, [messageList, readStateChange])

    useEffect(() => {
        UserRepository.getAllTruckOwners()
            .then((res) => {
                const foundTruckOwner = res.find(truckOwner => truckOwner.userId === getCurrentUser().id)
                if (foundTruckOwner) {
                    SuggestionRepository.getAllUnreadForTruck(foundTruckOwner.id).then(setUnreadSuggestions)
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
                        .then(() => {
                            updateReadStateChange()
                            triggerReadStateChange()
                        })

                } else {
                    let updatedSuggestion = { ...res }
                    updatedSuggestion.read = false
                    SuggestionRepository.update(suggestion.id, updatedSuggestion)
                        .then(() => {
                            updateReadStateChange()
                            triggerReadStateChange()
                        })
                }
            })
    }

    return (
        <div className="userSuggestions">
            <div className="messageList--options">
                <Button className="messageList--option-btn" onClick={() => { setMessageList("unread") }}>Unread Suggestions ({unreadSuggestions.length}) {messageList === "unread" ? "-->" : ""} </Button>
                <Button className="messageList--option-btn" onClick={() => { setMessageList("all") }}>All Suggestions {messageList === "all" ? "-->" : ""}</Button>
            </div>
            <div className="messagesList">
                {
                    suggestions.length > 0 

                    ? suggestions.map(suggestion => {
                        return <div key={suggestion.id} className="suggestion">
                            <div >
                                <div className="suggestion-truck">{suggestion.truck.name}</div>
                                <div className="suggestion-neighborhood">Where:  {suggestion.neighborhood.name}</div>
                                <div className="suggestion-date">When:  {suggestion.date}</div>
                                <div className="suggestion-message">What Else:  {suggestion.message}</div>
                                <div className="suggestion-author">~{suggestion.user.name}</div>
                            </div>
                            <Button className="suggestion-btn" onClick={() => updateMessage(suggestion)}>Mark Read/Unread</Button>
                            <Button className="suggestion-btn" onClick={() => SuggestionRepository.delete(suggestion.id).then(triggerReadStateChange)}>Delete</Button>
                        </div>
                    })
                    : <div className="suggestion"><div className="noMessages">No suggestions</div></div>
                }

            </div>

        </div>
    )

}