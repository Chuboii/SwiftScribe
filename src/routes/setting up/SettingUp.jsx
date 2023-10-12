import {v4 as uuidv4} from "uuid"
import "./SettingUp.scss"
import AddAvatar from "/src/components/add avatar/AddAvatar"
import {UserContext} from "/src/context/UserContext"
import {useContext, useState} from "react"
import {db} from "/src/utils/appwrite/appwrite.utils"

export default function SettingUp(){
  const {currentUser} = useContext(UserContext)
  const [value, setValue] = useState(currentUser.displayName)
  
  
  
  const submitForm = async (e) =>{
    e.preventDefault()
    const date = new Date()
    if(value){
    try{
     
     const userInfo = {
       user: [JSON.stringify({
         id: uuidv4,
         dateCreated: date,
         displayName: currentUser.displayName,
         email: currentUser.email,
         photoURL: currentUser.photoURL
})]}
     
      await db.createDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid, userInfo)
    }
   catch(e){
     console.log(e)
   }
    }
  }
  
  const changeValue = (e) =>{
    setValue(e.target.value)
  }
  
  return(
    <>
    <div className="setting-up-container">
    <h2 style={{marginTop:"3rem"}}> SwiftScribe</h2>
    
    <form className="setting-up-form" onSubmit={submitForm}>
    <p style={{textAlign:"center", marginBottom:"1rem", fontSize:"21px", fontWeight:"500"}}> Almost there! </p>
    <p style={{textAlign:"center", marginBottom:"2rem", fontSize:"18px", padding:"0 2rem"}}> Finish creating your account for the full SwiftScribe Experience. </p>
    <div className="setting-up-input-group">
    <label style={{display:"block", fontSize:"14px", color:'gray'}} htmlFor=""> Your full name</label>
    <input value={value} className={value === "" ? "setting-up-inp-active" : "setting-up-inp"} name="fullName" onChange={changeValue}/>
    </div>
    
        <div className="setting-up-input-group">
    <label style={{display:"block", fontSize:"14px", color:'gray', marginBottom:".5rem"}}  htmlFor=""> Your email</label>
    <p>{currentUser.email}</p>
    </div>
    {currentUser.photoURL ? "" : <AddAvatar/>}
    <button className="create-acct-btn"> Create account </button>
   </form>
    </div>
    </>
    )
}