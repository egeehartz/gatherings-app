import React, { useContext, useState, useEffect, useRef } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"


export const EventPlanningSpace = props => {
    //double check that these are the correct variable names
    //CONTEXT
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {food, addFood, getFood} = useContext(FoodContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)
    const {eventTypes, getEventType} = useContext(EventTypeContext)

    //double check that these are the correct variable names
    //STATE
    const [event, setEvents] = useState([])
    const [foodItem, setFood] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])

    const mainDishType = useRef(null)
    const mainFood = useRef(null)
    const sidesType = useRef(null)
    const dessertType = useRef(null)
    const snackType = useRef(null)
    const drinkType = useRef(null)
    
    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getActivities()
        getMisc()
        getEventType()
    }, [])

    useEffect(() => {
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvents(event)
    }, [events])

    useEffect(() => {
        //pulls all food related to the specific event
        const foodItem = food.filter(f => f.eventId === parseInt(props.match.params.eventId)) || {}
        setFood(foodItem)
    },[food])
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
    const constructNewFood = () => {
        addFood({
            //double check how to send the correct data
            name: mainFood.current.value,
            eventId: event.id,
            foodTypeId: parseInt(mainDishType.current.value),
            userId: parseInt(localStorage.getItem("gatherings_customer"))
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
            <label>Main:</label>
            <div>{foodItem.map(f => {
                if(f.foodTypeId === 1) {
                return <div>{f.name}</div>
                }
            })}</div>
                <input type="text" ref={mainFood} placeholder="type here" name="name"></input>
                <input type="hidden" ref={mainDishType} value="1"/>
                <button onClick={() => constructNewFood()}>Save</button>
            <label>Sides:</label>
                <input type="hidden" ref={sidesType} value="2"/>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Desserts:</label>
                <input type="hidden" ref={dessertType} value="3"/>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Snacks:</label>
                <input type="hidden" ref={snackType} value="5"/>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Drinks:</label>
                <input type="hidden" ref={drinkType} value="4"/>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
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