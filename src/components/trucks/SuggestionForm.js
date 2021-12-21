import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import SuggestionRepository from "../../repositories/SuggestionsRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { useEffect } from "react/cjs/react.development"


export const SuggestionForm = ({ truckId, suggestionToggle }) => {
    const { getCurrentUser } = useSimpleAuth()
    const [neighborhoods, setNeighborhoods] = useState([])

    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [])

    const [suggestion, setSuggestion] = useState({
        userId: getCurrentUser().id,
        truckId: truckId,
        neighborhoodId: 0,
        date: "",
        message: "",
        read: false
    })

    const submitSuggestion = () => {
        SuggestionRepository.add(suggestion).then(suggestionToggle)
    }

    return (
        <Form>

            <FormGroup>
                <Label for="suggestion-message">Where</Label>
                <Input required type="select" name="neighborhood" id="suggestion-neighborhoodId"
                    onChange={(e) => {
                        const copy = { ...suggestion }
                        copy.neighborhoodId = parseInt(e.target.value)
                        setSuggestion(copy)
                    }}>
                <option value="">Select a neighborhood...</option>
                {
                    neighborhoods.map(neighborhood => <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>)
                }
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="suggestion-message">When</Label>
                <Input required type="date" name="date" id="suggestion-date"
                    onChange={(e) => {
                        const copy = { ...suggestion }
                        copy.date = e.target.value
                        setSuggestion(copy)
                    }} />
            </FormGroup>

            <FormGroup>
                <Label for="suggestion-message">What Else?</Label>
                <Input required type="textarea" name="message" id="suggestion-message" placeholder="Address, event info, etc"
                    onChange={(e) => {
                        const copy = { ...suggestion }
                        copy.message = e.target.value
                        setSuggestion(copy)
                    }} />
            </FormGroup>

            <Button onClick={() => {
                submitSuggestion()
                suggestionToggle()
            }}>Submit Suggestion</Button>

        </Form>

    )

}