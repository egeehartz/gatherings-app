import React, { useContext, useState, useEffect, useRef } from "react"
import { EventContext } from "./EventsProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import {UserContext} from "../users/UserProvider"
import {Activity} from "../activities/Activity"
import {Misc} from "../misc/Misc"
import {FoodTypeContext} from "../foods/FoodTypeProvider"
import {FoodForm} from "../forms/FoodForm"
import {EventDetailsForm} from "../events/EventDetailsForm"
import {EventDetails} from "../events/EventDetails"

export const EventPlanningSpace = props => {
    //CONTEXT
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {getFood} = useContext(FoodContext)
    const {foodTypes, getFoodType} = useContext(FoodTypeContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)
    const {users, getUsers} = useContext(UserContext)

    //REFS
    const aName = useRef(null)
    const mName = useRef(null)

    //STATE
    const [event, setEvents] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [editMode, setEditMode] = useState(null)

    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getFoodType()
        getActivities()
        getMisc()
        getUsers()
    }, [])
    useEffect(() => {
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvents(event)
        if(editMode === null) {
            setEditMode(event.host === "" && event.location  === "" && event.date === "" && event.time === "")
        }
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

    const toggleEditMode = () => {
        if (editMode === true) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }

return (
    <>
    <h1>{event.name}</h1>
    <fieldset>
            {/* editMode ? EventDetailsForm : EventDetails */}
            {editMode? 
            <EventDetailsForm key={event.id} event={event} func={toggleEditMode} {...props} /> :
            <EventDetails key={event.id} event={event} func={toggleEditMode} {...props} />}
    </fieldset>
    <fieldset>
        <div className="form-group">
            {/* food */}
            <h2>Food:</h2>
           {foodTypes.map(ft => {
               return <FoodForm key={ft.id} foodTypeObj={ft} {...props} />
           })}
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            {/* activity */}
            <h2>Activities:</h2>
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
            <h2>Miscellaneous:</h2>
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