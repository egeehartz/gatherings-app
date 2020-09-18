import React, { useEffect, useContext, useRef, useState } from "react"
import { EventContext } from "../events/EventsProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { UserContext } from "../users/UserProvider"
import { ProfileActivity } from "../activities/ProfileActivity"
import { ProfileFood } from "../foods/ProfileFood"
import { ProfileMisc } from "../misc/ProfileMisc"
import { EditTitleForm } from "../events/EditTitleForm"
import { Link } from "react-router-dom"
import "./Profile.css"
import { UserEventsContext } from "../users/UserEventsProvider"


export const ProfileList = (props) => {
    const { events, getEvents, addEvent } = useContext(EventContext)
    const { foodsArr, getFood } = useContext(FoodContext)
    const { activities, getActivities } = useContext(ActivityContext)
    const { misc, getMisc } = useContext(MiscContext)
    const { users, getUsers } = useContext(UserContext)
    const { addUserEvents } = useContext(UserEventsContext)

    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tFood, setFood] = useState([])
    const [user, setUsers] = useState([])

    const createEvent = useRef()
    const eventName = useRef(null)


    useEffect(() => {
        getEvents()
        getFood()
        getActivities()
        getMisc()
        getUsers()
    }, [])

    useEffect(() => {
        const currentUser = users.find(u => u.id === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setUsers(currentUser)
    }, [users])
    useEffect(() => {
        const userActivity = activities.filter(a => a.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setActivities(userActivity)
    }, [activities])

    useEffect(() => {
        const userMisc = misc.filter(m => m.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setMisc(userMisc)
    }, [misc])

    useEffect(() => {
        const userFood = foodsArr.filter(f => f.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setFood(userFood)
    }, [foodsArr])


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
                    <div>
                        <button
                            onClick={() => {
                                addEvent({
                                    name: eventName.current.value,
                                    eventTypeId: 1,
                                    host: "click edit",
                                    location: "to",
                                    date: "add",
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
                {/* Responsibilities */}
                <div>
                    <h2 className="contentTitleResp">Responsibilities</h2>
                    <p>You have signed up for:</p>
                    <div>
                        <h4>Food:</h4>
                        <ul>
                            {tFood.map(f => {
                                return <ProfileFood key={f.id} food={f} />
                            })}
                        </ul>
                    </div>
                    <div>
                        <h4>Activities:</h4>
                        <ul>
                            {tActivities.map(a => {
                                return <ProfileActivity key={a.id} activity={a} />
                            })}
                        </ul>
                    </div>
                    <div>
                        <h4>Misc:</h4>
                        <ul>
                            {tMisc.map(m => {
                                return <ProfileMisc key={m.id} misc={m} />
                            })}
                        </ul>
                    </div>

                </div>
            </div>

                {/* events that already exist */}
                <article className="eventsWithName">
                    <h2 className="contentTitleEvents">Events</h2>
                    <div className="events">
                    {
                        events.map(event => {
                            return <section className="event" key={event.id}>
                                <Link
                                    to={{
                                        pathname: `/events/${event.id}`,
                                        state: { chosenEvent: event }
                                    }}>
                                    <h3 className="eventTitle">{event.name}</h3>
                                </Link>
                                <EditTitleForm key={event.id} event={event} />
                            </section>
                        })
                    }
                    </div>
                </article>

            </div>
        </>
    )
}



