import React, {useContext, useEffect} from "react"
import {UserContext} from "../users/UserProvider"


export const ProfileActivity = ({activity}) => {
    //const {users, getUsers} = useContext(UserContext)
    //const userActivity = users.find(u => u.id === props.activity.userId) || {}

    //useEffect(() => {
      //  getUsers()
        //},[])

    return(
<div>{activity.text}</div>
)}