// 从本地存储获取书签数据，如果没有则使用空数组
let bookmarks = [];

// 全局变量
let searchEngine;
let searchInput;
let currentResults = [];
let selectedIndex = -1;
let displayStartIndex = 0;
let currentEditingId = null;
let currentDeletingId = null;

// 从本地存储获取书签数据
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

    // 从服务器获取书签数据
    var loadIndex = layer.load(0, { shade: false });
    try {
        const response = await AuthUtils.http.get(API_CONFIG.BOOKMARK.ALL);
        if (response.success) {
            // 重新初始化搜索引擎
            bookmarks = response.data;
            console.log('从服务器加载了', bookmarks.length, '个书签');
            initializeSearchEngine();
        } else {
            layer.alert('获取书签数据失败: ' + (response.message || '未知错误'));
            // 未登录，跳转到登录页面
            AuthUtils.session.logout();
        }
    } catch (error) {
        console.error('获取书签数据错误:', error);
        layer.alert('网络错误，无法获取书签数据');
        // 未登录，跳转到登录页面
        AuthUtils.session.logout();
    } finally {
        // 确保加载层关闭
        setTimeout(function () {
            layer.close(loadIndex);
        }, 1000);
    }
});

// 搜索模块
class BookmarkSearchEngine {
    constructor(bookmarks) {
        this.bookmarks = bookmarks;
        this.selectedIndex = -1;
        this.maxDisplayItems = 50; // 最多显示 50 条数据
    }

    // 搜索书签
    search(query) {
        // 如果没有查询内容，返回所有书签
        if (!query.trim()) {
            return this.bookmarks.map((bookmark) => ({
                ...bookmark,
                score: 0,
                highlights: {
                    title: bookmark.title,
                    tags: bookmark.tags,
                    desc: bookmark.desc,
                    url: bookmark.url,
                },
            }));
        }

        const keywords = query
            .toLowerCase()
            .split(/\s+/)
            .filter((k) => k.length > 0);
        const results = [];

        this.bookmarks.forEach((bookmark) => {
            const score = this.calculateScore(bookmark, keywords);
            if (score > 0) {
                results.push({
                    ...bookmark,
                    score,
                    highlights: this.getHighlights(bookmark, keywords),
                });
            }
        });

        // 按分数排序
        return results.sort((a, b) => b.score - a.score);
    }

    // 计算匹配分数
    calculateScore(bookmark, keywords) {
        let totalScore = 0;

        keywords.forEach((keyword) => {
            // 标签完美匹配 (权重: 300)
            const perfectTagMatch = bookmark.tags.some((tag) => tag.toLowerCase() === keyword);
            if (perfectTagMatch) {
                totalScore += 300;
            } else {
                // 标签部分匹配 (权重: 50)
                const tagMatches = bookmark.tags.filter((tag) => tag.toLowerCase().includes(keyword)).length;
                totalScore += tagMatches * 50;
            }

            // 标题匹配 (权重: 30)
            if (bookmark.title.toLowerCase().includes(keyword)) {
                totalScore += 30;
                // 完全匹配额外加分
                if (bookmark.title.toLowerCase() === keyword) {
                    totalScore += 30;
                }
            }

            // URL匹配 (权重: 10)
            if (bookmark.url.toLowerCase().includes(keyword)) {
                totalScore += 10;
            }
        });

        return totalScore;
    }

    // 获取高亮信息
    getHighlights(bookmark, keywords) {
        return {
            title: this.highlightText(bookmark.title, keywords),
            tags: bookmark.tags,
            desc: bookmark.desc,
            url: this.highlightText(bookmark.url, keywords),
        };
    }

    // 高亮文本
    highlightText(text, keywords) {
        let result = text;
        keywords.forEach((keyword) => {
            // 使用负向前瞻和负向后顾，避免匹配HTML标签内的内容
            const regex = new RegExp(`(?<!<[^>]*)(${this.escapeRegExp(keyword)})(?![^<]*>)`, 'gi');
            result = result.replace(regex, '<span class="highlight">$1</span>');
        });
        return result;
    }

