import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signInWithEmail } from '/src/utils/firebase/firebase.utils';
import {useForm} from "react-hook-form"
import './EmailSignin.scss'
import Success from "/src/components/alert/success/Success"
import {ErrContext} from "/src/context/ErrContext"
import {useContext, useState, useEffect} from "react"
import Err from "/src/components/alert/err/Err"


function EmailSignin() {
   const {register,handleSubmit, formState:{errors}} = useForm({mode:"onChange"})
const {setErrMsg, isErrToggled,setIsErrToggled} = useContext(ErrContext)
 const [isSuccess, setIsSuccess] = useState(false)

 
  
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
    } 
  
  }
  
  const submitForm = async (data) =>{
    const {email, password} = data
  try{
    await signInWithEmail(email, password)
    setIsSuccess(true)
    
    setTimeout(()=>{
      
    },2000)
  }
  catch(e){
    console.log(e)
    if(e.code === "auth/invalid-login-credentials"){
      setErrMsg("Invalid login details")
      setIsErrToggled(true)
    }
  }
  }
  
    return (
        <>
        {isSuccess && <Success/>}
        {isErrToggled && <Err/>}
            <form action="" className="emailsignin-container" onSubmit={handleSubmit(submitForm)}>

                <h1 className="emailsignin-title">Sign in with email</h1>
                
                <div className="emailsignin-group">
                    <label htmlFor="esi-inp" className="emailsignin-label">Email</label>
                    <input className={errors.email ? "esu-input-active": "esu-input"} id='esi-inp'  {...register("email", registerOptions.email)}/>
                </div>

                <div className="emailsignin-group">
                    <label
                        className="emailsignin-label"
                        htmlFor="esi-inp1">Password</label>
                    <input className={errors.password ? "esu-input-active": "esu-input"} id='es1-inp1'     {...register("password", registerOptions.password)}/>
                              {errors.password && <span style={{color:'red', fontSize:"14px"}}>{errors.password.message}</span>}
                </div>

                <button className="esu-btn">Sign in</button>

                <Link className="esu-link" to={'/swiftscribe/signin'}><ChevronLeftIcon/> All sign in options</Link>  
            </form>
    </>
  )
}

export default EmailSignin