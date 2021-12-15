import search from './search.js'
import database from '../data/recipeData.json'  assert { type: "json" };

export default class filters {

    //Create the filters
    createFilters(data) {

        //Init arrays
        let ingredients = [];
        let appareils = [];
        let ustensils = [];
        //Get filters section
        let filterSection = document.getElementById('filters');

        //For each recipe we fullfill our arrays of ingredient,appareil and ustensils if the item is not already in the array, we add it
        data.forEach(recipe => {

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
         let ingredientListTemplate = this.formList(ingredients, 'ingredientItem');
         let appareilLisTtemplate = this.formList(appareils, 'appareilItem');
         let ustensilTemplate = this.formList(ustensils, 'ustensilItem');

         //Ingredient filter
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

         //Appareil filter
         let appareilFilterTemplate = `
         <div id="appareilFilter">
            <div class="filterButton green">Appareil <i class="fa fa-chevron-down"></i></div>
            <div class="filterContent">
                <div class="filterHeader green">
                    <input type="text" class="filterSearch green" placeholder="Rechercher un appareil" aria-label="search appareil" aria-describedby="basic-addon2">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <ul class="filterList green">
                    `+ appareilLisTtemplate +`
                </ul>
            </div>
         </div>
         `;

         //Ustensil filter
         let ustensilFilterTemplate = `
         <div id="ustensilFilter">
            <div class="filterButton red">Ustensile <i class="fa fa-chevron-down"></i></div>
            <div class="filterContent">
                <div class="filterHeader red">
                    <input type="text" class="filterSearch red" placeholder="Rechercher un ustensil" aria-label="search ustensil" aria-describedby="basic-addon2">
                    <i class="fa fa-chevron-up"></i>
                </div>
                <ul class="filterList red">
                    `+ ustensilTemplate +`
                </ul>
            </div>
         </div>
         `;

         filterSection.innerHTML = filterSection.innerHTML + ingredientFilterTemplate + appareilFilterTemplate + ustensilFilterTemplate;

         this.addEvents(data);
    }

    //Add differents events related to the filters
    addEvents(data) {
        //Hide all filter content then active the current one
        document.querySelectorAll('.filterButton').forEach(item => {
            item.addEventListener('click', event => {

                document.querySelectorAll('.filterButton').forEach(item => {
                    item.parentElement.children[1].style.display = "none";
                    item.style.width = "10rem";
                })
                event.target.parentElement.children[1].style.display = "block";
                //Button have to get the same size of the content filter to not hide other buttons
                event.target.style.width = "30rem";

            })
        })

        //Hide the current filter content put back the button to his original size
        document.querySelectorAll('.fa-chevron-up').forEach(item => {
            item.addEventListener('click', event => {

                event.target.parentElement.parentElement.style.display = "none";
                event.target.parentElement.parentElement.parentElement.children[0].style.width = "10rem";
            })
        })

        //Add the dynamic search event to all search filter
        document.querySelectorAll('.filterSearch').forEach(item => {
            item.addEventListener('keyup', event => {
                this.filterFunction(event.target.value, event.target.parentElement.parentElement.children[1]);
            })
        })

        //Add to all list item the event to add their label to active label section + update the search result
        document.querySelectorAll('.filterItem').forEach(item => {
            item.addEventListener('click', event => {
                this.addActiveFilter(event.target.innerText, event.target.parentElement.parentElement.parentElement.id, data);
                new search().search(data, "");
            })
        })

    }

    //Return a html list li of items from a list of strings
    formList(list, itemClass) {
        var template = "";
        list.forEach(element => {
            var id = element.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
            template = template + `<li id="` + id + `" class="filterItem ` + itemClass + `" data-filter=`+ element +`>${element}</li>` 
        })

        return template;
    }

    //Filter a list of List item with a filter value.
    filterFunction(filter, list) {
		var txtValue, li, i;
		li = list.getElementsByTagName("li");
		//For all item found in the list, we get the text value and if the filter match with the part of the current list item we dont hide the list item, else we hide it with a display:none
		for (i = 0; i < li.length; i++) {
			txtValue = li[i].textContent || li[i].innerText;
			if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
    }

    //Add active filter from the value of the filter and the type of filter (ingredient or appareil or ustensil)
    addActiveFilter(filterValue, typeOfFilter, data) {
            //Get active filter section
            let activeFilterSection = document.getElementById('activeFilters');
            //Check if the filter is already active
            let activeFilterList = activeFilterSection.getElementsByTagName("span");
            let alreadyIn = false;

            for (var i = 0; i < activeFilterList.length; i++) {
                var txtValue = activeFilterList[i].textContent || activeFilterList[i].innerText;
                if (txtValue == filterValue) {
                    alreadyIn = true;
                    break;
                }
            }

            //If the current filter value is not already in then we add it
            if (!alreadyIn) {
                var currentType = "";
                if (typeOfFilter == "ingredientFilter") {
                    currentType = "blue"
                }
                else if (typeOfFilter == "appareilFilter") {
                    currentType = "green"
                }
                else if (typeOfFilter == "ustensilFilter") {
                    currentType = "red"
                }
                var templateFilter = `
                    <div class="activeFilterContent `+ currentType +`">
                        <span>`+ filterValue +`</span>
                        <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
                    </div>
                `;
    
                activeFilterSection.innerHTML = activeFilterSection.innerHTML + templateFilter;
            }
            this.addRemoveFilterEvent(database.recipes);
    }

    //Add remove event to all active filters
    addRemoveFilterEvent(data) {
        document.querySelectorAll('.fa-times-circle').forEach(item => {
            item.addEventListener('click', event => {
                event.target.parentElement.remove();
                //reset the search with the data and the current main search bar value
                new search().search(data, document.querySelector('.searchbar').value);
            })
        })
    }

    //Creation of events related to the main search
    mainSearchFilterEventCreation(data) {
        //Add event to the search bar + update the search result
        document.querySelector('.fa-search').addEventListener('click', event => {
            new search().search(data, event.target.parentElement.parentElement.parentElement.children[0].value);
        })

        //Add event of the search bar if there is more than 3 char
        document.querySelector('.searchbar').addEventListener('keyup', event => {
            if (event.target.value.length >= 3) {
                new search().search(data, event.target.value);
            }
        })

        //Add event of the search bar when we press enter
        document.querySelector('.searchbar').addEventListener('keydown', event => {
            if (event.key == "Enter") {
                new search().search(data, event.target.value);
            }
        })
        
    }

    //hide or show filter element of lists with the given list of recipes
    filterFilterElements(recipeList) {
        //Get the 3 list of filters
        var ingredientListItem = document.querySelectorAll('.ingredientItem');
        var appareilListItem = document.querySelectorAll('.appareilItem');
        var ustensilItem = document.querySelectorAll('.ustensilItem');

        //Init arrays
        let ingredients = [];
        let appareils = [];
        let ustensils = []

        //For each recipe we fullfill our arrays of ingredient,appareil and ustensils if the item is not already in the array, we add it
        recipeList.forEach(recipe => {

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

        //For each lists, if the current element is in the list, display block else display none
        ingredientListItem.forEach(element => {
            if (ingredients.includes(element.innerHTML)) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        })
        appareilListItem.forEach(element => {
            if (appareils.includes(element.innerHTML)) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        })
        ustensilItem.forEach(element => {
            if (ustensils.includes(element.innerHTML)) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        })
        
    }
}
