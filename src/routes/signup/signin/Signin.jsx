import GoogleIcon from '@mui/icons-material/Google';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Link, useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';


import './Signin.scss'


function Signin() {
    const navigate = useNavigate()
    return (
      <>
    <div className="signin-container">
                <h3 className='signin-title'>Welcome back</h3>


<div className="signin-options">
        <button
            
            className="signin-google">
    <GoogleIcon sx={{ color: 'red' }} />
<p className='sug-text'>Sign in with Google</p>
                    </button>
                    
                    <button
            
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