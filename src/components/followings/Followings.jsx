import "./Followings.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import {db} from "/src/utils/appwrite/appwrite.utils"
import {useState, useRef, useEffect, useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import {v4 as uuidv4} from "uuid"
import Bg from "/src/components/bg/Bg"
import CloseIcon from '@mui/icons-material/Close';
import {NotificationContext} from "/src/context/NotificationContext"


export default function Followings({toggle}){
  const {usersProfile,postDetails, postUserId, setCommentCount, linkId, currentUser} = useContext(UserContext)
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  
  const toggleFollowingBox = () =>{
    toggle(false)
  }
  const {setNotifyUser} = useContext(NotificationContext)
  
  useEffect(()=>{
    const getFollowing = async () =>{
      const res = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)
      
  setData(res.following)
    // console.log(res.following)
    }
    getFollowing()
  },[reload])
  
  
 // console.log(postUserId)
 const unfollowBtn = async (idx) =>{
   try{
     setIsLoaded(true)
          const otherUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", idx)
       console.log(otherUser)
        const existingFollowingDoc = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)

const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)

const removeFollowing =  existingFollowingDoc.following.filter(el => JSON.parse(el).id !== JSON.parse(otherUser.user).id)
 
     const updatedData = {  
         following: [...removeFollowing]
         }
         
   const res4 = await db.updateDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid, updatedData)
    console.log("following reduced updated")
    setReload(res4)
   setIsLoaded(false)
  const existingFollowingDoc2 =  await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)
 
const followingMap =  [JSON.parse(currUser.user)].map(el =>{
   return JSON.stringify({...el, following: existingFollowingDoc2.following.length})
})
 
 const parsedUpdatedFollowingUser = JSON.parse(followingMap)
 
 const updateFollowingUser ={
   user:[JSON.stringify(parsedUpdatedFollowingUser)]
 }
  const res3 =  await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid, updateFollowingUser)
  console.log('following user updated')
  setNotifyUser(res3)
  
   }
   catch(e){
     console.log(e)
   }
 
   
   
 }
  return(
    <>

    <div className="followings-container" style={{
      height:"",
    }}>
   <header className="fol-header">
    <b> People you are following </b>
    <CloseIcon onClick={toggleFollowingBox}/>
    </header>
    
   <main className="fol-main">
  {data ? data.map(el => (
  <div key={JSON.parse(el).id}className="fol-box">
   <img src={JSON.parse(el).photoURL} className="fool-img"/>
   <div className="fol-name">
   <b className="fol-username"> {JSON.parse(el).displayName }</b>
   <p className="fol-bio"> {JSON.parse(el).bio} </p>
   </div>
   
   <button onClick={() =>{
   unfollowBtn(JSON.parse(el).userId)
   }
   } className="fol-btn"> unfollow </button>
    </div>
 )):<Bg/> } </main>
    </div>
    </>
    )
}