import React from 'react'
import Navbar from './components/Navbar'
import GoaWeddingHero from './pages/GoaWeddingHero.jsx'
import Popoularvenue from './pages/popoularvenue.jsx'
import PopularSearches from './pages/PopularSearches.jsx'
import WeddingCategories from './pages/WeddingCategories.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
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

export default App
