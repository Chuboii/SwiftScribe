import "./ForYou.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeSubHeader from "/src/components/home sub header/HomeSubHeader"
import {useState, useEffect, useContext} from "react"
import {ToggleContext} from "/src/context/ToggleContext"
import HomeHeader from "../../components/home header/HomeHeader"
import {db} from "/src/utils/appwrite/appwrite.utils"
import { UserContext } from "../../context/UserContext"
import {useNavigate} from "react-router-dom"
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"

export default function ForYou(){
  const [toggleSubHeader, setToggleSubHeader] = useState(false)
  const [toggleHeader, setToggleHeader] = useState(false)
  const {setToggleMenu} = useContext(ToggleContext)
  const [scrollYY, setScrollYY] = useState(0)
  const [subHeaderPos, setSubHeaderPos] = useState('relative')
  const [headerPos, setHeaderPos] = useState("relative")
const [subHeaderTop, setSubHeaderTop] = useState(0)
const {currentUser, setUsersProfile} = useContext(UserContext)
const [isDataLoaded, setIsDataLoaded] = useState(false)
const navigate = useNavigate()
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
      const res = await db.listDocuments("652755cdc76b42b46adb","652ebb6ad8417bfdac54")

      setBlogPreview(res)

      setIsDataLoaded(false)
    }
      getBlog()
      
    }
  },[isDataLoaded])
 
  const enableUserPost = (idx) => {
   localStorage.setItem('usersProfile', idx)
   setUsersProfile(idx)
     navigate("user/post")
   console.log(idx);
 }
  return(
    <>
      
      {toggleHeader && <HomeHeader pos={headerPos}/>}
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos } t={subHeaderTop} />}
   <div className="foryou-container" onClick={() => setToggleMenu(false)}>
        {
          blogPreview ? blogPreview.documents.map(el => {
         
          return (
            <div key={el.$id} className="fy-box" onClick={() => {
              enableUserPost(el.$id)
            }}>
              {
                el.blog.map(doc => (
            <div key={JSON.parse(doc).id}>
            <header className="fy-header">
              <img src={JSON.parse(doc).photo} alt="profile-pic" className="fy-header-img" />
              <p className="fy-name">
                @{JSON.parse(doc).displayName}
              </p>
            </header>
            <main className="fy-main">
              <p className="fy-title">{JSON.parse(doc).blogTitle}</p>
              <img src={JSON.parse(doc).blogTitleImg} alt="title-img" className="fy-main-img" />
            </main>
   
            <footer className="fy-footer">
              <p className="fy-tag"> {JSON.parse(doc).tag[0]}</p>
              <p className="fy-read-time">{JSON.parse(doc).readTime}mins </p>
                    </footer>
                    </div>
           )) }
            </div>
          
          )    
            }) : <TextBasedLoader/>
            

        }
      
   

   </div>
    </>
    )
}