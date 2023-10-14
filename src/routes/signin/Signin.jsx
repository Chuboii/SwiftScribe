import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Link, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signInWithGoogle, signInWithFacebook} from '/src/utils/firebase/firebase.utils';
import {UserContext} from "/src/context/UserContext"
import {useContext, useState} from "react"
import './Signin.scss'
import Success from "/src/components/alert/success/Success"
import { db } from "/src/utils/appwrite/appwrite.utils"

function Signin() {
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
 const {currentUser} = useContext(UserContext)
    const googleBtn = async() =>{
 try{
const {user} =  await signInWithGoogle()
//console.log(user)
await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", user.uid)
 setIsSuccess(true)
 setTimeout(() => {
   navigate("/")
      }, 2000);
  }
  catch(e){
    console.log(e)
       if(e.message === "Document with the requested ID could not be found."){
           setIsSuccess(true)
           setTimeout(() => {
            navigate("/swiftscribe/callback/setting-up")
           }, 2000);
         
       }
  }
}

const facebookBtn = async() =>{
  console.log("hdhdh")
 try{
  await signInWithFacebook()
navigate("/")
     await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
  }
  catch(e){
     console.log(e)
     if(e.message === "Document with the requested ID could not be found."){
         setTimeout(() => {
            navigate("/swiftscribe/callback/setting-up")

        }, 2000);
     }
  }
}
    
    
    
    return (
      <>
       {isSuccess && <Success/>}
    <div className="signin-container">
                <h3 className='signin-title'>Welcome back</h3>


<div className="signin-options">
        <button
            onClick={googleBtn}
            className="signin-google">
    <GoogleIcon sx={{ color: 'red' }} />
<p className='sug-text'>Sign in with Google</p>
                    </button>
                    
                    <button onClick={facebookBtn}
            className="signin-facebook">
    <FacebookIcon sx={{ color: 'blue' }} />
<p className='suf-text'>Sign in with Facebook</p>
                    </button>
                    

        <button
            onClick={() => navigate("/swiftscribe/signin/email")}
            className="signin-email">
    <MailOutlinedIcon />
<p className='sue-text'>Sign in with Email</p>
</button>
</div>

<div className="already-acct">No account?  <Link to={'/swiftscribe/signup'} className="a">Sign up</Link></div>
</div>
</>
  )
}

export default Signin