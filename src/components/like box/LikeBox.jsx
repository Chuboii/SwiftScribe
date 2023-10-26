import "./LikeBox.scss"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import {db} from "/src/utils/appwrite/appwrite.utils"
import {useState, useEffect, useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import FavoriteIcon from '@mui/icons-material/Favorite';
import {v4 as uuidv4} from "uuid"
import {useLocation} from "react-router-dom"
import {NotificationContext} from "/src/context/NotificationContext"

function getUserDocId() {
  const storage = localStorage.getItem("userDocId")
  return storage ? JSON.parse(storage) : null
}


export default function LikeBox({enable, pos}){
  const [getDocId] = useState(getUserDocId)
  const {usersProfile,postDetails, postUserId, setCommentCount,linkId, commentCount, currentUser} = useContext(UserContext)
  const [blogLikes, setBlogLikes] = useState(0)
  const [isData, setIsData] = useState(null)
  const [isClicked, setIsClicked] = useState(true)
  const [isLikeAvailable, setIsLikeAvailable] = useState(false)
  const [blogComment, setBlogComment] = useState(null)
  const {setNotifyUser} = useContext(NotificationContext)
  //console.log(postDetails)
  const location = useLocation()
  useEffect(()=>{
    const getLikes = async() =>{
     // console.log(postUserId)
      try{
      //console.log(linkId)
      const res = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId)
        const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
   

const duplicate = JSON.parse(res.blog).likes.some(el => el.$id === currUser.$id)

 setIsLikeAvailable(duplicate)
 //console.log(JSON.parse(res.blog).comments)
// console.log(duplicate)
  setBlogLikes(JSON.parse(res.blog).likes.length)
 setBlogComment(JSON.parse(res.blog).comments)
 setCommentCount(JSON.parse(res.blog).comments.length)
  
      }catch(e){
        console.log(e)
      }
    }
    getLikes()
  },[isData, blogComment])
  
  
  
  
  
  
  
  const enableLike = async () =>{
  
 if(isClicked){
   
    try{
    //  console.log(usersProfile)
  const getPrevLikes = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId)
 // console.log(getPrevLikes)
  const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
//  setBlogLikes(c => c + 1)
  
 const duplicate = JSON.parse(getPrevLikes.blog).likes.some(el => el.$id === currUser.$id)
 
 if(!duplicate){
 const increLikes = [JSON.parse(getPrevLikes.blog)].map(el =>{
   const arr = [...el.likes]
   arr.push(currUser)
 return {...el, likes:arr, likesCount: arr.length}

 })
 // console.log(increLikes)
  const updateLikes ={
   blog: [JSON.stringify(increLikes[0])]
  }
//console.log(updateLikes)
 const res =  await db.updateDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId, updateLikes)
 setIsData(res)
 
  const date = new Date()
 const notifyData = {
   uid: currentUser.uid,
   id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just Liked your post",
   time: date,
   post:postDetails.blogTitle,
   postImg: postDetails.blogTitleImg,
 }
 const notice ={
   notify: [JSON.stringify(notifyData)]
 }
 
const resN = await db.createDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notice)
 setNotifyUser(resN)
// setReload("yeah")
 console.log("notified")
 
setIsData(res)
console.log(JSON.parse(res.blog))
 console.log("done")
 // console.log(increLikes[0])
 }
 else{
   console.log("likes have been added already")
   
 }
    }
    catch(e){
      console.log(e)
        if(e.code === 409){
        try{
    
     const getNotify = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId)
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
   task: "Just liked your post",
   time: date,
   post:postDetails.blogTitle,
   postImg: postDetails.blogTitleImg,
     }
     
     getNotify.notify.push(JSON.stringify(nData))
  // const data = JSON.parse()
     const notifyData = {
       notify: getNotify.notify
     }
     console.log(notifyData)
  const resN =  await db.updateDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notifyData)
     console.log("notify updated")
     setNotifyUser(resN)
 }
 else{
   console.log("notify exists already ")
 }
      }
      catch(e){
        console.log(e)
      }
   
        }
    }
 }
}
 
 
 const handleShare = async () => {
  try {
    await navigator.share({
      title: postDetails.blogTitle,
      text: postDetails.blogSubTitle,
      url: location.pathname,
      image: postDetails.blogTitleImg
    });
  //  console.log(location.pathname)
  } catch (error) {
    console.error('Sharing failed:', error);
  }
};

  
  
  
  
  
  
 // console.log(pos)
  return (
    <>
    
   <div className="usp-like-box" style={{position:pos, bottom:0, left:0, right:0}}> 
   <div className="usp-lc">
   <div className="usp-likes" onClick={enableLike}>
   {isLikeAvailable ? <FavoriteIcon sx={{marginRight:".5rem", color:"red"}}/>  : <FavoriteBorderIcon sx={{marginRight:".5rem", color:"red"}}/> }{blogLikes} </div>
     <div className="usp-comment">
     <CommentIcon onClick={enable} sx={{marginRight:".5rem"}}/>{commentCount} </div>
   </div>
   
      <div className="usp-share-more">
    <ShareSharpIcon onClick={handleShare}  sx={{marginRight:"1rem"}}/>
 <MoreHorizIcon/> 
   </div>
   </div>
    </>
    )
}