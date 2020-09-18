import React, { useState } from "react"

export const MiscContext = React.createContext()

export const MiscProvider = (props) => {
    const [misc, setMisc] = useState([])

    const getMisc = () => {
        return fetch("http://localhost:8088/misc?_expand=event")
            .then(res => res.json())
            .then(setMisc)
    }

    const getMiscById = (id) => {
        return fetch(`http://localhost:8088/misc/${id}`)
            .then(res => res.json())
    }

    const addMisc = Misc => {
        return fetch("http://localhost:8088/misc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Misc)
        })
            .then(getMisc)
    }

    //for deleting Misc functionality
    const deleteMisc = (miscId) => {
        return fetch(`http://localhost:8088/misc/${miscId}`, {
            method: "DELETE"
        })
        .then(getMisc)
    }
    
    return (
        <MiscContext.Provider value={{
            misc, getMisc,  getMiscById, addMisc, deleteMisc
        }}>
            {props.children}
        </MiscContext.Provider>
    )
}

/* 
//for editing functionality
const updateMisc = misc => {
    return fetch(`http://localhost:8088/misc/${misc.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(misc)
        })
            .then(getMisc)
}

//for deleting Misc functionality
const deleteMisc = (miscId) => {
        return fetch(`http://localhost:8088/misc/${miscId}`, {
            method: "DELETE"
        })
        .then(getMisc)
    }

*/