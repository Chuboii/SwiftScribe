import {useState, useEffect,createContext} from "react"
import {onAuthChanged, signUserOut} from "/src/utils/firebase/firebase.utils"
import {v4 as uuidv4} from "uuid"
import {useNavigate} from "react-router-dom"

export const UserContext = createContext()

function getCurrentUser(){
  const data = localStorage.getItem("currentUser")
  return data ? JSON.parse(data) : null
}
export const UserProvider = ({children})=>{
 const [currentUser, setCurrentUser] = useState(getCurrentUser)
 const navigate = useNavigate()
 
 
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

const triggerSignout = () =>{
  signUserOut()
  localStorage.setItem("currentUser", JSON.stringify(null))
  setCurrentUser(null)
}

  const value = {currentUser, triggerSignout, setCurrentUser}
  
  return (
    <UserContext.Provider value={value}>
   {children}
    </UserContext.Provider>
    )
}