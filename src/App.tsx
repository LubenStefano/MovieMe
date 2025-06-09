import './App.css'
import Details from './components/pages/Details/Details'
import Main from './components/pages/Main/Main'
import MovieCatalog from './components/pages/MovieCatalog/MovieCatalog'
import ShowsCatalog from './components/pages/ShowsCatalog/ShowsCatalog'
import Navbar from './components/shared/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<MovieCatalog />} />
        <Route path="/shows" element={<ShowsCatalog />} />
        <Route path="/about" element={<MovieCatalog />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App
