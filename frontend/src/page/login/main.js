// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 检查现有登录状态
    checkExistingLogin();

    // 获取表单元素
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // 表单提交处理
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 验证输入
        if (!username) {
            layer.alert('请输入用户名');

            usernameInput.focus();
            return;
        }

        if (!password) {
            layer.alert('请输入密码');

            passwordInput.focus();
            return;
        }

        // 禁用登录按钮，防止重复提交
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.disabled = true;
        loginBtn.textContent = '登录中...';

        // 调用登录API
        performLogin(username, password);
    });

    // 输入框回车键处理
    usernameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

// 检查现有登录状态
function checkExistingLogin() {
    if (AuthUtils.session.isLoggedIn()) {
        // 已登录，跳转到书签页面
        window.location.href = '../bookmark/index.html';
    }
}

// 执行登录
async function performLogin(username, password) {
    try {
        // 使用 AuthUtils 的 HTTP 工具发送请求
        const response = await AuthUtils.http.post(API_CONFIG.USER.LOGIN, {
            name: username,
            password: password,
        });

        // 恢复登录按钮状态
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.disabled = false;
        loginBtn.textContent = '登录';

        if (response.success) {
            // 登录成功，保存 token 和用户信息
            AuthUtils.token.set(response.token);
            AuthUtils.user.set(response.data);

            // 显示成功消息
            layer.alert('登录成功，正在加载数据...');

            // 延迟跳转到书签页面
            setTimeout(() => {
                window.location.href = '../bookmark/index.html';
            }, 1000);
        } else {
            // 登录失败，显示错误消息
            layer.alert(response.message || '登录失败');
        }
    } catch (error) {
        console.error('登录请求错误:', error);

        // 恢复登录按钮状态
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.disabled = false;
        loginBtn.textContent = '登录';

        // 显示错误消息
        layer.alert('网络错误，请稍后重试');
    }
}
