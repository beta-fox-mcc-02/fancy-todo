# REST API TODO

# Register and Login Method

Read method below to know how to create your own user and login afterwards.

**Register**
----
  Register as a new user in Todo.

* **URL**

  http://localhost:3000/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  * **Request Header**
    ```javascript
    {
        "Content-Type": "application/json"
    }
    ```
  
  * **Request Body**
    ```
    email         : string,
    password      : string
    ```
    ```javascript
    {
        "email": "your_email",
        "password": "your_password"
    }
    ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```javascript
    {
        "data": {
            "id": 1,
            "email": "mail@mail.com"
        },
        "message": "Register success"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```javascript
    {
        "error": "Bad Request",
        "msg": [
            "invalid email format"
        ]
    }
    ```
    ```javascript
    {
        "error": "Bad Request",
        "msg": [
            "Minimum password length: 6 characters"
        ]
    }
    ```

    OR  

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```

**Login**
----
  Login todo with input email and password to gain access to todo features.

* **URL**

  http://localhost:3000/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  * **Request Header**
    ```javascript
    {
        "Content-Type": "application/json"
    }
    ```
  
  * **Request Body**
    ```
    email         : string,
    password      : string
    ```
    ```javascript
    {
        "email": "your_email",
        "password": "your_password"
    }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
        "data": {
            "id": 1,
            "email": "mail@mail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkallGblZSRy9sSWZXVEp2Zi5PT3VHZUJJc0djSnhIa2ZLNFlCSzNyU2IvTnRNNGp3VUh4SGUiLCJpYXQiOjE1ODA4MTI3ODN9.MhnMnYvYEXSwq8XgeE-Ax2C4URYYQEeFqaUp8GrFb50"
        },
        "message": "Login success"
    }
    ```
    Note: <br>
    Copy your `output token`, which is required, to the `token` key in `headers`.
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```javascript
    {
        "error": "Bad Request",
        "msg": [
            "email / password incorrect"
        ]
    }
    ```
    
    OR  

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```

# Todo Features

Todo features required login for the first time. Read `Register and Login` section above to know how to `Login` or `Register` if you don't have any user

**Show All Todo**
----
  Returns json data of all todo from logged user.

* **URL**

  http://localhost:3000/todos

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  * **Request Header**
    ```javascript
    {
        "token": "your_token"
    }
    ```
    To get your token, see `Login` section.

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
        "data": [
            {
                "id": 1,
                "title": "Test REST API",
                "description": "",
                "status": false,
                "due_date": "2020-02-08T00:00:00.000Z",
                "UserId": 1,
                "createdAt": "2020-02-04T10:49:31.969Z",
                "updatedAt": "2020-02-04T10:49:31.969Z"
            },
            {
                "id": 2,
                "title": "Test 3rd party API",
                "description": "",
                "status": false,
                "due_date": "2020-02-08T00:00:00.000Z",
                "UserId": 1,
                "createdAt": "2020-02-04T11:19:42.056Z",
                "updatedAt": "2020-02-04T11:19:42.056Z"
            }
        ],
        "message": "Todo data found"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```

**Add New Todo**
----
  Adding new Todo with required title, optional description, and due_date, and returns json data of a new created todo that will be added to logged user's todo list.

* **URL**

  http://localhost:3000/todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
  * **Request Header**
    ```javascript
    {
        "Content-Type": "application/json"
        "token": "your_token"
    }
    ```
    To get your token, see `Login` section.
  
  * **Request Body**
    ```
    title         : string,
    description   : string,
    due_date      : date
    ```
    ```javascript
    {
        "title": "Try REST API",
        "description": "Exercising REST API in JS",
        "due_date": "2020-02-07"
    }
    ```
  

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```javascript
    {
        "data": [
            {
                "id": 1,
                "title": "Test REST API",
                "description": "Exercising REST API in JS",
                "status": false,
                "due_date": "2020-02-07T00:00:00.000Z",
                "UserId": 1,
                "createdAt": "2020-02-04T10:49:31.969Z",
                "updatedAt": "2020-02-04T10:49:31.969Z"
            }
        ],
        "message": "Todo data found"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    {
        "error": "Bad Request",
        "msg": [
            "Minimum title length is 3 characters"
        ]
    }
    ```

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```

**Get One Todo by Id**
----
  Returns json data of one todo based on id input from logged user only.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    ```javascript
    id=[integer]
    ```

* **Data Params**
    
    * **Request Header**
    ```javascript
    {
        "token": "your_token"
    }
    ```
    To get your token, see `Login` section.

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
        "data": {
            "id": 4,
            "title": "Prep Party Meal",
            "description": "",
            "status": false,
            "due_date": "2020-02-06T10:45:10.374Z",
            "createdAt": "2020-02-03T10:47:46.184Z",
            "updatedAt": "2020-02-03T10:47:46.184Z"
        },
        "message": "One todo found"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        "error": "Not Found",
        "msg": [
            "Todo with id 3 in user id 1 not found"
        ]
    }
    ```

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```

**Update One Todo**
----
  Update todo from required todo id with required data params (only todo from logged user), and returns json data of updated todo data.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    ```javascript
    id=[integer]
    ```
    
* **Data Params**
    
    * **Request Header**
        ```javascript
        {
            "Content-Type": "application/json"
            "token": "your_token"
        }
        ```
        To get your token, see `Login` section.
  
    * **Request Body**
        ```
        title         : string,
        description   : string,
        status        : boolean,
        due_date      : date
        ```
        ```javascript
        {
            "title": "Pratice REST API",
            "description": "Exercising REST API in JS",
            "status": true,
            "due_date": "2020-02-07"
        }
        ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
        "data": [
            null,
            {
                "id": 1,
                "title": "Test REST API",
                "description": "",
                "status": true,
                "due_date": "2020-02-08T00:00:00.000Z",
                "UserId": 1,
                "createdAt": "2020-02-04T10:49:31.969Z",
                "updatedAt": "2020-02-04T13:58:03.190Z"
            }
        ],
        "message": "Todo data has updated successfully"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    {
        "error": "Bad Request",
        "msg": [
            "Minimum title length is 3 characters"
        ]
    }
    ```

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        "error": "Not Found",
        "msg": [
            "Todo with id 3 in user id 1 not found"
        ]
    }
    ```

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```

**Delete Todo by Id**
----
  Delete todo data found by Id (only todo from logged user).

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
    ```javascript
    id=[integer]
    ```

* **Data Params**
    
    * **Request Header**
    ```javascript
    {
        "token": "your_token"
    }
    ```
    To get your token, see `Login` section.

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
        "data": {
            "id": 6,
            "title": "Buy Music",
            "description": "",
            "status": false,
            "UserId": 1,
            "due_date": "2020-02-07T00:00:00.000Z",
            "createdAt": "2020-02-03T12:27:03.305Z",
            "updatedAt": "2020-02-03T12:27:03.305Z"
        },
        "message": "Todo data has been deleted successfully"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        "error": "Not Found",
        "msg": [
            "Todo with id 11 in user id 1 not found"
        ]
    }
    ```

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    {
        "error": "Internal Server Error"
    }
    ```