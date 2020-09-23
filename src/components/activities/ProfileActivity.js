import React from "react"
import { Link } from "react-router-dom"


//this component handles the rendering of activitities in a user's responsibility page
export const ProfileActivity = ({activity}) => (
    <Link className="ulContainer" to={`/events/${activity.eventId}`}>
        <div className="itemName">{activity.text}</div>
        <div className="eventName"> (for {activity.event.name}) </div>
    </Link>
)