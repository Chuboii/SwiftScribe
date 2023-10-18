import "./UserPost.scss"
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import CommentBox from "/src/components/comment box/CommentBox"
import img from '/src/assets/swiftscribe logo.jpg'
import LikeBox from "/src/components/like box/LikeBox"
import {useEffect, useState, useContext} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import {UserContext} from "/src/context/UserContext"


export default function UserPost(){
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  //const [postId] = useState(getPostId)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [data, setData] = useState(null)
  const {usersProfile, friendsId, currentUser} = useContext(UserContext)
  const enableCommentBox = () =>{
    setToggleCommentBox(true)
  }
//console.log(postId)

  useEffect(() => {
   // console.log(usersProfile)
    if (!isDataLoaded) {
      const forYouData = async() => {
        try{
        const res = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", usersProfile)
setData(res)
const blog = document.querySelector(".usp-content")
blog.innerHTML = JSON.parse(res.blog[0]).blogPost
//console.log(JSON.parse(res.blog[0]).blogPost)
     //   console.log(res)
     setIsDataLoaded(false) 
      }
      catch(e){
        
       // console.log(e)
      }
      }
forYouData()

const suggestionFriendsHomePage = async() => {
        try{
        const res = await db.getDocument("652755cdc76b42b46adb", "652c619059614689c161", `${usersProfile}`)
   const filtered = res.blog.filter(el => {
     return JSON.parse(el).id === friendsId
   })
  //console.log(filtered)
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
        
        console.log(e)
      }
}
suggestionFriendsHomePage()

const profilePageHome = async() => {
        try{
        const res = await db.getDocument("652755cdc76b42b46adb", "652c619059614689c161", `${currentUser.uid}`)
   const filtered = res.blog.filter(el => {
     return JSON.parse(el).id === friendsId
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
        
        console.log(e)
      }
}
profilePageHome()
    }
    }, [isDataLoaded])

//console.log(data)
  return (
    <>
    {toggleCommentBox && <CommentBox toggle={setToggleCommentBox}/>}
    <div className="userpost-container">
   {data ? data.blog.map(doc => (
  <div>
   <div className="usp-titles">
    <h1 className="usp-tit">{JSON.parse(doc).blogTitle}</h1>
    <p className="usp-sub-tit"> {JSON.parse(doc).blogSubTitle} </p>
    </div>
    <header className="usp-header">
    <img src={JSON.parse(doc).photo} className="usp-header-pro"/>
    <div className="usp-header-text">
    <p className="usp-header-name"><span >{JSON.parse(doc).displayName}</span> <span style={{color:"orangered", marginLeft:".5rem"}}> Follow </span>  </p>
    <p className="usp-header-mins"><span style={{marginRight:".5rem"}}> {JSON.parse(doc).readTime} mins read </span> <span> 9 days ago </span> </p>

    </div>
    <ShareSharpIcon style={{position:"absolute", right:"1rem"}} className="usp-header-share"/> 
    </header>
  
    
    <main className="usp-main">
    <div className="usp-titleImage"> <img src={JSON.parse(doc).blogTitleImg} className="usp-titleImg"/></div>
    
    <div className="usp-content"> </div>
<LikeBox enable={enableCommentBox}/>
    </main>
    </div>
    )) : <TextBasedLoader/>

  }
    <footer>
    {/* more from user and recommendations component*/}
    </footer>
    </div>
    </>
    )
}