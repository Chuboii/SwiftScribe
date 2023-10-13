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
   <div className="foryou-container">
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
  
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
     <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="fy-box">
   <header className="fy-header">
   <img src={img} alt="profile-pic" className="fy-header-img"/>
   <p className="fy-name">
   Joe Doe
   </p>
   <p className="fy-post-time">
   1 day ago
   </p>
   </header>
   <main className="fy-main">
  <p className="fy-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="fy-main-img"/>
   </main>
   
   <footer className="fy-footer">
   <p className="fy-tag"> improvement</p>
   <p className="fy-read-time">6 min read </p>
   </footer>
   </div>
 
   </div>
    </>
    )
}