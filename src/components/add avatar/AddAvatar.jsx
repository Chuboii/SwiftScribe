import "./AddAvatar.scss"
import AvatarSvg from "/src/components/svgs/AvatarSvg"
export default function AddAvatar(){
  
  
  return(
    <div className="addavatar-container">
    <div className="addava-box">
        <AvatarSvg/>
       
   <input type="file" accept="image/*" className="addava-input"/>
   <p className="addava-text"> Add avatar </p>
   </div>
   
    </div>
    )
}