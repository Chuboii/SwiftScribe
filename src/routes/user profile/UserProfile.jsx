import "./UserProfile.scss"
import {ToggleContext} from "/src/context/ToggleContext"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useContext, useState, useEffect} from "react"
import img from "/src/assets/swiftscribe logo.jpg"
import {Link, Outlet} from "react-router-dom"
import {db} from '/src/utils/appwrite/appwrite.utils'
import { UserContext } from "../../context/UserContext"
import Skeleton from '@mui/material/Skeleton';
import Followers from "/src/components/followers/Followers"
import Followings from "/src/components/followings/Followings"
import {NotificationContext} from "/src/context/NotificationContext"





export default function UserProfile(){
  const {setToggleMenu} = useContext(ToggleContext)
 const [isLoadedFromServer, setIsLoadedFromServer] = useState(false)
 const {currentUser} = useContext(UserContext)
 const [user, setUser] = useState(null)
 const [isHomeClicked, setIsHomeClicked] = useState("2px solid")
  const [isAboutClicked, setIsAboutClicked] = useState("none")
  const [toggleFollower, setToggleFollower] = useState(false)
  const [toggleFollowing, setToggleFollowing] = useState(false)
  const {notifyUser} = useContext(NotificationContext)
 
  useEffect(() => {
   
    if (!isLoadedFromServer) {
      const getUsers = async () => {
        const res = await db.getDocument('652755cdc76b42b46adb', '652755d73451dcffebde', currentUser.uid)

        setUser(res)
        console.log(res);

      }

      getUsers()
      setIsLoadedFromServer(true)
    }
 },[isLoadedFromServer, user, notifyUser])
  
const tapHome = () =>{
    setIsHomeClicked("2px solid")
    setIsAboutClicked("none")
  }
  const tapAbout = () => {
    setIsAboutClicked("2px solid")
    setIsHomeClicked("none")
  }
  
  const enableFollowerBox = ()=>{
    setToggleFollower(true)
  }
 
 const enableFollowingBox = ()=>{
    setToggleFollowing(true)
  }
  
  
  return (
    <>
   {toggleFollower && <Followers toggle={setToggleFollower}/>}
{toggleFollowing &&  <Followings toggle={setToggleFollowing}/>}
    <div className="userprofile-container" onClick={() => setToggleMenu(false)}>
    <header className="up-header">
    <div className="up-header-top">
    <div className="up-image">
    <img src={currentUser.photoURL} className="up-img"/>
    </div>
    <div className="up-name-box">
    <p className="up-name"> {currentUser.displayName} </p>
    <p className="up-username" style={{display:"flex", alignItems:"center"}}> <span>@</span>{user ? JSON.parse(user.user).username.toLowerCase() : (  <Skeleton sx={{width:"100px"}} animation="wave"/>)}</p>
    <div className="followers-box"> 
    <p onClick={enableFollowerBox} className="up-followers">{user ? JSON.parse(user.user).followers : ""} Followers</p>
    <p onClick={enableFollowingBox} className="up-following">{user ? JSON.parse(user.user).following : ""} Following</p>
    </div>
    </div>
    <MoreHorizIcon sx={{position:"absolute", right:"1rem"}}/>
     </div>
     <div className="up-header-last">
     <Link to={"/profile"} style={{borderBottom:isHomeClicked}} onClick={tapHome} className="up-link"> Home </Link>
    <Link to={"about"} style={{borderBottom:isAboutClicked, paddingBottom:"1rem"}} onClick={tapAbout} className="up-link"> About </Link>
     </div>
    </header>
    
    <Outlet/>
    </div>
    </>
    )
}