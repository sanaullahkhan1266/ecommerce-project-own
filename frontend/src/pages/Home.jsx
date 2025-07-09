import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Footer from './../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <LatestCollection/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Home
