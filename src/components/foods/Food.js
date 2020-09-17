import React, { useContext, useEffect } from "react"
import {UserContext} from "../users/UserProvider"
import { FoodContext } from "./FoodProvider"

export const Food = ({food}) => {
    const {deleteFood} = useContext(FoodContext)
    const {users, getUsers} = useContext(UserContext)
    const userFood = users.find(u => u.id === food.userId) || {}

    useEffect(() => {
        getUsers()
        },[])

    return (
        <div className="renderedFood">
            <div className="food">{food.name}</div> 
            <div className="userFood">-{userFood.fname}</div>
            {food.userId === parseInt(localStorage.getItem("gatherings_customer")) ?
            <button className="deleteFood" onClick={() => deleteFood(food.id)}>X</button> : ""}
        </div>
    )
}
 