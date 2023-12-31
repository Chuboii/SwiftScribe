import HomeSubHeader from "../../components/home sub header/HomeSubHeader"
import {ToggleContext} from "/src/context/ToggleContext"
import "./UserProfileHome.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeHeader from "/src/components/home header/HomeHeader"
import {useState, useEffect, useContext} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import { UserContext } from "../../context/UserContext"
import {useNavigate} from "react-router-dom"

export default function UserProfileHome() {
  const [toggleSubHeader, setToggleSubHeader] = useState(false)
  const [toggleHeader, setToggleHeader] = useState(false)
  const {setToggleMenu} = useContext(ToggleContext)
  const [scrollYY, setScrollYY] = useState(0)
  const [subHeaderPos, setSubHeaderPos] = useState('relative')
  const [headerPos, setHeaderPos] = useState("relative")
  const [subHeaderTop, setSubHeaderTop] = useState(0)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [blogPreview, setBlogPreview] = useState(null)
  const {currentUser,setLinkId, setPostDetails, setFriendsId} =useContext(UserContext)
  const navigate = useNavigate()
  
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


  useEffect(() => {
    
  })
  
  useEffect(()=>{
    if(!isDataLoaded){
    const getBlog = async ()=>{
      const res = await db.getDocument("652755cdc76b42b46adb","652c619059614689c161", currentUser.uid)

      setBlogPreview(res)

      setIsDataLoaded(false)
    }
      getBlog()
      
    }
  },[isDataLoaded])
 
  const viewBlog = (idx, el) =>{
    setFriendsId(idx)
    localStorage.setItem("suggestId", idx)
   // console.log(idx);
   localStorage.setItem('postDetails', el)
 //  console.log(el)
// const storage = 
   const storage2 = localStorage.getItem('suggestId') 
   setLinkId(storage2)
   const storage3 = localStorage.getItem('postDetails') 
   setPostDetails(JSON.parse(storage3))
   navigate(`/user/profile/${idx}`)
  }



  return(
    <>
 {toggleHeader && <HomeHeader pos={headerPos}/>}
 

   <div className="userprofilehome-container">
        {blogPreview ? blogPreview.blog.map(doc => (
          <div key={JSON.parse(doc).id} className="uph-box" onClick={()=> {
           viewBlog(JSON.parse(doc).id, doc)
          }}>
          <header className="uph-header">
            <img src={JSON.parse(doc).photo} alt="profile-pic" className="uph-header-img" />
            <p className="uph-name">
                @{JSON.parse(doc).displayName}
              </p>
          </header>
          <main className="uph-main">
            <p className="uph-title">{JSON.parse(doc).blogTitle} </p>
            <img src={JSON.parse(doc).blogTitleImg} alt="title-img" className="uph-main-img" />
          </main>
   
          <footer className="uph-footer">
            <p className="uph-tag"> {JSON.parse(doc).tag[0]}</p>
            <p className="uph-read-time">{JSON.parse(doc).readTime}mins </p>
          </footer>

        </div>
        )) : ""}
   </div>
    </>
    )
}