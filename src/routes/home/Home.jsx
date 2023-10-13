import React, { useContext } from 'react'
import HomeHeader from '../../components/home header/HomeHeader'
import { UserContext } from '../../context/UserContext'
import {ToggleContext} from "/src/context/ToggleContext"
function Home() {
    const {currentUser} = useContext(UserContext)
    const {setToggleMenu} = useContext(ToggleContext)
  return (
      <div onClick={() => setToggleMenu(false)}>
          {currentUser ? <HomeHeader /> : ""}
      </div>
  )
}

export default Home