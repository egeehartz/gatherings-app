import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Profile Page</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/plan">plan</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/logout">Logout</Link>
            </li>
        </ul>
    )
}