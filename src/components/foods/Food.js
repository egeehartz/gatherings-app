import React, { useContext, useEffect } from "react"
import {UserContext} from "../users/UserProvider"

export const Food = ({food}) => {
    
    const {users, getUsers} = useContext(UserContext)
    const userFood = users.find(u => u.id === food.userId) || {}

    useEffect(() => {
        getUsers()
        },[])

    return (
    <div>{food.name}     -{userFood.name}</div>
    )
}
 