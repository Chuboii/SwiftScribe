import "./CommentBox.scss"
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import img from "/src/assets/swiftscribe logo.jpg"
import SendIcon from '@mui/icons-material/Send';
import {db} from "/src/utils/appwrite/appwrite.utils"
import {useState, useRef, useEffect, useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import {v4 as uuidv4} from "uuid"
import {useLocation} from "react-router-dom"
import Bg from "/src/components/bg/Bg"
import {NotificationContext} from "/src/context/NotificationContext"


export default function CommentBox({toggle}){
 const [value, setValue] = useState("")
  const {usersProfile,postDetails, postUserId, setCommentCount, linkId, currentUser} = useContext(UserContext)
  const [blogPosted, setBlogPosted] = useState(null)
 const [comments, setComments] = useState(null)
 const [createMargin, setCreateMargin] = useState("3rem")
 const elementToScroll = useRef()
  const location = useLocation()
 const {setNotifyUser} = useContext(NotificationContext)
 
  const toggleCommentBox = () =>{
    toggle(false)
  }
  
  useEffect(()=>{
    const getComments = async () =>{
      
      try{
        
 
    const getComment = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId)
    
   setComments(JSON.parse(getComment.blog).comments)

   setCommentCount(JSON.parse(getComment.blog).comments.length)
      }
      catch(e){
        console.log(e)
      }
     /*
      try{
      const getComment = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", usersProfile)
     
   setComments(JSON.parse(getComment.blog).comments)
//   console.log(JSON.parse(getComment.blog).comments)
 //  console.log(JSON.parse(getComment.blog))
   setCommentCount(JSON.parse(getComment.blog).comments.length)
      }
      catch(e){
        console.log(e)
      }*/
    }
    getComments()
  },[blogPosted])




  const handleComment = async(e)=> {
    e.preventDefault()
    if(value){
 
 try{
  const date = new Date()
 const notifyData = {
   uid: currentUser.uid,
   id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just commented on your post",
   time: date,
   post:postDetails.blogTitle,
   postImg: postDetails.blogTitleImg,
 }
 const notice ={
   notify: [JSON.stringify(notifyData)]
 }
 
 await db.createDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notice)
setNotifyUser(res)
// console.log("notified")

 }
  catch(e){
    if(e.code === 409){
     const prev = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId)
const date = new Date()
       const notifyData = {
   uid: currentUser.uid,
   id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just commented on your post",
   time: date,
   post:postDetails.blogTitle,
   postImg: postDetails.blogTitleImg,
 }
 
prev.notify.push(JSON.stringify(notifyData))
//console.log(prev.notify)
 const notice ={
   notify: [...prev.notify]
 }
// console.log(notice)
const res = await db.updateDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notice)
setNotifyUser(res)
// console.log("updated notify")
      }
      
  }      
      
  
      try{
    const getComment = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId)
     const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
    
    const mapped = [JSON.parse(getComment.blog)].map(el =>{
      const arr = [...el.comments]
      arr.push({
       ...JSON.parse(currUser.user),
       comment: value,
       userId: currUser.$id,
       commentLike:[],
       commentLikeCount: 0,
       replies: [],
       time:""
      })
   return {...el, comments:arr, commentsCount: arr.length}

    })
    
 //   console.log(mapped)
    const updateComments ={
   blog: [JSON.stringify(mapped[0])]
  }
//console.log(updateLikes)
 const res =  await db.updateDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId, updateComments)
 setBlogPosted(JSON.parse(res.blog))
 
 setValue("")

}
catch (e){
  console.log(e)
}
  }
  }
  
  
 const changeValues = (e) =>{
   setValue(e.target.value)
 }
  
 // console.log(postUserId)
  return(
    <>

    <div  ref={elementToScroll} className="commentbox-container" style={{
      height:"",
    }}>
    <header className="cb-header">
    <p className="cb-header-response"> Responses ({comments ? comments.length : ""})</p>
<CloseIcon sx={{zIndex:6,opacity:1}} onClick={toggleCommentBox}/>
    </header>
    
<main className="cb-main">
{comments ? comments.map((el,id) =>(
<div key={id} style={{marginBottom:createMargin}} className="cb-main-box">
<header className="cb-main-header">
<img src={el.photoURL} className="cb-main-img"/>
<div className="cb-main-pro">
<p className="cb-main-name" style={{fontWeight:"600"}}> @{el.username} </p>
             {/*   <p className="cb-main-time" style={{ fontSize:"17px"}}> {el.time} </p>*/}
</div>
<MoreHorizIcon sx={{position:"absolute", right:"1rem;"}} />
</header>
<section className="cb-main-text"> {el.comment}</section>{/*
<section className="cb-footer-icons">
<p className="cb-footer-like"> <FavoriteBorderIcon sx={{marginRight:".3rem"}}/> 60 </p>
<p className="cb-footer-comment"> <CommentIcon sx={{marginRight:".3rem"}}/> 60 replies </p>
</section>*/}
{/*
<section className="cb-replies-box">
<header className="cb-replies-header">
<img src={img} className="cb-replies-img"/>
<div className="cb-replies-pro">
<p className="cb-replies-name"> Joe Doe </p>
<p className="cb-replies-time"> 2 days ago </p>
</div>
<MoreHorizIcon sx={{position:"absolute", right:"1rem;"}} />
</header>
<section className="cb-replies-text"> Great Blog bro!</section>
<section className="cb-replies-footer-icons">
<p className="cb-replies-footer-like"> <FavoriteBorderIcon sx={{marginRight:".3rem"}}/> 60 </p>

</section>
</section>*/}
</div>)) : <Bg/>}
</main>
<form onSubmit={handleComment} className="cb-form">
<input value={value} onChange={changeValues} type="text" className="cb-form-input"/>
<button className="cb-form-btn"><SendIcon sx={{fontSize:"35px"}}/></button>
</form>

    </div>
    </>
    )
}