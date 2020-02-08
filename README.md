**Show All Todos**
----
  Returns json data about all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
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
          "UserId": 1,
          "currentWeather": "awan Mendung"
        },
        {
          "id": 3,
          "title": "Thrid",
          "description": "Latihan",
          "status": false,
          "due_date": "2020-02-20T00:00:00.000Z",
          "createdAt": "2020-02-04T12:32:34.850Z",
          "updatedAt": "2020-02-04T12:32:34.850Z",
          "UserId": 1,
          "currentWeather": "awan Mendung"
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`
---

**Create Todo**
----
  Inserts a data into database and returns the corresponding data.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
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
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

**Show One Todo**
----
  Return one todo based on id.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "data": {
            "id": 3,
            "title": "Thrid",
            "description": "Latihan",
            "status": false,
            "due_date": "2020-02-20T00:00:00.000Z",
            "createdAt": "2020-02-04T12:32:34.850Z",
            "updatedAt": "2020-02-04T12:32:34.850Z",
            "UserId": 1,
            "currentWeather": "awan Mendung"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  * **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

---

**Update One Todo**
----
  Update one todo based on id.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "data": {
            "id": 3,
            "title": "ajksndkja",
            "description": "asdkjasb",
            "status": false,
            "due_date": "2020-09-10T00:00:00.000Z",
            "UserId": 1,
            "createdAt": "2020-02-04T12:32:34.850Z",
            "updatedAt": "2020-02-04T12:53:07.836Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  * **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

**Delete One Todo**
----
  Delete one todo based on id.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    **Required**

    id=[integer]

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "message": "Success delete data with id: 5"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{ message : "Not Found" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You must login first" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

**Register User**
----
  Register a user.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

    **Required**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "id": 6,
        "email": "uulwake@mail.com",
        "password": "$2a$10$Fh/oCthhmgT5O/YKgMx0d.BOl0O6Wrd/R8P4ImDN/ujbqspUCfo3."
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Bad request" }`

  * **Code:** 404 BAD REQUEST <br />
    **Content:** `{ message : "Email Already Exist" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

**Login User**
----
  Login a user.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

    **Required**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTgwODI2MTk1fQ.h56et9F8Iby0BNgLIG6e5wvGtRC6oRDvpxHf8WO4rWs" 
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Not Found <br />
    **Content:** `{ message : "Email/Password Invalid" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal server error" }`

---

**Third Party API**
----
  Third party API that I used.

* **URL**

  https://api.weatherbit.io/v2.0/current?city=Jakarta&country=Indonesia&lang=id&key=ae858ea5e4c94d0fb0384e7b1e966e45

* **TOKEN**

  ae858ea5e4c94d0fb0384e7b1e966e45



