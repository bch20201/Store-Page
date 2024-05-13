
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Project Zomboid',
        image: '1.jpg',
        price: 500
    },
    {
        id: 2,
        name: 'Cities Skylines 2',
        image: '2.jpg',
        price: 1200
    },
    {
        id: 3,
        name: 'Combat Master',
        image: '3.jpg',
        price: 300
    },
    {
        id: 4,
        name: 'State of Decay',
        image: '4.jpg',
        price: 600
    },
    {
        id: 5,
        name: 'Valheim',
        image: '5.jpg',
        price: 550
    },
    {
        id: 6,
        name: 'Outriders',
        image: '6.jpg',
        price: 1400
    }
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function generateReceiptContent() {
    let receiptContent = `
        <h1>Receipt</h1>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Items: </p>
        <ul>`;
    
    let totalItems = 0;
    let totalPrice = 0;
    listCards.forEach((item) => {
        totalItems += item.quantity;
        receiptContent += `
            <li>
                <span>${item.name}</span>
                <span>Quantity: (${item.quantity})</span>
                <span>₱${item.price.toLocaleString()}</span>
            </li>`;
        totalPrice += item.price;
    });

    receiptContent += `
        </ul>
        <p>Total Items: (${totalItems})</p>
        <p>Total: ₱${totalPrice.toLocaleString()}</p>`;

    return receiptContent;
}

document.querySelector('.printReceipt').addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print Receipt</title>
            <style>
                /* Add your receipt styling here */
            </style>
        </head>
        <body>
            ${generateReceiptContent()}
            <script>
                // Print the receipt automatically when the window is loaded
                window.onload = function() {
                    window.print();
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
});