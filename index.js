const cost = {
    Bread: 10,
    Salat: 5,
    Tomato: 20,
    Meat: 50
};
const ingredients = {
    Bread: 0,
    Salat: 0,
    Tomato: 0,
    Meat: 0,
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

//     const breadQty = parseInt(document.getElementById('Bread').value); totalCost += breadQty * cost.Bread;
//     const salatQty = parseInt(document.getElementById('Salat').value); totalCost += salatQty * cost.Salat;
//     const tomatoQty = parseInt(document.getElementById('Tomato').value); totalCost += tomatoQty * cost.Tomato;
//     const meatQty = parseInt(document.getElementById('Meat').value); totalCost += meatQty * cost.Meat;

//     const remainingMoney = START_MONEY - totalCost;
//     document.getElementById('penzosszeg').textContent = `Remaining Money: ${remainingMoney}`;

// }
let zIndexCounter = 10;

function addIngredient(ingredient) {
    ingredients[ingredient]++;
    document.getElementById(ingredient).value = parseInt(document.getElementById(ingredient).value) + 1;
    remainingMoney -= cost[ingredient];
    document.getElementById("totalMoney").textContent = remainingMoney;

    

    }

    let currentBurgerHeight = 0;

    const ingredientData = {
        'Bread': { src: 'buci_lent.png', height: 40 },
        'Salat': { src: 'salat_1.png', height: 15 },
        'Tomato': { src: 'tomato_1.png', height: 20 },
        'Meat': { src: 'hambi_hus.png', height: 35 }
    };

    function restartOrder() {
        
        const stack = document.getElementById('burger-stack');
        stack.innerHTML = ''; 
        
        currentBurgerHeight = 0; 
        
        addInitialBottomBun(stack);
        
        alert('A rendelés visszaállítva! Újra kezdheted a hamburgerek építését. 🍔');
    }

    function addInitialBottomBun(stack) {
        if (stack.querySelector('buci_lent.png')) {
            return;
        }

        const bottomBun = document.createElement('img');
        bottomBun.src = 'buci_lent.png'; 
        bottomBun.alt = 'Alsó zsemle';
        bottomBun.className = 'bottom-bun'; 
        
        bottomBun.style.position = 'absolute';
        bottomBun.style.width = '100%';
        bottomBun.style.left = '0';
        bottomBun.style.bottom = '0'; 
        bottomBun.style.zIndex = 1;  
        
        stack.appendChild(bottomBun);
        
        currentBurgerHeight += 30; 
    }
    
    function addIngredient(ingredientName) {
        const data = ingredientData[ingredientName];
        if (!data) return; 

        const stack = document.getElementById('burger-stack');
        
        const ingredientImage = document.createElement('img');
        ingredientImage.src = data.src;
        ingredientImage.alt = ingredientName;
        
        ingredientImage.style.position = 'absolute';
        ingredientImage.style.width = '100%';
        ingredientImage.style.left = '0';
        
        ingredientImage.style.bottom = currentBurgerHeight + 'px';
        
        ingredientImage.style.zIndex = currentBurgerHeight + 50; 

        stack.appendChild(ingredientImage);
        
        currentBurgerHeight += data.height;

    }

    document.addEventListener('DOMContentLoaded', () => {
        const stack = document.getElementById('burger-stack');
        addInitialBottomBun(stack);
    });

     const ingredientData = {
        'Bread': { src: 'top_bun.png', height: 40 }, // A height-ot már nem használjuk
        'Salat': { src: 'salat.png', height: 15 },
        'Tomato': { src: 'tomato.png', height: 20 },
        'Meat': { src: 'meat.png', height: 35 }
    };
