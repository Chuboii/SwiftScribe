import {createContext, useState} from "react"

export const ToggleContext = createContext()

export const ToggleProvider = ({children}) =>{
  const [toggleSubHeader, setToggleSubHeader] = useState(true)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleEdit, setToggleEdit] = useState(false)
const [loaderNum, setLoaderNum] = useState(10)

  const value = {toggleMenu,toggleEdit, setToggleEdit ,setToggleMenu, loaderNum, setLoaderNum}
  return(
    <ToggleContext.Provider value={value}>
    {children}
    </ToggleContext.Provider>
    )
}