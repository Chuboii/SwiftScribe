import { Route, Routes } from "react-router-dom"
import Signup from "./routes/signup/Signup"
import EmailSignup from "./routes/signup/EmailSignup"
import Signin from "./routes/signup/signin/Signin"
import EmailSignin from "./routes/signup/signin/EmailSignin"

function App() {

  return (
    <>
      
<Routes>
        <Route  path="/swiftscribe/signup" element={<Signup/>}/>
<Route path="/swiftscribe/signup/email" element={<EmailSignup/>}/>
        
        <Route path="/swiftscribe/signin" element={<Signin />} />
       
        <Route path="/swiftscribe/signin/email" element={<EmailSignin />} />
      </Routes>
    </>
  )
}

export default App
