import React, {useContext, useRef} from "react"
import { EventContext } from "../events/EventsProvider"
import {FoodContext} from "../foods/FoodProvider"
import {Food} from "../foods/Food"
import {UserContext} from "../users/UserProvider"
import { CardBody, Card } from 'reactstrap';





export const FoodForm = (props) => {
    const fname = useRef(null)
    const {foodsArr, addFood} = useContext(FoodContext)
    const {events} = useContext(EventContext)
    const {users} = useContext(UserContext)

    //const editMode = props.match.params.hasOwnProperty("foodId")

    const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
    //
    const eventFood = foodsArr.filter(f => f.eventId === parseInt(props.match.params.eventId)) || {}
    const filteredFood = eventFood.filter(ef => ef.foodTypeId === props.foodTypeObj.id) || {}
    //
    

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
            })}</div>
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


//getFoodTypes, map, generate FoodForm component 