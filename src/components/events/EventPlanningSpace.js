import React, { useContext, useState, useEffect, useRef, useImperativeHandle } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import {Food} from "../foods/Food"

export const EventPlanningSpace = props => {
    //double check that these are the correct variable names
    //CONTEXT
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {foodsArr, addFood, getFood} = useContext(FoodContext)
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

    const handleInputChange = event => {
        const newFood = Object.assign({}, foodsArr)
        newFood[event.target.name] = event.target.value
        setFood(newFood)
    }
    
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
        const eventFood = foodsArr.filter(f => f.eventId === parseInt(props.match.params.eventId)) || {}
        setEventFood(eventFood)
    },[foodsArr])

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
    const constructNewFood = () => {
        if(editMode) {
            //updateFood()
            //double check how to get event id
           // .then(() => props.history.push(`/events/${event.id}`))
        } else {
            addFood({
                //double check how to send the correct data
                name: newFoodItem.name,
                eventId: event.id,
                foodTypeId: parseInt(newFoodItem.foodType),
                userId: parseInt(localStorage.getItem("gatherings_customer"))
            })
        }
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
            <div>
                {foodItem.map(f => {
                if(f.foodTypeId === 1) {
                return <Food key={f.id} food={f} />
                }
                })}
            </div>
                <input type="text" placeholder="type here"
                 name="name" value={newFoodItem.name}
                 onChange={handleInputChange}></input>
                <input type="hidden" name="foodType" value={newFoodItem.foodType = 1}/>
                <button onClick={() => {
                    constructNewFood()
                }}>Save</button>



            <label>Sides:</label>
            <div>
                {foodItem.map(f => {
                if(f.foodTypeId === 2) {
                return <Food key={f.id} food={f} />
                }
                })}
            </div>
                <input type="hidden"  value="2"/>
                <input type="text"  placeholder="type here"></input>
                <button onClick={() => {
                    constructNewFood()
                    
                }}>Save</button>
            <label>Desserts:</label>
                <input type="hidden"  value="3"/>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Snacks:</label>
                <input type="hidden"  value="5"/>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Drinks:</label>
                <input type="hidden"  value="4"/>
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