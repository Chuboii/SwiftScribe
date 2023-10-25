import { Link, useNavigate } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signUpWithEmail} from "/src/utils/firebase/firebase.utils";
import {useForm} from "react-hook-form"
import './EmailSignup.scss'
import Success from "/src/components/alert/success/Success"
import {ErrContext} from "/src/context/ErrContext"
import {useContext, useState, useEffect} from "react"
import Err from "/src/components/alert/err/Err"
import {UserContext} from "/src/context/UserContext"


function EmailSignup() {
  const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
  const {setErrMsg, isErrToggled,setIsErrToggled} = useContext(ErrContext)
  const { setIsGoogleSignupAvatar, setIsEmail} = useContext(UserContext)
 const [isSuccess, setIsSuccess] = useState(false)
 const navigate = useNavigate()
 useEffect(()=>{
 setIsErrToggled(false)
},[])
  
  
  const registerOptions = {
    email: {
        required: "You must a provide an email",
        pattern:{
                 value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
             message: "Invalid email address  message"

        }
    },
    password:{
        required: " ",
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      message: "password must be 6 to 20 characters long and include at least one letter and one number"
                    
        }
    },
    confirmPassword:{
        required: "You must confirm your password"
    }

}

const submitForm = async (data) =>{
  setIsGoogleSignupAvatar(false)
  setIsEmail(true)
  const {email, password, confirmPassword} = data
if(password === confirmPassword){
  try{
    await signUpWithEmail(email, password)
    setIsSuccess(true)
    setTimeout(()=>{
        navigate("/swiftscribe/callback/setting-up")
    }, 2000)
  }
  catch(e){
    console.log(e)
    if(e.code === "auth/email-already-in-use"){
      setErrMsg("Email already in use")
      setIsErrToggled(true)
    }
  }
}
else {
  setErrMsg("Passwords does not match")
  setIsErrToggled(true)
}
}
    return (
        <>
        {isErrToggled && <Err/>}
        {isSuccess && <Success/>}
            <form action="" className="emailsignup-container" onSubmit={handleSubmit(submitForm)}>

                <h1 className="emailsignup-title">Sign up with email</h1>
                
                <div className="emailsignup-group">
                    <label htmlFor="esu-inp" className="emailsignup-label">Email</label>
                    <input className={errors.email ? "esu-input-active": "esu-input"} id='esu-inp' name="email"  {...register("email", registerOptions.email)}/>
                   
                </div>

                <div className="emailsignup-group">
                    <label
                        className="emailsignup-label"
                        htmlFor="esu-inp1">Password</label>
                    <input className={errors.password ? "esu-input-active": "esu-input"} id='esu-inp1' name="password"
                    type="password"
                    {...register("password", registerOptions.password)}/>
               {errors.password && <span style={{color:'red', fontSize:"14px"}}>{errors.password.message}</span>}
                </div>

                <div className="emailsignup-group">

                    <label

                        className="emailsignup-label"
                        htmlFor="esu-inp2">Confirm Password</label>
                    <input className={errors.confirmPassword ? "esu-input-active": "esu-input"} name="confirmPassword"
                    type="password"
                    {...register("confirmPassword", registerOptions.confirmPassword)} id='esu-inp2'/>
                </div>
                
                <button className="esu-btn">Sign up</button>

                <Link className="esu-link" to={'/swiftscribe/signup'}><ChevronLeftIcon/>All sign up options</Link>  
            </form>
    </>
  )
}

export default EmailSignup