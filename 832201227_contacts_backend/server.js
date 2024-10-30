// 引入所需模块
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./src/routes/contacts'); // 引入联系人路由
const app = express();
const PORT = 3000; // 服务器端口常量

/**
 * @description 应用中间件配置
 */
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 支持解析 JSON 格式的请求体

/**
 * @description 使用联系人相关的路由
 * @route /api/contacts
 */
app.use('/api/contacts', contactRoutes);

/**
 * @description 启动服务器并监听指定端口
 * @param {number} PORT - 服务器监听的端口
 * @returns {void}
 */
app.listen(PORT, () => {
    console.log(`服务器已启动，访问地址：http://localhost:${PORT}/api/contacts`);
});
