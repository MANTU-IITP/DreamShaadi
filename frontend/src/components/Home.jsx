import React from 'react'
import Navbar from './Navbar'
import GoaWeddingHero from '../pages/GoaWeddingHero.jsx'
import Popoularvenue from "../pages/Popoularvenue.jsx"
import PopularSearches from "../pages/PopularSearches.jsx"

import WeddingCategories from '../pages/WeddingCategories.jsx'
import Footer from './Footer.jsx'

const Home = () => {
  return (
    <div>
    <Navbar/>
    <GoaWeddingHero/>
    <Popoularvenue/>
    <PopularSearches/>
    <WeddingCategories/>
    <Footer/>
    </div>
  )
}

export default Home