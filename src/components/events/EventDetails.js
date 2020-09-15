import React from "react"
import { EventTypeContext } from "./EventTypeProvider"




export const EventDetails = (props) => {
   // const {eventTypes, getEventType} = useContext(EventTypeContext)

    // useEffect(() => {
    //     getEventType()
    // },[])

    return (<div>
        <div>Host: {props.event.host}</div>
        <div>Location: {props.event.location}</div>
        <div>Date: {props.event.date}</div>
        <div>Time: {props.event.time}</div>
        <button onClick={props.func}>Edit</button>
    </div>
)}

//onClick ... Gets to EventDetailsForm somehow

