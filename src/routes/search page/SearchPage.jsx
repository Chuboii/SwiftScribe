import './SearchPage.scss'
import {SearchDataContext} from "../../context/SearchData"
import {useContext, useState, useEffect} from "react"
import SearchInput from "../../components/search input/SearchInput"
import {ToggleContext} from "/src/context/ToggleContext"
import {Link, Outlet} from "react-router-dom"

function SearchPage() {
 const {searchData, isSearchBtnClicked} = useContext(SearchDataContext)
  const [deskstopSize, setDesktopSize] = useState(false)
const {setToggleMenu} = useContext(ToggleContext)
 const [isHomeClicked, setIsHomeClicked] = useState("2px solid")
  const [isAboutClicked, setIsAboutClicked] = useState("none")
  
  const tapHome = () =>{
    setIsHomeClicked("2px solid")
    setIsAboutClicked("none")
  }
  const tapAbout = () => {
    setIsAboutClicked("2px solid")
    setIsHomeClicked("none")
  }


   useEffect(()=>{
     function resizeScreen(){
    const screenWidth = window.innerWidth
    const threshold = 700;

  if (screenWidth < threshold) {
    setDesktopSize(true)
  } else {
  setDesktopSize(false)
  }
     }
     resizeScreen()
   window.addEventListener("resize", resizeScreen)
   
   
   },[deskstopSize])
 
 
 return (
   <>
   <div className="searchpage-container" onClick={() => setToggleMenu(false)}>
  {deskstopSize && <SearchInput/>}
  <h1 className='sp-h1'>  
  {isSearchBtnClicked && 
  <> 
  <span>Search results for</span>
  <span style={{color:"orangered"}}>{searchData}</span>
  </>
}
</h1>
  <div className="gp-header-last">
    <Link to={"/search"} style={{borderBottom:isHomeClicked}} onClick={tapHome} className="gp-link"> People </Link>
    <Link to={"posts"} style={{borderBottom:isAboutClicked, paddingBottom:"1rem"}} onClick={tapAbout} className="gp-link"> Posts </Link>
    </div>
    {<Outlet/>}
   </div>
   </>
   )
}

export default SearchPage