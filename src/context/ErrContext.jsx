import {createContext} from "react"
import {useState} from "react"

export const ErrContext = createContext()

export const ErrProvider = ({children})=>{
  const [isErrToggled, setIsErrToggled] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  
  const toggleErrBox = () => {
    setIsErrToggled(!isErrToggled)
  }
  
  
  const value = {isErrToggled, setIsErrToggled, toggleErrBox, errMsg, setErrMsg}
  
  return (
    <ErrContext.Provider value={value}>
   {children}
    </ErrContext.Provider>
    )
}