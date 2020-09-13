import React, { useEffect, useContext, useRef, useState } from "react"
import {EventContext} from "../events/EventsProvider"
import {ProfileEvents} from "./Profile"
import {Link} from "react-router-dom"


export const ProfileList = (props) => {
    const {events, getEvents, addEvent, getEventById} = useContext(EventContext)
    const [event, setEvent] = useState([])
    const createEvent = useRef()

    useEffect(() => {
        getEvents()
    }, [])

    // useEffect(() => {
    //     const eventId = events.length + 1
    //     getEventById(eventId)
    //         .then(setEvent)               
    // }, [])

   const eventName = useRef(null)

    return (
        <>
        <h1>Profile Page</h1>
        <button onClick={() =>{
            createEvent.current.showModal()
        }}>create event</button>

            <dialog className="dialog dialog--createEvent" ref={createEvent}>
                <p>Enter an Event Title</p>
                <input type="text" placeholder="type here" ref={eventName} ></input>
               <div>    
                    <button
                        onClick={() => {
                            addEvent({
                                name: eventName.current.value
                            })
                            .then(() =>{
                            props.history.push(`/events/${events.length + 1}`)
                            })
                        }}
                    >create!</button>
               </div>
            </dialog> 

            {/* events that already exist */}
            <article className="events">
                {
                    events.map(event => {
                        return <section className="event" key={event.id}>
                            <Link 
                            to={{
                                pathname:`/events/${event.id}`,
                                state: { chosenEvent: event }
                                }}>
                            <h3>{event.name}</h3>
                            </Link>
                        </section>
                    })
                }
            </article> 
        </>
    )
}



