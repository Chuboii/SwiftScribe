import "./Settings.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import {db} from '/src/utils/appwrite/appwrite.utils'
import { UserContext } from "../../context/UserContext"
import Skeleton from '@mui/material/Skeleton';
import {useContext, useEffect, useState} from "react"
import EditProfile from "/src/components/edit profile/EditProfile"
import {ToggleContext} from "/src/context/ToggleContext"
export default function Settings(){
  const [isLoadedFromServer, setIsLoadedFromServer] = useState(false)
 const {currentUser, setUserDocId} = useContext(UserContext)
 const [user, setUser] = useState(null)
 const parsedUser = user ? JSON.parse(user.user) : ""
 const {toggleEdit, setToggleEdit} = useContext(ToggleContext)
  
  useEffect(() => {
   
    if (!isLoadedFromServer) {
      const getUsers = async () => {
        const res = await db.getDocument('652755cdc76b42b46adb', '652755d73451dcffebde', currentUser.uid)
setIsLoadedFromServer(true)
        setUser(res)
       // console.log(res);
      localStorage.setItem("userDocId", res.user)
      const storage = localStorage.getItem("userDocId")
      setUserDocId(storage ? JSON.parse(storage) : null)
      }

      getUsers()
      
    }
 },[isLoadedFromServer, user])
 
 
  return (
    <>
   {toggleEdit && <EditProfile/>}
    <div className="settings-container">
    <h1 className="setting-h1"> Settings</h1>
    <div className="setting-item"> 
    <div className="setting-txt-box">
<p className="setting-txt"> Email Address </p>
<p className="setting-txt-t">{user ? parsedUser.email : (  <Skeleton sx={{width:"100px"}} animation="wave"/>)} </p>
</div>
    <div className="setting-txt-box">
<p className="setting-txt">Username </p>
<p className="setting-txt-tt" style={{display:"flex", alignItems:"center"}}> <span>@</span>{user ? parsedUser.username.toLowerCase() : (  <Skeleton sx={{width:"100px"}} animation="wave"/>)}  </p>
</div>
<div className="setting-public">
<div className="setting-pub-text-box">
<p className="setting-pub-txt"> Public Information</p>
<p className="setting-pub-edit" onClick={()=> setToggleEdit(true)}> Edit your photo, email, bio, etc</p>
</div>
<div className="setting-pub-user">
<p className="setting-pub-name"> {user ? parsedUser.displayName : ( <Skeleton sx={{width:"100px"}} animation="wave"/>)} </p>
<img src={user ? parsedUser.photoURL : (  <Skeleton sx={{width:"100px"}} animation="wave"/>)}  className="setting-pub-img" />
</div>
</div>

<div className="setting-disable">
<p className="setting-d-txt"> Deactivate account</p>
<p className="setting-d-t">Deactivating will suspend your account until you sign back in. </p>
</div>


<div className="setting-delete">
<p className="setting-d-txt"> Delete account</p>
<p className="setting-d-t">Permanently delete your account and all of your content.</p>
</div>
</div>
    </div>
    </>
    )
}