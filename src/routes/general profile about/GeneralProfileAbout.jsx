import "./GeneralProfileAbout.scss"
import {useContext, useEffect, useState} from "react"
import {UserContext} from "/src/context/UserContext"
import {db} from "/src/utils/appwrite/appwrite.utils"
export default function GeneralProfileAbout(){
  const {usersProfile} = useContext(UserContext)
  const [data, setData] = useState(null)
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  
  useEffect(()=>{
    const getData = async() =>{
      console.log(usersProfile)
      try{
      const res = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
      setData(res)
      
      }
      catch(e){
        console.log(e)
      }
    }
    getData()
  },[])
  const parsed = data ? JSON.parse(data.user).dateCreated : ""
const date = new Date(parsed)
  return(
    <>
    <div className="generalprofileabout-container">
    <p className="gpa-bio">{data ? JSON.parse(data.user).bio : ""} </p>
    <p className="gpa-member"> SwiftScribe memeber since {date.toLocaleDateString('en-US', options)} </p>
    
    </div>
    </>
    )
}