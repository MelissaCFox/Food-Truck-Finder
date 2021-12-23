import { useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap"
import SuggestionRepository from "../../repositories/SuggestionsRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { useEffect } from "react/cjs/react.development"


export const SuggestionForm = ({ truckId, suggestionToggle }) => {
    const { getCurrentUser } = useSimpleAuth()
    const [neighborhoods, setNeighborhoods] = useState([])
    const [formCheck, setFormCheck] = useState(false)
    const toggleFormCheck = () => setFormCheck(!formCheck)
    const toggleContact = () => {
        let copy = {...suggestion}
        copy.includeContact = !copy.includeContact
        setSuggestion(copy)
    }

    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [])

    const [suggestion, setSuggestion] = useState({
        userId: getCurrentUser().id,
        truckId: truckId,
        neighborhoodId: 0,
        date: "",
        message: "",
        read: false,
        includeContact: false

    })

    const submitSuggestion = (event) => {
        event.preventDefault()
        if (suggestion.date && suggestion.message && suggestion.neighborhoodId !== 0) {
            SuggestionRepository.add(suggestion).then(suggestionToggle)
        } else {
            toggleFormCheck()
        }
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
                    className="form-control"
                    onChange={(e) => {
                        const copy = { ...suggestion }
                        copy.message = e.target.value
                        setSuggestion(copy)
                    }} />
            </FormGroup>

            <FormGroup inline-block>
                
                <Label check>   
                <Input type="checkbox" className="contact-checkbox" onChange={toggleContact}/>
                Include Contact Info? 
                </Label>
            </FormGroup>

            <Button onClick={(event) => {
                submitSuggestion(event)
            }}>Submit Suggestion</Button>

            < Modal isOpen={formCheck} centered fullscreen="sm" size="sm" toggle={toggleFormCheck} >
                <ModalBody>
                    Please Fill Out All Fields
                    <ModalFooter>
                        <Button onClick={toggleFormCheck}>
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>

        </Form>
    )
}