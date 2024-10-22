import React, { useState } from "react"

export const ActivityContext = React.createContext()

export const ActivityProvider = (props) => {
    const [activities, setActivities] = useState([])

    const getActivities = () => {
        //expanded so I can access event.name from activity in Responsibilites
        return fetch("http://localhost:8088/activities?_expand=event")
            .then(res => res.json())
            .then(setActivities)
    }

    const getActivityById = (id) => {
        return fetch(`http://localhost:8088/activities/${id}`)
            .then(res => res.json())
    }

    const addActivity = activity => {
        return fetch("http://localhost:8088/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activity)
        })
            .then(getActivities)
    }

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
*/