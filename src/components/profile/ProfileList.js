import React, { useEffect, useContext, useRef, useState } from "react"
import {EventContext} from "../events/EventsProvider"
import {FoodContext} from "../foods/FoodProvider"
import {ActivityContext} from "../activities/ActivityProvider"
import {MiscContext} from "../misc/MiscProvider"
import {UserContext} from "../users/UserProvider"
import {ProfileActivity} from "../activities/ProfileActivity"
import {ProfileFood} from "../foods/ProfileFood"
import {ProfileMisc} from "../misc/ProfileMisc"
//import {ProfileEvents} from "./Profile"
import {Link} from "react-router-dom"


export const ProfileList = (props) => {
    const {events, getEvents, addEvent} = useContext(EventContext)
    const {foodsArr, getFood} = useContext(FoodContext)
    const {activities, getActivities} = useContext(ActivityContext)
    const {misc, getMisc} = useContext(MiscContext)
    const {users, getUsers} = useContext(UserContext)

    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tFood, setFood] = useState([])

    const createEvent = useRef()
    const eventName = useRef(null)

    useEffect(() => {
        getEvents()
        getFood()
        //getFoodType()
        getActivities()
        getMisc()
        getUsers()
    }, [])

    useEffect(() => {
        const userActivity = activities.filter(a => a.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setActivities(userActivity)
    },[activities])

    useEffect(() => {
        const userMisc = misc.filter(m => m.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setMisc(userMisc)
    },[misc])

    useEffect(() => {
        const userFood = foodsArr.filter(f => f.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setFood(userFood)
    },[foodsArr])



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
                <h2>Events</h2>
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
            {/* Responsibilities */}
            <div>
                <h2>Responsibilities</h2>
                <p>You have signed up for:</p>
                <div>
                    <h4>Food:</h4>
                    <ul>
                    {tFood.map(f => {
                        return <ProfileFood key={f.id} food={f}  />
                    })}
                    </ul>
                </div>
                <div>
                    <h4>Activities:</h4>
                    <ul>
                    {tActivities.map(a => {
                        return <ProfileActivity key={a.id} activity={a}  />
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
        </>
    )
}



