import "./WritePost.scss"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from "react-router-dom";
import ConfirmPublish from "../../components/confirm publish/ConfirmPublish";
import { useState } from "react";

export default function WritePost() {
  const navigate = useNavigate()
  const [toggleConfirmPublish, setToggleConfirmPublish] = useState(false)
  
  const enableConfirmPublish = () => {
    setToggleConfirmPublish(true)
  }
  
  return (
    <>
      {toggleConfirmPublish && <ConfirmPublish />}
      <div className="writepost-container">
        <div className="wp-first">
          <ArrowCircleLeftOutlinedIcon onClick={() => navigate("/")} sx={{cursor:"pointer",fontSize:'50px'}}/>
    <button onClick={enableConfirmPublish} className="wp-publish-btn"> Publish </button>
    <div className="wp-title" contentEditable="true"> </div>
   <div className="wp-sub-title" contentEditable="true"> </div>
          <div className="wp-insert-cover">
         
   <AddPhotoAlternateOutlinedIcon className="wp-cover-icon" sx={{fontSize:"50px"}}/>
   <input type="file" className="wp-cover-inp" accept="image/*"/>
   </div>
   <div className="wp-board" contentEditable="true"> </div>
        </div>
        <div className="wp-second">
          <footer className="wp-footer">
      <div className="wp-footer-box">
  <div className="wp-bold"> B </div>
  <div className="wp-italic"> I </div>
  <div className="wp-add-image"> 
   <AddPhotoAlternateOutlinedIcon className="wp-footer-icon"/>
  <input type="file" accept="image/*" className="wp-add-img"/> 
  </div>
              <LinkOutlinedIcon className="wp-footer-url" />
              </div>
          </footer>
          </div>
    </div>
    </>
    )
}