import "./Followers.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import {db} from "/src/utils/appwrite/appwrite.utils"
import {useState, useRef, useEffect, useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import {v4 as uuidv4} from "uuid"
import Bg from "/src/components/bg/Bg"
import CloseIcon from '@mui/icons-material/Close';


export default function Followers({toggle}){
  const {usersProfile,postDetails, postUserId, setCommentCount, linkId, currentUser} = useContext(UserContext)
  const [data, setData] = useState(null)
  
  const toggleFollowerBox = () =>{
    toggle(false)
  }
  
  
  useEffect(()=>{
    const getFollowers = async () =>{
      const res = await db.getDocument("652755cdc76b42b46adb", "6530077807326e78f379", currentUser.uid)
      
  setData(res.followers)
    // console.log(res.following)
    }
    getFollowers()
  },[])
  
  
  
 // console.log(postUserId)
  return(
    <>

    <div className="followers-container" style={{
      height:"",
    }}>
    <header className="fo-header">
    <b> People that follows you </b>
    <CloseIcon onClick={toggleFollowerBox}/>
    </header>
    
   <main className="fo-main">
  {data ? data.map(el => (
  <div key={JSON.parse(el).id} className="fo-box">
   <img src={JSON.parse(el).photoURL} className="foo-img"/>
   <div className="fo-name">
   <b className="fo-username"> {JSON.parse(el).displayName} </b>
   <p className="fo-bio">{JSON.parse(el).bio} </p>
   </div>
  
    </div>
    )): <Bg/>
  }
    </main>
    </div>
    </>
    )
}