import {createContext, useState} from "react"

export const ToggleContext = createContext()

export const ToggleProvider = ({children}) =>{
  const [toggleSubHeader, setToggleSubHeader] = useState(true)
  const [toggleMenu, setToggleMenu] = useState(false)
  const value = {toggleMenu, setToggleMenu}
  return(
    <ToggleContext.Provider value={value}>
    {children}
    </ToggleContext.Provider>
    )
}