import React from "react"
import { Link } from "react-router-dom"


//this component handles the rendering of activitities in a user's responsibility page
export const ProfileActivity = ({activity}) => (
    <Link to={`/events/${activity.eventId}`}>
        <div>{activity.text} (for {activity.event.name}) </div>
    </Link>
)