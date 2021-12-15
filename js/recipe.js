export default class recipe {


    //Create the recipe
    createRecipe(data) {

        //Get recipe section
        let recipeSection = document.getElementById('recipes');

        data.recipes.forEach(recipe => {

            //Getting all recipe ingredient datas
            let ingredientTemplate = "";
            recipe.ingredients.forEach(ingredient => {
                let quantity = ingredient.quantity == undefined ? "" : ingredient.quantity;
                let unit = ingredient.unit == undefined ? "" : ingredient.unit;
                if (unit == "" && quantity == "") {
                    ingredientTemplate =  ingredientTemplate + `<li><strong>${ingredient.ingredient}</strong></li>`;
                }
                else {
                    ingredientTemplate =  ingredientTemplate + `<li><strong>${ingredient.ingredient}:</strong> `+ quantity + unit +`</li>`;
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
