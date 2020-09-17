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
    <div>{user.fname}</div>

    )
}