// 1. Elements ko select karo
const buyBtn = document.querySelector('.product-btns button'); 
const orderModal = document.getElementById('orderModal');
const successModal = document.getElementById('successModal');
const orderForm = document.getElementById('orderForm');
const modalSummary = document.getElementById('modal-product-info');

buyBtn.addEventListener('click', () => {
    let rawPrice = pprice.innerText.replace('$', '');
    let price = parseFloat(rawPrice);
    
    let tax = price * 0.02;
    let total = price + tax;

    // Modal mein product details aur price inject karo
    modalSummary.innerHTML = `
        <div class="order-summary">
            <p><strong>Product:</strong> ${ptittle.innerText}</p>
            <p><strong>Price:</strong> $${price}</p>
            <p><strong>Tax (2%):</strong> $${tax.toFixed(2)}</p>
            <hr>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        </div>
    `;

    orderModal.classList.add('active');
});

// 3. Form Submit par Success Modal dikhao
orderForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    
    orderModal.classList.remove('active'); // Purana modal band
    successModal.classList.add('active');  // Success modal chalu
});