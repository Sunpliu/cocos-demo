// 全局变量
let users = [];
let currentResults = [];
let selectedIndex = -1;
let currentEditingId = null;
let currentDeletingId = null;

// 页面初始化
document.addEventListener('DOMContentLoaded', async function () {
    // 检查用户是否已登录
    if (!AuthUtils.session.isLoggedIn()) {
        layer.confirm(
            '当前登录状态已失效，请重新登录',
            {
                btn: ['确定'],
            },
            function () {
                AuthUtils.session.logout();
            }
        );
        return;
    }

    // 检查是否是管理员
    if (!AuthUtils.user.isAdmin()) {
        layer.confirm(
            '您没有权限访问用户管理页面',
            {
                btn: ['确定'],
            },
            function () {
                window.location.href = '../bookmark/index.html';
            }
        );
        return;
    }

    // 从服务器获取用户数据
    var loadIndex = layer.load(0, { shade: false });
    try {
        const response = await AuthUtils.http.get(API_CONFIG.USER.ALL);
        if (response.success) {
            users = response.data;
            console.log('从服务器加载了', users.length, '个用户');
            initializeUserManagement();
        } else {
            layer.alert('获取用户数据失败: ' + (response.message || '未知错误'));
            // 退出登录
            AuthUtils.session.logout();
        }
    } catch (error) {
        console.error('获取用户数据错误:', error);
        layer.alert('网络错误，无法获取用户数据');
    } finally {
        setTimeout(function () {
            layer.close(loadIndex);
        }, 1000);
    }
});

// 初始化用户管理
function initializeUserManagement() {
    const searchInput = document.getElementById('searchInput');

    // 事件监听
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = selectedIndex < currentResults.length - 1 ? selectedIndex + 1 : 0;
                    updateSelection();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentResults.length > 0) {
                    selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : currentResults.length - 1;
                    updateSelection();
                }
                break;
            case 'Escape':
                searchInput.blur();
                break;
        }
    });

    // 点击外部关闭
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchInput.blur();
        }
    });

    // 自动聚焦
    searchInput.focus();

    // 初始显示所有用户
    handleSearch('');

    // 绑定按钮事件
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 新增用户按钮
    document.getElementById('addBtn').addEventListener('click', addUser);

    // 返回书签按钮
    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = '../bookmark/index.html';
    });

    // 登出按钮
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

// 搜索用户
function handleSearch(query) {
    if (!query.trim()) {
        currentResults = users;
    } else {
        const keywords = query
            .toLowerCase()
            .split(/\s+/)
            .filter((k) => k.length > 0);
        currentResults = users.filter((user) => {
            return keywords.some((keyword) => user.name.toLowerCase().includes(keyword));
        });
    }

    selectedIndex = -1;
    renderResults();
}

// 渲染搜索结果
function renderResults() {
    const searchResults = document.getElementById('searchResults');
    const searchStats = document.getElementById('searchStats');

    if (currentResults.length === 0) {
        searchResults.innerHTML = '<div class="no-results">未找到匹配的用户</div>';
        searchStats.textContent = '共 0 个用户';
        return;
    }

    searchStats.textContent = `共 ${currentResults.length} 个用户`;

    const html = currentResults
        .map((user, index) => {
            const permissionText = user.permission === 1 ? '管理员' : '普通用户';
            const permissionClass = user.permission === 1 ? 'permission-admin' : 'permission-user';
            const createdDate = formatDate(user.createdAt);
            const updatedDate = formatDate(user.updatedAt);

            // 防止删除当前登录用户
            const currentUser = AuthUtils.user.get();
            const canDelete = currentUser && currentUser._id !== user._id;

            return `
                <div class="search-item" data-index="${index}">
                    <div class="item-content">
                        <div class="item-title">
                            ${user.name}
                            <span class="user-permission ${permissionClass}">${permissionText}</span>
                        </div>
                        <div class="item-info">
                            <div class="info-item">
                                <span class="icon">📅</span>
                                创建时间: ${createdDate}
                            </div>
                            <div class="info-item">
                                <span class="icon">🔄</span>
                                更新时间: ${updatedDate}
                            </div>
                            <div class="info-item">
                                <span class="icon">🆔</span>
                                ID: ${user._id}
                            </div>
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn edit-btn" onclick="editUser('${user._id}')">修改</button>
                        ${canDelete ? `<button class="action-btn delete-btn" onclick="deleteUser('${user._id}')">删除</button>` : ''}
                    </div>
                </div>
            `;
        })
        .join('');

    searchResults.innerHTML = html;
    updateSelection();
}

