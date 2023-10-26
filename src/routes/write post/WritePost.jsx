import "./WritePost.scss"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from "react-router-dom";
import ConfirmPublish from "../../components/confirm publish/ConfirmPublish";
import { useState,useContext, useEffect} from "react";
import {storage} from "/src/utils/appwrite/appwrite.utils"
import {v4 as uuidv4} from "uuid"
import {UserContext} from "/src/context/UserContext"
import {firebaseStorage} from "/src/utils/firebase/firebase.utils"
import {getDownloadURL, ref, uploadBytesResumable}from "firebase/storage"
import Bg from "/src/components/bg/Bg"
export default function WritePost() {
  const navigate = useNavigate()
  const [toggleConfirmPublish, setToggleConfirmPublish] = useState(false)
  const [toggleUrlBox, setToggleUrlBox] = useState(false)
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [content, setContent] = useState({
    titleValue: "",
    subTitleValue: "",
    linkValue: "https://"
  })
  const [startWritingValue, setStartWritingValue] = useState("")
const {currentUser} = useContext(UserContext)
const [isImageAvailable, setIsImageAvailable] = useState(false)
const [titleImg, setTitleImg] = useState("")
const [isImageLoaded,setIsImageLoaded] = useState(false)

  const enableConfirmPublish = () => {
    setToggleConfirmPublish(true)
  }
  
  
  const enableBold = () => {
    setBold(!bold)
    
  }
  
  const enableItalic = () =>{
    setItalic(!italic)
  }
  
  
  const pasteLink = () => {
    const wpBoard = document.querySelector(".wp-board")
  
    const link = document.createElement("a")
    wpBoard.append(link)
   link.innerText = content.linkValue
    link.setAttribute("href", content.linkValue)
   // link.setAttribute("content", content.linkValue)
   link.style.color = "blue"
   link.style.fontStyle = "italic"
   link.style.textDecoration = "underline"
 setContent(prev =>({prev, linkValue: "https://"}))
//  console.log(content.titleValue)
  }
  
  const insertTitleImg =  (e) =>{
     const file = e.target.files[0]
     
   const storageRef = ref(firebaseStorage, `${currentUser.displayName}${uuidv4()}`);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
   setIsImageLoaded(true)
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  // console.log(progres)
   //etProgress(Math.floor(progres))
   
    switch (snapshot.state) {
      case 'paused':
       
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
const img = document.createElement("img")
   const board = document.querySelector(".wp-insert-cover")
   board.append(img)
   setTitleImg(downloadURL)
   img.classList.add("tit-img")
       img.src =downloadURL
       setIsImageAvailable(true)
       setIsImageLoaded(false)
      console.log('File available at', downloadURL);
    });
  }
);
    
  
   
  }
  const changeValues = (e) => {
    setContent({...content, [e.target.name]: e.target.value})
  }
  
  
  const addImageToBlog = (e) =>{

         const file = e.target.files[0]

const storageRef = ref(firebaseStorage, `${currentUser.displayName}${uuidv4()}`);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
setIsImageLoaded(true)
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error);
    // Handle unsuccessful uploads
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
const img = document.createElement("img")
   const board = document.querySelector(".wp-board")
 const span = document.createElement("span")
      img.setAttribute("contentEditable", false)
      img.setAttribute("src", downloadURL)
  board.setAttribute("contentEditable", false)
      span.setAttribute("contentEditable", false)
    img.setAttribute("class", "wp-blog-img")
   board.append(img)
  // span.innerText = downloadURL
  // board.append(span)
   span.classList.add("board-span")
 setStartWritingValue(board.innerHTML)
   img.classList.add("board-img")
 //  console.log(startWritingValue
setIsImageLoaded(false)
       setIsImageAvailable(true)
      console.log('File available at', downloadURL);
    });
  }
);
    
   
}

const postBlog = (e) =>{
  setStartWritingValue(e.target.innerHTML)
}
const enable = () =>{
  const board = document.querySelector(".wp-board")
  board.setAttribute("contentEditable", true)
  board.style.fontSize = "10px"
  const lineBreak = document.createElement('br'); // or create a new paragraph element

board.appendChild(lineBreak); // Append the line break or paragraph after the image

const range = document.createRange();
const sel = window.getSelection();
range.setStartAfter(lineBreak); // or setStartAfter(your_paragraph)
range.collapse(true);
sel.removeAllRanges();
sel.addRange(range);
}

  return (
    <>
      {toggleConfirmPublish && <ConfirmPublish setTToggleBox={setToggleConfirmPublish} title={content.titleValue} subTitle={content.subTitleValue} mainPost={startWritingValue} titImg={titleImg}/>}
      <section className="writepost-container">
        <div className="wp-first">
          <ArrowCircleLeftOutlinedIcon onClick={() => navigate("/")} sx={{cursor:"pointer",fontSize:'50px'}}/>
    <button onClick={enableConfirmPublish} className="wp-publish-btn"> Publish </button>
    
    <textarea className="wp-title" style={{border:"none"}} placeholder="Title" value={content.titleValue} onChange={changeValues} name="titleValue">
    </textarea>
    
   <textarea className="wp-sub-title" placeholder="Sub Title" style={{border:"none"}} value={content.subTitleValue} onChange={changeValues} name="subTitleValue" > 
   </textarea>
   
   <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <div className="wp-insert-cover" >
    {isImageLoaded && <Bg/>}
   <AddPhotoAlternateOutlinedIcon className="wp-cover-icon" sx={{fontSize:"50px"}}/>
   <input type="file" className="wp-cover-inp" accept="image/*" id="wp-cover-inp-id" onChange={insertTitleImg}/>
   </div>
  {isImageAvailable && <div style={{position:"relative", bottom:"1rem", padding:".7rem 1rem", background:"orangered", color:"white", width:"200px", borderRadius:"10px"}}>
   <span style={{position:"absolute", left:"50%", transform:"translate(-50%)"}}> Replace Image </span>
   <input  type="file" style={{opacity:0}} accept="image/*" onChange={insertTitleImg}/>
   </div>}
   </div>
  <div className="wp-board" 
  onClick={enable}

    style={{fontWeight: bold ? 700 : 100, fontStyle: italic ? "italic" : "normal",border:"none",width:"100%"
    }}
    onInput={postBlog}
  contentEditable="true"
    
   > 
   
   </div>
        </div>
        <div className="wp-second">
          <footer className="wp-footer">
      <div className="wp-footer-box" style={{height: toggleUrlBox ? "100px" : "45px"}}>
      
    
      <div style={{display:"flex", alignItems:"center"}}>
      
      
  <div className="wp-bold" style={{background:bold ? "orangered" : "transparent",width:"40px", height:"40px",borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={enableBold}> B </div>
  
  
  <div className="wp-italic" onClick={enableItalic} style={{background:italic ? "orangered" : "transparent",width:"43px", height:"43px",borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center"}}> I </div>
  
  
  
  <div className="wp-add-image"> 
   <AddPhotoAlternateOutlinedIcon className="wp-footer-icon"/>
  <input type="file" accept="image/*" className="wp-add-img" onChange={addImageToBlog}/> 
  </div>
              <LinkOutlinedIcon className="wp-footer-url" onClick={() => setToggleUrlBox(!toggleUrlBox)}/>
              </div>
              
              <div>
                 <input placeholder="Add link"  className="wp-url" type="url" value={content.linkValue} onChange={changeValues}
                   name="linkValue"
                 />
                 <button className="wp-btn-link" onClick={pasteLink}> Add Link </button>
                 </div>
              </div>

          </footer>
          </div>
    </section>
    </>
    )
}