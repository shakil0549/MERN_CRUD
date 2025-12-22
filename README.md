MERN CRUD Application with Authentication

A simple Create, Read, Update, and Delete (CRUD) application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with a secure authentication system.

Users must be authenticated to access the application. Any request made without a valid logged-in user (stored in the database) is not granted access.

🚀 Features

User authentication (Login & Register)

Protected routes (authorization required)

Create, Read, Update, Delete operations

JWT-based authentication

RESTful API

MongoDB database

Secure password hashing

Clean and simple UI

🛠️ Tech Stack
Frontend

React.js

JavaScript (ES6+)

Axios / Fetch API

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Token)

bcrypt

🔐 Authentication & Authorization

Users must register and log in

User credentials are stored securely in the database

JWT token is generated on login

Protected routes verify the token

Unauthorized users cannot access CRUD operations