export default class recipe {


    //Create the recipe
    createRecipe(recipes) {

        //Get recipe section
        let recipeSection = document.getElementById('recipes');

        //Show the count of results for more conveinance
        let countSection = document.getElementById('countResults');
        //label plural depending the number of found
        if (recipes.length == 0 || recipes.length == 1) {
            countSection.innerHTML = `<div class="resultsCount">`+ recipes.length +` recette trouvée !</div>`
        }
        else {
            countSection.innerHTML = `<div class="resultsCount">`+ recipes.length +` recettes trouvées !</div>`
        }
        

        recipes.forEach(recipe => {

            //Getting all recipe ingredient datas
            let ingredientTemplate = "";
            recipe.ingredients.forEach(ingredient => {
                let quantity = ingredient.quantity == undefined ? "" : ingredient.quantity;
                let unit = ingredient.unit == undefined ? "" : ingredient.unit;
                if (unit == "" && quantity == "") {
                    ingredientTemplate =  ingredientTemplate + `<li><strong>${ingredient.ingredient}</strong></li>`;
                }
                else {
                    ingredientTemplate =  ingredientTemplate + `<li><strong>${ingredient.ingredient}: </strong> `+ quantity + unit +`</li>`;
                }
            })

            //Creating the recipe article
            let recipeTemplate = `
            <article class="container recipe">

                <img class="row recipeImg" src="../medias/recipeImg.png" alt="${recipe.name}" />

                <div class="row recipeHeader">
                    <h1 class="col-md-6 d-flex align-items-center photographer-name">${recipe.name}</h1>
                    <span class="col-md-6 d-flex align-items-center justify-content-end time"><i class="fa fa-clock-o fa-lg"></i> ${recipe.time} min</span>
                </div>
                <div class="row recipeFooter">
                    <ul class="col-md-6 recipeIngredients">`
                        + ingredientTemplate +
                    `</ul>
                    <p class="col-md-6 recipeDesc">
                        ${recipe.description}
                    </p>
                </div>
                <div class="row emptySpace"><div>
            </article>
            `;

            recipeSection.innerHTML = recipeSection.innerHTML + recipeTemplate;
        })
    }
}
