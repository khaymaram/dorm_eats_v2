import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import './OpenRecipe.css'
import supabase from '../supabase-client';

const OpenRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data } = await supabase.from('Recipes').select().eq('id', id).single();
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>

  return (
    <div className='OpenRecipe'>
      <header className='OpenRecipe-header'>
        <h1>Dorm Eats</h1>
        <img src='/logo_v2.png' width='100px' height='100px' alt='logo' />
      </header>

      <div className='OpenRecipe-content'>
        <h2 className='OpenRecipe-subheading'>{recipe.name}</h2>
      </div>

      <div className='OpenRecipe-content'>
        <div className='OpenRecipe-ingredients'>
          <h2 className='OpenRecipe-subheading'>Ingredients</h2>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <label>
                <input type="checkbox" name="ingredient" value={ingredient} />
                <span>{ingredient}</span>
              </label>
            </div>
          ))}
        </div>

        <div className='OpenRecipe-instructions'>
          <h2 className='OpenRecipe-subheading'>Instructions</h2>
          <div className='OpenRecipe-img'>
            {recipe.image && (
            <div>
              <img src={recipe.image} alt={recipe.name} />
            </div>
            )}
          </div>
          <ul>
            {recipe.instructions.map((instruction, index) => (
              <div key={index}>
                <label>
                  <input type="checkbox" name="step" value={instruction} />
                  <strong>Step {index + 1}:</strong> {instruction}
                </label>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className='OpenRecipe'>
        <Link to="/home">
          <button>Back to Recipes</button>
        </Link>
      </div>
    </div>
  );
}

export default OpenRecipe;