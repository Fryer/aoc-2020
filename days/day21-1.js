let foods = data.split('\n').map(food => food.split(' (contains ')).map(food => ({ ingredients: new Set(food[0].split(' ')), allergens: new Set(food[1].slice(0, -1).split(', ')) }));
let ingredients = new Set();
let allergens = {};
for (let food of foods) {
    for (let ingredient of food.ingredients) {
        ingredients.add(ingredient);
    }
}
for (let food of foods) {
    for (let allergen of food.allergens) {
        allergens[allergen] = new Set(ingredients);
    }
}
for (let [allergen, ingredients] of Object.entries(allergens)) {
    for (let food of foods) {
        if (!food.allergens.has(allergen)) {
            continue;
        }
        for (let ingredient of new Set(ingredients)) {
            if (!food.ingredients.has(ingredient)) {
                ingredients.delete(ingredient);
            }
        }
    }
}
let safeIngredients = new Set(ingredients);
for (let ingredients of Object.values(allergens)) {
    for (let ingredient of ingredients) {
        safeIngredients.delete(ingredient);
    }
}
let appearances = 0;
for (let food of foods) {
    for (let ingredient of food.ingredients) {
        appearances +=safeIngredients.has(ingredient);
    }
}
log('Safe ingredient appearances (part 1): ' + appearances);
