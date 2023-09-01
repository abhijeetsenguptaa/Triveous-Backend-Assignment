####
# E-commerce Backend API

## Overview

The E-commerce Backend API is a full-stack application that provides endpoints for managing users, products, orders, and more. It leverages Node.js and Express.js for server-side development and interacts with a MySQL database.

## Base URL

- Live: [http://your-live-url.com](http://your-live-url.com)
- Local: [http://localhost:3000](http://localhost:3000)

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected routes, clients must include a valid token in the `Authorization` header with the "Bearer" scheme.


### User Routes

#### Register a New User

- **Method:** POST
- **URL:** `/api/users/register`
- **Description:** Register a new user with the provided details.

**Request Body:**

| Parameter   | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `username`  | String   | The username for the new user.           |
| `email`     | String   | The email address for the new user.      |
| `password`  | String   | The password for the new user.           |
| `firstName` | String   | The first name of the user.              |
| `lastName`  | String   | The last name of the user.               |
| `role`      | Enum     | The role of the user (user, seller, admin). |
| `category`  | Enum     | The category for sellers (electronics, clothing, furniture, books, other). |

**Responses:**

- `201 Created`:
  ```json
  {
    "id": "user_id",
    "username": "example_user",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "category": "electronics"
  }
  ```
- `400 Bad Request`:
  ```json
  {
    "message": "Please fill all required fields"
  }
  ```
- `409 Conflict`:
  ```json
  {
    "message": "Email is already in use"
  }
  ```
- `500 Internal Server Error`:
  ```json
  {
    "message": "Registration failed. Please try again later."
  }
  ```

#### User Login

- **Method:** POST
- **URL:** `/api/users/login`
- **Description:** Authenticate user login.

**Request Body:**

| Parameter   | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `email`     | String   | The email address of the user.           |
| `password`  | String   | The user's password.                     |

**Responses:**

- `200 OK`:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "example_user",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "category": "electronics"
    }
  }
  ```
- `400 Bad Request`:
  ```json
  {
    "message": "Please provide both email and password"
  }
  ```
- `401 Unauthorized`:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
- `500 Internal Server Error`:
  ```json
  {
    "message": "Login failed. Please try again later."
  }
  ```

#### Log Out

- **Method:** POST
- **URL:** `/api/users/logout`
- **Description:** Log out a user by clearing the JWT token.

**Responses:**

- `200 OK`:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- `500 Internal Server Error`:
  ```json
  {
    "message": "Logout failed"
  }
  ```

