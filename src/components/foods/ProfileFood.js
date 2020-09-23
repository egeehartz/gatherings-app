import React from "react"
import { Link } from "react-router-dom"


//this component handles rendering the food items in a user's responsibilities page
export const ProfileFood = ({food}) => (
    <Link className="ulContainer" to={`/events/${food.eventId}`}>
        <div className="itemName">{food.name}</div>
        <div className="eventName">(for {food.event.name})</div>
    </Link>
)