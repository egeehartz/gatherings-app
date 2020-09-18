import React, {useContext, useState, useEffect} from "react"
import {EventContext} from "./EventsProvider"



export const EventSummary = (props) => {
 const {events, getEvents} = useContext(EventContext)

 const [event, setEvents] = useState([])

 useEffect(() => {
     getEvents()
 },[])

 useEffect(() => {
    const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
    setEvents(event)
 },[events])
 



    return (
        <h3>{event.name}</h3>
    )
}