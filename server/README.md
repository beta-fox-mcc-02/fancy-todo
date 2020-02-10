# API TODO DOCUMENTATION
## Base URL
```
http://localhost:3000/
```

# Todo Routes

**Show All Todos**
----
  Returns json data for all todo.

* **URL**
  ```
  /todos
  ```
* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    **Required** <br/>
    `token: jwt token from login`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
    {
        "data": [
            {
                "id": 1,
                "title": "ngoding",
                "description": "ngerjain todo",
                "status": false,
                "due_date": "2020-02-05",
                "UserId": 1,
                "createdAt": "2020-02-04",
                "updatedAt": "2020-02-04"
            },
            {....}
        ]
    }
    ```
 
* **Error Response:**
  * **Code:** 401 Not Authorized <br />
    **Content:**
    ```
    {
      "msg": "You must Login First"
    }
    ```

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```
    {
      "msg": "Internal Server Error"
    }
    ```

**Show Todo**
----
  Returns json data about a single todo.

* **URL**
  ```
  /todos/:id
  ```

* **Method:**

  `GET`
  
*  **URL Params**
  
    **Required:**
 
   `id=[integer]`

* **Data Params**

    **Required** <br/>
    `token: jwt token from login`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
    {
      "data": {
          "id": 1,
          "title": "Ngoding",
          "description": "Ngerjain todo",
          "due_date": "2020-02-05",
          "updatedAt": "2020-02-03",
          "createdAt": "2020-02-03",
          "status": false
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:**
    
    ```
    {
      "msg": "Data with id 2 Not Found"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```

**Create Todo**
----
  Returns json data about new Todo.

* **URL**
  ```
  /todos
  ```

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    `token: jwt token from login`

    Body :

    ```
    title: String
    description: String
    due_date: Date
    ```

    **Optional**
    ```
    status: Boolean
    ```
* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    
    expample
    ```
    {
      "data": {
          "id": 1,
          "title": "ngoding",
          "description": "ngerjain todo",
          "due_date": "2020-02-05",
          "UserId": 1,
          "updatedAt": "2020-02-04",
          "createdAt": "2020-02-04",
          "status": false
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg": "Validation Error",
      "errors": [
          "Title Length Minimal is 2",
          "Description Length Minimal is 2"
      ]
    }
    ```
  OR
  * **Code:** 401 Not Authorized <br />
    **Content:**
    
    ```
    {
      "msg": "You Must Login First"
    }
    ```
  OR
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
    <br/>
**Update Todo**
----
  Returns json data about updated Todo.

* **URL**
  ```
  /todos/:id
  ```

* **Method:**

  `PUT`
  
*  **URL Params**
  
    `id=[integer]`

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    `token: jwt token from login`

    Body :

    ```
    title: String
    description: String
    due_date: Date
    ```

    **Optional**
    ```
    status: Boolean
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
    {
      "data": {
          "id": 1,
          "title": "Edited",
          "description": "Edited",
          "due_date": "2020-02-05",
          "updatedAt": "2020-02-03",
          "createdAt": "2020-02-03",
          "status": true
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg": "Validation Error",
      "errors": [
          "Title Length Minimal is 2",
          "Description Length Minimal is 2"
      ]
    }
    ```
  OR
  * **Code:** 401 Not Authorized <br />
    **Content:**
    
    ```
    {
      "msg": "You Must Login First"
    }
    ```
  OR
  * **Code:** 404 Not Found <br />
    **Content:**
    
    ```
    {
      "msg": "Data with id 2 Not Found",
      "proccess": "Update Todo Failed"
    }
    ```
  OR
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```

    <br/>
**Delete Todo**
----
  Returns json data about result succes or failed.

* **URL**
  ```
  /todos/:id
  ```

* **Method:**

  `DELETE`
  
*  **URL Params**
  
    `id=[integer]`

* **Data Params**
    
    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
    {
      "msg": "Delete Success"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg": "Todo with id 2 Not Found"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
# User Routes

**Create User**
----
  Returns json data about new User.

* **URL**
  ```
  /users/register
  ```

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    Body :

    ```
    username: String
    email: String
    password: String
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    
    expample
    ```
      {
        "data": {
            "id": 1,
            "username": "test",
            "email": "test@mail.com"
        },
        "msg": "User Register Success"
      }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg": "Validation Error",
      "errors": [
          "Username length minimal is 4",
          "Minimum password length is 5",
          "Email Format is Invalid, Please Check Your Email Format Again !"
      ]
    }
    ```
  OR
  * **Code:** 400 Bad Request (duplicated Email) <br />
    **Content:**
    ```
    {
        "msg": "email must be unique"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
    <br/>
**Login User**
----
  Returns jwt token.

* **URL**
  ```
  /users/login
  ```

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  **Required**
    
    Headers:
    
    `Content-Type: application/x-www-form-urlencoded`

    Body :

    ```
    email: String
    password: String
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    
    expample
    ```
    {
        "token": jwt-token
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    
    ```
    {
      "msg": "Wrong Email/Password !"
    }
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    
    ```
    {
      "msg": "Internal Server Error"
    }
    ```
    <br/>
