let shoppingBag = [];
let grandTotal = 0;

function addItemToBag(itemName, itemPrice, itemQty, itemImg) { 
    itemQty = parseInt(itemQty); 
    let product = { name: itemName, price: itemPrice, quantity: itemQty, image: itemImg }; // I am adding an item to the shopping bag
    const existingProductIndex = shoppingBag.findIndex(bagItem => bagItem.name === itemName);
    if (existingProductIndex > -1) {
        shoppingBag[existingProductIndex].quantity += itemQty;
    } else {
        shoppingBag.push(product);
    }
    refreshBag();
}

function refreshBag() { 
    const bagContainer = document.getElementById('bagContents');  // Here I am updating the shopping bag and the total cost
    bagContainer.innerHTML = '';
    grandTotal = 0;
    shoppingBag.forEach((product, idx) => {
        bagContainer.innerHTML += `
            <div class="item-container d-flex justify-content-between align-items-center my-2">
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;" class="mr-2">
                <p>${product.name} - R${product.price.toFixed(2)}</p>
                <div>
                    <input type="number" value="${product.quantity}" min="1" id="qty-${idx}" 
                        style="width: 50px; text-align: center;" onchange="modifyProductQty(${idx})">
                    <button class="btn btn-danger btn-sm ml-2" onclick="removeProductFromBag(${idx})">Remove</button>
                </div>
            </div>`;
        grandTotal += product.price * product.quantity;
    });
    document.getElementById('grandTotalDisplay').innerText = `Total: R${grandTotal.toFixed(2)}`;
}

function modifyProductQty(index) { 
    const updatedQty = parseInt(document.getElementById(`qty-${index}`).value); // I am changing the quantity of an item in the bag
    if (updatedQty > 0) {
        shoppingBag[index].quantity = updatedQty;
    } else {
        shoppingBag[index].quantity = 1;
    }
    refreshBag();
}

function removeProductFromBag(index) { 
    shoppingBag.splice(index, 1); // I am removing an item from the cart here
    refreshBag();
}

function displayBag() { 
    document.getElementById('productsPage').style.display = 'none'; // This is the shopping page settings to hide it
    document.getElementById('shoppingBagPage').style.display = 'block';
    refreshBag();
}

function displayProducts() { 
    document.getElementById('shoppingBagPage').style.display = 'none'; // This is the shopping page being shown
    document.getElementById('productsPage').style.display = 'block';
}