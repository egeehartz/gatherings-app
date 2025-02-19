import React, { useEffect, useContext, useState } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import "./EventPlanningSpace.css"

//this component handles the event details form
//it is triggered when a user clicks "edit" in the event details section of the planning space
//the event object was created when the user filled out the create event form on the profile page so any change is automatically PUT functionality
export const EventDetailsForm = (props) => {
    const { eventTypes, getEventType, addEventType } = useContext(EventTypeContext)
    const { events, updateEvent, getEvents } = useContext(EventContext)

    const [event, setEvent] = useState({})
    const [filteredTypes, setTypes] = useState([])
    const [eventType, setEventType] = useState('') //just a number
    const [eventTypeUser, setEventTypeUser] = useState('') //text (type)

    const editMode = props.match.params.hasOwnProperty("eventId")

    const getEventInEditMode = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }

    const handleControlledInputChange = (browserEvent) => {
        const newEvent = Object.assign({}, event)          
        newEvent[browserEvent.target.name] = browserEvent.target.value  
        setEvent(newEvent)                         
            
    }

    const handleOtherControlledInputChange = (browserEvent) => {
        const newEventType = Object.assign({}, eventTypes)          
        newEventType[browserEvent.target.name] = browserEvent.target.value 
        setEventTypeUser(newEventType)                                 
    }

    useEffect(() => {
        getEventType()
        getEvents()
    }, [])
    useEffect(() => {
        getEventInEditMode()
    }, [events])
    useEffect(() => {
        setEventType(event.eventTypeId)
    },[event])
    useEffect(() => {
        const filteredTypes = eventTypes.filter(et => et.id !== 6)
        setTypes(filteredTypes)
    },[eventTypes])

    const addToEvent = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            updateEvent({
                id: eventId,
                name: props.event.name,
                eventTypeId: parseInt(event.eventTypeId),
                date: event.date,
                host: event.host,
                location: event.location,
                time: event.time,
                archived: false
            })
        }
    }

    const constructET = () => {
        addEventType({
            type: eventTypeUser.type
        })
        .then(((eventTypeId) => {
            const eventId = parseInt(props.match.params.eventId)
            updateEvent({
                id: eventId,
                name: props.event.name,
                eventTypeId: parseInt(eventTypeId),
                date: event.date,
                host: event.host,
                location: event.location,
                time: event.time,
                archived: false
            })
        }))
    }
    
    return (
        <>
            <form className="form-group evtDetailsForm">
                <fieldset>
                    <label className="label">Type</label>
                    <select className="input" name="eventTypeId" value={event.eventTypeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a type</option>
                        {filteredTypes.map(type => {
                            return <option key={type.id} value={type.id}>{type.type}</option>
                        })}
                        <option value="6">Other</option>
                    </select>
                    <div>
                        {parseInt(eventType) === 6 ? 
                        <>
                        <input className="otherInput" type="text" name="type" value={eventTypeUser.type} onChange={handleOtherControlledInputChange}></input>
                        <button className="otherInputButton" onClick={(evt)=>{
                            evt.preventDefault()
                            constructET()}}>save</button>
                        </> 
                    : ""}
                </div>
                </fieldset>
                <fieldset>
                    <label className="label">Date</label>
                    <input className="input" type="date" name="date" value={event.date}
                        onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset>
                    <label className="label">Host</label>
                    <input className="input" type="text" name="host" defaultValue={event.host} placeholder="host"
                        onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset>
                    <label className="label">Location</label>
                    <input className="input" type="text" name="location" defaultValue={event.location} placeholder="location"
                        onChange={handleControlledInputChange} />
                </fieldset>
                <fieldset>
                    <label className="label">Time</label>
                    <input className="input" type="text" name="time" defaultValue={event.time} placeholder="time"
                        onChange={handleControlledInputChange} />
                </fieldset>
                <button onClick={evt => {
                    evt.preventDefault()
                    addToEvent()
                    props.func()
                }}>Save</button>
            </form>
        </>
    )
}