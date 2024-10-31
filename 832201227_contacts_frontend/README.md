# Contact Management System Frontend

This is the frontend of a Contact Management System built with **Vue.js**. It provides a user-friendly interface for managing contacts, including adding, updating, deleting, searching, grouping, and favoriting contacts. The frontend interacts with the backend API to ensure real-time data synchronization.

## Features

- **Add Contacts**: Add new contacts with details such as name, phone number, email, and group.
- **Edit Contact Information**: Modify existing contact details.
- **Delete Contacts**: Remove contacts from the list.
- **Search Contacts**: Search for contacts by name or phone number.
- **Group Filtering**: Filter contacts by group (e.g., family, friends, work).
- **Favorite Toggle**: Mark contacts as favorites for easy access.
- **Alphabetical Navigation**: Quickly navigate through contacts by the first letter of the name.

## Project Structure

```plaintext
.
├── src
│   ├── components           # Vue components
│   │   ├── ContactForm.vue  # Component for adding/editing contacts
│   │   ├── ContactList.vue  # Component for displaying and managing contact list
│   ├── App.vue              # Main app component
│   ├── main.js              # Vue initialization
├── public                   # Public assets
├── README.md                # Project documentation
