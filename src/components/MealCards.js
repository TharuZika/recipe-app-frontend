import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';




function MealCards({ meals, selectedCategory }) {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (meal) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(meal.idMeal)
        ? prevFavorites.filter(id => id !== meal.idMeal) // Remove from favorites
        : [...prevFavorites, meal.idMeal] // Add to favorites
    );
    

    axios.post('http://localhost:5000/api/recipes/favorites', { meal })
      .then(res => {
        console.log('Favorite status updated:', res.data);
      })
      .catch(error => {
        console.error('Error updating favorite status:', error);
      });
  };

  return (
    <Row>
      {meals.map((meal) => (
        <Col key={meal.idMeal} xs={6} sm={4} md={3} lg={2} className="mb-3">
          <Card title={meal.strMeal} className="shadow-sm text-center small-card">
            <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
            <Card.Body>
              <p className='text-start'>{meal.strMeal.substring(0, 16)}</p>
              {/* Align category to the left and heart to the right */}
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{selectedCategory}</small> {/* Category on the left */}
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`favorite-icon ${favorites.includes(meal.idMeal) ? 'favorited' : ''}`}
                  onClick={() => handleAddToFavorites(meal)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MealCards;