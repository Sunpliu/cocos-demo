/**
 * API 配置文件
 * 集中管理所有 API 端点
 */

// 基础 URL 配置
const API_CONFIG = {
    // 基础 URL
    BASE_URL: 'http://8.209.247.215:3000/api',

    // 用户相关接口
    USER: {
        // 登录（无需认证）
        LOGIN: '/users/login',
        // 获取个人信息（需要认证）
        PROFILE: '/users/profile',
        // 用户管理（需要管理员权限）
        CREATE: '/users/create',
        UPDATE: '/users/update/', // 需要追加用户ID，如 UPDATE + '123'
        DELETE: '/users/delete/', // 需要追加用户ID，如 DELETE + '123'
        ALL: '/users/all',
    },

    // 书签相关接口
    BOOKMARK: {
        // 公共书签（管理员权限）
        PUBLIC: {
            GET: '/bookmarks/public',
            CREATE: '/bookmarks/public',
            UPDATE: '/bookmarks/public/', // 需要追加书签ID，如 UPDATE + '123'
            DELETE: '/bookmarks/public/', // 需要追加书签ID，如 DELETE + '123'
        },
        // 个人书签（普通用户可操作）
        PERSONAL: {
            GET: '/bookmarks/personal',
            CREATE: '/bookmarks/personal',
            UPDATE: '/bookmarks/personal/', // 需要追加书签ID，如 UPDATE + '123'
            DELETE: '/bookmarks/personal/', // 需要追加书签ID，如 DELETE + '123'
        },
        // 获取所有书签（公共+个人）
        ALL: '/bookmarks/all',
    },

    // 构建相关接口
    BUILD: {
        // 构建配置
        CONFIG: {
            GET: '/build/config',
            UPDATE: '/build/config', // 需要管理员权限
        },
    },

    // 辅助方法
    helpers: {
        // 用户更新URL生成器
        getUserUpdateUrl(userId) {
            return `/users/update/${userId}`;
        },
        // 用户删除URL生成器
        getUserDeleteUrl(userId) {
            return `/users/delete/${userId}`;
        },
        // 公共书签更新URL生成器
        getPublicBookmarkUpdateUrl(bookmarkId) {
            return `/bookmarks/public/${bookmarkId}`;
        },
        // 公共书签删除URL生成器
        getPublicBookmarkDeleteUrl(bookmarkId) {
            return `/bookmarks/public/${bookmarkId}`;
        },
        // 个人书签更新URL生成器
        getPersonalBookmarkUpdateUrl(bookmarkId) {
            return `/bookmarks/personal/${bookmarkId}`;
        },
        // 个人书签删除URL生成器
        getPersonalBookmarkDeleteUrl(bookmarkId) {
            return `/bookmarks/personal/${bookmarkId}`;
        },
    },
};

// 导出配置
window.API_CONFIG = API_CONFIG;
