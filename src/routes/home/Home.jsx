import React, { useContext } from 'react'
import HomeHeader from '../../components/home header/HomeHeader'
import { UserContext } from '../../context/UserContext'

function Home() {
    const {currentUser} = useContext(UserContext)
  return (
      <>
          {currentUser ? <HomeHeader /> : ""}
      </>
  )
}

export default Home