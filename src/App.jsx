import { Route, Routes } from "react-router-dom"
import Signup from "./routes/signup/Signup"
import EmailSignup from "./routes/signup/EmailSignup"
import Signin from "./routes/signin/Signin"
import EmailSignin from "./routes/signin/EmailSignin"
import SettingUp from "./routes/setting up/SettingUp"
import Home from "./routes/home/Home"
import HomeSubHeader from "./components/home sub header/HomeSubHeader"
import SearchPage from "./routes/search page/SearchPage"
import ForYou from "./routes/for you/ForYou"
import Following from "./routes/following/Following"
import Suggestions from "./routes/suggestions/Suggestions"
import GeneralProfile from "./routes/general profile/GeneralProfile"
import GeneralProfileHome from "./routes/general profile home/GeneralProfileHome"
import GeneralProfileAbout from "./routes/general profile about/GeneralProfileAbout"
import Notification from "./routes/notification/Notification"
import UserProfile from "./routes/user profile/UserProfile"
import UserProfileHome from "./routes/user profile home/UserProfileHome"
import UserProfileAbout from "./routes/user profile about/UserProfileAbout"
import Settings from "./routes/settings/Settings"
import WritePost from "./routes/write post/WritePost"
import UserPost from "./routes/user post page/UserPost"
import UserProfilePost from "./routes/user profile home post/UserProfilePost"



function App() {

  return (
    <>
      
<Routes>
        <Route  path="/swiftscribe/signup" element={<Signup/>}/>
<Route path="/swiftscribe/signup/email" element={<EmailSignup/>}/>
        <Route path="/swiftscribe/signin" element={<Signin />} />
       
        <Route path="/swiftscribe/signin/email" element={<EmailSignin />} />
         <Route path="/swiftscribe/callback/setting-up" element={<SettingUp />} />
        <Route path="/write-blog" element={<WritePost />} />
        

  <Route path="/" element={<Home/>}>
          <Route path="user/post" element={<UserPost />} />
          <Route path="user/profile/post" element={<UserProfilePost/>}/>
     <Route path="notification" element={<Notification/>}/>
    <Route path="settings" element={<Settings/>}/>
     
          <Route path="profile" element={<UserProfile/>}>
          <Route index element={<UserProfileHome/>}/>
          <Route path="about" element={<UserProfileAbout/>}/>
          </Route>
          
          
       <Route path="user" element={<GeneralProfile/>}>
           <Route path="about" element={<GeneralProfileAbout/>}/>
     <Route index element={<GeneralProfileHome/>}/>
     </Route>
     
     
   <Route index element={<> <HomeSubHeader/>
   <ForYou/> </>}/>
<Route path="following" element={<><HomeSubHeader/> <Following/> </>} />
<Route path="following/suggestions" element={<> <HomeSubHeader/> <Suggestions/> </>}/>
    <Route path="search" element={<SearchPage/>}/>
     </Route>
     
     
      </Routes>
    </>
  )
}

export default App
