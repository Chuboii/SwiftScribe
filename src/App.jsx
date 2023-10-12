import { Route, Routes } from "react-router-dom"
import Signup from "./routes/signup/Signup"
import EmailSignup from "./routes/signup/EmailSignup"
import Signin from "./routes/signin/Signin"
import EmailSignin from "./routes/signin/EmailSignin"
import SettingUp from "./routes/setting up/SettingUp"
import Home from "./routes/home/Home"

function App() {

  return (
    <>
      
<Routes>
        <Route  path="/swiftscribe/signup" element={<Signup/>}/>
<Route path="/swiftscribe/signup/email" element={<EmailSignup/>}/>
        
        <Route path="/swiftscribe/signin" element={<Signin />} />
       
        <Route path="/swiftscribe/signin/email" element={<EmailSignin />} />
         <Route path="/swiftscribe/callback/setting-up" element={<SettingUp />} />
     
  <Route path="/" element={<Home/>}>
        
     </Route>
      </Routes>
    </>
  )
}

export default App
