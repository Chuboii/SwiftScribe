import HomeHeader from "../../components/home header/HomeHeader"
import HomeSubHeader from "../../components/home sub header/HomeSubHeader"
import "./Suggestions.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import {ToggleContext} from "/src/context/ToggleContext"
import { useContext, useState, useEffect } from "react"
import {db} from '/src/utils/appwrite/appwrite.utils'
import { UserContext } from "../../context/UserContext"
import TextBasedLoader from "/src/components/loaders/TextBasedLoader"
import {useNavigate} from "react-router-dom"

function getUserDocId(){
  const storage = localStorage.getItem("userDocId")
  return storage ? JSON.parse(storage) : null
}

export default function Suggestions(){
  const navigate = useNavigate()
  const [toggleSubHeader, setToggleSubHeader] = useState(false)  
  const { setToggleMenu } = useContext(ToggleContext)
    const [toggleHeader, setToggleHeader] = useState(false)
    const [scrollYY, setScrollYY] = useState(0)
    const [subHeaderPos, setSubHeaderPos] = useState('relative')
    const [headerPos, setHeaderPos] = useState("relative")
  const [subHeaderTop, setSubHeaderTop] = useState(0)
  const [users, setUsers] = useState(null)
  const {currentUser,setPostUserId , setUsersProfile} = useContext(UserContext)
  const [isLoadedFromServer, setIsLoadedFromServer] = useState(false)
  const [userDocId] = useState(getUserDocId)
  const [isFollowing, setIsFollowing] = useState(false)
 
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
   
    if (!isLoadedFromServer) {
    
      const getUsers = async () => {
      try {
          const res = await db.listDocuments('652755cdc76b42b46adb', '652755d73451dcffebde')

          const filtered = res.documents.filter(el => {
            return el.$id !== currentUser.uid
          })
     //   console.log(filtered)

          setUsers(filtered)
    
          /*
         const followingRes = await db.getDocument('652755cdc76b42b46adb','653007869312ccf2fa4c', currentUser.uid)
   setIsFollowing(JSON.parse(followingRes.following))
   */
     //    console.log(followingRes)
/* const mapFollowing = followingRes.following.map(el => {
     return JSON.parse(el).id.includes(userDocId.id)
});
console.log(mapFollowing)

console.log(isFollowingPresent)
if(isFollowingPresent){
  setIsFollowing(isFollowingPresent)
}*/
      //   console.log(filterFollowing)
     
     //    console.log(followingRes)
         // console.log(filtered);
        }
      catch (e) {
        console.log(e)
          if (e.code === 500) {
           // console.log("navigatiing")
          navigate('/err-code')
          }
          else if(e.code === 503) {
            navigate('/err-code')
          }
          else if (e.code === 400) {
            navigate("/err-code")
          }
        }
      }
        getUsers()
        setIsLoadedFromServer(true)
      
    }
 },[isLoadedFromServer, users])
  
const displayUserProfile = async(idx, user) =>{
  //navigate("/user")
//  console.log(idx)
 setUsersProfile(idx)
  localStorage.setItem("usersProfile", idx)
  localStorage.setItem("postUserId", idx)
  const storage= localStorage.getItem("postUserId")
 setPostUserId(storage)
  localStorage.setItem("userDocId", user.user)
  navigate("/user")
}

  const followBtn = async (el,id, idx) => {

    
}


  
  
  
  
  
  
  
  
  return (
    <>
      
      {toggleHeader && <HomeHeader pos={headerPos}/>}
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos} t={subHeaderTop} />}
    
    <div className="suggestions-container" onClick={() => setToggleMenu(false)}>
  <h3 className="suggestions-h3"> Who to follow </h3>
  
        {
          users ? users.map((user, id) => (
          
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
          )) : (
            <TextBasedLoader />
            )}
    </div>
    </>
    )
}