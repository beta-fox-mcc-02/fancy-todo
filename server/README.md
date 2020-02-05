# **REST API TODO**
***
## 1. Returns all of the JS0N data from database.

* **URL**

    /todos

* **Method:**

    `GET`

* **Data Params**

    None

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
    {
        "data": [
            {
                "id": 1,
                "title": "Complete rest-api-todo",
                "description": "Daily project",
                "status": false,
                "due_date": "2020-02-05T00:00:00.000Z",
                "createdAt": "2020-02-03T06:06:27.973Z",
                "updatedAt": "2020-02-03T06:06:27.973Z"
            },
            {
                "id": 3,
                "title": "Earn side money",
                "description": "Optionals",
                "status": false,
                "due_date": "2020-03-01T00:00:00.000Z",
                "createdAt": "2020-02-03T06:56:17.892Z",
                "updatedAt": "2020-02-03T06:56:17.892Z"
            }
        ],
        "msg": "success find all the data"
    }
    ```
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
  * **Content:** `{ error : "Internal Server Error" }`


***
## 2. Returns single data JSON which has been successfully appended into database.

* **URL**

    /todos

* **Method:**

    `POST`

* **Request Header:**

    ```javascript
    { "Content-Type": "application/json" }
    ```

* **Request Body:** 

    ```javascript
    {
        "title": "Earn side money",
        "description": "Optionals",
        "status": false,
        "due_date": "2020-02-30"
    }
    ```

* **URL Params**

    none

* **Data Params**

    ```javascript
    {
        "title": "Earn side money",
        "description": "Optionals",
        "status": false,
        "due_date": "2020-02-30"
    }
    ```

* **Success Response:**

    * **Code:** 201 <br />
    * **Content:** 
    ```javascript
    {
        "data": {
            "id": 8,
            "title": "Earn side money",
            "description": "Optionals",
            "status": false,
            "due_date": "2020-03-01T00:00:00.000Z",
            "updatedAt": "2020-02-03T07:44:58.763Z",
            "createdAt": "2020-02-03T07:44:58.763Z"
        },
        "msg": "Success adding new task"
    }
    ```
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    {
        "err": "BAD REQUEST",
        "msg": [
            "task title has to be more than 7 characters"
        ]
    }
    ```

  OR

    * **Code:** 500 Internal Server Error <br />
    * **Content:** `{ error : "Internal Server Error" }`

***
## 3. Returns single data JSON based on desired id.

* **URL**

    /todos/:id

* **Method:**

    `GET`

* **URL Params**

    **Required:** <br>
    `id=[integer]`

* **Data Params**

    none

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
    {
        "data": {
            "id": 1,
            "title": "Complete rest-api-todo",
            "description": "Daily project",
            "status": false,
            "due_date": "2020-02-05T00:00:00.000Z",
            "createdAt": "2020-02-03T06:06:27.973Z",
            "updatedAt": "2020-02-03T06:06:27.973Z"
        },
        "msg": "Success looking for data based on id 1"
    }
    ```
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        "err": "ERROR NOT FOUND"
    }
    ```

***
## 4. Returns single data JSON where it was successfully updated based on desired id.

* **URL**

    /todos/:id

* **Method:**

    `PUT`

* **Request Header:**

    ```javascript
    { "Content-Type": "application/json" }
    ```

* **URL Params**

    **Required:** <br>
    `id=[integer]`

* **Data Params**

    ```javascript
        {
            "title": "Learn REST API",
            "description": "Important task",
            "status": false,
            "due_date": "2020-02-05"
        }
    ```

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
    {
        "data": [
            {
                "id": 1,
                "title": "Learn REST API",
                "description": "Important task",
                "status": false,
                "due_date": "2020-02-05T00:00:00.000Z",
                "createdAt": "2020-02-03T06:06:27.973Z",
                "updatedAt": "2020-02-03T08:03:54.558Z"
            }
        ],
        "msg": "Success update task on id 1"
    }
    ```
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    {
        "err": "ERROR NOT FOUND"
    }
    ```
    OR

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        "err": "BAD REQUEST",
        "msg": [
            "task title has to be more than 7 characters",
            "Description has to be appropriate sentence",
            "Status has to be either true or false"
        ]
    }
    ```
    OR
    * **Code:** 500 Internal Server Error <br />
    * **Content:** `{ error : "Internal Server Error" }`

***
## 5. Returns message about deleting single data based on desired id.

* **URL**

    /todos/:id

* **Method:**

    `DELETE`

* **URL Params**

    **Required:** <br>
    `id=[integer]`

* **Data Params**

    none

* **Success Response:**

    * **Code:** 200 <br />
    * **Content:** 
    ```javascript
    {
        "data": 1,
        "msg": "Success delete task on id 8"
    }
    ```
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        "err": "BAD REQUEST",
        "msg": [
            "task title has to be more than 7 characters",
            "Description has to be appropriate sentence",
            "Status has to be either true or false"
        ]
    }
    ```
    OR
    * **Code:** 500 Internal Server Error <br />
    * **Content:** `{ error : "Internal Server Error" }`
