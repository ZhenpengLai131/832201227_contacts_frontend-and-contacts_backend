# 832201227_contacts_frontend-and-contacts_backend
This README provides a comprehensive overview of the entire project, including usage for both frontend and backend, API endpoints, and a summary of what was learned. Let me know if you need any adjustments!

A complete Contact Management System built with a **Vue.js** frontend, an **Express.js** backend, and a **MySQL** database. This system allows users to manage their contacts, including adding, updating, deleting, searching, and grouping contacts, with additional features such as favoriting and alphabetical navigation.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [API Endpoints](#api-endpoints)
4. [Frontend Usage](#frontend-usage)
5. [Backend Usage](#backend-usage)
6. [Summary](#summary)

## Features

- **Add Contacts**: Add new contacts with details like name, phone number, email, and group.
- **Edit Contact Information**: Update existing contact details.
- **Delete Contacts**: Remove unwanted contacts.
- **Search Contacts**: Search by name or phone.
- **Group Filtering**: Filter contacts by group (e.g., family, friends, work).
- **Favorite Contacts**: Mark contacts as favorites for easier access.
- **Alphabetical Navigation**: Navigate contacts by first letter for quick access.

## Project Structure

The project is divided into two main parts: **Frontend** and **Backend**.

```plaintext
Contact-Management-System/
├── frontend/              # Vue.js frontend application
│   ├── src/
│   │   ├── components/    # Contains ContactList.vue, ContactForm.vue
│   │   ├── App.vue        # Main app component
│   │   └── main.js        # Vue initialization
│   ├── public/            # Public assets
│   └── README.md          # Frontend documentation
│
├── backend/               # Express.js backend application
│   ├── src/
│   │   ├── controllers/   # API business logic controllers
│   │   ├── routes/        # API routes
│   │   └── config/        # Database connection configuration
│   ├── server.js          # Server setup and initialization
│   └── README.md          # Backend documentation
│
└── README.md              # Main project documentation
```

## API Endpoints

The backend provides RESTful API endpoints for managing contacts.

| Method | Endpoint                        | Description                        |
|--------|---------------------------------|------------------------------------|
| GET    | `/api/contacts`                 | Retrieve all contacts              |
| GET    | `/api/contacts/:id`             | Retrieve a contact by ID           |
| POST   | `/api/contacts`                 | Add a new contact                  |
| PUT    | `/api/contacts/:id`             | Update a contact                   |
| DELETE | `/api/contacts/:id`             | Delete a contact                   |
| GET    | `/api/contacts/search/:keyword` | Search contacts by keyword         |
| PUT    | `/api/contacts/:id/favorite`    | Toggle favorite status for a contact |


## Frontend Usage

- **Add Contacts**: Use the form to add a new contact by entering name, phone number, email, and group, then clicking "Submit."
- **Edit Contacts**: Click "Edit" on any contact in the list to edit its details.
- **Delete Contacts**: Click "Delete" to remove a contact, with a confirmation prompt to prevent accidental deletion.
- **Search & Filter**: Use the search bar to quickly find contacts by name or phone, or use group filters.
- **Favorite Contacts**: Toggle the "Favorite" button on a contact to mark it as important.
- **Alphabetical Navigation**: Use the alphabetical sidebar to quickly jump to contacts by their first letter.

## Backend Usage

- The backend API is accessible at the specified `VUE_APP_API_BASE_URL` in the frontend configuration.
- Use tools like **Postman** or **curl** for testing API endpoints directly.

## Summary

This Contact Management System project provided hands-on experience in building a full-stack web application with a frontend and backend that communicate seamlessly through RESTful APIs. By working on this project, I strengthened my skills in:

- **Frontend development** with Vue.js, using component-based architecture for a responsive and user-friendly interface.
- **Backend development** with Express.js, focusing on building RESTful APIs for CRUD operations.
- **Database management** with MySQL, structuring data efficiently and ensuring data integrity.
- **Deployment** of a full-stack application on a cloud server for live access, configuring both frontend and backend for a production environment.

In the future, I plan to expand the functionality by adding batch operations, contact export, and additional filtering options. Overall, this project enhanced my understanding of full-stack development and cloud deployment.


