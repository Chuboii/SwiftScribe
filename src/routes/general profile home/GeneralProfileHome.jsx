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
  const {usersProfile,setLinkId, setPostDetails, setPostUserId, postUserId, setUsersProfile, setFriendsId} = useContext(UserContext)
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
  //    console.log(usersProfile);
     
      const getData = async() => {
        try{
          const res = await db.listDocuments("652755cdc76b42b46adb", "652ebb6ad8417bfdac54")
      //  console.log(res.documents)
      const filtered = res.documents.filter(el =>{
          return JSON.parse(el.blog).userId === postUserId
        })
       
      // console.log(filtered)
     
    setData(filtered)
 //    console.log(JSON.parse(filtered[0].blog))

          
     setIsDataLoaded(false) 
      }
      catch(e){
        if(e.type === "document_not_found"){
          setData({
            blog:[]
          })
        }
        console.log(e.type)
      }
      }
getData()
    }
    }, [isDataLoaded])

  
const viewBlog = (idx, el) =>{
 // console.log(idx)
 setFriendsId(idx)
 console.log(el.$id)
   localStorage.setItem("friendsId", idx)
 //  console.log(data.$id)
 //  console.log(JSON.parse(el))
  // console.log(el)
  localStorage.setItem('postDetails', el.blog)
  localStorage.setItem('suggestId', el.$id)
  const storage2 = localStorage.getItem('suggestId') 
 setLinkId(storage2)
  localStorage.setItem('postUserId', JSON.parse(el.blog).userId)
    localStorage.setItem('usersProfile', el.$id)


   const storage4= localStorage.getItem('postUserId') 
   setPostUserId(storage4)
   const storage3 = localStorage.getItem('postDetails') 
 //  console.log(data)
   setPostDetails(JSON.parse(storage3))
 navigate(`post/${el.$id}`)
  }
// console.log(data)
  return(
    <>
   {toggleHeader && <HomeHeader/>}
   <div className="generalprofilehome-container">
  {
    data ? data.map(doc =>(
  <div key={JSON.parse(doc.blog).id} className="gph-box" onClick={() =>{
    viewBlog(JSON.parse(doc.blog).id, doc)
  }}>
  <header className="gph-header">
   <img src={JSON.parse(doc.blog).photo} alt="profile-pic" className="gph-header-img"/>
  
   <p className="gph-post-time">
  @{JSON.parse(doc.blog).displayName}
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> {JSON.parse(doc.blog).blogTitle} </p>
  <img src={JSON.parse(doc.blog).blogTitleImg} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> {JSON.parse(doc.blog).tag[0]}</p>
   <p className="gph-read-time">{JSON.parse(doc.blog).readTime} mins read </p>
   </footer>
   </div>
 )) : <TextBasedLoader/>
 }
 
   </div>
    </>
    )
}