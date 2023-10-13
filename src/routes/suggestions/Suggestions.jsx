import "./Suggestions.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import {ToggleContext} from "/src/context/ToggleContext"
import {useContext} from "react"
export default function Suggestions(){
    const {setToggleMenu} = useContext(ToggleContext)
  return(
    <>
    <div className="suggestions-container" onClick={() => setToggleMenu(false)}>
  <h3 className="suggestions-h3"> Who to follow </h3>
  
    <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
      <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
  
    <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
  
  
    <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
  
  
    <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
  
  
    <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
  
    <div className="suggestions-box">
    <div className="suggestions-image">
    <img src={img} alt="profile-pic" className="suggestions-img" />
    </div>
    <div className="suggestions-text">
    <p className="suggestions-name"> Joe Doe </p>
    <p className="suggestions-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="suggestions-btn"> Follow </button>
    </div>
  
    </div>
    </>
    )
}