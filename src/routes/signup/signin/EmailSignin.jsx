import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import './EmailSignin.scss'

function EmailSignin() {
    return (
        <>
            <form action="" className="emailsignin-container">

                <h1 className="emailsignin-title">Sign in with email</h1>
                
                <div className="emailsignin-group">
                    <label htmlFor="esu-inp" className="emailsignin-label">Email</label>
                    <input className="esu-input" id='esu-inp'/>
                </div>

                <div className="emailsignin-group">
                    <label
                        className="emailsignin-label"
                        htmlFor="esu-inp">Password</label>
                    <input className="esu-input" id='esu-inp'/>
                </div>

                <button className="esu-btn">Sign in</button>

                <Link className="esu-link" to={'/swiftscribe/signin'}><ChevronLeftIcon/> All sign in options</Link>  
            </form>
    </>
  )
}

export default EmailSignin