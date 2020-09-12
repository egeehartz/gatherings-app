import React, { useState } from "react"

export const FoodContext = React.createContext()

export const FoodProvider = (props) => {
    const [food, setFoods] = useState([])

    const getFood = () => {
        return fetch("http://localhost:8088/food")
            .then(res => res.json())
            .then(setFoods)
    }

    const getFoodById = (id) => {
        return fetch(`http://localhost:8088/food/${id}`)
            .then(res => res.json())
    }

    const addFood = Food => {
        return fetch("http://localhost:8088/food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Food)
        })
            .then(getFood)
    }
    
    return (
        <FoodContext.Provider value={{
            food, getFood,  getFoodById, addFood
        }}>
            {props.children}
        </FoodContext.Provider>
    )
}

/* 
//for editing functionality
const updateFood = Food => {
    return fetch(`http://localhost:8088/food/${food.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(Food)
        })
            .then(getFood)
}

//for deleting Food functionality
const deleteFood = (FoodId) => {
        return fetch(`http://localhost:8088/food/${FoodId}`, {
            method: "DELETE"
        })
        .then(getFood)
    }

*/