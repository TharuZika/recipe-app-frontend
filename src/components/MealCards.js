import { faHeart, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import MealModal from './MealModal';

function MealCards({ type, meals, selectedCategory, refreshFavorites }) {
  const [favorites, setFavorites] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setLoading(true);
    axios.get(process.env.REACT_APP_API_URL+'recipes/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setFavorites(res.data.favoriteRecipes);
    }).catch(error => console.error('Error loading favorites:', error))
    .finally(() => setLoading(false)); 
  }, [refreshFavorites]);

  const handleAddToFavorites = (meal) => {
    const isFavorite = favorites.some(favMeal => favMeal.idMeal === meal.idMeal);
    const url = isFavorite
      ? process.env.REACT_APP_API_URL+'recipes/favorites/delete'
      : process.env.REACT_APP_API_URL+'recipes/favorites';
  
    setLoading(true);
    axios.post(url, { recipeId: meal.idMeal }, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
    }).then(() => {
      setFavorites(prev =>
        isFavorite 
          ? prev.filter(favMeal => favMeal.idMeal !== meal.idMeal)
          : [...prev, meal]
      );
      if (type === 'fav' && refreshFavorites) {
        refreshFavorites();
      }
    }).catch(error => {
      if (error.response.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        console.error('Error updating favorite status:', error);
      }
    })
    .finally(() => setLoading(false)); 
  }

  const openMealModal = (mealId) => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}recipes/find/${mealId}`)
      .then(response => {
        setSelectedMeal(response.data.data);
        setModal(true);
      })
      .catch(error => alert("Error fetching meal details"))
      .finally(() => setLoading(false)); 
  };

  const closeModal = () => {
    setModal(false);
    setSelectedMeal(null);
  };

  return (
    <>
      <Row>
        {meals.map((meal) => (
          <Col key={meal.idMeal} xs={6} sm={4} md={3} lg={2} className="mb-3">
            <Card onClick={() => openMealModal(meal.idMeal)} title={meal.strMeal} className="shadow-sm text-center small-card">
              <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
              <Card.Body>
                <p className='text-start'>{meal.strMeal.substring(0, 16)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{selectedCategory}</small>
                  <FontAwesomeIcon
                    icon={favorites.some(favMeal => favMeal.idMeal === meal.idMeal) ? faHeartCircleCheck : faHeart}  
                    title={favorites.some(favMeal => favMeal.idMeal === meal.idMeal) ? "Favourite" : "Add to favourite"}  
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites(meal);
                    }}
                  style={{ cursor: 'pointer' }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="info" />
          <p>Loading...</p>
        </div>
      ) : (
        selectedMeal && (
          <MealModal show={modal} meal={selectedMeal} handleClose={closeModal} />
        )
      )}
    </>
  );
}

export default MealCards;
