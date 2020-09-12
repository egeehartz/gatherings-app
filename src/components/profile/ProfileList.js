import React, { useEffect, useContext, useRef } from "react"
import {EventContext} from "../events/EventsProvider"
import {ProfileEvents} from "./Profile"
import {Link} from "react-router-dom"


export const ProfileList = () => {
    const {events, getEvents, addEvent} = useContext(EventContext)
    const createEvent = useRef()

    useEffect(() => {
        getEvents()
    }, [])

    const eventName = useRef(null)

    return (
        <>
        <h1>Profile Page</h1>
        <button onClick={() =>{
            createEvent.current.showModal()
        }}>create event</button>
            <dialog className="dialog dialog--createEvent" ref={createEvent}>
                <p>Enter an Event Title</p>
                <input type="text" placeholder="type here" ref={eventName}></input>
               <div>
                <button onClick={() => {
                    addEvent({
                        eventName: eventName.current.value,
                        host: "",
                        location: "",
                        date: "",
                        time: "",
                    })
                    {/* a route/link to send the user to the unique event planning space
                        also need to send the input to the database 
                    */}
                }}>create!</button>
                <Link
                       to={{
                           pathname: `/events/${events.id}`,
                           state: { chosenEvent: events }
                       }} />

               </div>
            </dialog> 
        <div>
            {events.map(event => {
                return <ProfileEvents key={event.id} event={event} />
            })}
        </div> 
        </>
    )
}



