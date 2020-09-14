import React, {useContext, useEffect} from "react"
import {UserContext} from "../users/UserProvider"


export const Misc = (props) => {
    const {users, getUsers} = useContext(UserContext)
    const userMisc = users.find(u => u.id === props.misc.userId) || {}

    useEffect(() => {
        getUsers()
        },[])
return(
<div>{props.misc.text} -{userMisc.name}</div>
)}