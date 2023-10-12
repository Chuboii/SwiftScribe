import "./Err.scss"
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import {useState, useContext} from "react"
import {ErrContext} from "/src/context/ErrContext"


export default function Err(){
 const {toggleErrBox, errMsg} = useContext(ErrContext)
 
 
  
 
 return(
    <div className="err-container">
    <CloseIcon sx={{fontSize:"40px", color:"white", marginBottom:'1rem'}} className="err-times" onClick={toggleErrBox}/>
  
    <div className='err-icon-div'>
    <ErrorIcon sx={{fontSize:"40px", color:"orangered", marginBottom:'1rem'}}/>
    <p>{errMsg}</p>
    </div>
    </div> 
    ) 
}