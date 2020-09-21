import React, { useEffect, useContext, useState } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import "./EventPlanningSpace.css"

export const EventDetailsForm = (props) => {
    const { eventTypes, getEventType } = useContext(EventTypeContext)
    const { events, updateEvent, getEvents } = useContext(EventContext)

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
    }, [])
    useEffect(() => {
        getEventInEditMode()
    }, [events])

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

    return (
        <>
        <form className="form-group evtDetailsForm">
            <fieldset>
                <label className="label">type</label>
                <select className="input" name="eventTypeId" value={event.eventTypeId} onChange={handleControlledInputChange}>
                    <option value="0">Select a type</option>
                        {eventTypes.map(type => {
                            return <option key={type.id} value={type.id}>{type.type}</option>
                        })}</select>
            </fieldset>
            <fieldset>
                <label className="label">date</label>
                <input className="input" type="date" name="date" value={event.date || ""}
                    onChange={handleControlledInputChange} />
            </fieldset>
            <fieldset>
                <label className="label">host</label>
                <input className="input" type="text" name="host" defaultValue={event.host} placeholder="host"
                    onChange={handleControlledInputChange} />
            </fieldset>
            <fieldset>
                <label className="label">location</label>
                <input className="input" type="text" name="location" defaultValue={event.location} placeholder="location"
                    onChange={handleControlledInputChange} />
            </fieldset>
            <fieldset>
                <label className="label">time</label>
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