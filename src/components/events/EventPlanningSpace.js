import React, { useContext, useState, useEffect, useRef, useImperativeHandle } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import {UserContext} from "../users/UserProvider"
import {Activity} from "../activities/Activity"
import {Misc} from "../misc/Misc"
import{FoodTypeContext} from "../foods/FoodTypeProvider"
import {FoodForm} from "../forms/FoodForm"

export const EventPlanningSpace = props => {
    //double check that these are the correct variable names
    //CONTEXT
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {foodsArr, addFood, getFood} = useContext(FoodContext)
    const {foodTypes, getFoodType} = useContext(FoodTypeContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)
    const {eventTypes, getEventType} = useContext(EventTypeContext)
    const {users, getUsers} = useContext(UserContext)

    const aName = useRef(null)
    const mName = useRef(null)

    //double check that these are the correct variable names
    //STATE
    const [event, setEvents] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])

    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getFoodType()
        getActivities()
        getMisc()
        getEventType()
        getUsers()
    }, [])

    useEffect(() => {
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvents(event)
    },[events])
    useEffect(() => {
        const eventActivity = activities.filter(a => a.eventId === parseInt(props.match.params.eventId)) || {}
        setActivities(eventActivity)
    },[activities])
    useEffect(() => {
        const eventMisc = misc.filter(m => m.eventId === parseInt(props.match.params.eventId)) || {}
        setMisc(eventMisc)
    },[misc])
    //POST
    const constructNewEvent = () => {
        //is this even the right method?
        //I need to add properties to an existing object
        addEvent({
            //type
            //host
            //location
            //date
            //time
        })      
    }
    const constructNewActivity = () => {
        addActivity({
            text: aName.current.value,
            eventId: event.id,
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
        .then(aName.current.value = "")
    }
    const constructNewMisc = () => {
        addMisc({
            text: mName.current.value,
            eventId: event.id,
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
        .then(mName.current.value = "")
    }

return (
    <>
    <h2>{event.name}</h2>
    <fieldset>
        <div className="form-group">
            {/* type, host, location, date, time */}
            {/*figure out how to "handle input change" and onChange events */}
            <label htmlFor="eventDetails">details</label>
            <select name="eventId">
                <option value="0">Select a type</option>
                {eventTypes.map(type => {
                return <option key={type.id} value={type.id}>{type.type}</option>
            })}</select>
            <input type="text" name="" placeholder="host" />
            <input type="text" name="" placeholder="location" />
            <input type="date" name="" />
            <input type="text" name="" placeholder="time" />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            {/* food */}
           {foodTypes.map(ft => {
               return <FoodForm key={ft.id} foodTypeObj={ft} {...props} />
           })}
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            {/* activity */}
            <label>Activities:</label>
            <div>{tActivities.map(ea => {
                return <Activity key={ea.id} activity={ea} {...props}/>
            })}</div>
            <input type="text" placeholder="type here" name="aName"
                ref={aName}></input>
            <button onClick={() => {
                constructNewActivity()
            }}>Save</button>
        </div>
    </fieldset>
    <fieldset className="form-group">
        <div>
            {/* misc */}
            <label>Miscellaneous:</label>
            <div>{tMisc.map(em => {
                return <Misc key={em.id} misc={em} {...props}/>
            })}</div>
            <input type="text" placeholder="type here" name="mName"
                ref={mName}></input>
            <button onClick={() => {
                constructNewMisc()
            }}>Save</button>
        </div>
    </fieldset>
    </>
)
}