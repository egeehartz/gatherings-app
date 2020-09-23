import React, { useState } from "react"

export const EventTypeContext = React.createContext()

export const EventTypeProvider = (props) => {
    const [eventTypes, setEventType] = useState([])

    const getEventType = () => {
        return fetch("http://localhost:8088/eventTypes")
            .then(res => res.json())
            .then(setEventType)
    }

    const addEventType = eventType => {
        return fetch("http://localhost:8088/eventTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventType)
        })
        .then(res => res.json())
            .then(newEventType => {
                getEventType()
               return newEventType.id }) 
    }
    
    return (
        <EventTypeContext.Provider value={{
            eventTypes, getEventType, addEventType
        }}>
            {props.children}
        </EventTypeContext.Provider>
    )
}


//TODO: could be a stretch goal, in the event of an other
/*
 const addEventType = eventType => {
        return fetch("http://localhost:8088/eventTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventTypes)
        })
        .then(getEventType)
    }
*/