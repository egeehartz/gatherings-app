import React, { useEffect, useContext, useRef, useState } from "react"
import { EventContext } from "../events/EventsProvider"
import { UserContext } from "../users/UserProvider"
import { EditTitleForm } from "../events/EditTitleForm"
import { Link } from "react-router-dom"
import "./Profile.css"
import { UserEventsContext } from "../users/UserEventsProvider"
import {Button} from "reactstrap"


export const ProfileList = (props) => {
    const { events, getEvents, addEvent } = useContext(EventContext)
    const { users, getUsers } = useContext(UserContext)
    const { addUserEvents } = useContext(UserEventsContext)

    const [user, setUsers] = useState([])
    const [ vEvents, setValidEvents] = useState([])

    const createEvent = useRef()
    const eventDate = useRef()
    const eventName = useRef(null)


    useEffect(() => {
        getEvents()
        getUsers()
    }, [])

    useEffect(() => {
        const currentUser = users.find(u => u.id === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setUsers(currentUser)
    }, [users])

    useEffect(() => {
        const currentEvents = events.filter(e => e.archived === false) || {}
        const sortedByDate = currentEvents.sort(
            (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date))
        setValidEvents(sortedByDate)
    }, [events])


    return (
        <>
            <h1 className="profileTitle">{user.fname}'s Profile Page</h1>
            <div className="createEventButtonDiv">
                <button className="createEventButton" onClick={() => {
                    createEvent.current.showModal()
                }}>create event</button>
                <dialog className="dialog dialog--createEvent" ref={createEvent}>
                    <p>Enter an Event Title</p>
                    <input type="text" placeholder="type here" ref={eventName} ></input>
                    <input type="date" ref={eventDate} ></input>
                    <div>
                        <button
                            onClick={() => {
                                addEvent({
                                    name: eventName.current.value,
                                    eventTypeId: 1,
                                    date: eventDate.current.value,
                                    host: "click edit",
                                    location: "to add",
                                    time: "details!",
                                    archived: false
                                })
                                .then((newEventId) => {
                                    {
                                        users.map(u => {
                                            addUserEvents({
                                                userId: u.id,
                                                eventId: newEventId,
                                                rsvp: null
                                            })
                                        })
                                    }
                                    props.history.push(`/events/${newEventId}`)
                                })
                            }}
                        >create!</button>
                        <button onClick={() => {
                            createEvent.current.close()
                        }}>nevermind</button>
                    </div>
                </dialog>
            </div>
            <div className="content">
            <div className="leftContent">
                {/* events that already exist */}
                <article className="eventsWithName">
                <Button color="info">Events</Button>
                    <div className="events">
                    {
                        vEvents.map(event => {
                            return <section className="event" key={event.id}>
                                <Link
                                    to={{
                                        pathname: `/events/${event.id}`,
                                        state: { chosenEvent: event }
                                    }}>
                                    <h3 className="eventTitle">{event.name}</h3>
                                </Link>
                                <EditTitleForm key={event.id} event={event} />
                                <hr/>
                            </section>
                        })
                    }
                    </div>
                </article>
                </div>
            </div>
        </>
    )
}



