import React, {useContext, useEffect} from "react"
import {UserContext} from "../users/UserProvider"


export const Activity = (props) => {
    const {users, getUsers} = useContext(UserContext)
    const userActivity = users.find(u => u.id === props.activity.userId) || {}

    useEffect(() => {
        getUsers()
        },[])

    return(
<div>{props.activity.text} -{userActivity.name}</div>
)}