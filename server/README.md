# rest-api-todo

* **URL**

  http://localhost:3000

* **Method:**

  `GET` | `POST` | `DELETE` | `PUT`

* **.env Template**
  ```txt
  SECRET=
  PORT=
  SALT=
  ```

* **Third Party API Key**
  ```txt
  f55c06eeac586dffb59e833f89d103316113246d
  ```
  
**Show Todos**
----
  Returns json data about all todo.

* **URL**

  /todos

* **Method:**

  `GET`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYW16YWhAbWFpbC5jb20iLCJpYXQiOjE1ODA4MTU4NzV9.x9giDxABRbxn_uKUEU0uwESFv9mYsBaJdmphP3WKxqU'

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "data": [
          {
              "id": 10,
              "title": "test title2",
              "description": "test description",
              "status": false,
              "due_date": "2020-01-29T00:00:00.000Z",
              "createdAt": "2020-02-03T08:19:48.398Z",
              "updatedAt": "2020-02-03T08:19:48.398Z"
          }
      ],
      "msg": "success fetch all todos"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```

**Show Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Headers**

  'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYW16YWhAbWFpbC5jb20iLCJpYXQiOjE1ODA4MTU4NzV9.x9giDxABRbxn_uKUEU0uwESFv9mYsBaJdmphP3WKxqU'

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "data": {
          "id": 11,
          "title": "test title",
          "description": "test description",
          "status": false,
          "due_date": "2020-01-29T00:00:00.000Z",
          "createdAt": "2020-02-03T08:20:50.224Z",
          "updatedAt": "2020-02-03T08:20:50.224Z"
      },
      "msg": "success fetch todo id: 11"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```
  
    OR
  
  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```


**Create Todo**
----
  Returns json data about new todo.

* **URL**

  /todos

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json',
  
  'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYW16YWhAbWFpbC5jb20iLCJpYXQiOjE1ODA4MTU4NzV9.x9giDxABRbxn_uKUEU0uwESFv9mYsBaJdmphP3WKxqU'
  
* **data-raw**

  ```json
  {
    "title": "",
    "description": "test description",
    "status": false,
    "due_date": "2020-01-29"
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />
    ```json
    {
        "data": {
          "id": 12,
          "title": "new todo",
          "description": "test description",
          "status": "false",
          "due_date": "2020-01-29T00:00:00.000Z",
          "updatedAt": "2020-02-03T10:51:47.226Z",
          "createdAt": "2020-02-03T10:51:47.226Z"
        },
        "msg": "success create todo"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "Bad Request",
          "errors": [
              "title cannot empty"
          ]
      }
    }
    ```


**Update Todo**
----
  Returns json data about updated todo.

  * **URL**

    /todos/:id

  * **Method:**

    `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers**

  'Content-Type: application/json',
  
  'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYW16YWhAbWFpbC5jb20iLCJpYXQiOjE1ODA4MTU4NzV9.x9giDxABRbxn_uKUEU0uwESFv9mYsBaJdmphP3WKxqU'
    
  * **data-raw**

    ```json
    {
      "title": "test title",
      "description": "test description",
      "status": "test status",
      "due_date": "2020-01-29"
    }
    ```

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** <br />
      ```json
      {
        "data": [
            1,
            [
                {
                    "id": 11,
                    "title": "test title",
                    "description": "test description",
                    "status": "test status",
                    "due_date": "2020-01-29T00:00:00.000Z",
                    "createdAt": "2020-02-03T08:20:50.224Z",
                    "updatedAt": "2020-02-03T11:06:29.256Z"
                }
            ]
        ],
        "msg": "success update todo"
      }
      ```
  
  * **Error Response:**

    * **Code:** 500 <br />

      OR

    * **Code:** 400 <br />
      **Content:**
      ```json
      {
        "errObj": {
            "msg": "Bad Request",
            "errors": [
                "title cannot empty"
            ]
        }
      }
      ```

    * **Code:** 404 NOT FOUND <br />
      **Content:**
      ```json
      {
        "errObj": {
            "msg": "not found"
        }
      }
      ```

      OR

    * **Code:** 401 Unauthorized <br />
      **Content:** 
      
      ```json
      {
        "errObj": {
            "msg": "you have to login first"
        }
      }
      ```

      ```json
      {
        "message": "not authorized"
      }
      ```

**Delete Todos**
----

* **URL**

  /todos/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Headers**

  'Content-Type: application/json',
  
  'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYW16YWhAbWFpbC5jb20iLCJpYXQiOjE1ODA4MTU4NzV9.x9giDxABRbxn_uKUEU0uwESFv9mYsBaJdmphP3WKxqU'

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "data": 1,
      "msg": "success delete todo id: 9"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "not found"
      }
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:** 
    
    ```json
    {
      "errObj": {
          "msg": "you have to login first"
      }
    }
    ```
    ```json
    {
      "message": "not authorized"
    }
    ```

**Register User**
----
  Returns json data payload new user.

* **URL**

  /users/register

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json'
  
* **data-raw**

  ```json
  {
    "email": "user@mail.com",
    "password": "123456"
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />
    ```json
    {
      "payload": {
          "id": 6,
          "email": "newUser@mail.com"
      },
      "msg": "successully register"
    }
    ```
   
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "errObj": {
          "msg": "Bad Request",
          "errors": [
              "not an email format",
              "password required minimum length 6"
          ]
      }
    }
    ```

**Login User**
----
  Returns json data token.

* **URL**

  /users/login

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

  None

* **Headers**

  'Content-Type: application/json'
  
* **data-raw**

  ```json
  {
    "email": "user@mail.com",
    "password": "123456"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
      "message": "succesfully login",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJoYW16YWhAbWFpbC5jb20iLCJpYXQiOjE1ODA4MTU4NzV9.x9giDxABRbxn_uKUEU0uwESFv9mYsBaJdmphP3WKxqU"
    }
    ```
   
* **Error Response:**

  * **Code:** 500 <br />

      OR

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
      "message": "Username / password wrong"
    }
    ```

**Show Holidays**
----
  Returns json data about all holidays.

* **URL**

  /holidays

* **Method:**

  `GET`

*  **URL Params**

    None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />
    ```json
    {
    "message": "successfully get holiday from calendarrific api",
    "data": [
        {
            "name": "New Year's Day",
            "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
            "date": {
                "iso": "2019-01-01",
                "datetime": {
                    "year": 2019,
                    "month": 1,
                    "day": 1
                }
            },
            "type": [
                "National holiday"
            ],
            "locations": "All",
            "states": "All"
        }
      ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
