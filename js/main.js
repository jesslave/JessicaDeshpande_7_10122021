import data from '../data/recipeData.json'  assert { type: "json" };
import recipe from './recipe.js'
import filters from './filters.js'


//Create recipes
new recipe().createRecipe(data.recipes);
new filters().createFilters(data);
