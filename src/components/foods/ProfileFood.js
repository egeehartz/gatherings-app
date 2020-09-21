import React from "react"
import { Link } from "react-router-dom"


//this component handles rendering the food items in a user's responsibilities page
export const ProfileFood = ({food}) => (
    <Link to={`/events/${food.eventId}`}>
        <div>{food.name} (for {food.event.name}) </div>
    </Link>
)