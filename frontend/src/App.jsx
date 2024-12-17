import './css/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import ScrollToTop from './components/ScrollToTop'
import FavoriteRecipe from './pages/FavoriteRecipe'

function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="recette/:_id" element={<RecipeDetail />} />
          <Route path="favoris" element={<FavoriteRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
