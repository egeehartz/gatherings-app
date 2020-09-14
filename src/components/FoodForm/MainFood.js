import React, {useContext, useRef} from "react"
import { EventContext } from "../events/EventsProvider"
import {FoodContext} from "../foods/FoodProvider"
import {Food} from "../foods/Food"




export const FoodForm = (props) => {
    const fname = useRef(null)
    const {foodsArr, addFood} = useContext(FoodContext)
    const {events} = useContext(EventContext)

    const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
    const eventFood = foodsArr.filter(f => f.eventId === parseInt(props.match.params.eventId)) || {}
    const filteredFood = eventFood.filter(ef => ef.foodTypeId === props.foodTypeObj.id)

    const constructNewFood = () => {
        addFood({
            name: fname.current.value,
            eventId: event.id,
            foodTypeId: parseInt(props.foodTypeObj.id),
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
    }
    return (
        <>
            <h2>{props.foodTypeObj.type}</h2>
            <div>{filteredFood.map(ff => {
                return <Food key={ff.id} food={ff} />
            })}</div>
            <input type="text" placeholder="type here" name="fname"
                ref={fname}></input>
            <button onClick={() => {
                constructNewFood()
            }}>Save</button>
        </>
    )



}


//getFoodTypes, map, generate FoodForm component 