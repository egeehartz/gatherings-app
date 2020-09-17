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
    <div className="renderedMisc">
        <div className="misc">{props.misc.text} -{userMisc.fname}</div>
        {props.misc.userId === parseInt(localStorage.getItem("gatherings_customer")) ?
    <button className="deleteMisc" onClick={() => {
        deleteMisc(props.misc.id)}}>X</button> : ""}
    </div>
)}