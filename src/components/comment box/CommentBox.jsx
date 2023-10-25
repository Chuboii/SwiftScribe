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
export default function CommentBox({toggle}){
 const [value, setValue] = useState("")
  const {usersProfile,postDetails, postUserId, setCommentCount, currentUser} = useContext(UserContext)
  const [blogPosted, setBlogPosted] = useState(null)
 const [comments, setComments] = useState(null)
 const [createMargin, setCreateMargin] = useState("3rem")
 const elementToScroll = useRef()
  const toggleCommentBox = () =>{
    toggle(false)
  }
  
  useEffect(()=>{
    const getComments = async () =>{
      try{
      const getComment = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", usersProfile)
     
   setComments(JSON.parse(getComment.blog).comments)
//   console.log(JSON.parse(getComment.blog).comments)
 //  console.log(JSON.parse(getComment.blog))
   setCommentCount(JSON.parse(getComment.blog).comments.length)
      }
      catch(e){
        console.log(e)
      }
    }
    getComments()
  },[blogPosted])
 // console.log(comments.length)
 // console.log("hdh")
  //console.log(comments)
  const handleComment = async(e)=> {
    e.preventDefault()
    if(value){
 console.log(postUserId)
 
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

 console.log("notified")

 }
  catch(e){
       // console.log(e)
  /*  if (e.code === 409){
     const getNotify = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId)

     const date = new Date()

     const nData = {
    uid: currentUser.uid,
     id: uuidv4(),
   photo: currentUser.photoURL, 
   name: currentUser.displayName,
   task: "Just commented on your post",
   post:postDetails.blogTitle,
   postImg: postDetails.blogTitleImg,
   time: date
     }
     
     getNotify.notify.push(JSON.stringify(nData))
  // const data = JSON.parse()
     const notifyData = {
       notify: getNotify.notify
     }
  //   console.log(notifyData)
    await db.updateDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notifyData)
     console.log("notify updated")
     

 
  }*/
      }
  
      try{
    const getComment = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", usersProfile)
     const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
    
    const mapped = [JSON.parse(getComment.blog)].map(el =>{
      const arr = [...el.comments]
      arr.push({
       ...JSON.parse(currUser.user),
       comment: value,
       userId: currUser.$id,
       commentLike:[],
       commentLikeCount: 0,
       replies: []
      })
   return {...el, comments:arr, commentsCount: arr.length}

    })
    
 //   console.log(mapped)
    const updateComments ={
   blog: [JSON.stringify(mapped[0])]
  }
//console.log(updateLikes)
 const res =  await db.updateDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", usersProfile, updateComments)
 setBlogPosted(JSON.parse(res.blog))
 console.log(JSON.parse(res.blog))
 setValue("")
 //setCreateMargin("5rem")
// elementToScroll.current.scrollY = "50px"
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
<CloseIcon onClick={toggleCommentBox}/>
    </header>
    
<main className="cb-main">
{comments ? comments.map((el,id) =>(
<div key={id} style={{marginBottom:createMargin}} className="cb-main-box">
<header className="cb-main-header">
<img src={el.photoURL} className="cb-main-img"/>
<div className="cb-main-pro">
<p className="cb-main-name" style={{fontWeight:"600"}}> @{el.username} </p>
                <p className="cb-main-time" style={{ fontSize:"17px"}}> 2 days ago </p>
</div>
<MoreHorizIcon sx={{position:"absolute", right:"1rem;"}} />
</header>
<section className="cb-main-text"> {el.comment}</section>
<section className="cb-footer-icons">
<p className="cb-footer-like"> <FavoriteBorderIcon sx={{marginRight:".3rem"}}/> 60 </p>
<p className="cb-footer-comment"> <CommentIcon sx={{marginRight:".3rem"}}/> 60 replies </p>
</section>
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
</div>)) : ""}
</main>
<form onSubmit={handleComment} className="cb-form">
<input value={value} onChange={changeValues} type="text" className="cb-form-input"/>
<button className="cb-form-btn"><SendIcon sx={{fontSize:"35px"}}/></button>
</form>

    </div>
    </>
    )
}