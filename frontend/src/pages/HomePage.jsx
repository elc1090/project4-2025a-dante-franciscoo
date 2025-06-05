import React from 'react'
import WelcomeMessage from '../layouts/WelcomeMessage'
import RoleBasedRoadmaps from '../layouts/RoleBasedRoadMaps'
import Footer from '../layouts/Footer'

const HomePage = () => {
  return (
    <>
    <WelcomeMessage></WelcomeMessage>
    <RoleBasedRoadmaps></RoleBasedRoadmaps>
    <Footer></Footer>
    </>
  )
}

export default HomePage