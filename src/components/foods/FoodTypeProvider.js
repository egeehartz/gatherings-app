import React, { useState } from "react"

export const FoodTypeContext = React.createContext()

export const FoodTypeProvider = (props) => {
    const [foodTypes, setFoodTypes] = useState([])

    const getFoodType = () => {
        return fetch("http://localhost:8088/foodTypes")
            .then(res => res.json())
            .then(setFoodTypes)
    }

    const addFoodType = foodType => {
        return fetch("http://localhost:8088/foodTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodType)
        })
            .then(getFoodType)
    }
    
    return (
        <FoodTypeContext.Provider value={{
            foodTypes, setFoodTypes,
             getFoodType, addFoodType, 
        }}>
            {props.children}
        </FoodTypeContext.Provider>
    )
}