document.addEventListener("DOMContentLoaded", () => {
    let registeredUsers = []; // 儲存已註冊的帳號
    let loggedInUser = null;  // 儲存登入的使用者資料

    // 登入功能
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 檢查是否已註冊
        const user = registeredUsers.find(user => user.username === username && user.password === password);
        if (user) {
            alert(`登入成功！歡迎 ${username}！`);
            loggedInUser = user; // 設定登入的使用者資料
            updateProfileModal(); // 更新會員資料
            toggleLoginState(); // 更新登入按鈕狀態
            loginModal.style.display = 'none';
        } else {
            alert('帳號或密碼錯誤，或帳號未註冊！');
        }
    });

    // 註冊功能
    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    const registerCloseBtn = document.querySelector('.register-close-btn');

    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });

    registerCloseBtn.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regUsername = document.getElementById('regUsername').value.trim();
        const regPassword = document.getElementById('regPassword').value.trim();
        const cPassword = document.getElementById('checkPassword').value.trim();

        if (cPassword != regPassword) {
            alert('密碼和確認密碼不相同!');
            return;
        }

        if (regUsername && regPassword && cPassword) {
            // 檢查是否已經註冊過
            if (registeredUsers.find(user => user.username === regUsername)) {
                alert('該帳號已經被註冊！請使用其他帳號。');
                return;
            }

            // 儲存註冊資料
            registeredUsers.push({ username: regUsername, password: regPassword });
            alert(`註冊成功！歡迎加入，${regUsername}！`);
            registerModal.style.display = 'none';
        } else {
            alert('請完整填寫表單！');
        }
    });

    // 會員資料視窗功能
    const profileBtn = document.getElementById('profileBtn'); // 會員資料按鈕
    const profileModal = document.getElementById('profileModal');
    const profileCloseBtn = document.querySelector('.profile-close-btn');

    profileBtn.addEventListener('click', () => {
        if (!loggedInUser) {
            alert('尚未登入');
        } else {
            updateProfileModal(); // 更新會員資料視窗
            profileModal.style.display = 'block';
        }
    });

    profileCloseBtn.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    // 登出功能
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        if (loggedInUser) {
            alert(`${loggedInUser.username}！您已成功登出。`);
            loggedInUser = null; // 清除登入資料
            updateProfileModal(); // 清空會員資料視窗
            toggleLoginState(); // 更新登入按鈕狀態
            profileModal.style.display = 'none';
        } 
    });

    // 更新會員資料視窗
    function updateProfileModal() {
        if (loggedInUser) {
            document.getElementById('profileUsername').innerText = loggedInUser.username;
            document.getElementById('profilePassword').innerText = loggedInUser.password;
        } else {
            document.getElementById('profileUsername').innerText = '尚未登入';
            document.getElementById('profilePassword').innerText = '尚未登入';
        }
    }

    // 切換登入/登出按鈕的狀態
    function toggleLoginState() {
        if (loggedInUser) {
            loginBtn.style.display = 'none'; // 隱藏登入按鈕
            logoutBtn.style.display = 'block'; // 顯示登出按鈕
        } else {
            loginBtn.style.display = 'block'; // 顯示登入按鈕
            logoutBtn.style.display = 'none'; // 隱藏登出按鈕
        }
    }

    // 預設狀態：顯示登入按鈕，隱藏登出按鈕
    toggleLoginState();
});
