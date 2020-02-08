**Show All Todos**
----
  Returns json data about todos.

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
    **Content:** `{ 
      
    ```json
    {
        "data": [
            {
                "id": 1,
                "title": "minum air",
                "description": "wajib",
                "status": false,
                "due_date": "2020-02-03T00:00:00.000Z",
                "UserId": 1,
                "createdAt": "2020-02-04T11:24:42.248Z",
                "updatedAt": "2020-02-04T11:24:42.248Z"
            }
        ],
        "airQuality": 27919,
        "msg": "this is todos"
    }
    ```
     }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
        "msg": "You Must Login First "
    }
    ```
    

**Insert New Todo**
----
  Insert new todo and return the new added todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
 
   `title=[string]`<br>
   `description=[string]`<br>
   `status=[boolean]`<br>
   `title=[string]`<br>
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
      
    ```json
    {
      "data": {
          "id": 8,
          "title": "read book",
          "description": "hobby",
          "status": false,
          "due_date": "2020-02-03T00:00:00.000Z",
          "updatedAt": "2020-02-03T10:37:04.785Z",
          "createdAt": "2020-02-03T10:37:04.785Z"
      },
      "msg": "succes insert new todo"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }` 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "title shouldn't be empty",
          "description shouldn't be empty",
          "type must be date"
        ]
    }
    ```
  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
        "msg": "You Must Login First "
    }
    ```    

**Find a Todo**
----
   Return one list of todo in JSON data .

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "data": {
            "id": 2,
            "title": "dsf",
            "description": "sdfsd",
            "status": false,
            "due_date": "2020-02-03T00:00:00.000Z",
            "createdAt": "2020-02-03T06:34:16.390Z",
            "updatedAt": "2020-02-03T10:08:42.076Z"
        },
        "msg": "these is find by id"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
      "msg": "Not Found",
      "error": "data not found"
    }
    ```
  * **Code:** 403 FORBIDDEN <br />
    **Content:** 
    ```json
    {
        "msg": "You Must Login First "
    }
    ```
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "You are not Authorized"
    }
    ```            
**Update a Todo**
----
   Return one list of updated todo in JSON data .

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   **Required:**
 
   `title=[string]`<br>
   `description=[string]`<br>
   `status=[boolean]`<br>
   `title=[string]`<br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "data": {
            "id": 2,
            "title": "dsf",
            "description": "sdfsd",
            "status": false,
            "due_date": "2020-02-03T00:00:00.000Z",
            "createdAt": "2020-02-03T06:34:16.390Z",
            "updatedAt": "2020-02-03T10:08:42.076Z"
        },
        "msg": "succes update"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Bad Request",
      "error": [
          "title shouldn't be empty",
          "description shouldn't be empty",
          "type must be date"
        ]
    }
    ``` 

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "msg": "Not Found",
      "error": "data not found"
    }
    ```
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "You are not Authorized"
    }
    ```    

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`  

**Delete a Todo**
----
   Delete and Return status of delete in json data.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
      "data": 1,
      "msg": "succes delete data"
    }
    ```
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "msg": "Not Found",
      "error": "data not found"
    }
    ```

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    {
      "msg": "You are not Authorized"
    }
    ```

**Register New User**
----
   Register New User and return data new user in json data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
      
    ```json
    {
        "id": 11,
        "email": "adi@mail.com",
        "msg": "succesfully register"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "msg": "Email Already Registered"
    }
    ```    
**Register New User**
----
   Register New User and return data new user in json data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
        "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhbmRpQG1haWwuY29tIiwiaWF0IjoxNTgwODI3MTUzfQ.1yUB0OWyOY60RbrDPou_qEMuOMQE9z2iieZq3PmG5fk"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
        "msg": "Invalid Email/Password"
    }
    ```        
**Find a Todo**
----
   Return a quote from 3rd party APIs  in JSON data .

* **URL**

  /quote

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      
    ```json
    {
    "quote": "Fear not for the future, weep not for the past. ",
    "author": "Percy Shelley"
    }
    ```
 
* **Error Response:**

 * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error" }`
       
--------
**3rd Party APIs**

* **forismatic**
  * **URL:** http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en_ <br />
