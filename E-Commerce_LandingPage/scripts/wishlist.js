const wishlistContainer = document.querySelector('.sec7-main');

function renderWishlist() {
    // LocalStorage se data uthao
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    
    // Sirf header aur columns chhodo, baaki clear karo
    const tableHeader = `
        <h2>SaveList</h2>
        <div class="container border-bottom pb-2">
            <div class="row fw-bold">
                <div class="col-5">Products</div>
                <div class="col">Price</div>
                <div class="col">Quantity</div>
                <div class="col">Remove</div>
            </div>
        </div>`;

    let html = tableHeader;
    let subtotal = 0;

    if (wishlist.length === 0) {
        html += `<h4 class="text-center mt-5">Your SaveList is Empty</h4>`;
    } else {
        wishlist.forEach((item, i) => {
            let itemPrice = parseFloat(item.price.replace('$', ''));
            subtotal += itemPrice * item.quantity;

            html += `
            <div class="card my-3 shadow-sm p-2">
                <div class="row align-items-center text-center">
                    <div class="col-5 text-start d-flex align-items-center gap-3">
                        <img src="${item.img}" width="60" class="rounded">
                        <span>${item.title}</span>
                    </div>
                    <div class="col">${item.price}</div>
                    <div class="col d-flex justify-content-center gap-2">
                        <button class="btn btn-sm btn-outline-dark" onclick="changeQty(${i}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-dark" onclick="changeQty(${i}, 1)">+</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${i})">Remove</button>
                    </div>
                </div>
            </div>`;
        });

        let tax = subtotal * 0.02;
        let total = subtotal + tax;

        html += `
            <div class="mt-4 p-3 border-top text-end">
                <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
                <p>Tax (2%): <strong>$${tax.toFixed(2)}</strong></p>
                <h3>Total: $${total.toFixed(2)}</h3>
            </div>`;
    }

    wishlistContainer.innerHTML = html;
}

// Global Functions for Buttons
window.changeQty = function(index, change) {
    let wishlist = JSON.parse(localStorage.getItem('myWishlist'));
    if (wishlist[index].quantity + change > 0) {
        wishlist[index].quantity += change;
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        renderWishlist();
    }
};

window.removeItem = function(index) {
    let wishlist = JSON.parse(localStorage.getItem('myWishlist'));
    wishlist.splice(index, 1);
    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    renderWishlist();
};

// Page load hote hi render karo
renderWishlist();