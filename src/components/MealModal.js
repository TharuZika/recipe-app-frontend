import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MealModal({ show, meal, handleClose }) {
    const ingredients = [];
for (let i = 1; i <= 20; i++) {
  const ingredient = meal[`strIngredient${i}`];
  const measure = meal[`strMeasure${i}`];
  if (ingredient && ingredient.trim()) {
    ingredients.push(`${measure} ${ingredient}`);
  }
}

  return (
    <Modal show={show} onHide={handleClose} centered size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>{meal.strMeal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
            <div className='col-sm-4'>
                <img src={meal.strMealThumb} alt={meal.strMeal} width={500} className="img-fluid mb-3" />
                <h5>{meal.strCategory}</h5>
                <h6 className='text-muted'>{meal.strArea}</h6>
            </div>
            <div className='col-sm-8'>
            <h5><strong>Instructions:</strong></h5>
            <p>{meal.strInstructions}</p>
            <h5>Ingredients:</h5>
            {ingredients.length > 0 ? (
                <p className='text-muted'>
                {ingredients.join(', ')}
                </p>
            ) : (
                <p className='text-muted'>No ingredients available.</p>
            )}
            </div>
        </div>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MealModal;
