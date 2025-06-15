import './App.css'
import Details from './components/pages/Details/Details'
import Main from './components/pages/Main/Main'
import MovieCatalog from './components/pages/MovieCatalog/MovieCatalog'
import ShowsCatalog from './components/pages/ShowsCatalog/ShowsCatalog'
import Navbar from './components/shared/Navbar/Navbar'
import About from './components/pages/About/About'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { PageContext } from './context/PageContext'

function PageContextProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isMain = location.pathname === '/';
  return (
    <PageContext.Provider value={{ isMain }}>
      {children}
    </PageContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <PageContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<MovieCatalog />} />
          <Route path="/shows" element={<ShowsCatalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </PageContextProvider>
    </Router>
  );
}

export default App
