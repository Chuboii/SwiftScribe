import "./GeneralProfile.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Link, Outlet} from "react-router-dom"
import img from "/src/assets/swiftscribe logo.jpg"
export default function GeneralProfile(){
  
  return(
    <>
    <div className="generalprofile-container">
    <div className="gp-cover-image">
    <img src={img} className="cover-image" alt="cover-image" />
    </div>
    <div className="gp-box">
    <header className="gp-header">
    <div className="gp-header-top">
    <img src={img} className="gp-header-img"/>
    <div className="gp-header-user">
    <p className="gp-header-name">Joe Doe</p>
    <p className="gp-header-follow"> 20k Followers </p>
    </div>
   <MoreHorizIcon sx={{position:"absolute", right:"1rem;"}}/>
    </div>
    <div className="gp-header-middle">
    <button className="gp-header-fbtn"> Follow </button>
    </div>
    <div className="gp-header-last">
    <Link to={"/user"} className="gp-link"> Home </Link>
    <Link to={"about"} className="gp-link"> About </Link>
    </div>
    </header>
    <Outlet/>
    
    </div>
    </div>
    </>
    )
}