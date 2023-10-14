import "./WritePost.scss"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
export default function WritePost(){
  
  
  
  return (
    <>
    <div className="writepost-container">
    <button className="wp-publish-btn"> Publish </button>
    <div className="wp-title" contentEditable="true"> </div>
   <div className="wp-sub-title" contentEditable="true"> </div>
{/*   <div className="wp-tags"> 
   <div className="wp-tag-board" contentEditable="true">
   </div>
   <button className="wp-tag-btn"> Add Tag(s) </button>

   </div>*/}
   <div className="wp-insert-cover">
   <AddPhotoAlternateOutlinedIcon className="wp-cover-icon" sx={{fontSize:"50px"}}/>
   <input type="file" className="wp-cover-inp" accept="image/*"/>
   </div>
   <div className="wp-board" contentEditable="true"> </div>
  
  <footer className="wp-footer">
  <div className="wp-bold"> B </div>
  <div className="wp-italic"> I </div>
  <div className="wp-add-image"> 
   <AddPhotoAlternateOutlinedIcon className="wp-footer-icon"/>
  <input type="file" accept="image/*" className="wp-add-img"/> 
  </div>
  
  </footer>
    </div>
    </>
    )
}