import "./UserProfileHome.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeHeader from "/src/components/home header/HomeHeader"
import {useState, useEffect} from "react"

export default function UserProfileHome(){
  const [toggleHeader, setToggleHeader] = useState(false)
  
  useEffect(()=>{
    
console.log("hsuus")
    window.addEventListener("scroll", (e)=>{
      const targetElement = e.target || e.srcElement;
      //console.log(targetElement)
    })
    
  }, [toggleHeader])

  
  return(
    <>
   {toggleHeader && <HomeHeader/>}
   <div className="userprofilehome-container">
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
  
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
     <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="uph-box">
   <header className="uph-header">
   <img src={img} alt="profile-pic" className="uph-header-img"/>
   <p className="uph-name">
   Joe Doe
   </p>
   <p className="uph-post-time">
   1 day ago
   </p>
   </header>
   <main className="uph-main">
  <p className="uph-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="uph-main-img"/>
   </main>
   
   <footer className="uph-footer">
   <p className="uph-tag"> improvement</p>
   <p className="uph-read-time">6 min read </p>
   </footer>
   </div>
 
   </div>
    </>
    )
}