import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"


const EventPlanningSpace = props => {
    //double check that these are the correct variable names
    const {events, addEvent, getEvents } = useContext(EventContext)
    const {food, addFood, getFood} = useContext(FoodContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)

    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getActivities()
        getMisc()
    }, [])

    //POST
    const constructNewEvent = () => {
        
    }
    const constructNewFood = () => {
        addFood({
            //double check how to send the correct data
            name: food.name,
            eventId: eventId,
            foodTypeId: foodTypeId,
            userId: parseInt(localStorage.getItem("gatherings_customer"))
    })
    }
    const constructNewActivity = () => {
    }
    const constructNewMisc = () => {
    }




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

   return (
       <form className="animalForm">
           <h2 className="animalForm__title">{editMode ? "Update Animal" : "Admit Animal"}</h2>
           <fieldset>
               <div className="form-group">
                   <label htmlFor="name">Animal name: </label>
                   <input type="text" name="name" required autoFocus className="form-control"
                       placeholder="Animal name"
                       defaultValue={animal.name}
                       onChange={handleControlledInputChange}
                   />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-group">
                   <label htmlFor="breed">Animal breed: </label>
                   <input type="text" name="breed" required className="form-control"
                       placeholder="Animal breed"
                       defaultValue={animal.breed}
                       onChange={handleControlledInputChange}
                   />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-group">
                   <label htmlFor="eventId">event: </label>

                   <select name="eventId" className="form-control"

                       value={animal.eventId}

                       onChange={handleControlledInputChange}>

                       <option value="0">Select a event</option>

                       {events.map(e => (

                           <option key={e.id} value={e.id}>
                               {e.name}
                           </option>
                       ))}
                   </select>
               </div>
           </fieldset>
           <fieldset>
               <div className="form-group">
                   <label htmlFor="treatment">Treatments: </label>
                   <textarea type="text" name="treatment" className="form-control"
                       value={animal.treatment}
                       onChange={handleControlledInputChange}>
                   </textarea>
               </div>
           </fieldset>
           <button type="submit"
               onClick={evt => {
                   evt.preventDefault()
                   constructNewAnimal()
               }}
               className="btn btn-primary">
               {editMode ? "Save Updates" : "Make Reservation"}
           </button>
       </form>
   )
}
 */