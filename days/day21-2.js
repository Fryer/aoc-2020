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
let list = [];
let allergensLeft = new Set(Object.keys(allergens));
while (list.length < Object.keys(allergens).length) {
    let delAllergen;
    let delIngredient;
    for (let allergen of allergensLeft) {
        if (allergens[allergen].size == 1) {
            delAllergen = allergen;
            delIngredient = [...allergens[allergen]][0];
            list.push({ ingredient: delIngredient, allergen: allergen });
            break;
        }
    }
    allergensLeft.delete(delAllergen);
    for (let [allergen, ingredients] of Object.entries(allergens)) {
        if (allergen != delAllergen) {
            ingredients.delete(delIngredient);
        }
    }
}
list.sort((a, b) => a.allergen > b.allergen);
list = list.map(item => item.ingredient).join(',');
log('Canonical dangerous ingredient list (part 2): ' + list);
