import React, { useEffect, useContext } from "react"
import { UserContext } from "./UserProvider"

//this component is called 3 times in EventPlanningSpace.js (for each RSVP category)
//this component handles the html representation of listing users in the RSVP categories
//the value of items is an array of users sorted by their RSVP status
//goingArr (users where RSVP === true), etc ...
export const Users = ({items}) => {
    const {users, getUsers} = useContext(UserContext)
    
    useEffect(() => {
        getUsers()
    }, [])

    const user = items.map(i => {
        return users.find(u => {
           return u.id === i.userId
        })
    })

    return (
    <div>
        {
            user.map(u => {
                return <div className="userRSVP">{u.fname}</div>
            })
        }
    </div>
    )
}