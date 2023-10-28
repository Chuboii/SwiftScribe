import {useEffect, useContext, useState} from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import { UserContext } from "../../context/UserContext"
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import "./SearchPeople.scss"
import {SearchDataContext} from "../../context/SearchData"
import {useNavigate} from "react-router-dom"
export default function SearchPeople(){
  const [users, setUsers] = useState(null)
  const {searchData, isSearchBtnClicked} = useContext(SearchDataContext)
  const [userNotFound, setUserNotFound] = useState(false)
  const navigate = useNavigate()
  const {setUsersProfile} = useContext(UserContext)
/*
  useEffect(()=>{
    setUsers(null)
    setUserNotFound(false)
  },[])*/
  
  useEffect(()=>{
  //  setUsers(null)
    if(searchData){
      
    const getPeople = async() =>{
      try{
       const res = await db.listDocuments("652755cdc76b42b46adb", "652755d73451dcffebde")
      
      const filtered = res.documents.filter(el =>{
        return JSON.parse(el.user).displayName.toLowerCase().includes(searchData.toLowerCase())
      })
      
    console.log(filtered)
   if(filtered.length > 0){
     setUsers(filtered)
     setUserNotFound(false)
   }
   else{
   setUserNotFound(true)
   //setUsers(null)
   }
   //console.log(users)
      }
    catch(e){
      console.log(e)
    } 
    }
    getPeople()
    
   }
   
  },[searchData, !searchData])
  
  const displayUserProfile = async(idx, user)=>{
    setUsersProfile(idx)
  localStorage.setItem("usersProfile", idx)
  localStorage.setItem("userDocId", user.user)
  navigate("/user")
  }
  
  
  return(
    <>
    <div className="searchpeople-container">
  <p style={{fontWeight:"700", marginTop:"1.5rem"}}>  Recent Search (People)</p>
     {userNotFound && <span> User not Found</span>}
  {
          users  ? users.map((user, id) => (
          
        <div onClick={() =>{
        displayUserProfile(user.$id, user)
}} className = "suggestions-box" key={JSON.parse(user.user).id}> 
         <div style={{display:"flex", alignItems:"center"}}>
          <div className="suggestions-image">
            <img src={JSON.parse(user.user).photoURL} alt="profile-pic" className="suggestions-img" />
          </div>
          <div className="suggestions-text">
            <p className="suggestions-name"> {JSON.parse(user.user).displayName} </p>
            <p className="suggestions-bio">{JSON.parse(user.user).bio}</p>
          </div>
          </div>
              <button className="suggestions-btn" onClick={() => {
              
                followBtn(user, user.$id, id)
              }}> View Profile</button>
        </div>
          )) : 
            userNotFound ? "" :<TextBasedLoader/>
            }
 
    </div>
    </>
    )
}