// 更新选中项
function updateSelection() {
    const searchResults = document.getElementById('searchResults');
    const items = searchResults.querySelectorAll('.search-item');
    items.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

// 新增用户
function addUser() {
    currentEditingId = null;

    // 清空表单数据
    document.getElementById('editName').value = '';
    document.getElementById('editPassword').value = '';
    document.getElementById('editPermission').value = '2'; // 默认普通用户

    // 修改弹窗标题
    document.querySelector('#editModal .modal-header').textContent = '新增用户';

    // 显示弹窗
    document.getElementById('editModal').style.display = 'flex';
}

// 编辑用户
function editUser(id) {
    const user = users.find((u) => u._id === id);
    if (!user) {
        layer.alert('用户不存在！');
        return;
    }

    currentEditingId = id;

    // 填充表单数据
    document.getElementById('editName').value = user.name;
    document.getElementById('editPassword').value = ''; // 密码不回显
    document.getElementById('editPermission').value = user.permission;

    // 修改弹窗标题
    document.querySelector('#editModal .modal-header').textContent = '编辑用户';

    // 显示弹窗
    document.getElementById('editModal').style.display = 'flex';
}

// 删除用户
function deleteUser(id) {
    currentDeletingId = id;
    document.getElementById('deletePassword').value = '';
    document.getElementById('deleteModal').style.display = 'flex';
}

// 保存用户
async function saveUser() {
    const name = document.getElementById('editName').value.trim();
    const password = document.getElementById('editPassword').value.trim();
    const permission = parseInt(document.getElementById('editPermission').value);

    // 验证必填字段
    if (!name) {
        layer.alert('请输入用户名！');
        return;
    }

    // 不能修改自己的权限
    const currentUser = AuthUtils.user.get();
    if (currentUser && currentUser._id === currentEditingId && permission !== currentUser.permission) {
        layer.alert('不能修改自己的权限！');
        return;
    }

    // 显示加载层
    var loadIndex = layer.load(0, { shade: false });

    try {
        const userData = {
            name,
            password,
            permission,
        };

        let response;
        if (currentEditingId === null) {
            // 新增模式
            response = await AuthUtils.http.post(API_CONFIG.USER.CREATE, userData);
        } else {
            // 编辑模式
            response = await AuthUtils.http.put(API_CONFIG.USER.UPDATE + currentEditingId, userData);
        }

        if (response.success) {
            if (currentUser && currentUser._id === currentEditingId) {
                layer.alert(
                    '修改成功，需要您重新登陆账号',
                    {
                        icon: 1,
                        shadeClose: true,
                        title: '提示',
                    },
                    function () {
                        // 退出登录
                        AuthUtils.session.logout();
                    }
                );
                return;
            }

            layer.alert(currentEditingId === null ? '用户创建成功！' : '用户更新成功！');

            // 重新获取用户列表
            const usersResponse = await AuthUtils.http.get(API_CONFIG.USER.ALL);
            if (usersResponse.success) {
                users = usersResponse.data;
                handleSearch(document.getElementById('searchInput').value);
            }

            closeEditModal();
        } else {
            layer.alert((currentEditingId === null ? '创建' : '更新') + '失败: ' + (response.message || '未知错误'));
        }
    } catch (error) {
        console.error('保存用户错误:', error);
        layer.alert('网络错误，请稍后重试');
    } finally {
        layer.close(loadIndex);
    }
}

// 确认删除
async function confirmDelete() {
    const password = document.getElementById('deletePassword').value;
    if (password !== '0123') {
        layer.alert('删除口令错误！');
        return;
    }

    const user = users.find((u) => u._id === currentDeletingId);
    if (!user) {
        layer.alert('用户不存在！');
        closeDeleteModal();
        return;
    }

    // 显示加载层
    var loadIndex = layer.load(0, { shade: false });

    try {
        const response = await AuthUtils.http.delete(API_CONFIG.USER.DELETE + currentDeletingId);

        if (response.success) {
            layer.alert('用户已删除！');

            // 重新获取用户列表
            const usersResponse = await AuthUtils.http.get(API_CONFIG.USER.ALL);
            if (usersResponse.success) {
                users = usersResponse.data;
                handleSearch(document.getElementById('searchInput').value);
            }

            closeDeleteModal();
        } else {
            layer.alert('删除失败: ' + (response.message || '未知错误'));
        }
    } catch (error) {
        console.error('删除用户错误:', error);
        layer.alert('网络错误，请稍后重试');
    } finally {
        layer.close(loadIndex);
    }
}

// 关闭编辑弹窗
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditingId = null;
}

// 关闭删除弹窗
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    currentDeletingId = null;
}

// 登出功能
function logout() {
    layer.confirm(
        '确定要登出吗？',
        {
            btn: ['确定', '关闭'],
        },
        function () {
            AuthUtils.session.logout();
        },
        function () {}
    );
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '未知';
    const date = new Date(dateString);
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0') + ' ' + String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
}
