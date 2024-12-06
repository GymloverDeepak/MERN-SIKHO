import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login ';
import Footer from './components/Fotter';
import About from './components/About ';
import NoteState from './Context/notes/NoteState';
import Signup from './components/Signup';
function App() {
  return (<NoteState>
    <BrowserRouter>
      <Navbar />
      <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
