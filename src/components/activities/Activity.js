import React, {useContext, useEffect} from "react"
import {UserContext} from "../users/UserProvider"
import { ActivityContext } from "./ActivityProvider"


export const Activity = (props) => {
    const {deleteActivity} = useContext(ActivityContext)
    const {users, getUsers} = useContext(UserContext)
    const userActivity = users.find(u => u.id === props.activity.userId) || {}

    useEffect(() => {
        getUsers()
        },[])

    return(
    <div className="renderedActivity">
        <div className="activity">{props.activity.text} -{userActivity.fname}</div>
        {props.activity.userId === parseInt(localStorage.getItem("gatherings_customer")) ?
        <button className="deleteActivity" onClick={() => {
            deleteActivity(props.activity.id)}}>X</button> : ""}
    </div>
)}