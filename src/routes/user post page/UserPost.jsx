import "./UserPost.scss"
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import CommentBox from "/src/components/comment box/CommentBox"
import img from '/src/assets/swiftscribe logo.jpg'
import LikeBox from "/src/components/like box/LikeBox"
import {useEffect, useState, useContext} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import {UserContext} from "/src/context/UserContext"
import {v4 as uuidv4} from "uuid"
import HomeSubHeader from "/src/components/home sub header/HomeSubHeader"
import HomeHeader from "../../components/home header/HomeHeader"
import {useLocation} from "react-router-dom"



function getUserDocId() {
  const storage = localStorage.getItem("userDocId")
  return storage ? JSON.parse(storage) : null
}
export default function UserPost(){
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  //const [postId] = useState(getPostId)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [data, setData] = useState(null)
  const {usersProfile, postDetails,postUserId, linkId, currentUser} = useContext(UserContext)
  const enableCommentBox = () =>{
    setToggleCommentBox(true)
  }
  const [isFollowed, setIsFollowed] = useState(false)
  const [reload , setReload] = useState(false)
 const [userDocId, setUserDocId] = useState(getUserDocId)
  const [scrollYY, setScrollYY] = useState(0)
  const [subHeaderPos, setSubHeaderPos] = useState('relative')
  const [headerPos, setHeaderPos] = useState("relative")
const [subHeaderTop, setSubHeaderTop] = useState(0)
const [likeBoxBottom, setLikeBoxBottom] = useState(0)
const [likeBoxPos, setLikeBoxPos] = useState("relative")
const [toggleSubHeader, setToggleSubHeader] = useState(false)
const [toggleHeader, setToggleHeader] = useState(false)

const location = useLocation()


function scrollFunction() {
     const scrollPos = window.scrollY
   
    setScrollYY(scrollPos)
   if (scrollYY > 150) {
      setToggleSubHeader(true)
     setSubHeaderPos('fixed')
     setSubHeaderTop(0)
    }
    else {
      setToggleSubHeader(false)
   }
    
   if (scrollPos <scrollYY) {
    setToggleHeader(true)
     setHeaderPos('fixed')
     setSubHeaderTop(4.5)
     setLikeBoxPos("fixed")
  }
  else {
    setToggleHeader(false)
    setLikeBoxPos("relative")
  }



  }

  useEffect(() => {
  
   
    window.addEventListener("scroll", scrollFunction)

    
  }, [scrollYY])
  







  useEffect(() => {
    if (!isDataLoaded) {
      const forYouData = async() => {
        try{
          const res = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", linkId)
          //localStorage.setItem("friendsId", null)
setData(res)
//console.log(users)
const blog = document.querySelector(".usp-content")
blog.innerHTML = JSON.parse(res.blog[0]).blogPost
//console.log(JSON.parse(res.blog[0]).blogPost)
     //   console.log(res)
     setIsDataLoaded(false) 
      }
      catch(e){
        
       console.log(e)
      }
      }
forYouData()
/*
const suggestionFriendsHomePage = async() => {
        try{
        const res = await db.getDocument("652755cdc76b42b46adb", "652c619059614689c161", `${usersProfile}`)
   const filtered = res.blog.filter(el => {
     return JSON.parse(el).id === linkId
   })

          console.log(filtered)
  const arr = {
    blog: filtered
  }
setData(arr)
const blog = document.querySelector(".usp-content")
blog.innerHTML = JSON.parse(arr.blog[0]).blogPost
      //console.log(JSON.parse(res.blog[0]).blogPost)
          
        //console.log(res)
     setIsDataLoaded(false) 
      }
      catch(e){
        
    //    console.log(e)
      }
}
      
suggestionFriendsHomePage()*/
    }
    }, [isDataLoaded])

//console.log(data)

useEffect(() =>{
    
    const getData = async() =>{
   try{
      const res = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", postUserId)
     // setData(res)
      }catch(e){
        console.log(e)
      }
      try{
      const followingRes = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)
      console.log(followingRes)
      const a = followingRes.following.map(el =>{
      return JSON.parse(el).id.includes(userDocId.id)
    } )
    
    const b = a.some(el => el === true)
    console.log(b)
    setIsFollowed(b)
}
catch(e){
  console.log(e)
}
      
     }
    getData()
  }, [isFollowed, reload])
  





const enableFollow = async() => {
    
 //   console.log(enableFollowing)
 console.log("clicked")
    try{
      
    const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
    console.log(postUserId)
   // console.log(usersProfile)
   const otherUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", postUserId)
   // console.log(otherUser)
const followingObj = JSON.parse(otherUser.user)
 const followingData = {
     following:[JSON.stringify(followingObj)]
   }
 
 await db.createDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid, followingData)
 setIsFollowed(true)
 console.log("following created successfully")
 
 const date = new Date()
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
 
 await db.createDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notice)
