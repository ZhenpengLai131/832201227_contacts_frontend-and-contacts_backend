### The backend code refers to the Alibaba JavaScript Style Guide.
### Modular Structure

The code follows a modular structure by separating routes (`contacts.js`), controllers (`contactsController.js`), and database configuration (`db.js`) into distinct modules. This modular design enhances code readability and maintainability, aligning well with the principle of “separation of concerns.”

### RESTful API Design

The backend adheres to RESTful API design principles, using different HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations. This makes the API interface more intuitive, standardized, and easy for the frontend to consume.

### Use of Express Framework

Express is used as the framework in Node.js to handle server operations, leveraging middleware, routing management, and request handling features. This approach simplifies server setup and request processing.

### Database Interaction

The `mysql2` library facilitates direct interaction with a MySQL database. With raw SQL queries, the approach remains straightforward and efficient, though care must be taken to prevent SQL injection attacks for security purposes.

### Error Handling and Data Validation

In the controllers, errors in database operations are caught, and the appropriate HTTP status codes are returned. Additionally, basic validation is performed for key data (such as `name` and `phone`), ensuring data integrity and reliability.

### JSDoc-Style Comments

Detailed JSDoc-style comments are included throughout the code to describe the functions, parameters, and return values. This improves readability and aids in understanding and maintaining the code effectively.

### Traditional CommonJS Modules

The code utilizes CommonJS's `require` and `module.exports` for importing and exporting modules instead of ES6's `import` and `export`, offering wider compatibility.

### Security Focus

Parameterized queries (e.g., `db.query(query, [params], callback)`) are implemented when querying the database to help prevent SQL injection attacks, enhancing the application’s security.

### Effective Middleware Usage

In the server configuration, `cors` middleware handles cross-origin requests, and `express.json()` parses JSON request bodies. This approach reflects well-managed request handling.
