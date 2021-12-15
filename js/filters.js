export default class filters {

    //Create the filters
    createFilters(data) {

        
        let ingredients = [];
        let appareils = [];
        let ustensils = [];
        //Get filters section
        let filterSection = document.getElementById('filters');

        data.recipes.forEach(recipe => {

            recipe.ingredients.forEach(ingredient => {
                if (!ingredients.includes(ingredient.ingredient)) {
                    ingredients.push(ingredient.ingredient);
                }
            })

            if (!appareils.includes(recipe.appliance)) {
                appareils.push(recipe.appliance);
            }

            recipe.ustensils.forEach(ustensil => {
                if (!ustensils.includes(ustensil)) {
                    ustensils.push(ustensil);
                }
            })
           

        })
         //Creating the filter template
         let ingredientListTemplate = this.formList(ingredients);
         let appareilLisTtemplate = this.formList(appareils);
         let ustensilTemplate = this.formList(ustensils);

         let ingredientFilterTemplate = `
         <div id="ingredientFilter">
            <div class="filterButton blue">Ingredients <i class="fa fa-chevron-down"></i></div>
            <div class="filterContent">
                <div class="filterHeader blue">
                    <input type="text" class="filterSearch blue" placeholder="Rechercher un ingrédient" aria-label="search ingredient" aria-describedby="basic-addon2">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <ul class="filterList blue">
                    `+ ingredientListTemplate +`
                </ul>
            </div>
         </div>
         `;

         let appareilFilterTemplate = `
         <div id="appareilFilter">
            <div class="filterButton green">Appareil <i class="fa fa-chevron-down"></i></div>
            <div class="filterContent">
                <div class="filterHeader green">
                    <input type="text" class="filterSearch green" placeholder="Rechercher un ingrédient" aria-label="search appareil" aria-describedby="basic-addon2">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <ul class="filterList green">
                    `+ appareilLisTtemplate +`
                </ul>
            </div>
         </div>
         `;

         let ustensilFilterTemplate = `
         <div id="ustensilFilter">
            <div class="filterButton red">Ustensil <i class="fa fa-chevron-down"></i></div>
            <div class="filterContent">
                <div class="filterHeader red">
                    <input type="text" class="filterSearch red" placeholder="Rechercher un ingrédient" aria-label="search ustensil" aria-describedby="basic-addon2">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <ul class="filterList red">
                    `+ ustensilTemplate +`
                </ul>
            </div>
         </div>
         `;

         filterSection.innerHTML = filterSection.innerHTML + ingredientFilterTemplate + appareilFilterTemplate + ustensilFilterTemplate;

         this.addEvents();
    }

    addEvents() {
        document.querySelectorAll('.filterButton').forEach(item => {
            item.addEventListener('click', event => {

                document.querySelectorAll('.filterButton').forEach(item => {
                    item.parentElement.children[1].style.display = "none";
                    item.style.width = "10rem";
                })
                event.target.parentElement.children[1].style.display = "block";
                event.target.style.width = "30rem";

            })
        })

        document.querySelectorAll('.fa-chevron-up').forEach(item => {
            item.addEventListener('click', event => {

                event.target.parentElement.parentElement.style.display = "none";
                event.target.parentElement.parentElement.parentElement.children[0].style.width = "10rem";



            })
        })
    }

    formList(list) {
        var template = "";
        list.forEach(element => {
            template = template + `<li class="filterItem" data-filter=`+ element +`>${element}</li>` 
        })

        return template;
    }
}
