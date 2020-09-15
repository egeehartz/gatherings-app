import React, { useEffect,useContext, useState } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"

export const EventDetailsForm = (props) => {
    const {eventTypes, getEventType} = useContext(EventTypeContext)
    const {events, updateEvent, getEvents} = useContext(EventContext)

    const [event, setEvent] = useState({})


    const editMode = props.match.params.hasOwnProperty("eventId")

    const getEventInEditMode = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }

    const handleControlledInputChange = (browserEvent) => {
        const newEvent = Object.assign({}, event)          // Create copy
        newEvent[browserEvent.target.name] = browserEvent.target.value    // Modify copy
        setEvent(newEvent)                                 // Set copy as new state
    }


    useEffect(() => {
        getEventType()
        getEvents()
    },[])

    useEffect(() => {
        getEventInEditMode()
    }, [events])

    const addToEvent = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            updateEvent({
                id: eventId,
                name: props.event.name,
                eventTypeId: event.eventTypeId,
                host: event.host,
                location: event.location,
                date: event.date,
                time: event.time,
                archived: ""
            })
        }
    }

    return (
        <>
        <div>
        </div>
        <form className="form-group">
            {/* type, host, location, date, time */}
            <h2 htmlFor="eventDetails">Details:</h2>
            <fieldset>
                <label>type</label>
            <select name="eventTypeId" value={event.eventTypeId} onChange={handleControlledInputChange}>
                <option value="0">Select a type</option>
                {eventTypes.map(type => {
                return <option key={type.id} value={type.id}>{type.type}</option>
            })}</select>
            </fieldset>
            <fieldset>
            <label>host</label>
            <input type="text" name="host" defaultValue={event.host} placeholder="host"
                onChange={handleControlledInputChange} />
            </fieldset>
            <fieldset>
            <label>location</label>
            <input type="text" name="location" defaultValue={event.location} placeholder="location" 
                onChange={handleControlledInputChange}/>
            </fieldset>
            <fieldset>
            <label>time</label>
            <input type="text" name="time" defaultValue={event.time} placeholder="time"
                onChange={handleControlledInputChange} />
            </fieldset>
            <fieldset>
            <label>date</label>
            <input type="date" name="date" value={event.date} 
                onChange={handleControlledInputChange} />
            </fieldset>
            <button onClick={evt => {
                    evt.preventDefault()
                    addToEvent()
                }}>Save</button>
        </form>
        </>
    )

    
}

//onClick={addToEvent}