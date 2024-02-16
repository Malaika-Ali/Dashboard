import React, { createContext, useContext, useState } from "react";


export const StateContext = createContext();

const initialState = {
    notification: false,
}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setactiveMenu] = useState(true);
    const [isClicked, setisClicked] = useState(initialState)
    const [screenSize, setscreenSize] = useState(undefined)
    //For handling signup details of the user
    const [userData, setUserData] = useState(null);

    const handleClick = (clicked) => {
        setisClicked({ ...initialState, [clicked]: true })
    }

    return (
        <StateContext.Provider value={{ activeMenu, setactiveMenu, isClicked, setisClicked, handleClick, screenSize, setscreenSize, userData, setUserData }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);