import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import MealCards from '../components/MealCards';
import axios from 'axios';

function Favorites() {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [refreshFavorites, setRefreshFavorites] = useState(false);

  const fetchFavorites = () => {
    const token = sessionStorage.getItem('authToken');
    axios.get(process.env.REACT_APP_API_URL+'recipes/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setFavoriteMeals(res.data.favoriteRecipes);
    })
    .catch(error => {
      console.error('Error fetching favorite recipes:', error);
    });
  };

  useEffect(() => {
    fetchFavorites();
  }, [refreshFavorites]);

  return (
    <Container className="container mt-2">
      <h2>Favorite Recipes</h2>
      <Row>
        <MealCards
          type="fav"
          meals={favoriteMeals}
          selectedCategory={null}
          refreshFavorites={() => setRefreshFavorites(prev => !prev)}
        />
      </Row>
    </Container>
  );
}

export default Favorites;
