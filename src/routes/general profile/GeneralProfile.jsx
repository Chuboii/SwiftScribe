import "./GeneralProfile.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Link, Outlet} from "react-router-dom"
import img from "/src/assets/swiftscribe logo.jpg"
import Skeleton from '@mui/material/Skeleton';
import {useContext, useState, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"
import {db} from "/src/utils/appwrite/appwrite.utils"
import {v4 as uuidv4} from "uuid"
function getUserDocId() {
  const storage = localStorage.getItem("userDocId")
  return storage ? JSON.parse(storage) : null
}


export default function GeneralProfile(){
  const {usersProfile, currentUser} = useContext(UserContext)
  const [isHomeClicked, setIsHomeClicked] = useState("2px solid")
  const [isAboutClicked, setIsAboutClicked] = useState("none")
  const parsedUser = usersProfile ? usersProfile : ""
  const [friendInfoId, setFriendInfoId] = useState()
  const [data, setData] = useState(null)
  const [isFollowed, setIsFollowed] = useState(false)
  const [userDocId, setUserDocId] = useState(getUserDocId)
  const [reload , setReload] = useState(false)
  const tapHome = () =>{
    setIsHomeClicked("2px solid")
    setIsAboutClicked("none")
  }
  const tapAbout = () => {
    setIsAboutClicked("2px solid")
    setIsHomeClicked("none")
  }

  useEffect(() =>{
    
    const getData = async() =>{
      try{
      const res = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
      setData(res)
      }catch(e){
        console.log(e)
      }
      try{
      const followingRes = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)
      
      const a = followingRes.following.map(el =>{
      return JSON.parse(el).id.includes(userDocId.id)
    } )
    
    const b = a.some(el => el === true)
    
    setIsFollowed(b)
}
catch(e){
  console.log(e)
}
      
     }
    getData()
  }, [isFollowed, reload])
  
  
  
  
  const enableFollow = async () => {
  
 //   console.log(enableFollowing)
 
    try{
    const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
    const otherUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
    
const followingObj = JSON.parse(otherUser.user)
 const followingData = {
     following:[JSON.stringify(followingObj)]
   }
 
 await db.createDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid, followingData)
 setIsFollowed(true)
 console.log("following created successfully")
 
 const date = new Date()
// const withZero = `0${date.getMinutes()}`
 //const currTume = `${date.getHours()}:${date.getMinutes() > 0 && date.getMinutes() < 10 ? withZero : date.getMinutes()}`
 const notifyData = {
   uid: currentUser.uid,
   id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just followed you",
   time: date
 }
 const notice ={
   notify: [JSON.stringify(notifyData)]
 }
 
 await db.createDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", usersProfile, notice)
// setReload("yeah")
 console.log("notified")
    }
    catch(e){
   //console.log(e)
   
    if(e.code === 409){
      
      try{
    
     const getNotify = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", usersProfile)
     console.log(getNotify)
     const date = new Date()
 //    const data = JSON.parse(getNotify.notify)
     const duplicate = getNotify.notify.some(el => JSON.parse(el).uid === currentUser.uid)
 if(!duplicate){
     const nData = {
    uid: currentUser.uid,
     id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just followed you",
   time: date
     }
     
     getNotify.notify.push(JSON.stringify(nData))
  // const data = JSON.parse()
     const notifyData = {
       notify: getNotify.notify
     }
     console.log(notifyData)
    await db.updateDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", usersProfile, notifyData)
     console.log("notify updated")
 }
 else{
   console.log("notify exists already ")
 }
      }
      catch(e){
        console.log(e)
      }
      
        try{
        const otherUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
       
        const existingFollowingDoc = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)

const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)


   if(existingFollowingDoc){
    const data = JSON.parse(otherUser.user)

 const duplicate = existingFollowingDoc.following.some(el => JSON.parse(el).id === JSON.parse(otherUser.user).id)
 if(!duplicate){
 existingFollowingDoc.following.push(JSON.stringify(data))
    
      const updatedData = {  
         following: existingFollowingDoc.following
         }
     await db.updateDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid, updatedData)
  //   console.log("following updated")

    
  const existingFollowingDoc2 =  await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)
 
const followingMap =  [JSON.parse(currUser.user)].map(el =>{
   return JSON.stringify({...el, following: existingFollowingDoc2.following.length})
})
 
 const parsedUpdatedFollowingUser = JSON.parse(followingMap)
 
 const updateFollowingUser ={
   user:[JSON.stringify(parsedUpdatedFollowingUser)]
 }
    await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid, updateFollowingUser)
  console.log('following user updated')
  
  //notify update
/*
try{
     const getNotify = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", usersProfile)
     
     const date = new Date()
     const nData = {
       uid: currentUser.uid,
     id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just followed you",
   time: date
     }
     
     getNotify.notify.push(JSON.stringify(nData))
   
     const notifyData = {
       notify: [getNotify.notify]
     }
   
    await db.updateDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", usersProfile, notifyData)
     console.log("notify updated")
}
catch(e){
  console.log(e)
}*/
     
 setIsFollowed(true)
 }
 else {
   console.log("following exists already")
 }
   }
        }
 catch(e){
  console.log(e)
 }
}
    }
    
    
    
 //Followers async 
    
  try{
    const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
    const clickedUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
    const followersObj = JSON.parse(currUser.user)

    const followersData = {
  followers: [JSON.stringify(followersObj)]
}
    await db.createDocument("652755cdc76b42b46adb", "6530077807326e78f379",usersProfile, followersData)
console.log("follower created successfully")

const existingFollowersDoc2 =  await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile)
 
