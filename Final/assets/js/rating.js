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
  
//打開商品評價
function view(productName) {
        const modal = document.getElementById("reviewModal");
        document.getElementById("reviewProductTitle").innerText = productName;
    
        // 顯示該商品的評論
        const reviewContainer = document.getElementById("reviewContainer");
        reviewContainer.innerHTML = ""; // 清空之前的評論
        const reviews = productReviews[productName] || [];
        if (reviews.length > 0) {
            reviews.forEach((review) => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");
            reviewDiv.innerHTML = `<strong>${review.rating} 星</strong><p>${review.comment}</p>`;
            reviewContainer.appendChild(reviewDiv);
            });
        } else {
            reviewContainer.innerHTML = "<p>尚無評論，成為第一個評論的人！</p>";
        }

        modal.style.display = "block";
    }
  
// 關閉商品評價
function closeView() {
        const modal = document.getElementById("reviewModal");
        modal.style.display = "none";
        }

function submitReview() {
        const productName = document.getElementById("reviewProductTitle").innerText;
        const reviewComment = document.getElementById("reviewComment").value;
        
        // 取得選中的評分值
        const ratingElements = document.getElementsByName("rating");
        let reviewRating = 0;
        for (const rating of ratingElements) {
            if (rating.checked) {
            reviewRating = parseInt(rating.value);
            break;
            }
        }
        
        if (!reviewComment.trim()) {
            alert("請撰寫評論！");
            return;
        }
        
        if (reviewRating === 0) {
            alert("請選擇評分！");
            return;
        }
        
        // 清空輸入欄位
        document.getElementById("reviewComment").value = "";
        ratingElements.forEach((rating) => (rating.checked = false));
        
        alert("感謝評論！");
    }
  