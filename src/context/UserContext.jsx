import {useState, useEffect,createContext} from "react"
import {onAuthChanged, signUserOut} from "/src/utils/firebase/firebase.utils"
import {v4 as uuidv4} from "uuid"
import {useNavigate, useLocation} from "react-router-dom"

export const UserContext = createContext()

function getCurrentUser(){
  const data = localStorage.getItem("currentUser")
  return data ? JSON.parse(data) : null
}

function getUsersProfile(){
  const storage = localStorage.getItem("usersProfile")
  return storage ? storage : null
}
function getFriendsId() {
  const storage = localStorage.getItem("friendsId")
  return storage ? storage : null
}

function getPostUserId() {
  const storage = localStorage.getItem("postUserId")
  return storage ? storage : null
}

function getPost() {
  const storage = localStorage.getItem("postDetails")
  return storage ? JSON.parse(storage) : null
}

function getLinkId(){
  const storage = localStorage.getItem("suggestId")
  return storage ? storage : null

}

function getUserDocId() {
  const storage = localStorage.getItem("userDocId")
  return storage ? JSON.parse(storage) : null
}

export const UserProvider = ({children})=>{
 const [currentUser, setCurrentUser] = useState(getCurrentUser)
 const [usersProfile, setUsersProfile] = useState(getUsersProfile)
 const [friendsId, setFriendsId] = useState(getFriendsId)
 const navigate = useNavigate()
 const [isGoogleSignupAvatar, setIsGoogleSignupAvatar]
 = useState(false)
 const [isEmail, setIsEmail] = useState(true)
 const [postUserId, setPostUserId] = useState(getPostUserId)
 const [commentCount, setCommentCount] = useState(0)
 const [postDetails, setPostDetails] = useState(getPost)
 const [linkId, setLinkId] = useState(getLinkId)
 const [userDocId, setUserDocId] = useState(getUserDocId)
 const location = useLocation()
 const triggerSignout = () =>{
  signUserOut()
  localStorage.setItem("currentUser", JSON.stringify(null))
  setCurrentUser(null)
}

  
 useEffect(() => {
  const unsubscribe = onAuthChanged(async(user) => {
    
    if(user){
     setCurrentUser(user);
     localStorage.setItem("currentUser", JSON.stringify(user))
     
    }
    else{
      navigate("/swiftscribe/signup")
    }
  })

  return () => {
    unsubscribe(); 
  };
   
  if(location.pathname){
    navigate("/swiftscribe/signup")
  }
  
}, []);
//triggerSignout()


  const value = {currentUser, triggerSignout, setCurrentUser, friendsId, setFriendsId, usersProfile,setPostUserId, setUsersProfile, isGoogleSignupAvatar, setIsGoogleSignupAvatar, isEmail, postUserId, setIsEmail, setCommentCount, postDetails,linkId, setPostDetails, setLinkId, commentCount, userDocId, setUserDocId}
  
  return (
    <UserContext.Provider value={value}>
   {children}
    </UserContext.Provider>
    )
}