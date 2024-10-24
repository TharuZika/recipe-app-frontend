import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import MealCards from './MealCards';

function RecipeCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => setCategories(response.data.categories))
      .catch(error => alert("Error fetching categories"));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then(response => setMeals(response.data.meals))
        .catch(error => alert("Error fetching meals"));
    }
  }, [selectedCategory]);

  const handleAddToFavorites = (meal) => {
    alert(`${meal.strMeal} added to favorites!`);
    // Implement actual "add to favorite" functionality here, e.g., save to localStorage or database
  };

  return (
    <Container className="container mt-2">
      {/* Category Buttons */}
      <Row className="justify-content-center mb-4">
        {categories.map((category) => (
          <Col key={category.idCategory} xs="auto" className="mb-3">
            <Button
              variant={category.strCategory === selectedCategory ? 'danger' : 'outline-danger'}
              className="rounded-pill"
              onClick={() => setSelectedCategory(category.strCategory)} // Set selected category
            >
              {category.strCategory}
            </Button>
          </Col>
        ))}
      </Row>

      {/* Displaying Meals in a Card Grid */}
      <MealCards
        meals={meals}
        selectedCategory={selectedCategory}
        handleAddToFavorites={handleAddToFavorites}
      />
    </Container>
  );
}

export default RecipeCategories;
