import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventsProvider"
import { EventTypeContext } from "./EventTypeProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"


export const EventPlanningSpace = props => {
    //double check that these are the correct variable names
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {food, addFood, getFood} = useContext(FoodContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)
    const {eventTypes, getEventType} = useContext(EventTypeContext)

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
    }
    const constructNewMisc = () => {
    }

return (
    <>
    <h2>{/* Event Title, how do I get the specific one?*/}Test</h2>
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
            {/*onChange=evt => addFood
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




/**
 export const AnimalForm = (props) => {

    // Component state
    const [animal, setAnimal] = useState({})

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("animalId")  // true or false

    const handleControlledInputChange = (event) => {
        /*
          //  When changing a state object or array, always create a new one
            //and change state instead of modifying current one
        
       const newAnimal = Object.assign({}, animal)          // Create copy
       newAnimal[event.target.name] = event.target.value    // Modify copy
       setAnimal(newAnimal)                                 // Set copy as new state
   }

   /*
       If there is a URL parameter, then the user has chosen to
       edit an animal.
           1. Get the value of the URL parameter.
           2. Use that `id` to find the animal.
           3. Update component state variable.
   
   const getAnimalInEditMode = () => {
       if (editMode) {
           const animalId = parseInt(props.match.params.animalId)
           const selectedAnimal = animals.find(a => a.id === animalId) || {}
           setAnimal(selectedAnimal)
       }
   }

   // Get animals from API when component initializes
   useEffect(() => {
       getAnimals()
       getevents()

   }, [])

   // Once provider state is updated, determine the animal (if edit)
   useEffect(() => {
       getAnimalInEditMode()
   }, [animals])


   const constructNewAnimal = () => {
       const eventId = parseInt(animal.eventId)
       if (eventId === 0) {
           window.alert("Please select a event")
       } else {
           if (editMode) {
               // PUT
               updateAnimal({
                   id: animal.id,
                   name: animal.name,
                   breed: animal.breed,
                   eventId: eventId,
                   treatment: animal.treatment,
                   customerId: parseInt(localStorage.getItem("kennel_customer"))
               })
                   .then(() => props.history.push("/animals"))
           } else {
               // POST
               addAnimal({
                   name: animal.name,
                   breed: animal.breed,
                   eventId: eventId,
                   treatment: animal.treatment,
                   customerId: parseInt(localStorage.getItem("kennel_customer"))
               })
                   .then(() => props.history.push("/animals"))
           }
       }
   }
}
 */