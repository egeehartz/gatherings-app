import React, { useContext, useState, useEffect, useRef, useImperativeHandle } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
//import {Food} from "../foods/Food"
import{FoodTypeContext} from "../foods/FoodTypeProvider"
import {FoodForm} from "../FoodForm/MainFood"

export const EventPlanningSpace = props => {
    //double check that these are the correct variable names
    //CONTEXT
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {foodsArr, addFood, getFood} = useContext(FoodContext)
    const {foodTypes, getFoodType} = useContext(FoodTypeContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)
    const {eventTypes, getEventType} = useContext(EventTypeContext)

    //double check that these are the correct variable names
    //STATE
    const [event, setEvents] = useState([])
    const [foodItem, setEventFood] = useState([])
    const [newFoodItem, setFood] = useState([])
   // const [tActivities, setActivities] = useState([])
    //const [tMisc, setMisc] = useState([])

    const editMode = props.match.params.hasOwnProperty("foodId")
   
    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getFoodType()
        getActivities()
        getMisc()
        getEventType()
    }, [])

    useEffect(() => {

    },[])
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
            //text:
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
    }
    const constructNewMisc = () => {
        addMisc({
            //text:
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
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
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
        </div>
    </fieldset>
    <fieldset className="form-group">
        <div>
            {/* misc */}
            <label>Miscellaneous:</label>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
        </div>
    </fieldset>
    </>
)
}