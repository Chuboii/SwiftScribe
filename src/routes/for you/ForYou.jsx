import "./ForYou.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeSubHeader from "/src/components/home sub header/HomeSubHeader"
import {useState, useEffect, useContext} from "react"
import {ToggleContext} from "/src/context/ToggleContext"
import HomeHeader from "../../components/home header/HomeHeader"
export default function ForYou(){
  const [toggleSubHeader, setToggleSubHeader] = useState(false)
  const [toggleHeader, setToggleHeader] = useState(false)
  const {setToggleMenu} = useContext(ToggleContext)
  const [scrollYY, setScrollYY] = useState(0)
  const [subHeaderPos, setSubHeaderPos] = useState('relative')
  const [headerPos, setHeaderPos] = useState("relative")
const [subHeaderTop, setSubHeaderTop] = useState(0)

  function scrollFunction() {
     const scrollPos = window.scrollY
   
    setScrollYY(scrollPos)
   if (scrollYY > 150) {
      setToggleSubHeader(true)
     setSubHeaderPos('fixed')
     setSubHeaderTop(0)
    }
    else {
      setToggleSubHeader(false)
   }
    
   if (scrollPos <scrollYY) {
    setToggleHeader(true)
     setHeaderPos('fixed')
     setSubHeaderTop(4.5)
  }
  else {
    setToggleHeader(false)
  }



  }

  useEffect(() => {
  
   
    window.addEventListener("scroll", scrollFunction)

    
  }, [scrollYY])
  
  
  return(
    <>
      
      {toggleHeader && <HomeHeader pos={headerPos}/>}
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos } t={subHeaderTop} />}
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
  <p className="fy-title"> How to be a Millionaire? Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nesciunt quis nulla quam reiciendis quos aperiam architecto pariatur, numquam voluptatum itaque eligendi animi facilis consequatur deserunt? Ab nostrum sapiente totam!</p>
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