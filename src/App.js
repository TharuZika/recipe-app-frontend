import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import RecipeCategories from './components/RecipeCategories';
import Favorites from './components/Favorites';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div >
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<RecipeCategories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;