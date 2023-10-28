import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import logo from '/src/assets/logo.jpg'
import './HomeHeader.scss'
import HomeSubHeader from '../home sub header/HomeSubHeader';
import NavigationMenu from '../navigation menu/NavigationMenu';
import { useContext, useState, useEffect } from 'react';
import {UserContext} from '/src/context/UserContext'
import SearchInput from '../search input/SearchInput';
import SearchIcon from '@mui/icons-material/Search';
import {Outlet, Link, useNavigate} from "react-router-dom"
import {ToggleContext} from "/src/context/ToggleContext"
import Aside from '../aside/Aside';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {db} from "/src/utils/appwrite/appwrite.utils"
import {NotificationContext} from "/src/context/NotificationContext"

function HomeHeader({pos}) {
    const {toggleMenu, setToggleMenu} = useContext(ToggleContext)
    const { currentUser } = useContext(UserContext)
   const [toggleSearchInput, setToggleSearchInput] = useState(false)
   const [deskstopSize, setDesktopSize] = useState(false)
   const navigate= useNavigate()
 const [data, setData] = useState(null)
 const {notifyUser} = useContext(NotificationContext)
useEffect(()=>{
  
  const getData = async()=>{
    const res = await db.getDocument("652755cdc76b42b46adb", "65367cd8d42ee9bde7bb", currentUser.uid)
    setData(res.notify)
  //console.log(res)
  }
  
  getData()
  
 
},[notifyUser])



   useEffect(()=>{
     function resizeScreen(){
    const screenWidth = window.innerWidth
    const threshold = 700;

  if (screenWidth < threshold) {
    setDesktopSize(false)
  } else {
  setDesktopSize(true)
  }
     }
     resizeScreen()
   window.addEventListener("resize", resizeScreen)
   
   },[deskstopSize])
   
   
   
   
   
   
    const enableMenu = (e) => {
      e.stopPropagation()
      setToggleMenu(!toggleMenu)
console.log(currentUser.photoURL);
}

const toggleHome = () =>{
  navigate("/")
}

    return(
        
        <>         
            {toggleMenu && <NavigationMenu />}
      <header className='homeheader-container' style={{position:pos, top:"0"}}>
    <div className="homeheader-logo-box" onClick={toggleHome} >

    <img src={logo} alt="logo" className='homeheader-logo'/>

<p className="homeheader-logo-text">SwiftScribe</p>
    </div>
      <Link to={"/search"}> <SearchIcon className="homeheader-searc-icon"/></Link>
       {deskstopSize && <SearchInput/>}
       {deskstopSize && <DriveFileRenameOutlineOutlinedIcon onClick={() => navigate('/write-blog')} sx={{position:"absolute", right:"10rem", fontSize:"30px", cursor:"pointer"}}/>}
                <div className="homeheader-second">
                <Link className="hs-bell" to={"/notification"}>
                <div className="hs-num"> {data ? data.length : 0}</div>
               <NotificationsNoneOutlinedIcon className='homeheader-noti' style={{color:"black"}}/>
               </Link>
                    <div className='homeheader-image' onClick={enableMenu}>
                        <img src={currentUser.photoURL} className='homeheader-dp' alt="" />

                        </div>
                    
                </div>

            </header>

<Outlet/>
         <Aside/>
      </>
  ) 
}

export default HomeHeader