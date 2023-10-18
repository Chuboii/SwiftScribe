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
  const {currentUser, setUsersProfile} = useContext(UserContext)
  const [isLoadedFromServer, setIsLoadedFromServer] = useState(false)
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
        const res = await db.listDocuments('652755cdc76b42b46adb', '652755d73451dcffebde')

        setUsers(res)
        //console.log(res);

      }

      getUsers()
      setIsLoadedFromServer(true)
    }
 },[isLoadedFromServer, users])
  
const displayUserProfile = async(idx) =>{
  //navigate("/user")
  console.log(idx)
 setUsersProfile(idx)
  localStorage.setItem("usersProfile", idx)
  navigate("/user")
  /*try{
  const res = await db.getDocument('652755cdc76b42b46adb', '652755d73451dcffebde', idx)
  
  setUsersProfile(res)
  
}
catch(e){
  console.log(e)
}*/
}




  
  
  
  
  
  
  
  
  return (
    <>
      
      {toggleHeader && <HomeHeader pos={headerPos}/>}
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos} t={subHeaderTop} />}
    
    <div className="suggestions-container" onClick={() => setToggleMenu(false)}>
  <h3 className="suggestions-h3"> Who to follow </h3>
  
        {
          users ? users.documents.map((user, id) => (
          
        <div onClick={() =>{
        displayUserProfile(user.$id)
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
          <button className="suggestions-btn"> Follow </button>
        </div>
          )) : (
            <TextBasedLoader />
            )}
    </div>
    </>
    )
}