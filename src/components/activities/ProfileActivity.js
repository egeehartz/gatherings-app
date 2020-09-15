import React from "react"
import {Link} from "react-router-dom"



export const ProfileActivity = ({activity}) => (
<Link to={`/events/${activity.eventId}`}>
<div>{activity.text} </div>
</Link>
)