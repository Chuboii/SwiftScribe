import "./ForYou.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeSubHeader from "/src/components/home sub header/HomeSubHeader"
import {useState, useEffect, useContext} from "react"
import {ToggleContext} from "/src/context/ToggleContext"
export default function ForYou(){
  const [toggleSubHeader, setToggleSubHeader] = useState(false)
  const {setToggleMenu} = useContext(ToggleContext)
  
  useEffect(()=>{
    

    window.addEventListener("scroll", (e)=>{
      const targetElement = e.target || e.srcElement;
      //console.log(targetElement)
    })
    
  }, [toggleSubHeader])
  
  
  return(
    <>
   {toggleSubHeader && <HomeSubHeader/>}
   <div className="foryou-container" onClick={() => setToggleMenu(false)}>
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