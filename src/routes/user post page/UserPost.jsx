import "./UserPost.scss"
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import CommentBox from "/src/components/comment box/CommentBox"
import img from '/src/assets/swiftscribe logo.jpg'
import LikeBox from "/src/components/like box/LikeBox"
import {useEffect, useState} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'


function getPostId() {
  const storage = localStorage.getItem("userPostId")
  return storage ? storage : null
}

export default function UserPost(){
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  const [postId] = useState(getPostId)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  
  const enableCommentBox = () =>{
    setToggleCommentBox(true)
  }

  useEffect(() => {
    if (!isDataLoaded) {
      const getData = async() => {
        const res = await db.getDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", postId)

        console.log(res)
     setIsDataLoaded(false) 
      }

    }
    }, [isDataLoaded])


  return (
    <>
    {toggleCommentBox && <CommentBox toggle={setToggleCommentBox}/>}
    <div className="userpost-container">
    <div className="usp-titles">
    <h1 className="usp-tit"> How to be a millionaire </h1>
    <p className="usp-sub-tit"> Exploring the theme </p>
    </div>
    <header className="usp-header">
    <img src={img} className="usp-header-pro"/>
    <div className="usp-header-text">
    <p className="usp-header-name"><span > Joe Doe</span> <span style={{color:"orangered", marginLeft:".5rem"}}> Follow </span>  </p>
    <p className="usp-header-mins"><span style={{marginRight:".5rem"}}> 9 mins read </span> <span> 9 days ago </span> </p>

    </div>
    <ShareSharpIcon style={{position:"absolute", right:"1rem"}} className="usp-header-share"/> 
    </header>
  
    
    <main className="usp-main">
    <div className="usp-titleImage"> <img src={img} className="usp-titleImg"/></div>
    
    <div className="usp-content"> </div>
<LikeBox enable={enableCommentBox}/>
    </main>
    <footer>
    {/* more from user and recommendations component*/}
    </footer>
    </div>
    </>
    )
}