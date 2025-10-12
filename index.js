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




const ingredientsImages = {
    Bread: "buci_lent.png",
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

const INGREDIENT_LIST = ["Bread", "Salat", "Tomato", "Meat"];

let playerOrder = [];
let gameActive = false;

function shuffleArray(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let CORRECT_ORDER = [];

function startGame() {
    restartOrder();
    playerOrder = [];
    // Random sorrend generálása
    CORRECT_ORDER = shuffleArray([...INGREDIENT_LIST]);
    const orderDisplay = document.getElementById('correct-order-display');
    orderDisplay.innerHTML = '<ul>' + CORRECT_ORDER.map(item => `<li>${item}</li>`).join('') + '</ul>';
    document.getElementById('tutorial-modal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('tutorial-modal').style.display = 'none';
        gameActive = true;
        alert('Game Started! Build the burger in the correct order.');
    }, 5000);
}

function addIngredient(ingredientName) {
    if (!gameActive) {
        alert('Please start the game first!');
        return;
    }
    if (!ingredientsImages[ingredientName]) return;
    playerOrder.push(ingredientName);
    const stack = document.getElementById('burger-stack');
    const img = document.createElement('img');
    img.src = ingredientsImages[ingredientName];
    img.alt = ingredientName;
    img.className = 'ingredient-img';
    stack.appendChild(img);
    ingredients[ingredientName]++;
    document.getElementById(ingredientName).value = parseInt(document.getElementById(ingredientName).value) + 1;
    remainingMoney -= cost[ingredientName];

    showFloatingCost(-cost[ingredientName]);

    document.getElementById("totalMoney").textContent = remainingMoney;
    // NEM automatikus ellenőrzés!
}

function showFloatingCost(amount) {
    const stack = document.getElementById('burger-stack');
    const floating = document.createElement('div');
    floating.textContent = `${amount} Ft`;
    floating.style.top = '0';
    stack.appendChild(floating);

    setTimeout(() => {
        floating.remove();
    }, 1000); // Eltávolítja 1 másodperc múlva
}




function checkOrder() {
    gameActive = false;
    const correctString = JSON.stringify(CORRECT_ORDER);
    const playerString = JSON.stringify(playerOrder);
    const resultDiv = document.getElementById('result');
    if(correctString === playerString) {
        resultDiv.textContext = 'Good order!';
        resultDiv.classList.add('success');
    } else {
        resultDiv.textContent = 'Wrong order!';
        resultDiv.classList.remove('success');
        remainingMoney -= 200;
        document.getElementById("totalMoney").textContent = remainingMoney;
        showFloatingCost(-200);
    }

}

function startGame() {
    if (gameActive && playerOrder.length > 0) {
        remainingMoney -= 200;
        document.getElementById("totalMoney").textContent = remainingMoney;
        showFloatingCost(-200);
    }
    restartOrder();
    playerOrder = [];
    const randomIndex = Math.floor(Math.random() * BURGER_RECIPES.length);
    CORRECT_ORDER = BURGER_RECIPES[randomIndex];
    const orderDisplay = document.getElementById('correct-order-display');
    orderDisplay.innerHTML = '<ul>' + CORRECT_ORDER.map(item => `<li>${item}</li>`).join('') + '</ul>';
    document.getElementById('tutorial-modal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('tutorial-modal').style.display = 'none';
        gameActive = true;
        alert('Game Started! Build the burger in the correct order.');
    }, 5000);
}


function restartOrder() {
    for (const key in ingredients) {
        ingredients[key] = 0;
        document.getElementById(key).value = 0;
    }
    // NE állítsd vissza a pénzt!
    // remainingMoney = 6000;
    document.getElementById("totalMoney").textContent = remainingMoney;
    const stack = document.getElementById('burger-stack');
    stack.innerHTML = '';
    playerOrder = [];
    gameActive = false;
    addInitialBottomBun(stack);
}

function addInitialBottomBun(stackElement) {
    if (stackElement.querySelector('.bottom-bun')) return;
    const bottomBun = document.createElement('img');
    bottomBun.src = 'bottom_bun.png';
    bottomBun.className = 'bottom-bun';
    stackElement.appendChild(bottomBun);
}

document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('burger-stack');
    addInitialBottomBun(stack);
    // Ellenőrző gomb létrehozása
    let checkBtn = document.getElementById('check-order-btn');
    if (!checkBtn) {
        checkBtn = document.createElement('button');
        checkBtn.id = 'check-order-btn';
        checkBtn.textContent = 'check order';
        checkBtn.style.marginTop = '15px';
        checkBtn.onclick = checkOrder;
        document.body.appendChild(checkBtn);
    }
});

const BURGER_RECIPES = [
    ["Bread", "Meat", "Tomato", "Salat", "Bread"], // Klasszikus burger
    ["Bread", "Salat", "Tomato", "Bread"],         // Vegaburger
    ["Bread", "Meat", "Meat", "Tomato", "Bread"],  // Dupla húsos
    ["Bread", "Tomato", "Salat", "Meat", "Bread"],  // Random burger
    ["Bread", "Meat", "Meat", "Meat", "Bread"],
    ["Bread", "Tomato", "Salat", "Tomato", "Bread"],
    ["Bread", "Tomato", "Salat", "Salat", "Meat", "Bread"],
    ["Bread", "Bread", "Bread", "Bread", "Bread"],
    ["Bread", "Meat", "Bread", "Meat", "Bread"],
    ["Bread", "Meat", "Tomato", "Bread", "Meat", "Bread"],
    ["Bread", "Meat", "Tomato", "Salat", "Meat", "Bread"]
];

function startGame() {
    restartOrder();
    playerOrder = [];
    const randomIndex = Math.floor(Math.random() * BURGER_RECIPES.length);
    CORRECT_ORDER = BURGER_RECIPES[randomIndex];
    const orderDisplay = document.getElementById('correct-order-display');
    orderDisplay.innerHTML = '<ul>' + CORRECT_ORDER.map(item => `<li>${item}</li>`).join('') + '</ul>';
    document.getElementById('tutorial-modal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('tutorial-modal').style.display = 'none';
        gameActive = true;
        alert('Game Started! Build the burger in the correct order.');
    }, 5000);
}

const totalMoneySpan = document.getElementById("totalMoney");
if (remainingMoney < 1000) {
    totalMoneySpan.classList.add("low-money");
} else {
    totalMoneySpan.classList.remove("low-money");
}


if(correctString === playerString) {
    resultDiv.textContent = 'Good order!';
    resultDiv.classList.add('success');
    setTimeout(() => resultDiv.classList.remove('success'), 500);
 } else {
    resultDiv.textContent = 'Wrong order!';
    resultDiv.classList.add('error');
}


const START_TIME = 30; // 30 másodperc
let timeLeft = START_TIME;
let timeInterval = null;

function startTimer() {
    timeLeft = START_TIME;
    const timeDisplay = document.getElementById('time-remaining');
    if (temerInterval) {
        clearInterval(timeInterval);
    }

    timeInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 10) {
           timerDisplay.classList.add('time-low');
        } else {
           timerDisplay.classList.remove('time-low');
        }
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerFailed();
        }
    }, 1000);
}

    