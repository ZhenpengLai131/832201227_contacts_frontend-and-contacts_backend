// 引入模块
const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contactsController'); // 引入联系人控制器

/**
 * @description 定义联系人相关的 API 路由
 * @route GET /api/contacts
 * @returns {Array} 联系人列表
 */
router.get('/', contactsController.getAllContacts); // 获取所有联系人

/**
 * @description 根据 ID 获取联系人
 * @route GET /api/contacts/:id
 * @param {string} id - 联系人ID
 * @returns {Object} 联系人信息
 */
router.get('/:id', contactsController.getContactById); // 根据 ID 获取联系人

/**
 * @description 添加新联系人（包含查重逻辑）
 * @route POST /api/contacts
 * @returns {Object} 新联系人信息
 */
router.post('/', contactsController.addContact); // 添加新联系人（包含查重逻辑）

/**
 * @description 更新联系人信息
 * @route PUT /api/contacts/:id
 * @param {string} id - 联系人ID
 * @returns {Object} 更新后的联系人信息
 */
router.put('/:id', contactsController.updateContact); // 更新联系人

/**
 * @description 删除联系人
 * @route DELETE /api/contacts/:id
 * @param {string} id - 联系人ID
 * @returns {void} 无返回内容
 */
router.delete('/:id', contactsController.deleteContact); // 删除联系人

/**
 * @description 检查重复联系人
 * @route POST /api/contacts/check-duplicate
 * @returns {boolean} 是否存在重复联系人
 */
router.post('/check-duplicate', contactsController.checkDuplicateContact); // 检查重复联系人

/**
 * @description 查找联系人（根据名字、电话或邮箱）
 * @route GET /api/contacts/search/:keyword
 * @param {string} keyword - 搜索关键字
 * @returns {Array} 匹配的联系人列表
 */
router.get('/search/:keyword', contactsController.searchContacts); // 查找联系人

/**
 * @description 切换联系人收藏状态
 * @route PUT /api/contacts/:id/favorite
 * @param {string} id - 联系人ID
 * @returns {string} 收藏状态更新信息
 */
router.put('/:id/favorite', contactsController.toggleFavorite); // 切换联系人收藏状态

// 导出路由
module.exports = router;
