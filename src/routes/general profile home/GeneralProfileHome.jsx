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
   <div className="generalprofilehome-container">
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
  
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
     <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="gph-box">
   <header className="gph-header">
   <img src={img} alt="profile-pic" className="gph-header-img"/>
   <p className="gph-name">
   Joe Doe
   </p>
   <p className="gph-post-time">
   1 day ago
   </p>
   </header>
   <main className="gph-main">
  <p className="gph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="gph-main-img"/>
   </main>
   
   <footer className="gph-footer">
   <p className="gph-tag"> improvement</p>
   <p className="gph-read-time">6 min read </p>
   </footer>
   </div>
 
   </div>
    </>
    )
}