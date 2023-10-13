import './SearchPage.scss'
import {SearchDataContext} from "../../context/SearchData"
import {useContext, useState, useEffect} from "react"
import SearchInput from "../../components/search input/SearchInput"
import {ToggleContext} from "/src/context/ToggleContext"
function SearchPage() {
 const {searchData} = useContext(SearchDataContext)
  const [deskstopSize, setDesktopSize] = useState(false)
const {setToggleMenu} = useContext(ToggleContext)

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
   
   return window.removeEventListener("resize", resizeScreen)
   },[deskstopSize])
 
 
 return (
   <>
   <div className="searchpage-container" onClick={() => setToggleMenu(false)}>
  {deskstopSize && <SearchInput/>}
  {searchData}
   </div>
   </>
   )
}

export default SearchPage