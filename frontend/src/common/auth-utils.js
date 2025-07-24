/**
 * 认证工具类 - 公共JS文件
 * 提供登录状态管理、token操作等功能
 */

// 认证工具类
window.AuthUtils = {
    // Token 相关操作
    token: {
        // 获取认证token
        get() {
            return localStorage.getItem('authToken');
        },

        // 设置认证token
        set(token) {
            if (!token) {
                console.warn('尝试设置空token');
                return false;
            }
            localStorage.setItem('authToken', token);
            return true;
        },

        // 清除token
        clear() {
            localStorage.removeItem('authToken');
        },

        // 检查token是否存在
        exists() {
            return !!this.get();
        },
    },

    // 用户信息相关操作
    user: {
        // 获取用户信息
        get() {
            try {
                const userInfo = localStorage.getItem('userInfo');
                return userInfo ? JSON.parse(userInfo) : null;
            } catch (error) {
                console.error('解析用户信息失败:', error);
                return null;
            }
        },

        // 设置用户信息
        set(userInfo) {
            if (!userInfo) {
                console.warn('尝试设置空用户信息');
                return false;
            }
            try {
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                return true;
            } catch (error) {
                console.error('保存用户信息失败:', error);
                return false;
            }
        },

        // 清除用户信息
        clear() {
            localStorage.removeItem('userInfo');
        },

        // 检查是否是管理员
        isAdmin() {
            const user = this.get();
            return user && user.permission === 1;
        },
    },

    // 登录状态相关操作
    session: {
        // 检查是否已登录
        isLoggedIn() {
            return window.AuthUtils.token.exists() && window.AuthUtils.user.get() !== null;
        },

        // 执行登出操作
        logout() {
            window.AuthUtils.token.clear();
            window.AuthUtils.user.clear();
            // 重定向到登录页
            window.location.href = '../login/index.html';
        },
    },

    // HTTP 请求工具
    http: {
        // 获取带认证的请求头
        getAuthHeaders() {
            const token = window.AuthUtils.token.get();
            return {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            };
        },

        // 发送 GET 请求
        async get(url) {
            try {
                const response = await fetch(window.API_CONFIG.BASE_URL + url, {
                    method: 'GET',
                    headers: this.getAuthHeaders(),
                });
                return await response.json();
            } catch (error) {
                console.error('GET 请求失败:', error);
                return { success: false, message: '网络请求失败' };
            }
        },

        // 发送 POST 请求
        async post(url, data) {
            try {
                const response = await fetch(window.API_CONFIG.BASE_URL + url, {
                    method: 'POST',
                    headers: this.getAuthHeaders(),
                    body: JSON.stringify(data),
                });
                return await response.json();
            } catch (error) {
                console.error('POST 请求失败:', error);
                return { success: false, message: '网络请求失败' };
            }
        },

        // 发送 PUT 请求
        async put(url, data) {
            try {
                const response = await fetch(window.API_CONFIG.BASE_URL + url, {
                    method: 'PUT',
                    headers: this.getAuthHeaders(),
                    body: JSON.stringify(data),
                });
                return await response.json();
            } catch (error) {
                console.error('PUT 请求失败:', error);
                return { success: false, message: '网络请求失败' };
            }
        },

        // 发送 DELETE 请求
        async delete(url) {
            try {
                const response = await fetch(window.API_CONFIG.BASE_URL + url, {
                    method: 'DELETE',
                    headers: this.getAuthHeaders(),
                });
                return await response.json();
            } catch (error) {
                console.error('DELETE 请求失败:', error);
                return { success: false, message: '网络请求失败' };
            }
        },
    },
};
