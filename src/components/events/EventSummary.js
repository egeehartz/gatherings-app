import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { EventContext } from "./EventsProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { FoodContext } from "../foods/FoodProvider"
import "../profile/Archive.css"



export const EventSummary = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const { activities, getActivities } = useContext(ActivityContext)
    const { misc, getMisc } = useContext(MiscContext)
    const { foodsArr, getFood } = useContext(FoodContext)

    const [event, setEvents] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tFood, setFood] = useState([])
    const [date, setDate] = useState('')

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
        setFood(eventFood)
    }, [foodsArr])
    useEffect(() => {
        const eventDate = event.date || "-"
        const splitDate = eventDate.split("-")
        const combinedDate = splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0]
        setDate(combinedDate)
    }, [event])


    return (
        <>
            <h3>{event.name}</h3>
            <div className="archivedEventDetails">
                <Button color="info">Details</Button>
                <div className="detailsContainer">
                <div className="details host">
                    <div className="detailCategory">Host:</div>
                    <div className="detailItem">{event.host}</div>
                </div>
                <div className="details locale">
                    <div className="detailCategory">Location:</div>
                    <div className="detailItem"> {event.location}</div>
                </div>
                <div className="details time">
                    <div className="detailCategory">Time:</div>
                    <div className="detailItem"> {event.time}</div>
                </div>
                <div className="details date">
                    <div className="detailCategory">Date: </div>
                    <div className="detailItem">{date}</div>
                </div>
                </div>

                <Button color="primary">Food Brought</Button>
                {
                    tFood.map(f => {
                        return <div className="item">{f.name}</div>
                    })
                }
                <Button color="success">Activities</Button>
                {
                    tActivities.map(a => {
                        return <div className="item">{a.text}</div>
                    })
                }
                <Button color="warning">Miscellaneous Details</Button>
                {
                    tMisc.map(m => {
                        return <div className="item">{m.text}</div>
                    })
                }
            </div>

        </>
    )
}