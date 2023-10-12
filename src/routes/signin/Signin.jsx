import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Link, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signInWithGoogle, signInWithFacebook} from '/src/utils/firebase/firebase.utils';
import {UserContext} from "/src/context/UserContext"
import {useContext} from "react"
import './Signin.scss'


function Signin() {
    const navigate = useNavigate()
    
    const googleBtn = async() =>{
 try{
const {user} =  await signInWithGoogle()
//console.log(user)
console.log(currentUser)
  }
  catch(e){
    console.log(e)
  }
}

const facebookBtn = async() =>{
  console.log("hdhdh")
 try{
  await signInWithFacebook()

  }
  catch(e){
    console.log(e)
  }
}
    
    
    
    return (
      <>
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

<div className="already-acct">No account?  <Link to={'/swiftscribe/signup'}>Sign up</Link></div>
</div>
</>
  )
}

export default Signin