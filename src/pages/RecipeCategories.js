import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import MealCards from '../components/MealCards';

function RecipeCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(process.env.REACT_APP_API_URL+'recipes/categories')
      .then(response => {
        setCategories(response.data.data.categories);
          try {
            setSelectedCategory(response.data.data.categories[0].strCategory);
          } catch (error) {
            setSelectedCategory('');
          }
      })
      .catch(error => alert("Error fetching categories"))
      .finally(() => setLoading(false)); 
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_URL}recipes/category/${selectedCategory}`)
        .then(response => {
          setMeals(response.data.data);
          console.log(response);
        })
        .catch(error => alert("Error fetching meals"))
        .finally(() => setLoading(false)); 
    }
  }, [selectedCategory]);

  return (
    <Container className="container mt-2">
      <Row className="justify-content-center mb-4">
        {categories.map((category) => (
          <Col key={category.idCategory} xs="auto" className="mb-3">
            <Button
              variant={category.strCategory === selectedCategory ? 'info' : 'outline-info'}
              className="rounded-pill"
              onClick={() => setSelectedCategory(category.strCategory)}
            >
              {category.strCategory}
            </Button>
          </Col>
        ))}
      </Row>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="info" />
          <p>Loading...</p>
        </div>
      ) : (
        <MealCards
          type={"def"}
          meals={meals}
          selectedCategory={selectedCategory}
        />
      )}
    </Container>
  );
}

export default RecipeCategories;
