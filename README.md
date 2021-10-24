# How to Run Server

1. Make sure you have Nodejs installed

```bash
node --version
```

2. Make sure you have docker installed

```bash
docker --version
```

3. Install all packages

```bash
npm ci
```

4. Run postgres database

```bash
npm run db:up
```

5. Run server

```bash
npm run start
```

6. Upon using server, remember to always shutdown database

```bash
npm run db:down
```

# API Documentation

## **Show All Todos**

Returns json data about all todos.

- **URL**

  /todos

- **Headers:**

  ```json
  {
    "access_token": "Your JWT access token"
  }
  ```

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "data": [
        {
          "id": 2,
          "title": "Second",
          "description": "Latihan",
          "status": false,
          "due_date": "2020-02-20T00:00:00.000Z",
          "createdAt": "2020-02-04T10:44:23.214Z",
          "updatedAt": "2020-02-04T10:44:23.214Z",
          "UserId": 1
        },
        {
          "id": 3,
          "title": "Thrid",
          "description": "Latihan",
          "status": false,
          "due_date": "2020-02-20T00:00:00.000Z",
          "createdAt": "2020-02-04T12:32:34.850Z",
          "updatedAt": "2020-02-04T12:32:34.850Z",
          "UserId": 1
        }
      ]
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

## **Create Todo**

Inserts a data into database and returns the corresponding data.

- **URL**

  /todos

- **Headers:**

  ```json
  {
    "access_token": "Your JWT access token"
  }
  ```

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "title": "Your title",
    "description": "Your description",
    "status": false,
    "due_date": "2021-12-25"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "data": {
        "id": 5,
        "title": "Fifth",
        "description": "Latihan",
        "status": false,
        "due_date": "2020-02-20T00:00:00.000Z",
        "UserId": 1,
        "updatedAt": "2020-02-04T12:47:05.571Z",
        "createdAt": "2020-02-04T12:47:05.571Z"
      }
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

## **Show One Todo**

Return one todo based on id.

- **URL**

  /todos/:id

- **Headers:**

  ```json
  {
    "access_token": "Your JWT access token"
  }
  ```

- **Method:**

  `GET`

- **URL Params**

  **Required**

  id=integer

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "data": {
        "id": 3,
        "title": "Third",
        "description": "Latihan",
        "status": false,
        "due_date": "2020-02-20T00:00:00.000Z",
        "createdAt": "2020-02-04T12:32:34.850Z",
        "updatedAt": "2020-02-04T12:32:34.850Z",
        "UserId": 1
      }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  - **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

---

## **Update One Todo**

Update one todo based on id.

- **URL**

  /todos/:id

- **Headers:**

  ```json
  {
    "access_token": "Your JWT access token"
  }
  ```

- **Method:**

  `PATCH`

- **URL Params**

  **Required**

  id=integer

- **Data Params**

  ```json
  {
    "status": true
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "data": {
        "id": 3,
        "title": "ajksndkja",
        "description": "asdkjasb",
        "status": true,
        "due_date": "2020-09-10T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-02-04T12:32:34.850Z",
        "updatedAt": "2020-02-04T12:53:07.836Z"
      }
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  - **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

## **Delete One Todo**

Delete one todo based on id.

- **URL**

  /todos/:id

- **Headers:**

  ```json
  {
    "access_token": "Your JWT access token"
  }
  ```

- **Method:**

  `DELETE`

- **URL Params**

  **Required**

  id=integer

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "Success delete data with id: 5"
    }
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

## **Register User**

Register a user.

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "email": "my_email@gmail.com",
    "password": "secret"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 6,
      "email": "my_email@gmail.com"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  - **Code:** 404 BAD REQUEST <br />
    **Content:** `{ message : "Email Already Exist" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

## **Login User**

Login a user.

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "email": "my_email@gmail.com",
    "password": "secret"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "access_token": "Your JWT token"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  - **Code:** 401 BAD REQUEST <br />
    **Content:** `{ message : "Email/Password Invalid" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---
