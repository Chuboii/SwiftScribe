import "./NavigationMenu.scss"
import { Link } from "react-router-dom"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {ToggleContext} from "/src/context/ToggleContext"
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

function NavigationMenu() {
const {currentUser} = useContext(UserContext)
const {setToggleMenu} = useContext(ToggleContext)

  return (
      <nav className="navigationmenu-container" onClick={() => setToggleMenu(false)}>
      <div className="nm-first">
        
        <Link className="nm-links" style={{color:"black", display:'flex', alignItems:"center"}}><DriveFileRenameOutlineOutlinedIcon />
        <span style={{marginLeft:".7rem"}}>Write</span></Link>
<Link to={'/profile'} className="nm-links"><PersonOutlineIcon sx={{marginRight:'.7rem'}}/>Profile</Link>
              <Link to={'/'} className="nm-links"><LibraryBooksIcon sx={{
                  marginRight: '.7rem'}}/>Stories</Link>
          </div>
          <div className="nm-second">
              <Link to={'settings'} className="nm-links"><SettingsIcon sx={{marginRight:'.7rem'}}/>Settings</Link>
              <Link to={'/'} className="nm-links"><HelpOutlineOutlinedIcon sx={{marginRight:'.7rem'}}/>Help</Link>
          </div>
          <div className="nm-third">
              <button className="nm-signout-btn"> Sign out</button>
              <p style={{ filter:"blur(2px)"}}>{currentUser.email}</p>
          </div>
     
    </nav>
  )
}

export default NavigationMenu