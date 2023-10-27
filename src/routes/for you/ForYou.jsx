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
const {currentUser, setPostDetails,setLinkId, setPostUserId, setUsersProfile} = useContext(UserContext)
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
      try{
      const res = await db.listDocuments("652755cdc76b42b46adb","652ebb6ad8417bfdac54")

      setBlogPreview(res)

      setIsDataLoaded(false)
    }
    
    catch(e){
      console.log(e)
    }
    
    try{
        const globalUsers = await db.listDocuments("652755cdc76b42b46adb", "652755d73451dcffebde")
       // console.log(JSON.parse(globalUsers.documents))
       const data = {
          users: [JSON.stringify(globalUsers.documents)]
        }
     //   console.log(JSON.stringify(users.documents))
        const localUsers = await db.createDocument("652755cdc76b42b46adb", "653198b4521b75edcbaf", currentUser.uid, data)
        console.log("created")

     }
     catch (e){
     console.log(e)
    if(e.code === 409){
      const getDoc = await db.listDocuments("652755cdc76b42b46adb","652755d73451dcffebde")
   //   console.log(getDoc.documents)
     const parsedData = JSON.stringify(getDoc.documents)
     
      const updateLocalUsers = {
        users: [parsedData]
      }
      await db.updateDocument("652755cdc76b42b46adb", "653198b4521b75edcbaf", currentUser.uid, updateLocalUsers)
      console.log("updated")
      const res = db.getDocument("652755cdc76b42b46adb", "653198b4521b75edcbaf", currentUser.uid)
      
     
    }
    }
 
      
      
    }
    getBlog()
    }
    
    
  },[isDataLoaded])
 
  const enableUserPost = async (idx, el) => {
  //  console.log(idx)
  localStorage.setItem('usersProfile', idx)
   localStorage.setItem('postUserId', JSON.parse(el.blog).userId)
   localStorage.setItem("suggestId", idx)
   localStorage.setItem('postDetails', el.blog)
   localStorage.setItem('userDocId', el.blog)
   
   
 
   const storage = localStorage.getItem('postUserId') 
   setPostUserId(storage)
   const storage2 = localStorage.getItem('suggestId') 
   setLinkId(storage2)
  // const storage4 = localStorage.getItem('xyz') 
   
   const storage3 = localStorage.getItem('postDetails') 
   setPostDetails(JSON.parse(storage3))
   setUsersProfile(idx)
   const user = await db.getDocument("652755cdc76b42b46adb","652755d73451dcffebde", storage) 
   localStorage.setItem('userDocId', user.user)
  
    navigate(`user/post/${idx}`)
     
 //  console.log(JSON.parse(el.blog));
 }
  return(
    <>
      
      {toggleHeader && <HomeHeader pos={headerPos}/>}
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos } t={subHeaderTop} />}
   <div className="foryou-container" onClick={() => setToggleMenu(false)}>
        {
          blogPreview ? blogPreview.documents.slice().reverse().map(el => {
         
          return (
            <div key={el.$id} className="fy-box" onClick={() => {
              enableUserPost(el.$id, el)
            }}>
              {
                el.blog.map(doc => (
            <div key={JSON.parse(doc).id}>
            <header className="fy-header">
              <img style={{objectFit:'cover'}} src={JSON.parse(doc).photo} alt="profile-pic" className="fy-header-img" />
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