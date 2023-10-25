import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signInWithGoogle, signInWithFacebook } from '/src/utils/firebase/firebase.utils';
import {UserContext} from "/src/context/UserContext"
import {useContext, useState} from "react"
import { db } from "/src/utils/appwrite/appwrite.utils"
import Success from "/src/components/alert/success/Success"
import {ErrContext} from "/src/context/ErrContext"
import Err from "/src/components/alert/err/Err"

export default function Signup() {
    const navigate = useNavigate()
const {currentUser,setIsEmail, setIsGoogleSignupAvatar} = useContext(UserContext)
const [isSuccess, setIsSuccess] = useState(false)
const {errMsg, setErrMsg, isErrToggled, setIsErrToggled} = useContext(ErrContext)
const googleBtn = async() =>{
 try{
     const { user } = await signInWithGoogle()
  await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", user.uid)
  setIsSuccess(true)
  setTimeout(() => {
    navigate('/') 
  }, 2000);

 
 }
  catch(e){
    console.log(e)
       if(e.message === "Document with the requested ID could not be found."){
           setIsSuccess(true)
           setTimeout(() => {
            navigate("/swiftscribe/callback/setting-up")
            setIsGoogleSignupAvatar(true)
            setIsEmail(false)
           }, 2000);
         
       }
       else if(e.code === "auth/popup-closed-by-user"){
         setIsErrToggled(true)
         setErrMsg("Connection Timeout")
       }
  }
}
const facebookBtn = async() =>{

 try{
     await signInWithFacebook()
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
            {isErrToggled && <Err/> }
            <div className="signup-container">
                <h3 className='signup-title'>Join SwiftScribe</h3>
            
            
            <div className="signup-options">
                    <button
                        onClick={googleBtn}
                        className="signup-google">
                <GoogleIcon  sx={{ color: 'red' }} />
<p className='sug-text'>Sign up with Google</p>
                    </button>
                    <button
                        onClick={facebookBtn}
                        className="signup-facebook">
                <FacebookIcon sx={{ color: 'blue' }} />
<p className='suf-text'>Sign up with Facebook</p>
                </button>
                    <button
                        onClick={() => navigate("/swiftscribe/signup/email")}
                        className="signup-email">
                <MailOutlinedIcon />
<p className='sue-text'>Sign up with Email</p>
        </button>
            </div>

            <div className="already-acct">Already have an account?  <Link to={'/swiftscribe/signin'} className="a">Sign in</Link></div>
   </div>
            </>
    )
}