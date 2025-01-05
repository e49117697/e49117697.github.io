document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page"); // 統一選取所有頁面
    const navItems = document.querySelectorAll("nav ul li"); // 導覽列項目

    // 切換頁面
    function changePage(targetId) {
        pages.forEach(page => {
            page.style.display = page.id === targetId ? "block" : "none";
        });
    }

    navItems.forEach(navItem => {
        navItem.addEventListener("click", () => {
            const targetId = navItem.dataset.target;
            if (targetId) changePage(targetId);
        });
    });

    // 預設顯示首頁
    changePage("home");

    // 顯示其商品類別
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (product.dataset.category === category || category === 'all') {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    
    document.querySelectorAll('.dropdown-menu li').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category || 'all';
            filterProducts(category);
        });
    });

    // 顯示動態廣告
    let slideIndex = 0;
    let timer = null;

    function showSlides(n) {
        const slides = document.getElementsByClassName('mySlides');

        if (n >= slides.length) {
            slideIndex = 0;
        }
        if (n < 0) {
            slideIndex = slides.length - 1;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slides[slideIndex].style.display = 'block';
    }

    function autoplay() {
        slideIndex++;
        showSlides(slideIndex);
        timer = setTimeout(autoplay, 3000);
    }

    function plusSlides(n) {
        clearTimeout(timer);
        showSlides(slideIndex += n);
        autoplay();
    }

    document.querySelector('.prev').addEventListener('click', () => plusSlides(1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));

    autoplay();
});



