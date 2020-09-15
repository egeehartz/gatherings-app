import React, {useContext, useEffect} from "react"
import {UserContext} from "../users/UserProvider"
import { MiscContext } from "./MiscProvider"


export const Misc = (props) => {
    const {users, getUsers} = useContext(UserContext)
    const {deleteMisc} = useContext(MiscContext)
    const userMisc = users.find(u => u.id === props.misc.userId) || {}

    useEffect(() => {
        getUsers()
        },[])
return(
    <>
        <div>{props.misc.text} -{userMisc.name}</div>
        {props.misc.userId === parseInt(localStorage.getItem("gatherings_customer")) ?
    <button onClick={() => {
        deleteMisc(props.misc.id)}}>x</button> : ""}
    </>
)}