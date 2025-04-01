import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import './HomePage.css'
import supabase from '../supabase-client';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
      getRecipes();
      getIngredients();
    }, []);
  
    async function getRecipes() {
      const {data} = await supabase.from("Recipes").select();
      setRecipes(data);
    }

    async function getIngredients() {
      const {data} = await supabase.from("Ingredients-Table").select();
      setIngredients(data);
    }

    const handleIngredientSelection = (e) => {
      const {value, checked} = e.target;

      if (checked) {
        setSelectedIngredients((prev) => [...prev, value]);
      } else {
        setSelectedIngredients((prev) => prev.filter((ingredient) => ingredient !== value));
      }
    }

    let filteredRecipes;

    if (selectedIngredients.length === 0){
      filteredRecipes = recipes;
    } else {
      filteredRecipes = recipes.filter((recipe) => 
        selectedIngredients.every((ingredient) => recipe.ingredients.includes(ingredient))
      );
    }

  return (
    <div className='HomePage'>
      <header className='HomePage-header'>
        <h1>Dorm Eats</h1>
        <img src='logo_v2.png' width= '100px' height = '100px' alt='logo'/>
      </header>

      <div className='HomePage-content'>
        <div className='HomePage-ingredients'>
          <h2 className='HomePage-subheading'>Select Ingredients</h2>
            {ingredients.map((ingredient) => (
              <div key={ingredient.id}>
                <label>
                  <input type="checkbox" name="ingredient" value={ingredient.name} onChange={handleIngredientSelection}/>
                  {ingredient.name}
                </label>
              </div>
            ))}
        </div>

        <div className='HomePage-recipes'>
          <h2 className='HomePage-subheading'>Recipes</h2>
          <ul>
            { filteredRecipes.length === 0 ? (
              <h3 className='HomePage-recipeBlock'>No recipes available</h3>
            ) : (
              filteredRecipes.map((recipe) => (
                <li key={recipe.id} className='HomePage-recipeBlock'>
                    <Link to={`/recipe/${recipe.id}`} className='recipe-link'>
                      <div className='recipe-block'>
                        <strong>{recipe.name}</strong>
                        <div>{recipe.ingredients.join(', ')}</div>
                      </div>
                    </Link>
                  </li>
              ))
            )
            }
          </ul>     
        </div>
      </div>
    </div>
  );
}

export default HomePage;