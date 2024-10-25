import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import RecipeCategories from './pages/RecipeCategories';
import Favorites from './pages/Favorites';
import Register from './pages/Register';
import ProtectedRoute from './util/ProtectedRoutes';

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<RecipeCategories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/favorites"
              element={<ProtectedRoute element={<Favorites />} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;