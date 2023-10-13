import "./UserProfile.scss"
import {ToggleContext} from "/src/context/ToggleContext"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useContext} from "react"
import img from "/src/assets/swiftscribe logo.jpg"
import {Link, Outlet} from "react-router-dom"
export default function UserProfile(){
  const {setToggleMenu} = useContext(ToggleContext)
  return (
    <>
    <div className="userprofile-container" onClick={() => setToggleMenu(false)}>
    <header className="up-header">
    <div className="up-header-top">
    <div className="up-image">
    <img src={img} className="up-img"/>
    </div>
    <div className="up-name-box">
    <p className="up-name"> Joe Doe </p>
    <p className="up-username"> @chuboi </p>
    </div>
    <MoreHorizIcon sx={{position:"absolute", right:"1rem"}}/>
     </div>
     <div className="up-header-last">
     <Link to={"/profile"} className="up-link"> Home </Link>
    <Link to={"about"} className="up-link"> About </Link>
     </div>
    </header>
    
    <Outlet/>
    </div>
    </>
    )
}