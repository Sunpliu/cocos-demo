// 登录表单处理
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    
    // 表单提交处理
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 验证输入
        if (!username) {
            showAlert('请输入用户名', 'warning');
            usernameInput.focus();
            return;
        }
        
        if (!password) {
            showAlert('请输入密码', 'warning');
            passwordInput.focus();
            return;
        }
        
        // 禁用登录按钮，防止重复提交
        loginBtn.disabled = true;
        loginBtn.textContent = '登录中...';
        
        // 模拟登录验证（这里可以替换为实际的登录API调用）
        setTimeout(() => {
            if (validateLogin(username, password)) {
                showAlert('登录成功！正在跳转...', 'success');
                
                // 延迟跳转，让用户看到成功提示
                setTimeout(() => {
                    window.location.href = '../bookmark/index.html';
                }, 1500);
            } else {
                showAlert('用户名或密码错误，请重试', 'error');
                
                // 重新启用登录按钮
                loginBtn.disabled = false;
                loginBtn.textContent = '登录';
                
                // 清空密码输入框
                passwordInput.value = '';
                passwordInput.focus();
            }
        }, 1000);
    });
    
    // 输入框回车键处理
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

// 简单的登录验证函数（实际项目中应该调用后端API）
function validateLogin(username, password) {
    // 这里可以添加实际的登录验证逻辑
    // 目前使用简单的演示账户
    const validAccounts = {
        'admin': 'admin123',
        'user': 'user123',
        'test': 'test123'
    };
    
    return validAccounts[username] === password;
}

// 显示提示弹窗
function showAlert(message, type = 'info') {
    const modal = document.getElementById('alertModal');
    const icon = document.getElementById('alertIcon');
    const messageEl = document.getElementById('alertMessage');
    const modalContent = modal.querySelector('.alert-modal-content');
    
    // 设置图标和样式
    const alertTypes = {
        'success': { icon: '✅', class: 'alert-success' },
        'error': { icon: '❌', class: 'alert-error' },
        'warning': { icon: '⚠️', class: 'alert-warning' },
        'info': { icon: 'ℹ️', class: 'alert-info' }
    };
    
    const alertConfig = alertTypes[type] || alertTypes['info'];
    
    // 清除之前的样式类
    modalContent.className = 'modal-content alert-modal-content';
    modalContent.classList.add(alertConfig.class);
    
    icon.textContent = alertConfig.icon;
    messageEl.textContent = message;
    
    // 显示弹窗
    modal.style.display = 'flex';
    
    // 自动关闭成功提示
    if (type === 'success') {
        setTimeout(() => {
            closeAlert();
        }, 2000);
    }
}

// 关闭提示弹窗
function closeAlert() {
    const modal = document.getElementById('alertModal');
    modal.style.display = 'none';
}

// 点击弹窗外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('alertModal');
    if (e.target === modal) {
        closeAlert();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAlert();
    }
});