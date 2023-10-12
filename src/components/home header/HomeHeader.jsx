import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import logo from '/src/assets/swiftscribe logo.jpg'
import './HomeHeader.scss'
function HomeHeader() {
    return (
      <>
      <header className='homeheader-container'>

                <form className='homeheader-form'>
                    <div className="homeheader-logo-box">
                    <img src={logo} alt="logo" className='homeheader-logo'/>
           <p className="homeheader-logo-text">SwiftScribe</p>
                    </div>
                    <div className="homeheader-search-box">
                    <input type="search" className='homeheader-search-input' name="search swiftscribe" placeholder='Search SwiftScribe' id="search" />
                        <SearchIcon className='homeheader-search-icon'/>
                        </div>
                </form>  
                <div className="homeheader-second">
                    <NotificationsNoneOutlinedIcon className='homeheader-noti'/>
                    <div className='homeheader-image'>
                        <img src={logo} className='homeheader-dp' alt="" />
                        <KeyboardArrowDownOutlinedIcon className='homeheader-arrow-down'/>
                        </div>
                    
                </div>

   </header>
      </>
  )
}

export default HomeHeader