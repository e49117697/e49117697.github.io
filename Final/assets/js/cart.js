
document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cartBtn");
    const cartModal = document.getElementById("cartModal");
  
    if (cartButton) {
      cartButton.addEventListener("click", () => {
        if (cartModal) {
          cartModal.style.display = "block"; 
        }
      });
    }

    const closeCartButton = document.querySelector(".cart-close-btn");
    if (closeCartButton) {
      closeCartButton.addEventListener("click", () => {
        if (cartModal) {
          cartModal.style.display = "none"; 
        }
      });
    }
});

let cart = []; 

// 加入購物車的功能
function addToCart(productName, price, quantityInputId) {
    const quantityInput = document.getElementById(quantityInputId);
    const quantity = parseInt(quantityInput.value);
    if (quantity <= 0 || isNaN(quantity)) {
        alert("請輸入正確的購買數量！");
        return;
    }

    // 檢查是否已經有該商品在購物車中
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity; // 更新數量
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    alert(`已將 ${quantity} 件 ${productName} 加入購物車`);
    updateCartDisplay();
}

// 商品內容視窗裡的加入購物車
function addToCartFromModal() {
    const productName = document.getElementById("pTitle").innerText;
    const price = parseInt(document.getElementById("pPrice").innerText);
    const quantityInput = document.getElementById("quantity-modal");
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0 || isNaN(quantity)) {
        alert("請輸入正確的購買數量！");
        return;
    }

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    alert(`已將 ${quantity} 件 ${productName} 加入購物車`);
    updateCartDisplay();
}

// 更新購物車顯示
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector("#cartItems tbody");
    cartItemsContainer.innerHTML = ""; // 清空購物車內容

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>NT$${item.price}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}" onchange="changeQuantity(event)">
                </td>
                <td class="subtotal">NT$${subtotal}</td>
                <td>
                    <button onclick="removeFromCart(${index})">移除</button>
                </td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });

    document.getElementById("totalAmount").innerText = `總金額：NT$${total}`;
}

// 改變購物車中商品數量
function changeQuantity(event) {
    const index = parseInt(event.target.dataset.index);
    const newQuantity = parseInt(event.target.value);

    if (newQuantity <= 0 || isNaN(newQuantity)) {
        alert("數量必須大於 0！");
        event.target.value = cart[index].quantity;
        return;
    }

    cart[index].quantity = newQuantity;
    updateCartDisplay();
}

// 移除商品
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// 購買
function buy() {
    if (cart.length === 0) {
        alert("購物車是空的，無法結帳！");
        return;
    }

    alert("購買成功！感謝您的光臨！");
    cart = []; // 清空購物車
    updateCartDisplay();
}
