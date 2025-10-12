const cost = {
    Bread: 10,
    Salat: 5,
    Tomato: 20,
    Meat: 50
};

let remainingMoney = 6000;
const ingredientsImages = {
    Bread: "buci_lent.png",
    Salat: "salat_1.png",
    Tomato: "tomato_1.png",
    Meat: "hambi_hus.png"
};
const ingredients = {
    Bread: 0,
    Salat: 0,
    Tomato: 0,
    Meat: 0
};
const INGREDIENT_LIST = ["Bread", "Salat", "Tomato", "Meat"];
let playerOrder = [];
let gameActive = false;
let CORRECT_ORDER = [];
const BURGER_RECIPES = [
    ["Bread", "Meat", "Tomato", "Salat", "Bread"], 
    ["Bread", "Salat", "Tomato", "Bread"],         
    ["Bread", "Meat", "Meat", "Tomato", "Bread"],  
    ["Bread", "Tomato", "Salat", "Meat", "Bread"],  
    ["Bread", "Meat", "Meat", "Meat", "Bread"],
    ["Bread", "Tomato", "Salat", "Tomato", "Bread"],
    ["Bread", "Tomato", "Salat", "Salat", "Meat", "Bread"],
    ["Bread", "Bread", "Bread", "Bread", "Bread"],
    ["Bread", "Meat", "Bread", "Meat", "Bread"],
    ["Bread", "Meat", "Tomato", "Bread", "Meat", "Bread"],
    ["Bread", "Meat", "Tomato", "Salat", "Meat", "Bread"]
];

const START_TIME = 30;
let timeLeft = START_TIME;
let timeInterval = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateMoneyDisplay() {
    const totalMoneySpan = document.getElementById("totalMoney");
    totalMoneySpan.textContent = remainingMoney;
    if (remainingMoney < 1000) {
        totalMoneySpan.classList.add("low-money");
    } else {
        totalMoneySpan.classList.remove("low-money");
    }
}

function showFloatingCost(amount) {
    const stack = document.getElementById('burger-stack');
    const floating = document.createElement('div');
    floating.textContent = `${amount > 0 ? '+' : ''}${amount} Ft`;
    floating.className = 'floating-cost';
    stack.appendChild(floating);
    setTimeout(() => {
        floating.classList.add('fade-out');
    }, 10);
    setTimeout(() => {
        floating.remove();
    }, 1000);
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
    updateMoneyDisplay();
}

function checkOrder() {
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
    }
    gameActive = false;
    const correctString = JSON.stringify(CORRECT_ORDER);
    const playerString = JSON.stringify(playerOrder);
    const resultDiv = document.getElementById('result');
    if (correctString === playerString) {
        resultDiv.textContent = 'Good order!';
        resultDiv.classList.add('success');
        setTimeout(() => resultDiv.classList.remove('success'), 1000);
    } else {
        resultDiv.textContent = 'Wrong order!';
        resultDiv.classList.add('error');
        setTimeout(() => resultDiv.classList.remove('error'), 1000);
        remainingMoney -= 200;
        showFloatingCost(-200);
        updateMoneyDisplay();
    }
}

function startGame() {
    if (gameActive && playerOrder.length > 0) {
        // Penalty új játék indításakor
        remainingMoney -= 200;
        showFloatingCost(-200);
        updateMoneyDisplay();
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
        startTimer();
    }, 5000);
}

function restartOrder() {
    for (const key in ingredients) {
        ingredients[key] = 0;
        document.getElementById(key).value = 0;
    }
    document.getElementById("totalMoney").textContent = remainingMoney;
    const stack = document.getElementById('burger-stack');
    stack.innerHTML = '';
    playerOrder = [];
    gameActive = false;
    addInitialBottomBun(stack);
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
    }
    document.getElementById('time-remaining').textContent = START_TIME;
    document.getElementById('time-remaining').classList.remove('time-low');
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '';
    resultDiv.classList.remove('success', 'error');
}

function addInitialBottomBun(stackElement) {
    if (stackElement.querySelector('.bottom-bun')) return;
    const bottomBun = document.createElement('img');
    bottomBun.src = 'buci_lent.png';
    bottomBun.className = 'bottom-bun';
    stackElement.appendChild(bottomBun);
}

document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('burger-stack');
    addInitialBottomBun(stack);
    let checkBtn = document.getElementById('check-order-btn');
    if (!checkBtn) {
        checkBtn = document.createElement('button');
        checkBtn.id = 'check-order-btn';
        checkBtn.textContent = 'check order';
        checkBtn.style.marginTop = '15px';
        checkBtn.onclick = checkOrder;
        document.body.appendChild(checkBtn);
    }
    updateMoneyDisplay();
});

function startTimer() {
    timeLeft = START_TIME;
    const timerDisplay = document.getElementById('time-remaining');
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    timerDisplay.textContent = timeLeft;
    timeInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
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

function timerFailed() {
    if (!gameActive) return;
    alert('Time is up! You lost 200 Ft.');
    remainingMoney -= 200;
    showFloatingCost(-200);
    updateMoneyDisplay();
    restartOrder();
}

