let productReviews = {
        "基本T恤": [
            {rating: 5, comment: "非常舒適的材質，值得推薦！" },
            {rating: 3, comment: "容易弄髒。" }
        ],
        "休閒長褲": [
            {rating: 4, comment: "穿起來很輕鬆舒適。" }
        ],
        "毛帽": [
            {rating: 5, comment: "我是光頭，冬天帶著整個都暖到腦了。" }
        ],
        "鴨舌帽": [
            {rating: 3, comment: "照樣曬" }
        ],
        "長裙": [
            {rating: 5, comment: "推" },
            {rating: 4, comment: "如果能改大小就更好了" }
        ],
        "彈性牛仔褲": [
            {rating: 5, comment: "GOOD" }
        ],
        "流蘇圍巾": [
            {rating: 5, comment: "戴起來一點都不會覺得毛躁" },
            {rating: 5, comment: "好漂亮。" },
            {rating: 4, comment: "圍加幸福" }
        ],
        "條紋襯衫": [
            {rating: 2, comment: "怎麼穿沒幾天就破了?" },
        ]
    };
  
//打開商品視窗
function view(productName,productImg,productIntro,productPrice) {
        const modal = document.getElementById("reviewModal");
        document.getElementById("pTitle").innerText = productName;
        document.getElementById("pImg").src = productImg;
        document.getElementById("pIntro").innerText = productIntro;
        document.getElementById("pPrice").innerText = productPrice;
    
        // 顯示該商品的評論
        const reviewContainer = document.getElementById("reviewContainer");
        reviewContainer.innerHTML = ""; // 清空之前的評論
        const reviews = productReviews[productName] || [];
        if (reviews.length > 0) {
            reviews.forEach((review) => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");
            reviewDiv.innerHTML = `<p><strong>${review.rating} 星</strong> --- ${review.comment}</p>`;
            reviewContainer.appendChild(reviewDiv);
            });
        } 

        modal.style.display = "block";
    }
  
// 關閉商品視窗
function closeView() {
        const modal = document.getElementById("reviewModal");
        modal.style.display = "none";
        }

// 提交評論
function submitReview() {
    const productName = document.getElementById("pTitle").textContent;
    const comment = document.getElementById("reviewComment").value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    if (!comment || !rating) {
        alert("請完成所有欄位！");
        return;
    }

    // 新增評論
    if (!productReviews[productName]) {
        productReviews[productName] = [];
    }
    productReviews[productName].push({ rating: parseInt(rating), comment });

    // 清空輸入
    document.getElementById("reviewComment").value = "";
    document.querySelector("input[name='rating']:checked").checked = false;

    // 更新評論顯示
    view(productName, document.getElementById("pImg").src, document.getElementById("pIntro").innerText,document.getElementById("pPrice").innerText);
}
  