import React, { useEffect, useContext, useRef, useState } from "react"
import { Button, Modal, ModalBody, ModalHeader, Alert } from "reactstrap"
import { Link } from "react-router-dom"
import { EventContext } from "../events/EventsProvider"
import { UserContext } from "../users/UserProvider"
import { UserEventsContext } from "../users/UserEventsProvider"
import { EditTitleForm } from "../events/EditTitleForm"
import "./Profile.css"


export const ProfileList = (props) => {
    const { events, getEvents, addEvent } = useContext(EventContext)
    const { users, getUsers } = useContext(UserContext)
    const { addUserEvents } = useContext(UserEventsContext)

    const [user, setUsers] = useState([])
    const [vEvents, setValidEvents] = useState([])

    const eventDate = useRef()
    const eventName = useRef()


    useEffect(() => {
        getEvents()
        getUsers()
    }, [])
    useEffect(() => { //sets the user state variable to be the logged in user
        const currentUser = users.find(u => u.id === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setUsers(currentUser)
    }, [users])
    useEffect(() => { //sets the events to be the ones that are currently being planned (archived === false), then sorts by date
        const currentEvents = events.filter(e => e.archived === false) || {}
        const sortedByDate = currentEvents.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.date) - Date.parse(nextEntry.date))
        setValidEvents(sortedByDate)
    }, [events])

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);

    const constructEvent = () => {
        //form validation, if condition triggers the alert to show
        if (eventName.current.value === "" || eventDate.current.value === "") {
            setVisible(true)
        } else {
            //Only place where creation of events occurs
            //The user is only setting the title and date with the createEvent form
            //eventTypeId set as 1 because it needs to be an integer
            //host, location, and time have default strings that tell the user to click edit when they get to the event planning space
            //the reason the logged in user isn't responsible for those details is because another user might have those specific details
            addEvent({
                name: eventName.current.value,
                eventTypeId: 1,
                date: eventDate.current.value,
                host: "click edit",
                location: "to add",
                time: "details!",
                archived: false
            })
                //creates as many userEvent objects as there are users for the specific event to set their initial RSVP status of null (or Haven't Responded Yet) 
                .then((newEventId) => {
                    const userEventPromises = []

                    users.map(u => {
                        userEventPromises.push(
                            addUserEvents({
                                userId: u.id,
                                eventId: newEventId,
                                rsvp: null
                            })
                        )
                    })

                    Promise.all(userEventPromises)
                        .then(() => {
                            props.history.push(`/events/${newEventId}`)
                        })

                })
        }
    }

    return (
        <>
            <h1 className="profileTitle">{user.fname}'s Profile Page</h1>
            <div className="createEventButtonDiv">
                <button className="createEventButton" onClick={toggle}>create event</button>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create an Event to start planning!</ModalHeader>
                <ModalBody>
                    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                        both fields must be filled out!
                </Alert>
                    <p> Event Title</p>
                    <input type="text" placeholder="type here" ref={eventName} className="createEventInput" ></input>
                    <p> Event Date</p>
                    <input type="date" ref={eventDate} className="createEventInput"></input>
                    <div className="actualCreateEvent">
                        <button className="createEventButton"
                            onClick={constructEvent}
                        >create!</button>
                    </div>
                </ModalBody>
            </Modal>
            <div className="content">
                {/*Responsibilites used to be on this page
             I might need the two divs because of CSS... 
             so I'm not removing the content div */}
                <div className="leftContent">
                    {/* events that already exist */}
                    <article className="eventsWithName">
                        <h1 className="eventsListTitle">Events</h1>
                        <div className="events">
                            {
                                vEvents.map(event => {
                                    return <section className="event" key={event.id}>
                                        <Link
                                            to={{
                                                pathname: `/events/${event.id}`,
                                                state: { chosenEvent: event }
                                            }}>
                                            <Button color="primary" className="eventTitle">{event.name}</Button>
                                        </Link>
                                        <EditTitleForm key={event.id} event={event} />
                                        <hr />
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