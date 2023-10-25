import "./GeneralProfileHome.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeHeader from "/src/components/home header/HomeHeader"
import {useState, useEffect, useContext} from "react"
import {db} from "/src/utils/appwrite/appwrite.utils"
import {UserContext} from "/src/context/UserContext"
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import {useNavigate} from "react-router-dom"

export default function GeneralProfileHome(){
  const [toggleHeader, setToggleHeader] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const {usersProfile, setUsersProfile, setFriendsId} = useContext(UserContext)
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  
  useEffect(()=>{
    

    window.addEventListener("scroll", (e)=>{
      const targetElement = e.target || e.srcElement;
      //console.log(targetElement)
    })
    
  }, [toggleHeader])

    
  useEffect(() => {
    //console.log(usersProfile)
    if (!isDataLoaded && usersProfile) {
      //  console.log(usersProfile)
      console.log(usersProfile);
     
      const getData = async() => {
        try{
          const res = await db.getDocument("652755cdc76b42b46adb", "652c619059614689c161", usersProfile)
          
          //console.log(res)
       setData(res)

          
     setIsDataLoaded(false) 
      }
      catch(e){
        if(e.type === "document_not_found"){
          setData({
            blog:[]
          })
        }
     //   console.log(e.type)
      }
      }
getData()
    }
    }, [isDataLoaded])

  
const viewBlog = (idx) =>{
  setFriendsId(idx)
    localStorage.setItem("friendsId", idx)
    navigate("/user/post")
  }
// console.log(data)
  return(
    <>
   {toggleHeader && <HomeHeader/>}
   <div className="generalprofilehome-container">
  {
    data ? data.blog.map(doc =>(
  <div key={JSON.parse(doc).id} className="gph-box" onClick={() =>{
    viewBlog(JSON.parse(doc).id)
  }}>
  <header className="gph-header">
   <img src={JSON.parse(doc).photo} alt="profile-pic" className="gph-header-img"/>
  
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> {JSON.parse(doc).blogTitle} </p>
  <img src={JSON.parse(doc).blogTitleImg} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> {JSON.parse(doc).tag[0]}</p>
   <p className="gph-read-time">{JSON.parse(doc).readTime} mins read </p>
   </footer>
   </div>
 )) : <TextBasedLoader/>
 }
 
   </div>
    </>
    )
}