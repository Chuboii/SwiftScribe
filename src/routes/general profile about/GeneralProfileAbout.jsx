import "./GeneralProfileAbout.scss"
import {useContext} from "react"
import {UserContext} from "/src/context/UserContext"

export default function GeneralProfileAbout(){
  const {usersProfile} = useContext(UserContext)
  
  const parsedUser = usersProfile ? JSON.parse(usersProfile.user) : ""
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
const date = new Date(parsedUser.dateCreated)
  return(
    <>
    <div className="generalprofileabout-container">
    <p className="gpa-bio">{parsedUser.bio} </p>
    <p className="gpa-member"> SwiftScribe memeber since {date.toLocaleDateString('en-US', options)} </p>
    
    </div>
    </>
    )
}