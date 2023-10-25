import "./Following.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeSubHeader from "/src/components/home sub header/HomeSubHeader"
import {useState, useEffect, useContext} from "react"
import {ToggleContext} from "/src/context/ToggleContext"
import HomeHeader from "../../components/home header/HomeHeader"
import {db} from "/src/utils/appwrite/appwrite.utils"
import { UserContext } from "../../context/UserContext"
import {useNavigate} from "react-router-dom"
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"

export default function Following(){
  const [toggleSubHeader, setToggleSubHeader] = useState(false)
  const {setToggleMenu} = useContext(ToggleContext)
  const [toggleHeader, setToggleHeader] = useState(false)
  const [scrollYY, setScrollYY] = useState(0)
  const [subHeaderPos, setSubHeaderPos] = useState('relative')
  const [headerPos, setHeaderPos] = useState("relative")
  const {currentUser} = useContext(UserContext)
const [subHeaderTop, setSubHeaderTop] = useState(0)
const [isDataLoaded, setIsDataLoaded] = useState(false)
const [blogPreview, setBlogPreview] = useState(null)

  function scrollFunction() {
     const scrollPos = window.scrollY
   
    setScrollYY(scrollPos)
   if (scrollYY > 150) {
      setToggleSubHeader(true)
     setSubHeaderPos('fixed')
     setSubHeaderTop(0)
    }
    else {
      setToggleSubHeader(false)
   }
    
   if (scrollPos <scrollYY) {
    setToggleHeader(true)
     setHeaderPos('fixed')
     setSubHeaderTop(4.5)
  }
  else {
    setToggleHeader(false)
  }



  }

  useEffect(() => {
  
   
    window.addEventListener("scroll", scrollFunction)

    
  }, [scrollYY])
  
  
  useEffect(()=>{
    if(!isDataLoaded){
     
    const getBlog = async ()=>{
      try{
      const res = await db.listDocuments("652755cdc76b42b46adb","652ebb6ad8417bfdac54"
    )
    const res2 = await db.getDocument("652755cdc76b42b46adb", "653007869312ccf2fa4c", currentUser.uid)
//console.log(res2)
const filtered = res.documents.filter(el =>{
    const a = el.blog.map(e =>{
      console.log(res2.following.some(i => JSON.parse(i).email === JSON.parse(e).email))
    })
  // return a
})
console.log(filtered)
      //setBlogPreview(res)

      setIsDataLoaded(false)
    }
    
    catch(e){
      console.log(e)
    }
    }
    getBlog()
    }
 },[isDataLoaded])
  
  
  
  
  
  
  
  return(
    <>
            {toggleHeader && <HomeHeader pos={headerPos}/>}
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos} t={subHeaderTop} />}
      
   {toggleSubHeader && <HomeSubHeader/>}
   <div className="following-container" onClick={() => setToggleMenu(false)}>
   <div className=""> Feature Coming Soon... </div>
  {/* <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
   
   */}
   </div>
    </>
    )
}