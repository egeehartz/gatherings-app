import React, { useState } from "react"

export const FoodContext = React.createContext()

export const FoodProvider = (props) => {
    const [foodsArr, setFoods] = useState([])

    const getFood = () => {
        return fetch("http://localhost:8088/food?_expand=foodType&_expand=event")
            .then(res => res.json())
            .then(setFoods)
    }

    const getFoodById = (id) => {
        return fetch(`http://localhost:8088/food/${id}?_expand=foodType`)
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

    const deleteFood = (foodId) => {
        return fetch(`http://localhost:8088/food/${foodId}`, {
            method: "DELETE"
        })
        .then(getFood)
}
    
    return (
        <FoodContext.Provider value={{
            foodsArr, getFood,  getFoodById, addFood, deleteFood
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
*/