import React, { useContext, useEffect } from "react"
import { UserContext } from "../users/UserProvider"
import { ActivityContext } from "./ActivityProvider"

//this component handles the rendering of activities in the event planning space
export const Activity = (props) => {
    const {deleteActivity} = useContext(ActivityContext)
    const {users, getUsers} = useContext(UserContext)
    const userActivity = users.find(u => u.id === props.activity.userId) || {}

    useEffect(() => {
        getUsers()
        },[])

    /* 
    * use the ternary operator to determine if the
    * logged in user matches the activity being rendered
    * if it is, display the delete button!
    */
    return(
    <div className="renderedActivity">
        <div className="activity">{props.activity.text} <div className="aUsername"> -{userActivity.fname}</div></div>
        {props.activity.userId === parseInt(localStorage.getItem("gatherings_customer")) ?
        <button className="deleteActivity" onClick={() => {
            deleteActivity(props.activity.id)}}>X</button> : ""}
    </div>
)}
