const productList = [
    {
        id: "one",
        name: "Cap",
        category: "accessories",
        price: 200,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/cap.webp"
    },
    {
        id: "two",
        name: "Sony Headphone",
        category: "electronic",
        price: 21000,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/headphone.webp"
    },
    {
        id: "three",
        name: "Blue Jeans",
        category: "bottomwear",
        price: 600,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/jeans1.webp"
    },
    {
        id: "four",
        name: "Redragon K552",
        category: "electronic",
        price: 2800,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/keyboard.webp"
    },
    {
        id: "five",
        name: "Puma Shorts",
        category: "bottomwear",
        price: 800,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/shorts.webp"
    },
    {
        id: "six",
        name: "Green Polo",
        category: "topwear",
        price: 600,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/tshirt1.webp"
    },
    {
        id: "seven",
        name: "Round-Neck",
        category: "topwear",
        price: 500,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/tShirt2.webp"
    },
    {
        id: "eight",
        name: "Hilfiger Watch",
        category: "accessories",
        price: 8500,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: "images/watch.webp"
    }
]

for(let i of productList) {
    let shopping = document.getElementById('shopping-section');
    let {id, name, category, price, description, image} = i;
    
    shopping.innerHTML += `
    <div class="shopping-item hide ${category}">
        <i class="ri-shopping-bag-line" onclick="addToCart('${id}')"></i>
        <img src="${image}" class="item-img" alt="image">
        <div class="detail-section">
            <h4 class="product-name">${name}</h4>
            <p>₹${price}</p>
        </div>
    </div>
    `
}


// Category Button Selection adn Product Filter 

const filterProducts = (value) => {
    let buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach( (button) => {
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })

    const elements = document.querySelectorAll('.shopping-item')

    elements.forEach((element) => {
        if(value == "all") {
            element.classList.remove('hide');
        } else if (element.classList.contains(value)) {
            element.classList.remove('hide')
        } else {
            element.classList.add('hide');
        }
    })
} 

// Search Product through Input
document.getElementById('search-btn').addEventListener('click', ()=> {

    const searchValue = document.getElementById('search_input').value;
    const elements = document.querySelectorAll('.shopping-item');
    const pName = document.querySelectorAll('.product-name');
    console.log(pName);
    pName.forEach((proName, index)=> {
        if(proName.innerText.toUpperCase().includes(searchValue.toUpperCase())) {
            elements[index].classList.remove('hide');
        } else {
            elements[index].classList.add('hide');
        }
    })
})

window.onload = () => {
    filterProducts('all');
}


// Check Item wheather its avaliable in Cart or not

let cart = [];

let addToCart = (id) => {

    if(cart.some((cartItem) => cartItem.id === id )) {
        alert('this product already exists')
    } else {
        const item = productList.find((product)=> product.id === id )
        cart.push({...item, numberOfUnit: 1});
        // console.log(cart)
    }

    updateCart();
}


const updateCart = () => {
    cartItemRender();
    subTotalrender();
}

// TotalItem and TotalPrice Function 

const subTotalEl = document.querySelector('.subtotal');
const cartIconNumber = document.getElementById('cart-quantity-number');

const subTotalrender = () => {
    subTotalEl.innerHTML =` `;
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnit;
        totalItems += item.numberOfUnit; 
    })
    subTotalEl.innerHTML += `
    Subtotal (${totalItems} items): ₹ ${totalPrice}
    `
    cartIconNumber.innerHTML = `${totalItems}`;
}

// Render HTML of the cart

const cartItems = document.getElementById('cart-items')

const cartItemRender = () => {
    cartItems.innerHTML = '';
    cart.forEach((item)=> {
        cartItems.innerHTML += `
        <div class="cart-item">
        <div class="item-image center">
            <img src="${item.image}" class="item-image-file" alt="">
            <p>${item.name}</p>
        </div>

        <div class="unit-price center">
            <span>₹ </span>${item.price}
        </div>
        
        <div class="units center">
            <div class="btn-minus" onclick="quantityChange('minus', '${item.id}')">-</div>
            <div class="number">${item.numberOfUnit}</div>
            <div class="btn-plus" onclick="quantityChange('plus','${item.id}')">+</div>
        </div>
    </div>
        `
        // console.log(item.id)
    })
}

// Button Toggle Function for Cart
const cartBtn = () => {
    let closeBtn = document.querySelector('.cart-close-btn');
    let cartIcon = document.querySelector('.cart-icon')
    let cartPanel = document.getElementById('cart')
    cartIcon.addEventListener('click', () => {
        cartPanel.classList.toggle('active');
    })
    
    closeBtn.addEventListener('click', () => {
        cartPanel.classList.toggle('active');
    })
}

cartBtn();


// Increase/Decrease Quantity

const quantityChange = (action, id) => {

    cart = cart.map((item) => {

        let oldnumberOfUnit = item.numberOfUnit;

        if(item.id === id) {
            if(action === 'minus' && oldnumberOfUnit > 1) {
                oldnumberOfUnit--;
            } else if (action === "plus") {
                oldnumberOfUnit++;
            }
        }

        return {...item,numberOfUnit: oldnumberOfUnit};
    })
    updateCart()
}

// function quantityChange(action, id) {
//     console.log(id);
//     console.log(action);
//     cart = cart.map((item) => {
//       let numberOfUnit = item.numberOfUnit;
  
//       if (item.id === id) {
//         if (action === "minus" && numberOfUnit > 1) {
//           numberOfUnit--;
//         } else if (action === "plus") {
//           numberOfUnit++;
//         }
//       }
//       return {
//         ...item,
//         numberOfUnit,
//       };
//     });

//     updateCart();
// }
