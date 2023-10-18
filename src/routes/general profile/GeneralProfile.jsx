import "./GeneralProfile.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Link, Outlet} from "react-router-dom"
import img from "/src/assets/swiftscribe logo.jpg"
import Skeleton from '@mui/material/Skeleton';
import {useContext, useState, useEffect} from "react"
import {UserContext} from "/src/context/UserContext"
import {db} from "/src/utils/appwrite/appwrite.utils"

export default function GeneralProfile(){
  const {usersProfile} = useContext(UserContext)
  const [isHomeClicked, setIsHomeClicked] = useState("2px solid")
  const [isAboutClicked, setIsAboutClicked] = useState("none")
  const parsedUser = usersProfile ? usersProfile : ""
  
  const [friendInfoId, setFriendInfoId] = useState()
  const [data, setData] = useState(null)
  
  const tapHome = () =>{
    setIsHomeClicked("2px solid")
    setIsAboutClicked("none")
  }
  const tapAbout = () => {
    setIsAboutClicked("2px solid")
    setIsHomeClicked("none")
  }

  useEffect(() =>{
    
    const getData = async() =>{
      const res = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", usersProfile)
     // console.log(JSON.parse(res.user))
      setData(res)
     }
    getData()
  }, [])
  
  
  
  return(
    <>
    <div className="generalprofile-container">
    <div className="gp-cover-image">
    <img src={img} className="cover-image" alt="cover-image" />
    </div>
    <div className="gp-box">
    <header className="gp-header">
    <div className="gp-header-top">
    <img src={data ? JSON.parse(data.user).photoURL : (       <Skeleton animation="wave"/>) } className="gp-header-img"/>
    <div className="gp-header-user">
    <p className="gp-header-name">{data ? JSON.parse(data.user).displayName : (  <Skeleton sx={{width:"200px"}} animation="wave"/>) }</p>
    <p className="gp-header-follow"> {data ? JSON.parse(data.user).followers : (  <Skeleton animation="wave"/>) } followers </p>
    </div>
   <MoreHorizIcon sx={{position:"absolute", right:"1rem;"}}/>
    </div>
    <div className="gp-header-middle">
    <button className="gp-header-fbtn"> Follow </button>
    </div>
    <div className="gp-header-last">
    <Link to={"/user"} style={{borderBottom:isHomeClicked}} onClick={tapHome} className="gp-link"> Home </Link>
    <Link to={"about"} style={{borderBottom:isAboutClicked, paddingBottom:"1rem"}} onClick={tapAbout} className="gp-link"> About </Link>
    </div>
    </header>
    <Outlet/>
    
    </div>
    </div>
    </>
    )
}