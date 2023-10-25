import { useContext, useEffect, useState } from "react"
import "./ConfirmPublish.scss"
import img from '/src/assets/swiftscribe logo.jpg'
import { UserContext } from "../../context/UserContext"
import CloseIcon from '@mui/icons-material/Close';
import {v4 as uuidv4} from 'uuid'
import {db} from "/src/utils/appwrite/appwrite.utils"
import { useNavigate } from "react-router-dom";

function ConfirmPublish({setTToggleBox, title, subTitle, mainPost, titImg}) {
    const [toggleTagBox, setToggleTagBox] = useState(false)
    const {currentUser} = useContext(UserContext)
const [value, setValue] = useState('')
    const [tags, setTags] = useState([])
    const [increHeight, setIncreHeight] = useState(200)
    const navigate = useNavigate()
    const enableTags = () => {
    setToggleTagBox(!toggleTagBox)
    }
    

    const changeValue = (e) => {
        setValue(e.target.value)
        if (e.nativeEvent.data === ',') {
            setTags([...tags, value])
            setValue('')
            setIncreHeight(prev => prev + 10)
        } 
    }

    useEffect(() => {
        setValue("")
    }, [tags])
  

const sendPost = async () => {
  const date = new Date()
  try{
    const wordPerMin = 250
    const wordCount = mainPost.length
    
    
   const getData = await db.getDocument("652755cdc76b42b46adb","652755d73451dcffebde", currentUser.uid)
  const userBlog = 
     {
    blog: [JSON.stringify({
        id: uuidv4(),
        displayName: JSON.parse(getData.user).username,
        userId: currentUser.uid,
        photo: currentUser.photoURL,
        datePosted: date,
        blogTitle: title,
        blogSubTitle: subTitle,
        blogTitleImg: titImg,
        likesCount: 0,
        likes:[],
        comments:[],
        commentsCount: 0,
        blogPost: mainPost,
        tag: tags,
        readTime:Math.floor(wordCount / wordPerMin),
      })]
     }
    
  await db.createDocument("652755cdc76b42b46adb", "652ebb6ad8417bfdac54", uuidv4(), userBlog)
  
  await db.createDocument("652755cdc76b42b46adb", "652c619059614689c161", currentUser.uid, userBlog)
    console.log("done")
    navigate('/')
  }
  catch(e){
    console.log(e)
    if (e.type === "document_already_exists") {
      try {
        const wordPerMin = 250
    const wordCount = mainPost.length
    
       const getUsername = await db.getDocument("652755cdc76b42b46adb","652755d73451dcffebde", currentUser.uid)
console.log(getUsername)
        const getData = await db.getDocument("652755cdc76b42b46adb", "652c619059614689c161", currentUser.uid)
      
        const userBlog = {
          id: uuidv4(),
          displayName: JSON.parse(getUsername.user).username,
          photo: currentUser.photoURL,
          datePosted: date,
          blogTitle: title,
          blogSubTitle: subTitle,
          blogTitleImg: titImg,
          blogPost: mainPost,
          tag: tags,
          likes: 0,
          comments: [],
          replies: [],
          readTime: Math.floor(wordCount / wordPerMin),
        }
      
        getData.blog.push(JSON.stringify(userBlog))
       const updatedBlog = {
         blog: getData.blog
       }
       // console.log(getData.blog)
        await db.updateDocument("652755cdc76b42b46adb", "652c619059614689c161", currentUser.uid, updatedBlog)
      navigate("/")
        console.log('done');
      }
      catch (e) {
        console.log(e);
      }
    }

  }
}


  return (
      <>
        
          <div className="confirmpublish-container">
              <CloseIcon sx={{ position: "absolute", right: "1rem", color: "white", background: "orangered", fontSize: "30px", borderRadius: "5px", cursor: "pointer" }} onClick={() => setTToggleBox(false) } />
 <div className="cp-first">
                  <img src={currentUser ? currentUser.photoURL : ''} alt="" className="cp-first-img"/>                
                  <div className="cp-first-txt">
                  <div className="cp-first-txtt">PUBLISHING TO</div>
                      <div className="cp-first-name">
                  {currentUser ? currentUser.displayName : ''}
                </div>
                  </div>    
              </div>
              
              <div className="cp-second" style={{ height: toggleTagBox ? `${increHeight}px`: '100px',  transition:"all .5s"}} onClick={enableTags}>
                      <div className="cp-second-txt" style={{fontSize:"19px", fontWeight:700, margin:".5rem 0", marginBottom:".5rem"}}>Tags</div>
                  <div className="cp-second-txtt" style={{ display: "flex", flexWrap:'wrap'}}>{tags != '' ? tags.map((el,id)=> (
                      <span key={id} className="cp-main-tags">{el}</span>
                  )) : (<span>Set tags</span>)}</div>
                  
                  <div className="cp-second-inp-box" onClick={(e) => { e.stopPropagation() }}>
                      <input type="text" name="tags" id="" className="cp-second-inp" placeholder="Add tags by adding a coma" value={value} onChange={changeValue}/>
                    
                  </div>
              </div>
              <div className="cp-btn-box">
                  <button onClick={sendPost} className="cp-btn">PUBLISH NOW</button>
                  </div>
 </div>
      </>
  )
}

export default ConfirmPublish