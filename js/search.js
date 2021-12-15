import recipe from './recipe.js'
import filters from './filters.js'

export default class search {


    //Create the recipe
    search(data, filterMainSearch) {

        //Get recipe section and filters
        let recipeSection = document.getElementById('recipes');
        let filtersSection = document.getElementById('filters');
        //Reset that section
        filtersSection.innerHTML = "";
        recipeSection.innerHTML = "";
        var filteredData = data;
        //Get the active filter
        let activeFilterSection = document.getElementById('activeFilters');
        //Check if the filter is already active
        let activeFilterList = activeFilterSection.getElementsByTagName("span");
        if (activeFilterList.length > 0) {
            for (var i = 0; i < activeFilterList.length; i++) {
                var txtValue = activeFilterList[i].textContent || activeFilterList[i].innerText;
                if (activeFilterList[i].parentElement.classList.contains("blue")) {
                    filteredData = this.filterData(filteredData, "ingredient", txtValue);
                }
                else if (activeFilterList[i].parentElement.classList.contains("green")) {
                    filteredData = this.filterData(filteredData, "appareil", txtValue);
                }
                else if (activeFilterList[i].parentElement.classList.contains("red")) {
                    filteredData = this.filterData(filteredData, "ustensil", txtValue);
                }
            } 
        }

        //Filter Mainbar
        filteredData = this.filterData(filteredData, "", filterMainSearch);
        

        //Write the filtered list of recipes
        new recipe().createRecipe(filteredData);
        new filters().createFilters(filteredData);
    }

    //Filter data from a list, a type of filter and a value to filter
    filterData(recipeList, typeOfFilter, valueToFilter) {
        valueToFilter = valueToFilter.toUpperCase();
        //Init list to return at the end
        var newList = [];
        //Case the type of filter is an ingredient, we search on ingredients recipe
        if (typeOfFilter == "ingredient") {
            if (recipeList != undefined) {
                recipeList.forEach(recipe => {
                    let elementFound = false;
                    recipe.ingredients.forEach(ingredient => {
                        if (ingredient.ingredient.toUpperCase() == valueToFilter) {
                            elementFound = true;
                        }
                    });
                    if (elementFound) {
                        newList.push(recipe);
                    }
                });
            }
        }
        //Case the type of filter is an appareil, we search on appareil recipe
        else if (typeOfFilter == "appareil") {
            if (recipeList != undefined) {
                recipeList.forEach(recipe => {
                    let elementFound = false;
                    if (recipe.appliance.toUpperCase() == valueToFilter) {
                        elementFound = true;
                    }
                    if (elementFound) {
                        newList.push(recipe);
                    }
                });
            }
        }
        //Case the type of filter is an ustensil, we search on ingredients recipe
        else if (typeOfFilter == "ustensil") {
            if (recipeList != undefined) {
                recipeList.forEach(recipe => {
                    let elementFound = false;
                    recipe.ustensils.forEach(ustensil => {
                        if (ustensil.toUpperCase() == valueToFilter) {
                            elementFound = true;
                        }
                    });
                    if (elementFound) {
                        newList.push(recipe);
                    }
                });
            }
        }
        //Case the type of filter is from the main searchbar we search in ingredient (ingredient name, quantity and unity when they exist), appareil, ustensil and description
        else if (typeOfFilter == "") {
            if (recipeList != undefined) {
                for (var i = 0; i < recipeList.length; i++) {
                    let elementFound = false;
                    //For each ingredient of the current recipe, we check ingredient name, quantity, and unit
                    for (var j = 0; j < recipeList[i].ingredients.length; j++) {
                        if (recipeList[i].ingredients[j].ingredient.toUpperCase().includes(valueToFilter)) {
                            elementFound = true;
                            newList.push(recipeList[i]);
                            //No need to continue the search if we found a match already
                            break;
                        }
                        if (recipeList[i].ingredients[j].quantity != undefined) {
                            //Quantity is an integer so a conversion to string is needed
                            if (String(recipeList[i].ingredients[j].quantity).toUpperCase().includes(valueToFilter)) {
                                elementFound = true;
                                newList.push(recipeList[i]);
                                break;
                            }
                        }
                        if (recipeList[i].ingredients[j].unit != undefined) {
                            if (recipeList[i].ingredients[j].unit.toUpperCase().includes(valueToFilter)) {
                                elementFound = true;
                                newList.push(recipeList[i]);
                                break;
                            }
                        }
                    }
                    //If we found a match we go next else we continue the search on other fields of the current recipe
                    if (elementFound) {
                        continue;
                    }
                    //Check appliance (appareil)
                    else {
                        if (recipeList[i].appliance.toUpperCase().includes(valueToFilter)) {
                            elementFound = true;
                            newList.push(recipeList[i]);
                        }
                    }
                    //If we found a match we go next else we continue the search on other fields of the current recipe
                    if (elementFound) {
                        continue;
                    }
                    //Check ustensil
                    else {
                        for (var z = 0; z < recipeList[i].ustensils.length; z++) {
                            if (recipeList[i].ustensils[z].toUpperCase().includes(valueToFilter)) {
                                elementFound = true;
                                newList.push(recipeList[i]);
                                break;
                            }
                        }
                    }
                    //If we found a match we go next else we continue the search on other fields of the current recipe
                    if (elementFound) {
                        continue;
                    }
                    //Check description
                    else {
                        if (recipeList[i].description.toUpperCase().includes(valueToFilter)) {
                            newList.push(recipeList[i]);
                        }
                    }
                     //If we found a match we go next else we continue the search on other fields of the current recipe
                     if (elementFound) {
                        continue;
                    }
                    //Check title
                    else {
                        if (recipeList[i].name.toUpperCase().includes(valueToFilter)) {
                            newList.push(recipeList[i]);
                        }
                    }
                }
            }
        }
        return newList;
    }
}
