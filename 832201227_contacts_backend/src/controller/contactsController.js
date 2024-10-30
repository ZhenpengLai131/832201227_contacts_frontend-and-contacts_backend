// 引入数据库连接
const db = require('../config/db'); // 引入数据库配置

/**
 * @description 获取所有联系人
 * @route GET /api/contacts
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.getAllContacts = (request, response) => {
    const query = 'SELECT * FROM contacts';
    db.query(query, (error, results) => {
        if (error) {
            console.error('获取联系人失败:', error);
            response.status(500).send('服务器错误');
        } else {
            response.json(results); // 返回所有联系人
        }
    });
};

/**
 * @description 根据 ID 获取联系人
 * @route GET /api/contacts/:id
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.getContactById = (request, response) => {
    const query = 'SELECT * FROM contacts WHERE id = ?';
    db.query(query, [request.params.id], (error, result) => {
        if (error) {
            console.error('获取联系人失败:', error);
            response.status(500).send('服务器错误');
        } else {
            response.json(result[0]); // 返回指定ID的联系人
        }
    });
};

/**
 * @description 根据名字、电话或邮箱查找联系人
 * @route GET /api/contacts/search/:keyword
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.searchContacts = (request, response) => {
    const { keyword } = request.params;
    const query = `
        SELECT * FROM contacts
        WHERE name LIKE ? OR phone LIKE ? OR email LIKE ?
    `;
    const searchValue = `%${keyword}%`; // 模糊搜索
    db.query(query, [searchValue, searchValue, searchValue], (error, results) => {
        if (error) {
            console.error('查找联系人失败:', error);
            response.status(500).send('服务器错误');
        } else {
            response.json(results); // 返回查找结果
        }
    });
};

/**
 * @description 检查联系人是否已存在，用于添加联系人时查重
 * @route POST /api/contacts/check-duplicate
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.checkDuplicateContact = (request, response) => {
    const { name, phone } = request.body;

    // 确保name和phone不为空且为字符串
    if (!name || !phone || typeof name !== 'string' || typeof phone !== 'string') {
        return response.status(400).send('姓名和电话是必填项，且应为字符串');
    }

    const query = 'SELECT * FROM contacts WHERE name = ? OR phone = ?';
    db.query(query, [name, phone], (error, results) => {
        if (error) {
            console.error('检查重复联系人失败:', error);
            return response.status(500).send('服务器错误');
        } else {
            return response.json({ exists: results.length > 0, existingContact: results[0] });
        }
    });
};

/**
 * @description 添加新联系人，包含查重逻辑，避免重复联系人
 * @route POST /api/contacts
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.addContact = (request, response) => {
    const { name, phone, email, group, favorite } = request.body;

    // 确保 name 和 phone 不为空
    if (!name || !phone) {
        return response.status(400).send('姓名和电话是必填项');
    }

    const query = 'INSERT INTO contacts (name, phone, email, `group`, favorite) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, phone, email, group, favorite], (error, result) => {
        if (error) {
            console.error('添加联系人失败:', error);
            return response.status(500).send('服务器错误');
        } else {
            response.status(201).json({ id: result.insertId, ...request.body }); // 返回新添加的联系人信息
        }
    });
};

/**
 * @description 更新联系人信息
 * @route PUT /api/contacts/:id
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.updateContact = (request, response) => {
    const { name, phone, email, group, favorite } = request.body;
    const query = 'UPDATE contacts SET name = ?, phone = ?, email = ?, `group` = ?, favorite = ? WHERE id = ?';
    db.query(query, [name, phone, email, group, favorite, request.params.id], (error, result) => {
        if (error) {
            console.error('更新联系人失败:', error);
            response.status(500).send('服务器错误');
        } else {
            response.json({ id: request.params.id, ...request.body }); // 返回更新后的联系人信息
        }
    });
};

/**
 * @description 切换联系人收藏状态
 * @route PATCH /api/contacts/:id/favorite
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.toggleFavorite = (request, response) => {
    const { id } = request.params;
    const { favorite } = request.body; // 从请求体中获取新的 favorite 状态

    const query = 'UPDATE contacts SET favorite = ? WHERE id = ?'; // 更新为传递的收藏状态
    db.query(query, [favorite, id], (error, result) => {
        if (error) {
            console.error('切换收藏状态失败:', error);
            return response.status(500).send('服务器错误');
        } else {
            response.send('收藏状态已更新'); // 成功时返回状态已更新
        }
    });
};

/**
 * @description 删除联系人
 * @route DELETE /api/contacts/:id
 * @param {Object} request - 请求对象
 * @param {Object} response - 响应对象
 * @returns {void}
 */
exports.deleteContact = (request, response) => {
    const query = 'DELETE FROM contacts WHERE id = ?';
    db.query(query, [request.params.id], (error, result) => {
        if (error) {
            console.error('删除联系人失败:', error);
            response.status(500).send('服务器错误');
        } else {
            response.status(204).send(); // 成功后无内容响应
        }
    });
};
