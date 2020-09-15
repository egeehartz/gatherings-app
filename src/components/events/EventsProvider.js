import React, { useState } from "react"

export const EventContext = React.createContext()

export const EventsProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8088/events")
            .then(res => res.json())
            .then(setEvents)
    }

    const getEventById = (id) => {
        return fetch(`http://localhost:8088/events/${id}`)
            .then(res => res.json())
    }

    const addEvent = Event => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Event)
        })
            .then(getEvents)
    }
    //for editing functionality
    const updateEvent = event => {
        return fetch(`http://localhost:8088/events/${event.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
            })
                .then(getEvents)
}
    
    return (
        <EventContext.Provider value={{
            events, getEvents,  getEventById, addEvent, updateEvent
        }}>
            {props.children}
        </EventContext.Provider>
    )
}

/* 

//for deleting event functionality
const deleteEvent = (EventId) => {
        return fetch(`http://localhost:8088/Events/${EventId}`, {
            method: "DELETE"
        })
        .then(getEvents)
    }

*/