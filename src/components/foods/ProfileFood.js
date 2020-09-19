import React from "react"
import {Link} from "react-router-dom"



export const ProfileFood = ({food}) => (

    <Link to={`/events/${food.eventId}`}>
    <div>{food.name} (for {food.event.name}) </div>
    </Link>
)