    // 转义正则表达式特殊字符
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// 初始化搜索引擎和UI
function initializeSearchEngine() {
    // 初始化搜索引擎
    searchEngine = new BookmarkSearchEngine(bookmarks);
    searchInput = document.getElementById('searchInput');

    // 事件监听
    searchInput.addEventListener('input', (e) => {
        debouncedHandleSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentResults.length > 0) {
                    // 实现循环选择
                    selectedIndex = selectedIndex < currentResults.length - 1 ? selectedIndex + 1 : 0;
                    updateSelection();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentResults.length > 0) {
                    // 实现循环选择
                    selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : currentResults.length - 1;
                    updateSelection();
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && currentResults[selectedIndex]) {
                    openBookmark(currentResults[selectedIndex].url, currentResults[selectedIndex].desc);
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

    // 初始显示所有书签
    const initialResults = searchEngine.search('');
    renderResults(initialResults);
}

// 替换所有原生alert调用
// 修改书签 - 更新以支持书签类型
function editBookmark(id) {
    const bookmark = bookmarks.find((b) => b.id === id);
    if (!bookmark) {
        layer.alert('书签不存在！');
        return;
    }

    currentEditingId = id;

    // 填充表单数据
    document.getElementById('editTitle').value = bookmark.title;
    document.getElementById('editUrl').value = bookmark.url;
    document.getElementById('editDescription').value = bookmark.desc;
    document.getElementById('editTags').value = bookmark.tags.join(', ');
    document.getElementById('bookmarkType').value = bookmark.type;

    // 显示书签类型选择（编辑模式下隐藏）
    document.getElementById('bookmarkTypeSelection').style.display = 'none';

    // 显示弹窗
    document.getElementById('editModal').style.display = 'flex';
}

// 新增书签 - 更新以支持书签类型选择
function addBookmark() {
    currentEditingId = null; // 设置为null表示新增模式

    // 清空表单数据
    document.getElementById('editTitle').value = '';
    document.getElementById('editUrl').value = '';
    document.getElementById('editDescription').value = '';
    document.getElementById('editTags').value = '';
    document.getElementById('bookmarkType').value = '2'; // 默认个人书签

    // 检查用户是否是管理员
    const isAdmin = AuthUtils.user.isAdmin();

    // 显示书签类型选择（新增模式下显示）
    document.getElementById('bookmarkTypeSelection').style.display = isAdmin ? 'block' : 'none';

    // 修改弹窗标题
    document.querySelector('#editModal .modal-header').textContent = '新增书签';

    // 显示弹窗
    document.getElementById('editModal').style.display = 'flex';
}

// 保存书签 - 更新以支持书签类型和服务器交互
async function saveBookmark() {
    const title = document.getElementById('editTitle').value.trim();
    const url = document.getElementById('editUrl').value.trim();
    const desc = document.getElementById('editDescription').value.trim();
    const tagsInput = document.getElementById('editTags').value.trim();

    // 检查用户是否是管理员
    const isAdmin = AuthUtils.user.isAdmin();

    // 如果是管理员，使用选择的类型；否则只能是个人书签
    const type = isAdmin ? parseInt(document.getElementById('bookmarkType').value) : 2;

    // 验证必填字段
    if (!title) {
        layer.alert('请输入书签标题！');
        return;
    }

    if (!url) {
        layer.alert('请输入网址！');
        return;
    }

    // 个人书签，需要验证 url 的格式
    if (type === 2) {
        try {
            new URL(url);
        } catch {
            layer.alert('请输入有效的网址！');
            return;
        }
    }

    // 处理标签
    const tags = tagsInput
        ? tagsInput
              // 支持 中文逗号+英文逗号+空格 作为分隔
              .replace(/[，, ]/g, ',')
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag)
        : [];

    // 显示加载层
    var loadIndex = layer.load(0, { shade: false });

    try {
        if (currentEditingId === null) {
            // 新增模式
            const bookmarkData = {
                title,
                url,
                desc,
                tags,
            };

            // 根据类型选择不同的API
            const apiEndpoint = type === 1 ? API_CONFIG.BOOKMARK.PUBLIC.CREATE : API_CONFIG.BOOKMARK.PERSONAL.CREATE;
            const response = await AuthUtils.http.post(apiEndpoint, bookmarkData);

            if (response.success) {
                // 将新书签添加到内存中
                const newBookmark = {
                    ...response.data,
                    id: response.data._id,
                    type: type,
                };
                bookmarks.push(newBookmark);
                layer.alert('书签添加成功！');
            } else {
                layer.alert('添加失败: ' + (response.message || '未知错误'));
                return;
            }
        } else {
            // 编辑模式
            const bookmark = bookmarks.find((b) => b.id === currentEditingId);
            if (!bookmark) {
                layer.alert('书签不存在！');
                return;
            }

            const bookmarkData = {
                title,
                url,
                desc,
                tags,
            };

            // 根据书签类型选择不同的API
            let apiEndpoint;
            if (bookmark.type === 1) {
                apiEndpoint = API_CONFIG.BOOKMARK.PUBLIC.UPDATE + currentEditingId;
            } else {
                apiEndpoint = API_CONFIG.BOOKMARK.PERSONAL.UPDATE + currentEditingId;
            }

            const response = await AuthUtils.http.put(apiEndpoint, bookmarkData);

            if (response.success) {
                // 更新内存中的书签
                bookmark.title = title;
                bookmark.url = url;
                bookmark.desc = desc;
                bookmark.tags = tags;
                layer.alert('书签更新成功！');
            } else {
                layer.alert('更新失败: ' + (response.message || '未知错误'));
                return;
            }
        }

        // 关闭弹窗
        closeEditModal();

        // 重新搜索以更新显示
        handleSearch(searchInput.value);
    } catch (error) {
        console.error('保存书签错误:', error);
        layer.alert('网络错误，请稍后重试');
    } finally {
        // 关闭加载层
        layer.close(loadIndex);
    }
}

// 登出功能
function logout() {
    layer.confirm(
        '确定要登出吗？',
        {
            btn: ['确定', '关闭'], //按钮
        },
        function () {
            AuthUtils.session.logout();
        },
        function () {}
    );
}

// 删除书签
function deleteBookmark(id) {
    currentDeletingId = id;
    document.getElementById('deletePassword').value = '';
    document.getElementById('deleteModal').style.display = 'flex';
}

// 关闭删除弹窗
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    currentDeletingId = null;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 搜索处理函数 - 改为全局函数
function handleSearch(query) {
    const results = searchEngine.search(query);
    renderResults(results);
}

// 使用防抖包装handleSearch
const debouncedHandleSearch = debounce(handleSearch, 150);

// 渲染搜索结果
function renderResults(results) {
    const searchResults = document.getElementById('searchResults');
    const searchStats = document.getElementById('searchStats');

    currentResults = results;
    selectedIndex = -1;
    displayStartIndex = 0;

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">未找到匹配的书签</div>';
        searchStats.textContent = '共 0 个结果';
        return;
    }

    searchStats.textContent = `共 ${results.length} 个结果`;
    renderVisibleItems();
}

// 渲染可见的条目
function renderVisibleItems() {
    const searchResults = document.getElementById('searchResults');
    const maxItems = searchEngine.maxDisplayItems;
    const endIndex = Math.min(displayStartIndex + maxItems, currentResults.length);
    const visibleResults = currentResults.slice(displayStartIndex, endIndex);

    // 检查用户是否是管理员
    const isAdmin = AuthUtils.user.isAdmin();

    const html = visibleResults
        .map((item, index) => {
            const actualIndex = displayStartIndex + index;
            const typeText = item.type === 1 ? '公共' : '个人';
            const typeClass = item.type === 1 ? 'type-public' : 'type-personal';
            // 为标签创建单独的HTML，避免嵌套问题
            const tagsHtml = item.highlights.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');

            // 根据书签类型和用户权限决定是否显示修改和删除按钮
            // 公共书签只有管理员可以修改和删除
            // 个人书签所有用户都可以修改和删除
            const showActions = item.type === 2 || isAdmin;

            return `
                <div class="search-item" data-index="${actualIndex}">
                    <div class="item-content" onclick="openBookmark('${item.url}', ${item.desc})" style="cursor: pointer;">
                        <div class="item-title">
                            ${item.highlights.title}
                            <span class="bookmark-type ${typeClass}">${typeText}</span>
                        </div>
                        <div class="item-tags">
                            ${tagsHtml}
                        </div>
                        <div class="item-description">${item.highlights.desc}</div>
                        <div class="item-url">${item.highlights.url}</div>
                    </div>
                    ${
                        showActions
                            ? `
                    <div class="item-actions">
                        <button class="action-btn edit-btn" onclick="editBookmark('${item.id}')">修改</button>
                        <button class="action-btn delete-btn" onclick="deleteBookmark('${item.id}')">删除</button>
                    </div>
                    `
                            : ''
                    }
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
        const actualIndex = displayStartIndex + index;
        item.classList.toggle('selected', actualIndex === selectedIndex);
    });

    // 确保选中项在可见范围内
    if (selectedIndex >= 0) {
        const maxItems = searchEngine.maxDisplayItems;
        if (selectedIndex < displayStartIndex) {
            displayStartIndex = selectedIndex;
            renderVisibleItems();
        } else if (selectedIndex >= displayStartIndex + maxItems) {
            displayStartIndex = selectedIndex - maxItems + 1;
            renderVisibleItems();
        }
    }
}

// 打开书签
function openBookmark(url, desc) {
    // 如果 url 不是 http 开头的，直接重定向页面
    if (!url.startsWith('http')) {
        // 获取 url 为 ../workorder/index.html 的数据
        if (url === '../workorder/index.html') {
            // 存在本地缓存
            localStorage.setItem('workorderDesc', JSON.stringify(desc));
        }
        window.location.href = url;
        return;
    }
    window.open(url, '_blank');
}

// 确认删除 - 更新以支持服务器交互
async function confirmDelete() {
    const password = document.getElementById('deletePassword').value;
    if (password !== '123456') {
        layer.alert('删除口令错误！');
        return;
    }

    const bookmark = bookmarks.find((b) => b.id === currentDeletingId);
    if (!bookmark) {
        layer.alert('书签不存在！');
        closeDeleteModal();
        return;
    }

    // 显示加载层
    var loadIndex = layer.load(0, { shade: false });

    try {
        // 根据书签类型选择不同的API
        let apiEndpoint;
        if (bookmark.type === 1) {
            apiEndpoint = API_CONFIG.BOOKMARK.PUBLIC.DELETE + currentDeletingId;
        } else {
            apiEndpoint = API_CONFIG.BOOKMARK.PERSONAL.DELETE + currentDeletingId;
        }

        const response = await AuthUtils.http.delete(apiEndpoint);

        if (response.success) {
            // 从内存中删除书签
            const index = bookmarks.findIndex((b) => b.id === currentDeletingId);
            if (index !== -1) {
                bookmarks.splice(index, 1);
                layer.alert('书签已删除！');
            }
        } else {
            layer.alert('删除失败: ' + (response.message || '未知错误'));
            return;
        }

        closeDeleteModal();
        // 重新搜索以更新显示
        handleSearch(searchInput.value);
    } catch (error) {
        console.error('删除书签错误:', error);
        layer.alert('网络错误，请稍后重试');
    } finally {
        // 关闭加载层
        layer.close(loadIndex);
    }
}

// 关闭编辑弹窗函数
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditingId = null;

    // 清空表单
    document.getElementById('editTitle').value = '';
    document.getElementById('editUrl').value = '';
    document.getElementById('editDescription').value = '';
    document.getElementById('editTags').value = '';
    document.getElementById('bookmarkType').value = '2';

    // 隐藏书签类型选择
    document.getElementById('bookmarkTypeSelection').style.display = 'none';

    // 恢复弹窗标题为编辑模式
    document.querySelector('#editModal .modal-header').textContent = '编辑书签';
}

// 新增按钮事件监听
document.getElementById('addBtn').addEventListener('click', addBookmark);

// 登出按钮事件监听
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', logout);
}