// setReload("yeah")
 console.log("notified")
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
   task: "Just followed you",
   time: date
     }
     
     getNotify.notify.push(JSON.stringify(nData))
  // const data = JSON.parse()
     const notifyData = {
       notify: getNotify.notify
     }
     console.log(notifyData)
    await db.updateDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", postUserId, notifyData)
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
        const otherUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", postUserId)
       
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
  
  
     
 setIsFollowed(true)
 }
 else {
   console.log("following exists already")
 
   
          const otherUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
       
        const existingFollowingDoc = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)

const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
//console.log(otherUser)
 //   const data = JSON.parse(otherUser.user)

// existingFollowingDoc.following.push(JSON.stringify(data))
const removeFollowing =  existingFollowingDoc.following.filter(el => JSON.parse(el).id !== JSON.parse(otherUser.user).id)
 
     const updatedData = {  
         following: [...removeFollowing]
         }
    //  console.log(updatedData)
         
     const res2 = await db.updateDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid, updatedData)
    console.log("following reduced updated")
//setIsImageLoaded(false)
    setIsFollowed(true)
    setReload(res2)
   
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
    const clickedUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", postUserId)
    const followersObj = JSON.parse(currUser.user)

    const followersData = {
  followers: [JSON.stringify(followersObj)]
}
    await db.createDocument("652755cdc76b42b46adb", "6530077807326e78f379",postUserId, followersData)
console.log("follower created successfully")

const existingFollowersDoc2 =  await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", postUserId)
 
const followersMap =  [JSON.parse(clickedUser.user)].map(el =>{
   return JSON.stringify({...el, followers: existingFollowersDoc2.followers.length})
})
 
 const parsedUpdatedFollowersUser = JSON.parse(followersMap)
 
 const updatedFollowersUser ={
   user:[JSON.stringify(parsedUpdatedFollowersUser)]
 }
 
 await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", postUserId, updatedFollowersUser)
 console.log("follower user updated successfuly")
setReload(!reload)
// window.location.reload() 
}
catch(e){
  console.log(e)
  if(e.code === 409){
    try{
  const existingFollowersDoc = await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", postUserId)
  const clickedUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", postUserId)
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
     await db.updateDocument("652755cdc76b42b46adb", "6530077807326e78f379", postUserId,updatedFollowersData)
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
  
    const existingFollowersDoc = await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile)
  const clickedUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
const currUser = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)

  
  const data = JSON.parse(currUser.user)
//console.log(existingFollowersDoc)

const removeFollower =  existingFollowersDoc.followers.filter(el => JSON.parse(el).id !== JSON.parse(currUser.user).id)

 console.log(removeFollower)
   
      const updatedFollowersData = {  
         followers: [...removeFollower]
         }
   
  const res3 =   await db.updateDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile,updatedFollowersData)
    // setReload(res3)
       console.log("follower updated successfully")
const existingFollowersDoc2 =  await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", usersProfile)
 
const followersMap =  [JSON.parse(clickedUser.user)].map(el =>{
   return JSON.stringify({...el, followers: existingFollowersDoc2.followers.length})
})
 
 const parsedUpdatedFollowersUser = JSON.parse(followersMap)
 
 const updatedFollowersUser ={
   user:[JSON.stringify(parsedUpdatedFollowersUser)]
 }
 
const res4 = await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile, updatedFollowersUser)
 setReload(res4)
 console.log("follower user updated successfuly")
 
  
  
  
  
  
  
  
  
  
 }
}
}
catch(e){
  console.log(e)
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

  
  return (
    <>
    {toggleCommentBox && <CommentBox toggle={setToggleCommentBox}/>}
    <div className="userpost-container">
   {data ? data.blog.map(doc =>{
   const time = new Date(JSON.parse(doc).datePosted)
   const shorten = time.toLocaleString()

   return (
     
  <div key={JSON.parse(doc).id}>
   <div className="usp-titles">
    <h1 className="usp-tit">{JSON.parse(doc).blogTitle}</h1>
    <p className="usp-sub-tit"> {JSON.parse(doc).blogSubTitle} </p>
    </div>
    <header className="usp-header">
    <img src={JSON.parse(doc).photo} className="usp-header-pro"/>
    <div className="usp-header-text">
    <p className="usp-header-name"><span >{JSON.parse(doc).displayName}</span>
    <span style={{color:"orangered",display:'block', marginLeft:".5rem"}} onClick={enableFollow} className="gp-header-fbtn"> {isFollowed ? "Following" : "Follow"} </span>  </p>
    <p className="usp-header-mins"><span style={{marginRight:".5rem"}}> {JSON.parse(doc).readTime} mins read </span> <span>{shorten} </span> </p>

    </div>
    <ShareSharpIcon onClick={handleShare} style={{position:"absolute", right:"1rem"}} className="usp-header-share"/> 
    </header>
  
    
    <main className="usp-main">
         <div className="usp-titleImage">
           <img src={JSON.parse(doc).blogTitleImg} className="usp-titleImg" /></div>
    
    <div className="usp-content"> </div>
<LikeBox pos={likeBoxPos} enable={enableCommentBox}/>
    </main>
    </div>
    )}) : <TextBasedLoader/>

  }
    <footer>
    {/* more from user and recommendations component*/}
    </footer>
    </div>
    </>
    )
}