import "./GeneralProfileHome.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeHeader from "/src/components/home header/HomeHeader"
import {useState, useEffect} from "react"

export default function GeneralProfileHome(){
  const [toggleHeader, setToggleHeader] = useState(false)
  
  useEffect(()=>{
    

    window.addEventListener("scroll", (e)=>{
      const targetElement = e.target || e.srcElement;
      //console.log(targetElement)
    })
    
  }, [toggleHeader])

  
  return(
    <>
   {toggleHeader && <HomeHeader/>}
   <div className="generalprofile-container">
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
  
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
     <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gp-box">
   <header className="gp-header">
   <img src={img} alt="profile-pic" className="gp-header-img"/>
   <p className="gp-name">
   Joe Doe
   </p>
   <p className="gp-post-time">
   1 day ago
   </p>
   </header>
   <main className="gp-main">
  <p className="gp-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gp-main-img"/>
   </main>
   
   <footer className="gp-footer">
   <p className="gp-tag"> improvement</p>
   <p className="gp-read-time">6 min read </p>
   </footer>
   </div>
 
   </div>
    </>
    )
}