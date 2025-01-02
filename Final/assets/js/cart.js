document.addEventListener("DOMContentLoaded", () => {
  // 購物車視窗功能
  const cartBtn = document.getElementById('cartBtn'); // 購物車按鈕
  const cartModal = document.getElementById('cartModal');
  const cartCloseBtn = document.querySelector('.cart-close-btn');

  cartBtn.addEventListener('click', () => {
      cartModal.style.display = 'block';
      updateCartTotal();
  });

  cartCloseBtn.addEventListener('click', () => {
      cartModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target === cartModal) {
          cartModal.style.display = 'none';
      }
  });

  // 購物車總金額計算
  function updateCartTotal() {
      const cartRows = document.querySelectorAll('#cartItems tbody tr');
      let total = 0;

      cartRows.forEach(row => {
          const price = parseFloat(row.children[1].innerText.replace('NT$', ''));
          const quantityInput = row.children[2].children[0];
          let quantity = parseInt(quantityInput.value);

          // 限制數量不得超過 10 並更新數量
          // 如果增加數量超過10，會強制改成最大值
          if (quantity > 10) {
              quantity = 10;
              quantityInput.value = 10;
              alert('每件商品的購買數量最多為 10！');
          }

          const subtotal = price * quantity;
          row.children[3].innerText = `NT$${subtotal}`;
          total += subtotal;
      });

      // 如果購物車空了，顯示「總金額：NT$0」
      if (cartRows.length === 0) {
          document.getElementById('totalAmount').innerText = '總金額：NT$0';
          return;
      }

      document.getElementById('totalAmount').innerText = `總金額：NT$${total}`;
  }

  // 確認商品數量或移除後，馬上更新總金額
  document.querySelector('#cartItems tbody').addEventListener('input', (e) => {
      if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
          updateCartTotal();
      }
  });

  document.querySelector('#cartItems tbody').addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && e.target.innerText === '移除') {
          e.target.parentElement.parentElement.remove();
          updateCartTotal();
      }
  });
});

// 加入購物車功能
function addToCart(name, price) {
  alert('成功加入購物車');
  const cartRows = document.querySelectorAll('#cartItems tbody tr');
  let existingRow = null;

  // 檢查購物車是否已有該商品
  cartRows.forEach(row => {
      if (row.children[0].innerText === name) {
          existingRow = row;
      }
  });

  if (existingRow) {
      const quantityInput = existingRow.children[2].children[0];
      quantityInput.value = parseInt(quantityInput.value) + 1;
      if (quantityInput.value > 10) {
          quantityInput.value = 10;
          alert('每件商品的購買數量最多為 10！');
      }
      updateCartTotal();
  } else {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${name}</td>
          <td>NT$${price}</td>
          <td>
              <input type="number" value="1" min="1" max="10">
          </td>
          <td>NT$${price}</td>
          <td>
              <button>移除</button>
          </td>
      `;
      document.querySelector('#cartItems tbody').appendChild(newRow);
      updateCartTotal();
  }
}

//購買功能
function buy() {
  const cart = document.querySelectorAll('#cartItems tbody tr');
  if (cart.length === 0) {
      alert('購物車是空的，無法結帳！');
      return;
  }

  // 顯示購買成功訊息
  let purchaseMessage = '感謝購買！歡迎再次訂購';
  alert(purchaseMessage);

  // 清空購物車
  document.querySelector('#cartItems tbody').innerHTML = '';
  document.getElementById('totalAmount').innerText = '總金額：NT$0';

  // 關閉購物車
  const cartModal = document.getElementById('cartModal');
  cartModal.style.display = 'none';
}
