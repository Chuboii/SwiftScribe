import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import logo from '/src/assets/swiftscribe logo.jpg'
import './HomeHeader.scss'
import HomeSubHeader from '../home sub header/HomeSubHeader';
import NavigationMenu from '../navigation menu/NavigationMenu';
import { useContext, useState } from 'react';
import {UserContext} from '/src/context/UserContext'
import SearchInput from '../search input/SearchInput';
function HomeHeader() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { currentUser } = useContext(UserContext)
    
    const enableMenu = () => {
      setToggleMenu(!toggleMenu)
console.log(currentUser.photoURL);
}

    return(
        
        <>
           
            
            {toggleMenu && <NavigationMenu />}
      <header className='homeheader-container'>

        
        <SearchInput/>
                <div className="homeheader-second">
                    <NotificationsNoneOutlinedIcon className='homeheader-noti'/>
                    <div className='homeheader-image' onClick={enableMenu}>
                        <img src={currentUser.photoURL} className='homeheader-dp' alt="" />
                        <KeyboardArrowDownOutlinedIcon className='homeheader-arrow-down'/>
                        </div>
                    
                </div>

            </header>

            <HomeSubHeader/>
      </>
  ) 
}

export default HomeHeader