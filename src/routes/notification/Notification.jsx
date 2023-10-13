import "./Notification.scss"
import {ToggleContext} from "/src/context/ToggleContext"
import {useContext} from "react"
export default function Notification(){
  const {setToggleMenu} = useContext(ToggleContext)
  return(
    <>
    <div className="notification-container" onClick={() => setToggleMenu(false)}>
    <h2 className="notification-h2"> Notifications </h2>
    <div className="notification-box">
    You're up to date
    </div>
    </div>
    </>
    )
}