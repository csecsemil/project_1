const cost = {
    Bread: 10,
    Salat: 5,
    Tomato: 20,
    Meat: 50
};

let remainingMoney = 6000;
for (const i of document.getElementsByClassName("shopitem")) {
    i.value = 0;
}

// let kep = document.createElement('img');
// kep.src = "hambi.avif"
// kep.width = 100;
// document.getElementById('totalMoney').prepend(kep);


// function calculateTotal() {
//     const START_MONEY = 6000;
//     let totalCost = 0;
//
//     const breadQty = parseInt(document.getElementById('Bread').value); totalCost += breadQty * cost.Bread;
//     const salatQty = parseInt(document.getElementById('Salat').value); totalCost += salatQty * cost.Salat;
//     const tomatoQty = parseInt(document.getElementById('Tomato').value); totalCost += tomatoQty * cost.Tomato;
//     const meatQty = parseInt(document.getElementById('Meat').value); totalCost += meatQty * cost.Meat;

//     const remainingMoney = START_MONEY - totalCost;
//     document.getElementById('penzosszeg').textContent = `Remaining Money: ${remainingMoney}`;

// }
let zIndexCounter = 10;
let currentBurgerHeight = 0;


function addIngredient(ingredient) {
    ingredients[ingredient]++;
    document.getElementById(ingredient).value = parseInt(document.getElementById(ingredient).value) + 1;
    remainingMoney -= cost[ingredient];
    document.getElementById("totalMoney").textContent = remainingMoney;
    const stack = document.getElementById('burger-stack');
    const ingredientDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = ingredientsImages[ingredient];
    img.alt = ingredient;
    img.className = 'ingredient-img';
    ingredientDiv.appendChild(img);

    ingredientDiv.className = 'ingredient-name';
    stack.appendChild(ingredientDiv);
}

function restartOrder() {
    for (const key in ingredients) {
        ingredients[key] = 0;
        document.getElementById(key).value = 0;
    }
    remainingMoney = 6000;
    document.getElementById("totalMoney").textContent = remainingMoney;
    const stack = document.getElementById('burger-stack');
    stack.innerHTML = '';
}


const ingredientsImages = {
    Bread: "buci lent.png",
    Salat: "salat_1.png",
    Tomato: "tomato_1.png",
    Meat: "hambi_hus.png"
}

const ingredients = {
    Bread: 0,
    Salat: 0,
    Tomato: 0,
    Meat: 0
};



