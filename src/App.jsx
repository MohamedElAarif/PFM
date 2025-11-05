import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import BooksHome from "./pages/BooksHome"
import BookDetails from "./pages/BookDetails"
import Favorites from './pages/Favorites'
import BooksBySubject from './pages/BooksBySubject'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksHome />} />
        <Route path="/:subject" element={<BooksBySubject />} />
        <Route path="/works/:ISBN" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
