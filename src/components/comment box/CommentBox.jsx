import "./CommentBox.scss"
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import img from "/src/assets/swiftscribe logo.jpg"
import {useState} from "react"

export default function CommentBox({toggle}){
 
  
  
  const toggleCommentBox = () =>{
    toggle(false)
  }
  
  
  
  return(
    <>

    <div className="commentbox-container" style={{
      height:"",
    }}>
    <header className="cb-header">
    <p className="cb-header-response"> Responses (203) </p>
<CloseIcon onClick={toggleCommentBox}/>
    </header>
    
<main className="cb-main">
<div className="cb-main-box">
<header className="cb-main-header">
<img src={img} className="cb-main-img"/>
<div className="cb-main-pro">
<p className="cb-main-name" style={{fontWeight:"600"}}> Joe Doe </p>
                <p className="cb-main-time" style={{ fontSize:"17px"}}> 2 days ago </p>
</div>
<MoreHorizIcon sx={{position:"absolute", right:"1rem;"}} />
</header>
<section className="cb-main-text"> Great Blog bro!</section>
<section className="cb-footer-icons">
<p className="cb-footer-like"> <FavoriteBorderIcon sx={{marginRight:".3rem"}}/> 60 </p>
<p className="cb-footer-comment"> <CommentIcon sx={{marginRight:".3rem"}}/> 60 replies </p>
</section>

<section className="cb-replies-box">
<header className="cb-replies-header">
<img src={img} className="cb-replies-img"/>
<div className="cb-replies-pro">
<p className="cb-replies-name"> Joe Doe </p>
<p className="cb-replies-time"> 2 days ago </p>
</div>
<MoreHorizIcon sx={{position:"absolute", right:"1rem;"}} />
</header>
<section className="cb-replies-text"> Great Blog bro!</section>
<section className="cb-replies-footer-icons">
<p className="cb-replies-footer-like"> <FavoriteBorderIcon sx={{marginRight:".3rem"}}/> 60 </p>

</section>

</section>
</div>
</main>
    </div>
    </>
    )
}