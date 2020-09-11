import React, { useEffect, useContext, useRef } from "react"
import {EventContext} from "../events/EventsProvider"
import {ProfileEvents} from "./Profile"



export const ProfileList = () => {
    const {events, getEvents} = useContext(EventContext)
    const createEvent = useRef()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
        <h1>Profile Page</h1>
        <button onClick={() =>{
            createEvent.current.showModal()
        }}>create event</button>
            <dialog className="dialog dialog--createEvent" ref={createEvent}>
                <p>Enter an Event Title</p>
                <input type="text" placeholder="type here"></input>
                <button onClick={() => {
                    {/* a route/link to send the user to the unique event planning space
                        also need to send the input to the database 
                    */}
                }}>create!</button>
            </dialog>
        <div>
            {events.map(event => {
                return <ProfileEvents key={event.id} event={event} />
            })}
        </div>
        </>
    )
}



