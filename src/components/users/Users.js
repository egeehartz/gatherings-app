import React, { useEffect, useContext, useState } from "react"
import { UserContext } from "./UserProvider"

//this component is called 3 times in EventPlanningSpace.js (for each RSVP category)
//this component handles the html representation of listing users in the RSVP categories
//the value of items is an array of users sorted by their RSVP status
//goingArr (users where RSVP === true), etc ...
export const Users = ({items}) => {
    const {users, getUsers} = useContext(UserContext)
    
    const [usersByStatus, setStateUser] = useState([])

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        const foundUsers = items.map(i => {
            return users.find(u => {
               return u.id === i.userId
            }) || {}
        })
        setStateUser(foundUsers)
    },[users, items])
    
        return (
        <div>
            {usersByStatus.length === 0 ? "" : 

                usersByStatus.map(u => {
                    return <div key={u.id} className="userRSVP">{u.fname}</div>
                })
            }
        </div>
        )
}