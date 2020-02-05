# rest-api-todo

**Create Todo**
----
  

* **URL**

  http://localhost:3000/todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
    ```javascript
    {
        title: STRING,
		description: STRING,
		status: BOOLEAN,
        due_date: STRING
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
  *  **Content:** 

    ```javascript
    {
        "data": {
            "id": 17,
            "title": "naik phase 3",
            "description": "naik ke phase 3 secepatnya dan harus diatas 80%",
            "status": false,
            "due_date": "Mei",
            "updatedAt": "2020-02-03T12:26:32.017Z",
            "createdAt": "2020-02-03T12:26:32.017Z"
        },
        "msg": "success create todo"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
  *  **Content:** 

    ```javascript
    {
        message: "title cant be empty"
    }
    ```


  OR

  * **Code:** 500 Internal Server Error <br />
  *  **Content:** 
  
    ```javascript
    {
        message: "Internal Server Error"
    }
    ```

**Find All Todo**
----
  

* **URL**

  http://localhost:3000/todos

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** 
  
    ```javascript
    {
    "data": [
        {
            "id": 1,
            "title": "lulus hacktiv8",
            "description": "lulus hacktiv8 secepatnya dan minimal graduate",
            "status": false,
            "due_date": "Mei",
            "createdAt": "2020-02-03T07:35:16.133Z",
            "updatedAt": "2020-02-03T08:19:40.849Z"
        },
        {
            "id": 5,
            "title": "naik phase 3",
            "description": "naik ke phase 3 secepatnya dan harus diatas 85%",
            "status": false,
            "due_date": "April",
            "createdAt": "2020-02-03T08:22:30.303Z",
            "updatedAt": "2020-02-03T08:23:58.908Z"
        }],
        "msg": "success find all"
    }
    ```
    
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
  *  **Content:** `
    ```javascript
    {
        message: "Internal Server Error"
    }
    ```

**Find Todo by id**
----
  

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

   ```javascript
    id = INTEGER
   ```

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** 
    
    ```javascript
    {
        "data": {
            "id": 5,
            "title": "naik phase 3",
            "description": "naik ke phase 3 secepatnya dan harus diatas 85%",
            "status": false,
            "due_date": "April",
            "createdAt": "2020-02-03T08:22:30.303Z",
            "updatedAt": "2020-02-03T08:23:58.908Z"
        },
            "msg": "success find by id"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
  *  **Content:** 
    ```javascript
    {
        message: "error, data [id] not found"
    }
    ```

**Update Todo by id**
----
  

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

   ```javascript
    id = INTEGER
   ```

* **Data Params**

    **Required:**
    ```javascript
    {
        title: STRING,
		description: STRING,
		status: BOOLEAN,
        due_date: STRING
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** 
    
    ```javascript
    {
    "data": [
        null,
        {
            "id": 5,
            "title": "portofolio kewren",
            "description": "portofolio kudu keren biar muwantep",
            "status": false,
            "due_date": "Maret",
            "createdAt": "2020-02-03T08:22:30.303Z",
            "updatedAt": "2020-02-03T13:03:13.424Z"
        }
    ],
    "msg": "success update"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    *  **Content:** 

    ```javascript
    {
        message: "title cant be empty"
    }
    ```

    OR

    * **Code:** 404 Not Found <br />
    *  **Content:** 

    ```javascript
    {
        message: "error, data [id] not found"
    }
    ```

    OR

    * **Code:** 500 Internal Server Error <br />
    *  **Content:** `
    ```javascript
    {
        message: "Internal Server Error"
    }
    ```

**Delete Todo by id**
----
  

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

   ```javascript
    id = INTEGER
   ```

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** 
    
    ```javascript
    {
        "data": {
            "id": 5,
            "title": "portofolio kewren",
            "description": "portofolio kudu keren biar muwantep",
            "status": false,
            "due_date": "Maret",
            "createdAt": "2020-02-03T08:22:30.303Z",
            "updatedAt": "2020-02-03T13:03:13.424Z"
    },
        "msg": "success delete data"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
  *  **Content:** 
    ```javascript
    {
        message: "error, data [id] not found"
    }
    ```

    OR

    * **Code:** 500 Internal Server Error <br />
    *  **Content:** `
    ```javascript
    {
        message: "Internal Server Error"
    }
    ```

**Register**
----
  

* **URL**

  http://localhost:3000/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None

* **Data Params**

    ```javascript
    {
	"email":"lukman@gmail.com",
	"password":"12345"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
  *  **Content:** 
    
    ```javascript
    {
    "data": {
        "id": 1,
        "email": "lukman@gmail.com"
    },
    "msg": "success register"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    *  **Content:** 

    ```javascript
    {
        message: "email cant be empty"
    }
    ```

    OR

    * **Code:** 500 Internal Server Error <br />
    *  **Content:** `
    ```javascript
    {
        message: "Internal Server Error"
    }
    ```

**Login**
----
  

* **URL**

  http://localhost:3000/login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None

* **Data Params**

    ```javascript
    {
	"email":"lukman@gmail.com",
	"password":"12345"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
  *  **Content:** 
    
    ```javascript
    {
    "data": {
        "id": 1,
        "email": "lukman@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1a21hbmJhaWhhcWlAZ21haWwuY29tIiwiaWF0IjoxNTgwODExNzE1fQ.eIy3vbtZZql3oJIIOOX4wJlHcTxb1lJZA5eVK5Zl66c"
    },
    "msg": "login successfully"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    *  **Content:** 

    ```javascript
    {
        message: "Invalid username / password"
    }
    ```

    OR

    * **Code:** 500 Internal Server Error <br />
    *  **Content:** `
    ```javascript
    {
        message: "Internal Server Error"
    }
    ```

    