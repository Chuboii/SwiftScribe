import { useContext, useEffect, useState } from "react"
import "./ConfirmPublish.scss"
import img from '/src/assets/swiftscribe logo.jpg'
import { UserContext } from "../../context/UserContext"
import CloseIcon from '@mui/icons-material/Close';
function ConfirmPublish() {
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
}, [tags])




  return (
      <>
        
          <div className="confirmpublish-container">
              <CloseIcon sx={{ position: "absolute", right: "1rem", color: "white", background: "orangered", fontSize: "30px", borderRadius: "5px", cursor: "pointer" }} onClick={() => setTTagBox(false) } />
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
                  <button className="cp-btn">PUBLISH NOW</button>
                  </div>
 </div>
      </>
  )
}

export default ConfirmPublish