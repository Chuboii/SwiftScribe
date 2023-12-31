import './UserProfilePost.scss'
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import CommentBox from "/src/components/comment box/CommentBox"
import img from '/src/assets/swiftscribe logo.jpg'
import LikeBox from "/src/components/like box/LikeBox"
import {useEffect,useRef, useState, useContext} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import {UserContext} from "/src/context/UserContext"
import RenderHtml from  "/src/components/htmltag/RenderHtml"

export default function UserProfilePost(){
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [data, setData] = useState(null)
    const {linkId, currentUser} = useContext(UserContext)
    const blogRef = useRef()
    const [blogContent, setBlogContent] = useState('');

   const enableCommentBox = () =>{
    setToggleCommentBox(true)
  }
  //console.log(postId)
  
  useEffect(() => {
    if (!isDataLoaded) {
      const profilePageHome = async () => {
  
        try{
        const res = await db.getDocument("652755cdc76b42b46adb", "652c619059614689c161", currentUser.uid)
    
          const filtered = res.blog.filter(el => {
            
    return JSON.parse(el).id === linkId
   })
// onsole.log(filtered)
  const arr = {
    blog: filtered
  }
          setData(filtered)
          setBlogContent(JSON.parse(res.blog[0]).blogPost);
    
 // console.log(JSON.parse(arr.blog[0]).blogPost)
 
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
   {data ? data.map(doc => (
  <div key={JSON.parse(doc).id}>
   <div className="usp-titles">
    <h1 className="usp-tit">{JSON.parse(doc).blogTitle}</h1>
    <p className="usp-sub-tit"> {JSON.parse(doc).blogSubTitle} </p>
    </div>
    <header className="usp-header">
    <img src={JSON.parse(doc).photo} className="usp-header-pro"/>
    <div className="usp-header-text">
    <p className="usp-header-name"><span >{JSON.parse(doc).displayName}</span> <span style={{color:"orangered", marginLeft:".5rem"}}> Follow </span>  </p>
    <p className="usp-header-mins"><span style={{marginRight:".5rem"}}> {JSON.parse(doc).readTime} mins read </span> <span> {JSON.parse(doc).datePosted}</span> </p>

    </div>
    <ShareSharpIcon style={{position:"absolute", right:"1rem"}} className="usp-header-share"/> 
    </header>
  
    
    <main className="usp-main">
    <div className="usp-titleImage"> <img src={JSON.parse(doc).blogTitleImg} className="usp-titleImg"/></div>
    
   
    <RenderHtml htmlContent={blogContent}/>
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