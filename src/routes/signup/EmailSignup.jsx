import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import './EmailSignup.scss'

function EmailSignup() {
    return (
        <>
            <form action="" className="emailsignup-container">

                <h1 className="emailsignup-title">Sign up with email</h1>
                
                <div className="emailsignup-group">
                    <label htmlFor="esu-inp" className="emailsignup-label">Email</label>
                    <input className="esu-input" id='esu-inp'/>
                </div>

                <div className="emailsignup-group">
                    <label
                        className="emailsignup-label"
                        htmlFor="esu-inp">Password</label>
                    <input className="esu-input" id='esu-inp'/>
                </div>

                <button className="esu-btn">Sign up</button>

                <Link className="esu-link" to={'/swiftscribe/signup'}><ChevronLeftIcon/>All sign up options</Link>  
            </form>
    </>
  )
}

export default EmailSignup