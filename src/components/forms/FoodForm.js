import React, {useContext, useRef} from "react"
import { CardBody, Card } from 'reactstrap';
import { EventContext } from "../events/EventsProvider"
import { FoodContext } from "../foods/FoodProvider"
import { Food } from "../foods/Food"

//this component starts to handle food items in the event planning space
//food items get sent to the Food component for the rest of the html representation
export const FoodForm = (props) => {
    const {foodsArr, addFood} = useContext(FoodContext)
    const {events} = useContext(EventContext)
    
    //fname represents food name
    const fname = useRef(null)

    //find the specific event object that matches the event id from the url
    const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}

    //find the food that has the eventId that matches the event id from the url
    const eventFood = foodsArr.filter(f => f.eventId === parseInt(props.match.params.eventId)) || {}
    //filter the eventFood to organize food type
    const filteredFood = eventFood.filter(ef => ef.foodTypeId === props.foodTypeObj.id) || {}
    
    //POST
    const constructNewFood = () => {
        addFood({
            name: fname.current.value,
            eventId: event.id,
            foodTypeId: parseInt(props.foodTypeObj.id),
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
        .then(fname.current.value = "")
    }

    return (
        <>
        <Card>
            <CardBody>
            <h3 className="typeTitle">{props.foodTypeObj.type}</h3>
            <div className="renderedItemsContainer">{filteredFood.map(ff => {
                return <Food key={ff.id} food={ff}  />
                })}
            </div>
            <div className="inputButton">
            <input className="mainInput" type="text" placeholder="type here" name="fname"
                ref={fname}></input>
            <button onClick={() => {
                constructNewFood()
            }}>Save</button>
            </div>
            </CardBody>
        </Card>
        </>
    )
}
