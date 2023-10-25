import "./Notification.scss"
import {ToggleContext} from "/src/context/ToggleContext"
import {db} from "/src/utils/appwrite/appwrite.utils"
import {useContext, useState, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"

export default function Notification(){
  const {currentUser} = useContext(UserContext)
 const [data, setData] = useState(null)
 
useEffect(()=>{
  
  const getData = async()=>{
    const res = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", currentUser.uid)
    setData(res.notify)
  console.log(res)
  }
  
  getData()
  
  
},[])
  
  
  
  return(
    <>
    <div className="notification-container" onClick={() => setToggleMenu(false)}>
    <h2 className="notification-h2"> Notifications </h2>
   {data ? data.slice().reverse().map(doc => {
   const date = new Date(JSON.parse(doc).time)
  const time = `0${date.getMinutes()}`
   return(
   <div key={JSON.parse(doc).id} className="notification-box">
    <img src={JSON.parse(doc).photo} className="n-img"/>
    <div className="n-name">
   <b> {JSON.parse(doc).name}</b> - <span style={{textTransform:"lowercase"}}>{JSON.parse(doc).task}</span> <b>{JSON.parse(doc).post} </b> 
   {JSON.parse(doc).postImg ? <img style={{width:"30px", position:"relative",top:"10px", border:"none", borderRadius:"5px", height:"30px"}} src={JSON.parse(doc).postImg}/> : ""}
   <span style={{position:"absolute",fontSize:"12px" ,right:"1rem"}}>{`${date.getHours()}: ${date.getMinutes() > 0 && date.getMinutes() < 10 ? time: date.getMinutes()  }`}</span>
    </div>
    </div>
     )}) : ""
   }
    </div>
    </>
    )
}