import React, { useContext, useState, useEffect } from "react"
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
    const [tEvents, setEvents] = useState([])
    const [tFood, setFood] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
   

    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getActivities()
        getMisc()
        getEventType()
    }, [])

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
            name: food.name,
            //eventId: eventId,
            //foodTypeId: foodTypeId,
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
    <h2>
        test test test 
        {/* {props.location.state.chosenEvent.name} */}
    </h2>
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
            {/*onChange=evt => constructNewFood()
                .then() ?
            */}
            <label>Main:</label>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Sides:</label>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Desserts:</label>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Snacks:</label>
                <input type="text" placeholder="type here"></input>
                <button>Save</button>
            <label>Drinks:</label>
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