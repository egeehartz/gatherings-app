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
        <>
    <div>{food.name} -{userFood.name}</div>
    {food.userId === parseInt(localStorage.getItem("gatherings_customer")) ?
    <button onClick={() => {
        deleteFood(food.id)}}>x</button> : ""}
        </>
    )
}
 