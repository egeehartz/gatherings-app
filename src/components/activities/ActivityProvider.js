import React, { useState } from "react"

export const ActivityContext = React.createContext()

export const ActivityProvider = (props) => {
    const [activities, setActivities] = useState([])

    const getActivities = () => {
        return fetch("http://localhost:8088/activities")
            .then(res => res.json())
            .then(setActivities)
    }

    const getActivityById = (id) => {
        return fetch(`http://localhost:8088/activities/${id}`)
            .then(res => res.json())
    }

    const addActivity = Activity => {
        return fetch("http://localhost:8088/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Activity)
        })
            .then(getActivities)
    }

    //for deleting Activity functionality
    const deleteActivity = (activityId) => {
        return fetch(`http://localhost:8088/activities/${activityId}`, {
            method: "DELETE"
        })
        .then(getActivities)
}
    
    return (
        <ActivityContext.Provider value={{
            activities, getActivities,  getActivityById, addActivity, deleteActivity
        }}>
            {props.children}
        </ActivityContext.Provider>
    )
}

/* 
//for editing functionality
const updateActivity = activity => {
    return fetch(`http://localhost:8088/activities/${activity.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(Activity)
        })
            .then(getActivities)
}

//for deleting Activity functionality
const deleteActivity = (activityId) => {
        return fetch(`http://localhost:8088/activities/${activityId}`, {
            method: "DELETE"
        })
        .then(getActivities)
    }

*/