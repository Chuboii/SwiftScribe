import {v4 as uuidv4} from "uuid"
import "./SettingUp.scss"
import AddAvatar from "/src/components/add avatar/AddAvatar"
import {UserContext} from "/src/context/UserContext"
import {useContext, useState, useRef} from "react"
import {db, storage} from "/src/utils/appwrite/appwrite.utils"
import { updateProfile } from 'firebase/auth'
import { useNavigate } from "react-router-dom"


export default function SettingUp(){
  const {currentUser,isEmail, isGoogleSignupAvatar} = useContext(UserContext)
  const [value, setValue] = useState({
    name: currentUser.displayName,
    bio: "",
    username:""
  })
  const ref = useRef()
  const [fileName] = useState("uploader")
  const navigate = useNavigate()
   
  const submitForm = async (e) =>{
    e.preventDefault()
  const {name, bio, username} = value
    const date = new Date()
    if (name && bio && username ) {
      try {
        if (currentUser.photoURL === null) {
          await storage.createFile(
            '6527ea2a83ff9adab8e7',
            currentUser.uid,
            document.getElementById(fileName).files[0]
          )

          const imageUrl = await storage.getFileView("6527ea2a83ff9adab8e7", currentUser.uid)
       
        
          await updateProfile(currentUser, {
            displayName: value.name,
            photoURL: imageUrl.href
          }
          )
        }
        else {
         try{ 
          await storage.createFile(
            '6527ea2a83ff9adab8e7',
            currentUser.uid,
            document.getElementById(fileName).files[0]
          )

          const imageUrl = await storage.getFileView("6527ea2a83ff9adab8e7", currentUser.uid)
         
          await updateProfile(currentUser, {
            displayName: value.name,
            photoURL: imageUrl.href === null ? currentUser.photoURL : imageUrl.href
          })
         } catch(e){
           if(e.message === `Missing required parameter: "file""`){
             await updateProfile(currentUser, {
            displayName: value.name,
            photoURL:  currentUser.photoURL
          })
           }
         }
          
        }

     const userInfo = {
       user: [JSON.stringify({
         id: uuidv4(),
         dateCreated: date,
         username: value.username.toLowerCase(),
         bio: value.bio,
         followers: 0,
         following:0,
         isDisabled: false,
         isFollowing: false,
         displayName: currentUser.displayName,
         email: currentUser.email,
         photoURL: currentUser.photoURL
})]}
     
      await db.createDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid, userInfo)
        navigate('/')
     

      }
   catch(e){
     console.log(e)
   }
    }
    else {
      ref.current.style.borderBottom ='1px solid red'
    }
  }
  
  const changeValue = (e) =>{
    setValue(prev =>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  
  return(
    <>
    <div className="setting-up-container">
        <h2 style={{ marginTop: "3rem" }} className="setting-up-title"> SwiftScribe</h2>
    
    <form className="setting-up-form" onSubmit={submitForm}>
    <p style={{textAlign:"center", marginBottom:"1rem", fontSize:"21px", fontWeight:"500"}}> Almost there! </p>
    <p style={{textAlign:"center", marginBottom:"2rem", fontSize:"18px", padding:"0 2rem"}}> Finish creating your account for the full SwiftScribe Experience. </p>
    <div className="setting-up-input-group">
    <label style={{display:"block", fontSize:"14px", color:'gray'}} htmlFor=""> Your full name</label>
            <input value={value.name} className={value.name=== "" ? "setting-up-inp-active" : "setting-up-inp"} name="name" onChange={changeValue}   ref={ref} />
    </div>
     <div className="setting-up-input-group">
    <label style={{display:"block", fontSize:"14px", color:'gray'}} htmlFor=""> Your username</label>
            <input value={value.username} className={value.username === "" ? "setting-up-inp-active" : "setting-up-inp"} name="username" onChange={changeValue} />
    </div>
    
    <div className="setting-up-input-group">
    <label style={{display:"block", fontSize:"14px", color:'gray'}} htmlFor=""> Your bio</label>
            <input value={value.bio} className={value.bio === "" ? "setting-up-inp-active" : "setting-up-inp"} name="bio" onChange={changeValue} />
    </div>
        <div className="setting-up-input-group">
    <label style={{display:"block", fontSize:"14px", color:'gray', marginBottom:".5rem"}}  htmlFor=""> Your email</label>
    <p>{currentUser.email}</p>
    </div>
    {isGoogleSignupAvatar && <p style={{fontSize:"13px",display:"flex", flexDirection:"column", justifyContent:"center", alignItem:"center", textAlign:"center"}}> It appears you are using google to signup, you can change your avatar here
      <AddAvatar fileID={fileName} />
        </p>}
    {isEmail && <AddAvatar fileID={fileName} />}
    <button className="create-acct-btn"> Create account </button>
   </form>
    </div>
    </>
    )
}