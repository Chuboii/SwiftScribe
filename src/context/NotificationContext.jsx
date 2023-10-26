import {createContext} from "react"
import {useState} from "react"

export const NotificationContext = createContext()

export const NotificationProvider = ({children})=>{
  const [notifyUser, setNotifyUser] = useState(false)
  
  
  
  const value = {notifyUser, setNotifyUser}
  
  return (
    <NotificationContext.Provider value={value}>
   {children}
    </NotificationContext.Provider>
    )
}