import "./Aside.scss"
import img from '/src/assets/swiftscribe logo.jpg'

export default function Aside(){
  
  return(
    <div className="aside-container">
      <div className="aside-recommend">
       <h3 className="r-txt-t"> Recommendations</h3>
        <div className="recommend-item">
          <header className="r-header">
            <img src={img} alt="" className="r-img"/>
            <p className="r-name">Joe Doe</p>
          </header>
          <div className="r-title">
          A personal, non-partisan perspective on the Israel-Hamas war
        </div>
        </div>

        <div className="r-follow-box">
          <h3 className="r-f-title">Who to follow</h3>

          <div className="r-f-box">
    <div className="r-f-image">
    <img src={img} alt="profile-pic" className="r-f-img" />
    </div>
    <div className="r-f-text">
    <p className="r-f-name"> Joe Doe </p>
    <p className="r-f-bio"> I am a blogger and a follower of christhshdhhdd duduydhd du hdhhdhd udududydyd dydyudud dudyydey </p>
    </div>
    <button className="r-f-btn"> Follow </button>
    </div>
        </div>

    </div>
    </div>
    )
}