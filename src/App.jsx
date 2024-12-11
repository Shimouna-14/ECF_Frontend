import './css/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Recipe from './pages/Recipe'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recette" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
