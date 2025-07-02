// 模拟书签数据
const bookmarks = [
    {
        id: 1,
        title: 'Vue.js 官方文档',
        tags: ['前端', '框架', 'Vue', '文档'],
        url: 'https://vuejs.org/guide/',
        description: 'Vue.js 是一套用于构建用户界面的渐进式框架，易学易用，性能出色',
    },
    {
        id: 2,
        title: 'React 开发者工具',
        tags: ['前端', 'React', '调试', '工具'],
        url: 'https://react.dev/learn/react-developer-tools',
        description: 'React Developer Tools 是一个浏览器扩展，用于调试 React 组件层次结构',
    },
    {
        id: 3,
        title: 'MDN Web 文档',
        tags: ['文档', 'Web', 'HTML', 'CSS', 'JavaScript'],
        url: 'https://developer.mozilla.org/',
        description: 'MDN Web Docs 是学习 Web 技术和支持 Web 的软件的最佳资源',
    },
    {
        id: 4,
        title: 'GitHub',
        tags: ['代码托管', 'Git', '开源', '协作'],
        url: 'https://github.com',
        description: 'GitHub 是全球最大的代码托管平台，支持 Git 版本控制和协作开发',
    },
    {
        id: 5,
        title: 'Stack Overflow',
        tags: ['问答', '编程', '社区', '技术支持'],
        url: 'https://stackoverflow.com',
        description: '程序员问答社区，可以提问和回答编程相关问题',
    },
    {
        id: 6,
        title: 'VS Code 扩展市场',
        tags: ['编辑器', '扩展', 'VS Code', '工具'],
        url: 'https://marketplace.visualstudio.com/vscode',
        description: 'Visual Studio Code 的扩展市场，提供各种插件和主题',
    },
    {
        id: 7,
        title: 'Node.js 官网',
        tags: ['后端', 'JavaScript', 'Node.js', '运行时'],
        url: 'https://nodejs.org/',
        description: 'Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时环境',
    },
    {
        id: 8,
        title: 'TypeScript 手册',
        tags: ['TypeScript', '文档', '类型系统', 'JavaScript'],
        url: 'https://www.typescriptlang.org/docs/',
        description: 'TypeScript 是 JavaScript 的超集，添加了静态类型定义',
    },
    {
        id: 9,
        title: 'CSS-Tricks',
        tags: ['CSS', '前端', '教程', '技巧'],
        url: 'https://css-tricks.com/',
        description: 'CSS-Tricks 是一个关于 CSS 和前端开发的优秀资源网站',
    },
    {
        id: 10,
        title: 'Can I Use',
        tags: ['兼容性', '浏览器', 'CSS', 'HTML', 'JavaScript'],
        url: 'https://caniuse.com/',
        description: '查询 Web 技术在各个浏览器中的兼容性支持情况',
    },
    {
        id: 11,
        title: 'Figma',
        tags: ['设计', 'UI', 'UX', '协作', '原型'],
        url: 'https://www.figma.com/',
        description: '基于云端的界面设计工具，支持实时协作和原型制作',
    },
    {
        id: 12,
        title: 'Tailwind CSS',
        tags: ['CSS', '框架', '样式', '工具类'],
        url: 'https://tailwindcss.com/',
        description: '实用优先的 CSS 框架，提供低级别的实用程序类来构建自定义设计',
    },
    {
        id: 13,
        title: 'Webpack 官方文档',
        tags: ['构建工具', '打包', '模块', '前端'],
        url: 'https://webpack.js.org/',
        description: '现代 JavaScript 应用程序的静态模块打包器',
    },
    {
        id: 14,
        title: 'Docker Hub',
        tags: ['容器', 'Docker', '部署', 'DevOps'],
        url: 'https://hub.docker.com/',
        description: '世界上最大的容器镜像库和社区，用于查找和分享容器镜像',
    },
    {
        id: 15,
        title: 'Postman',
        tags: ['API', '测试', '开发工具', 'REST'],
        url: 'https://www.postman.com/',
        description: 'API 开发协作平台，简化 API 的构建、测试和文档编写',
    },
    {
        id: 16,
        title: 'CodePen',
        tags: ['在线编辑器', '前端', '演示', '分享'],
        url: 'https://codepen.io/',
        description: '前端开发者的在线代码编辑器和社交开发环境',
    },
    {
        id: 17,
        title: 'Netlify',
        tags: ['部署', '静态网站', 'JAMstack', '托管'],
        url: 'https://www.netlify.com/',
        description: '现代 Web 项目的构建、部署和托管平台',
    },
    {
        id: 18,
        title: 'MongoDB 文档',
        tags: ['数据库', 'NoSQL', 'MongoDB', '文档'],
        url: 'https://docs.mongodb.com/',
        description: 'MongoDB 是一个基于分布式文件存储的数据库',
    },
    {
        id: 19,
        title: 'Jest 测试框架',
        tags: ['测试', 'JavaScript', '单元测试', '框架'],
        url: 'https://jestjs.io/',
        description: 'JavaScript 测试框架，专注于简洁性和易用性',
    },
    {
        id: 20,
        title: 'Vercel',
        tags: ['部署', '前端', 'Next.js', '托管'],
        url: 'https://vercel.com/',
        description: '为前端框架和静态站点优化的云平台，提供最佳的开发者体验',
    },
    {
        id: 21,
        title: 'confluence',
        tags: ['文档', '需求', '策划案'],
        url: 'https://doc.topluck999.com/#all-updates',
        description: '文档策划',
    },
    {
        id: 22,
        title: 'ID1 test',
        tags: ['id1', 'test'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 test h5',
    },
    {
        id: 23,
        title: 'ID2 test',
        tags: ['id2', 'test'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 test h5',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
    {
        id: 24,
        title: 'ID1 prev',
        tags: ['id1', 'prev'],
        url: 'https://h5.idn-test.com/ct/?log=1',
        description: 'ID1 prev h5',
    },
    {
        id: 25,
        title: 'ID2 prev',
        tags: ['id2', 'prev'],
        url: 'https://h5.idn2-test.com/ct/?log=1',
        description: 'ID2 prev h5\n提示内容-----\n提示内容-----',
    },
];

class BookmarkSearchEngine {
    constructor(bookmarks) {
        this.bookmarks = bookmarks;
        this.selectedIndex = -1;
        this.maxDisplayItems = 30; // 最多显示 20 条数据
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
                    description: bookmark.description,
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
            // 标签完美匹配 (权重: 200)
            const perfectTagMatch = bookmark.tags.some((tag) => tag.toLowerCase() === keyword);
            if (perfectTagMatch) {
                totalScore += 200;
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
            description: bookmark.description,
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

// 初始化搜索引擎
const searchEngine = new BookmarkSearchEngine(bookmarks);
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchStats = document.getElementById('searchStats');

let currentResults = [];
let selectedIndex = -1;
let displayStartIndex = 0; // 当前显示的起始索引

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

// 渲染搜索结果
function renderResults(results) {
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
    const maxItems = searchEngine.maxDisplayItems;
    const endIndex = Math.min(displayStartIndex + maxItems, currentResults.length);
    const visibleResults = currentResults.slice(displayStartIndex, endIndex);

    const html = visibleResults
        .map((item, index) => {
            const actualIndex = displayStartIndex + index;
            // 为标签创建单独的HTML，避免嵌套问题
            const tagsHtml = item.highlights.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
            return `
                <div class="search-item" data-index="${actualIndex}">
                    <div class="item-content" onclick="openBookmark('${item.url}')" style="cursor: pointer;">
                        <div class="item-title">${index} ${item.highlights.title}</div>
                        <div class="item-tags">
                            ${tagsHtml}
                        </div>
                        <div class="item-description">${item.highlights.description}</div>
                        <div class="item-url">${item.highlights.url}</div>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn edit-btn" onclick="editBookmark(${item.id})">修改</button>
                        <button class="action-btn delete-btn" onclick="deleteBookmark(${item.id})">删除</button>
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
function openBookmark(url) {
    window.open(url, '_blank');
}

// 搜索处理函数
const handleSearch = debounce((query) => {
    const results = searchEngine.search(query);
    renderResults(results);
}, 150);

// 事件监听
searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
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
                openBookmark(currentResults[selectedIndex].url);
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

let currentDeletingId = null;

// 自定义Alert函数
function showCustomAlert(message, type = 'info') {
    const alertModal = document.getElementById('customAlert');
    const alertIcon = document.getElementById('alertIcon');
    const alertMessage = document.getElementById('alertMessage');
    const alertContent = alertModal.querySelector('.alert-modal-content');

    // 清除之前的类型样式
    alertContent.classList.remove('alert-success', 'alert-error', 'alert-warning', 'alert-info');

    // 设置图标和样式
    switch (type) {
        case 'success':
            alertIcon.textContent = '✅';
            alertContent.classList.add('alert-success');
            break;
        case 'error':
            alertIcon.textContent = '❌';
            alertContent.classList.add('alert-error');
            break;
        case 'warning':
            alertIcon.textContent = '⚠️';
            alertContent.classList.add('alert-warning');
            break;
        default:
            alertIcon.textContent = 'ℹ️';
            alertContent.classList.add('alert-info');
    }

    alertMessage.textContent = message;
    alertModal.style.display = 'flex';
}

// 关闭自定义Alert
function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// 替换所有原生alert调用
// 修改书签
function editBookmark(id) {
    const bookmark = bookmarks.find((b) => b.id === id);
    if (!bookmark) {
        showCustomAlert('书签不存在！', 'error');
        return;
    }

    currentEditingId = id;

    // 填充表单数据
    document.getElementById('editTitle').value = bookmark.title;
    document.getElementById('editUrl').value = bookmark.url;
    document.getElementById('editDescription').value = bookmark.description;
    document.getElementById('editTags').value = bookmark.tags.join(', ');

    // 显示弹窗
    document.getElementById('editModal').style.display = 'flex';
}

// 点击弹窗外部关闭
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditingId = null;

    // 清空表单
    document.getElementById('editTitle').value = '';
    document.getElementById('editUrl').value = '';
    document.getElementById('editDescription').value = '';
    document.getElementById('editTags').value = '';

    // 恢复弹窗标题为编辑模式
    document.querySelector('#editModal .modal-header').textContent = '编辑书签';
}

// 新增书签
function addBookmark() {
    currentEditingId = null; // 设置为null表示新增模式

    // 清空表单数据
    document.getElementById('editTitle').value = '';
    document.getElementById('editUrl').value = '';
    document.getElementById('editDescription').value = '';
    document.getElementById('editTags').value = '';

    // 修改弹窗标题
    document.querySelector('#editModal .modal-header').textContent = '新增书签';

    // 显示弹窗
    document.getElementById('editModal').style.display = 'flex';
}

// 新增按钮事件监听
document.getElementById('addBtn').addEventListener('click', addBookmark);

// 保存书签
function saveBookmark() {
    const title = document.getElementById('editTitle').value.trim();
    const url = document.getElementById('editUrl').value.trim();
    const description = document.getElementById('editDescription').value.trim();
    const tagsInput = document.getElementById('editTags').value.trim();

    // 验证必填字段
    if (!title) {
        showCustomAlert('请输入书签标题！', 'warning');
        return;
    }

    if (!url) {
        showCustomAlert('请输入网址！', 'warning');
        return;
    }

    // 验证URL格式
    try {
        new URL(url);
    } catch {
        showCustomAlert('请输入有效的网址！', 'error');
        return;
    }

    // 处理标签
    const tags = tagsInput
        ? tagsInput
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag)
        : [];

    if (currentEditingId === null) {
        // 新增模式
        const newId = Math.max(...bookmarks.map((b) => b.id), 0) + 1;
        const newBookmark = {
            id: newId,
            title,
            url,
            description,
            tags,
        };

        bookmarks.push(newBookmark);
        closeEditModal();

        // 重新搜索以更新显示
        handleSearch(searchInput.value);

        showCustomAlert('书签已添加！', 'success');
    } else {
        // 编辑模式
        const bookmarkIndex = bookmarks.findIndex((b) => b.id === currentEditingId);
        if (bookmarkIndex !== -1) {
            bookmarks[bookmarkIndex] = {
                ...bookmarks[bookmarkIndex],
                title,
                url,
                description,
                tags,
            };

            closeEditModal();

            // 重新搜索以更新显示
            handleSearch(searchInput.value);

            showCustomAlert('书签已更新！', 'success');
        } else {
            showCustomAlert('书签不存在！', 'error');
        }
    }
}

// 点击弹窗外部关闭
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        if (e.target.id === 'deleteModal') {
            closeDeleteModal();
        } else if (e.target.id === 'editModal') {
            closeEditModal();
        }
    }
});

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

// 确认删除
function confirmDelete() {
    const password = document.getElementById('deletePassword').value;
    if (password !== '123456') {
        showCustomAlert('删除口令错误！', 'error');
        return;
    }

    const index = bookmarks.findIndex((b) => b.id === currentDeletingId);
    if (index !== -1) {
        bookmarks.splice(index, 1);
        closeDeleteModal();
        handleSearch(searchInput.value);
        showCustomAlert('书签已删除！', 'success');
    }
}

// 点击弹窗外部关闭
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        if (e.target.id === 'deleteModal') {
            closeDeleteModal();
        }
    }
});
