import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signInWithGoogle, signInWithFacebook } from '/src/utils/firebase/firebase.utils';
import {UserContext} from "/src/context/UserContext"
import {useContext} from "react"
import {db} from "/src/utils/appwrite/appwrite.utils"

export default function Signup() {
    const navigate = useNavigate()
const {currentUser, setCurrentUser} = useContext(UserContext)

const googleBtn = async() =>{
 try{
  await signInWithGoogle()
  await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
  }
  catch(e){
    console.log(e)
       if(e.message === "Document with the requested ID could not be found."){
      navigate("/swiftscribe/callback/setting-up")
       }
  }
}
const facebookBtn = async() =>{

 try{
  await signInWithFacebook()
  }
  catch(e){
    console.log(e)
  }
}
    return (
        <>
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

            <div className="already-acct">Already have an account?  <Link to={'/swiftscribe/signin'}>Sign in</Link></div>
   </div>
            </>
    )
}