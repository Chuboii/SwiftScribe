import {useEffect, useContext, useState} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import { UserContext } from "../../context/UserContext"
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import "./SearchPosts.scss"
import {SearchDataContext} from "../../context/SearchData"
import {useNavigate} from "react-router-dom"

export default function SearchPosts(){
  const [data, setData] = useState(null)
  const {searchData, isSearchBtnClicked} = useContext(SearchDataContext)
  const [userNotFound, setUserNotFound] = useState(false)
  const {setUsersProfile} = useContext(UserContext)
  const navigate = useNavigate()
 const {setLinkId, setPostDetails} = useContext(UserContext)
  useEffect(()=>{
    
    if(searchData){
    const getBlogs = async() =>{
      try{
       const res = await db.listDocuments("652755cdc76b42b46adb", "652ebb6ad8417bfdac54")
      
     const filtered = res.documents.filter(el =>{
        return JSON.parse(el.blog).blogTitle.includes(searchData)
      })
    console.log(filtered)
 
 setData(filtered)
/* if(filtered.length > 0){
     setUserNotFound(false)
   }
   else{
   setUserNotFound(true)
   setData(null)
   }
   //console.log(users)*/
      }
    catch(e){
      console.log(e)
    } 
    }
    getBlogs()
    
   }
   
  },[searchData, isSearchBtnClicked])
  

  const viewBlog = async(idx, el, ell) =>{
  //  console.log(userr)
    setUsersProfile(idx)
   // console.log(idx)
    localStorage.setItem("usersProfile", idx)
    localStorage.setItem("postUserId", el)
    localStorage.setItem('postDetails', ell.blog)
    const user = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", el)
    const storage2 = localStorage.getItem('usersProfile') 
   setLinkId(storage2)
   const storage3 = localStorage.getItem('postDetails') 
   setPostDetails(JSON.parse(storage3))
   localStorage.setItem("userDocId", user.user)
    navigate(`/user/post/${idx}`)
    
  }
  return(
    <>
    <div className="searchposts-container">
      <p style={{fontWeight:"700",marginTop:"1.5rem"}}>  Recent Search (Posts)</p>
     {userNotFound && <span> User not Found</span>}
   {
    data ? data.map(doc =>(
  <div key={JSON.parse(doc.blog).id} className="gph-box" onClick={() =>{
    viewBlog(doc.$id, JSON.parse(doc.blog).userId, doc)
  }}>
  <header className="gph-header">
   <img src={JSON.parse(doc.blog).photo} alt="profile-pic" className="gph-header-img"/>
  
   <p className="gph-post-time">
   1 day ago
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
 )) : ""
 }
    </div>
    </>
    )
}