const followersMap =  [JSON.parse(clickedUser.user)].map(el =>{
   return JSON.stringify({...el, followers: existingFollowersDoc2.followers.length})
})
 
 const parsedUpdatedFollowersUser = JSON.parse(followersMap)
 
 const updatedFollowersUser ={
   user:[JSON.stringify(parsedUpdatedFollowersUser)]
 }
 
 await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile, updatedFollowersUser)
 console.log("follower user updated successfuly")
setReload(!reload)
// window.location.reload() 
}
catch(e){
  console.log(e)
  if(e.code === 409){
    try{
  const existingFollowersDoc = await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile)
  const clickedUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)

  if(existingFollowersDoc){
  const data = JSON.parse(currUser.user)
//console.log(existingFollowersDoc)
 const duplicate = existingFollowersDoc.followers.some(el => JSON.parse(el).id === JSON.parse(currUser.user).id)
 console.log(duplicate)

 if(!duplicate){
   existingFollowersDoc.followers.push(JSON.stringify(data))
    
      const updatedFollowersData = {  
         followers: existingFollowersDoc.followers
         }
     await db.updateDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile,updatedFollowersData)
       console.log("follower updated successfully")
const existingFollowersDoc2 =  await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile)
 
const followersMap =  [JSON.parse(clickedUser.user)].map(el =>{
   return JSON.stringify({...el, followers: existingFollowersDoc2.followers.length})
})
 
 const parsedUpdatedFollowersUser = JSON.parse(followersMap)
 
 const updatedFollowersUser ={
   user:[JSON.stringify(parsedUpdatedFollowersUser)]
 }
 
 await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile, updatedFollowersUser)
 setReload(!reload)
 console.log("follower user updated successfuly")
 }
 else{
  console.log("follower added already!")
 }
}
}
catch(e){
  console.log(e)
}
}
}
      
  }
  return(
    <>
    <div className="generalprofile-container">
    <div className="gp-cover-image">
    <img src={img} className="cover-image" alt="cover-image" />
    </div>
    <div className="gp-box">
    <header className="gp-header">
    <div className="gp-header-top">
    <img src={data ? JSON.parse(data.user).photoURL : (       <Skeleton animation="wave"/>) } className="gp-header-img"/>
    <div className="gp-header-user">
    <p className="gp-header-name">{data ? JSON.parse(data.user).displayName : (  <Skeleton sx={{width:"200px"}} animation="wave"/>) }</p>
    <p className="gp-header-follow"> {data ? JSON.parse(data.user).followers : (  <Skeleton animation="wave"/>) } followers </p>
    </div>
   <MoreHorizIcon sx={{position:"absolute", right:"1rem;"}}/>
    </div>
    <div className="gp-header-middle">
    <button onClick={enableFollow} className="gp-header-fbtn" style={{border: isFollowed ? "1px solid orangered" :"", background: isFollowed ? "transparent" : "orangered", color: isFollowed ? "orangered" : "white"}}> {isFollowed ? "Following" : "Follow"} </button>
    </div>
    <div className="gp-header-last">
    <Link to={"/user"} style={{borderBottom:isHomeClicked}} onClick={tapHome} className="gp-link"> Home </Link>
    <Link to={"about"} style={{borderBottom:isAboutClicked, paddingBottom:"1rem"}} onClick={tapAbout} className="gp-link"> About </Link>
    </div>
    </header>
    <Outlet/>
    
    </div>
    </div>
    </>
    )
}