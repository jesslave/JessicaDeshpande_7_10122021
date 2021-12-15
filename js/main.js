import data from '../data/recipeData.json'  assert { type: "json" };
import recipe from './recipe.js'



//Create recipes
new recipe().createRecipe(data);