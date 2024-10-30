// 导入 MySQL 库
const mysql = require('mysql2');

/**
 * @description 创建数据库连接，配置连接参数
 * @param {Object} connectionConfig - 数据库连接配置
 * @param {string} connectionConfig.host - 数据库主机地址
 * @param {string} connectionConfig.user - 数据库用户名
 * @param {string} connectionConfig.password - 数据库密码
 * @param {string} connectionConfig.database - 数据库名称
 * @returns {Object} 数据库连接对象
 */
const db = mysql.createConnection({
    host: 'localhost',  // 数据库主机地址
    user: 'root',       // 数据库用户名
    password: 'Lzp200513', // 数据库密码
    database: 'contacts_db' // 数据库名称
});

/**
 * @description 连接数据库并检查连接状态
 * @returns {void}
 */
db.connect((error) => {
    if (error) {
        console.error('数据库连接失败:', error); // 连接失败输出错误
    } else {
        console.log('已成功连接数据库'); // 连接成功提示
    }
});

// 导出数据库连接对象
module.exports = db;
