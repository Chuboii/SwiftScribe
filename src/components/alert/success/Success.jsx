import DoneIcon from '@mui/icons-material/Done';
import "./Success.scss"
export default function Success(){
  
  return (
    <div className="success-container">
    <div>
    <DoneIcon sx={{color:"lawngreen", fontSize:"40px", border:"2px solid lawngreen", borderRadius:"50%", padding:".5rem", marginBottom:"1rem"}}/>
    </div>
    <p>Success</p>
    </div>
    )
}