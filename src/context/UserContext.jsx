import {useState, useEffect,createContext} from "react"
import {onAuthChanged, signUserOut} from "/src/utils/firebase/firebase.utils"
import {v4 as uuidv4} from "uuid"
import {useNavigate} from "react-router-dom"

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
 const [postDetails] = useState(getPost)
 
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

}, []);
//triggerSignout()


  const value = {currentUser, triggerSignout, setCurrentUser, friendsId, setFriendsId, usersProfile,setPostUserId, setUsersProfile, isGoogleSignupAvatar, setIsGoogleSignupAvatar, isEmail, postUserId, setIsEmail, setCommentCount, postDetails, commentCount}
  
  return (
    <UserContext.Provider value={value}>
   {children}
    </UserContext.Provider>
    )
}