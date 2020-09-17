import React, { useEffect, useContext } from "react"
import {UserContext} from "./UserProvider"

export const Users = ({items}) => {
    const { users, getUsers } = useContext(UserContext)
    
    useEffect(() => {
        getUsers()
    }, [])

    const user = items.map(i => {
        return users.find(u => {
           return u.id === i.userId
        })
    })

    return (
    <div>{user.map(u => {
        return <div className="userRSVP">{u.fname}</div>
    })}</div>

    )
}