import './css/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import ScrollToTop from './components/ScrollToTop'
import Favorite from './pages/Favorite'

function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="recette/:_id" element={<Recipe />} />
          <Route path="favoris" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
