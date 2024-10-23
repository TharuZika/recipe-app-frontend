import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from TheMealDB API
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => setCategories(response.data.categories))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Recipe Categories</h2>
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 mb-4" key={category.idCategory}>
            <div className="card">
              <img src={category.strCategoryThumb} className="card-img-top" alt={category.strCategory} />
              <div className="card-body">
                <h5 className="card-title">{category.strCategory}</h5>
                <p className="card-text">{category.strCategoryDescription.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeCategories;