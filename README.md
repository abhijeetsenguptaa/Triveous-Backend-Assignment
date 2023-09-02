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
- **URL:** `/users/register`
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
- **URL:** `/users/login`
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
- **URL:** `/users/logout`
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


### Category Listing

- **Method:** GET
- **URL:** `/categories`
- **Description:** Retrieve a list of categories.

**Responses:**

- `200 OK`:
  ```json
  [
    {
      "id": "category_id_1",
      "name": "Electronics",
      "description": "Electronic gadgets and devices"
    },
    {
      "id": "category_id_2",
      "name": "Clothing",
      "description": "Fashion and apparel"
    },
    // More category objects
  ]
  ```
- `500 Internal Server Error`:
  ```json
  {
    "message": "Failed to fetch categories."
  }
  ```

### Create Category

#### Request

- **Endpoint**: `POST /categories`
- **Description**: Create a new product category.
- **Request Body**:

  | Field        | Type   | Description                        |
  | ------------ | ------ | ---------------------------------- |
  | `name`       | String | (Required) The name of the category. |
  | `description` | String | (Optional) A description of the category. |

#### Responses

- **201 Created**
  - **Response Body**:
    ```json
    {
      "status": true,
      "data": {
        "id": 4,
        "name": "Books",
        "description": "Products related to books and literature."
      }
    }
    ```
- **400 Bad Request**
  - **Response Body**:
    ```json
    {
      "status": false,
      "message": "Please provide a name for the category."
    }
    ```
- **500 Internal Server Error**
  - **Response Body**:
    ```json
    {
      "status": false,
      "message": "Internal Server Error"
    }
    ```


#### Products API Endpoints

##### Get All Products

- **Method**: GET
- **Endpoint**: `/products`
- **Description**: Get a list of all products in the database.
- **Query Parameters**:

  | Parameter     | Type     | Description                             |
  | ------------- | -------- | --------------------------------------- |
  | `id` (optional)         | Number   | Filter products by ID.                  |
  | `title` (optional)      | String   | Filter products by title.               |
  | `availability` (optional)| Boolean  | Filter products by availability.        |
  | `category` (optional)   | String   | Filter products by category.            |

- **Responses**:

  - 200 (OK):

    ```json
    {
      "status": true,
      "data": [product1, product2, ...]
    }
    ```

  - 404 (Not Found):

    ```json
    {
      "status": false,
      "message": "No products found."
    }
    ```

  - 500 (Internal Server Error):

    ```json
    {
      "status": false,
      "message": "Internal server error."
    }
    ```


##### Create a New Product

- **Method**: POST
- **Endpoint**: `/products`
- **Description**: Create a new product.
- **Request Body**:

  | Field         | Type     | Description               |
  | ------------- | -------- | ------------------------- |
  | `title`       | String   | The title of the product. |
  | `price`       | Number   | The price of the product. |
  | `description` | String   | The product description.  |
  | `availability`| Boolean  | The availability status.   |
  | `category`    | String   | The product category.     |

- **Responses**:

  - 201 (Created):

    ```json
    {
      "status": true,
      "data": createdProduct
    }
    ```

  - 400 (Bad Request):

    ```json
    {
      "status": false,
      "message": "Invalid request body."
    }
    ```

  - 500 (Internal Server Error):

    ```json
    {
      "status": false,
      "message": "Internal server error."
    }
    ```

## Cart Management

### Add Items to Cart

- **Method:** POST
- **URL:** `/cart/add`
- **Description:** Add items to the user's cart.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| userId      | String   | The ID of the user adding items to the cart. |
| productId   | String   | The ID of the product to add to the cart. |
| quantity    | Number   | The quantity of the product to add.      |

**Responses:**

- 201 (Created):
  ```json
  {
    "message": "Product added to the cart successfully."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Invalid request. Please check your input data."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Product not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to add product to the cart."
  }
  ```

---

### Fetch Cart Details

- **Method:** GET
- **URL:** `/cart/:userId`
- **Description:** Retrieve cart details for a user.

**URL Parameters:**

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| userId    | String   | The ID of the user whose cart details are requested. |

**Responses:**

- 200 (OK):
  ```json
  {
    "userId": "user_id",
    "cartItems": [
      {
        "productId": "product_id",
        "productName": "Product Name",
        "quantity": 2,
        "price": 19.99
      },
      // More cart items
    ]
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Cart not found for the user."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch cart details."
  }
  ```

---

### Delete Item from Cart

- **Method:** DELETE
- **URL:** `/cart/delete/:userId/:itemId`
- **Description:** Remove an item from the user's cart by item ID.

**URL Parameters:**

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| userId    | String   | The ID of the user whose cart contains the item. |
| itemId    | String   | The ID of the item to be removed from the cart. |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Item removed from the cart successfully."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Item not found in the cart."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to remove item from the cart."
  }
  ```

---

### Update Item in Cart

- **Method:** PUT
- **URL:** `/cart/update/:userId/:itemId`
- **Description:** Update the quantity of an item in the user's cart by item ID.

**URL Parameters:**

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| userId    | String   | The ID of the user whose cart contains the item. |
| itemId    | String   | The ID of the item to be updated in the cart. |

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| quantity    | Number   | The updated quantity of the item in the cart. |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Item quantity updated in the cart successfully."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Invalid request. Please provide a valid quantity."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Item not found in the cart."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to update item quantity in the cart."
  }
  ```
