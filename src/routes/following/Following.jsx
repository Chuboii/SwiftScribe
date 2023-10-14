import "./Following.scss"
import img from "/src/assets/swiftscribe logo.jpg"
import HomeSubHeader from "/src/components/home sub header/HomeSubHeader"
import {useState, useEffect, useContext} from "react"
import {ToggleContext} from "/src/context/ToggleContext"
import HomeHeader from "../../components/home header/HomeHeader"
export default function Following(){
  const [toggleSubHeader, setToggleSubHeader] = useState(false)
  const {setToggleMenu} = useContext(ToggleContext)
  const [toggleHeader, setToggleHeader] = useState(false)
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
      {toggleSubHeader && <HomeSubHeader pos={subHeaderPos} t={subHeaderTop} />}
      
   {toggleSubHeader && <HomeSubHeader/>}
   <div className="following-container" onClick={() => setToggleMenu(false)}>
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
     <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
 
   <div className="following-box">
   <header className="following-header">
   <img src={img} alt="profile-pic" className="following-header-img"/>
   <p className="following-name">
   Joe Doe
   </p>
   <p className="following-post-time">
   1 day ago
   </p>
   </header>
   <main className="following-main">
  <p className="following-title"> How to be a Millionaire? </p>
  <img src={img} alt="title-img" className="following-main-img"/>
   </main>
   
   <footer className="following-footer">
   <p className="following-tag"> improvement</p>
   <p className="following-read-time">6 min read </p>
   </footer>
   </div>
 
   </div>
    </>
    )
}