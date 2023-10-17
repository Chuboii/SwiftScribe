import "./LikeBox.scss"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';

export default function LikeBox({enable}){
  
  return (
    <>
    
   <div className="usp-like-box"> 
   <div className="usp-lc">
   <div className="usp-likes"> <FavoriteBorderIcon sx={{marginRight:".5rem", color:"red"}}/> 654 </div>
     <div className="usp-comment">
     <CommentIcon onClick={enable} sx={{marginRight:".5rem"}}/> 654 </div>
   </div>
   
      <div className="usp-share-more">
    <ShareSharpIcon  sx={{marginRight:"1rem"}}/>
 <MoreHorizIcon/> 
   </div>
   </div>
    </>
    )
}