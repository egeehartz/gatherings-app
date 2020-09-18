import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventsProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { FoodContext } from "../foods/FoodProvider"



export const EventSummary = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const { activities, getActivities } = useContext(ActivityContext)
    const { misc, getMisc } = useContext(MiscContext)
    const { foodsArr, getFood } = useContext(FoodContext)

    const [event, setEvents] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tFood, setFood] = useState([])

    useEffect(() => {
        getEvents()
        getActivities()
        getMisc()
        getFood()
    }, [])

    useEffect(() => {
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvents(event)
    }, [events])

    useEffect(() => {
        const eventActivity = activities.filter(a => a.eventId === parseInt(props.match.params.eventId)) || {}
        setActivities(eventActivity)
    }, [activities])
    useEffect(() => {
        const eventMisc = misc.filter(m => m.eventId === parseInt(props.match.params.eventId)) || {}
        setMisc(eventMisc)
    }, [misc])
    useEffect(() => {
        const eventFood = foodsArr.filter(f => f.eventId === parseInt(props.match.params.eventId)) || {}
       // const filteredFood = eventFood.filter(ef => ef.foodTypeId === props.foodTypeObj.id) || {}
       setFood(eventFood)
    }, [foodsArr])



    return (
        <>
            <h3>{event.name}</h3>
            <h4>Event Details</h4>
            <div>Host: {event.host}</div>
            <div>Location: {event.location}</div>
            <div>Time: {event.time}</div>
            <div>Date: {event.date}</div>

            <h4>Food Brought</h4>
            {
                tFood.map(f => {
                    return <div>{f.name}</div>
                })
            }
            <h4>Activities</h4>
            {
                tActivities.map(a => {
                    return <div>{a.text}</div>
                })
            }
            <h4>Miscellaneous Details</h4>
            {
                tMisc.map(m => {
                    return <div>{m.text}</div>
                })
            }

        </>
    )
}