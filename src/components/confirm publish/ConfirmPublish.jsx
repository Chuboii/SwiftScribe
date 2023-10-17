import { useContext, useEffect, useState } from "react"
import "./ConfirmPublish.scss"
import img from '/src/assets/swiftscribe logo.jpg'
import { UserContext } from "../../context/UserContext"
import CloseIcon from '@mui/icons-material/Close';
import {db} from "/src/utils/appwrite/appwrite.utils"

function ConfirmPublish({setTToggleBox, title, subTitle, mainPost, titImg}) {
    const [toggleTagBox, setToggleTagBox] = useState(false)
    const {currentUser} = useContext(UserContext)
const [value, setValue] = useState('')
    const [tags, setTags] = useState([])
    const [increHeight, setIncreHeight] = useState(200)
    
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
        console.log(mainPost)
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
        displayName: JSON.parse(getData.user).username,
        photo: currentUser.photoURL,
        datePosted: date,
        blogTitle: title,
        blogSubTitle: subTitle,
        blogTitleImg: titImg,
        blogPost: mainPost,
        tag: tags,
        readTime:wordCount / wordPerMin,
      })]
     }
    
   
  await db.createDocument("652755cdc76b42b46adb", "652c619059614689c161", currentUser.uid,userBlog)
  console.log("done")
  }
  catch(e){
    console.log(e)
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