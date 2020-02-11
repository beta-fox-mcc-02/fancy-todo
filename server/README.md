# rest-api-todo

**Show all task**
----
  Returns json data of all task.

* **URL**

  /todos/

* **Method:**

  `GET`
  
*  **URL Params**

    None

  * **Headers**  
    **Authentication:**

    `access_token`
   
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "data": [{
        "id": 2,
        "title": "Tes",
        "description": "Deskripsi",
        "status": false,
        "due_date": "2020-02-12T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-02-11T13:07:54.341Z",
        "updatedAt": "2020-02-11T13:07:54.341Z"
      }],
      "message": "Success find all"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal server error <br />
    **Content:** 
    ```json
    {
      "message": "Internal server error",
      "errors": []
    }
    ```

<br><br>
**Create new task**
----
  Create and returns json data of a new task.

* **URL**

  /todos/

 * **Headers**  
    **Authentication:**

    `access_token`

* **Method:**

  `POST`
  
*  **URL Params**
 
   None

* **Data Params**  
  **Required:**

  `title=[string]`<br>
  `description=[string]`<br>
  `due_date=[date]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
      "data": {
        "status": false,
        "id": 3,
        "title": "New todo",
        "description": "Todo's description",
        "due_date": "2020-02-08T00:00:00.000Z",
        "UserId": 1,
        "updatedAt": "2020-02-11T13:27:41.903Z",
        "createdAt": "2020-02-11T13:27:41.903Z"
      },
      "message": "success creating task"
    }
    ```

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
      ```json
    {
      "message": "Internal server error",
      "errors": []
    }
    ```

  OR

  * **Code:** 400 Bad request <br />
    **Content:** 
    ```json
    {
        "message": "Bad request",
        "errors": [
            "Error from validation"
        ]
    }
    ```


<br><br>
**Find by ID**
----
  Returns json data of a task.

* **URL**

  /todos/:id

 * **Headers**  
    **Authentication:**

    `access_token`

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
          "title": "Tes",
          "description": "Deskripsi",
          "status": false,
          "due_date": "2020-02-12T00:00:00.000Z",
          "UserId": 1,
          "createdAt": "2020-02-11T13:07:54.341Z",
          "updatedAt": "2020-02-11T13:07:54.341Z"
        },
        "message": "success findById"
      }
    ```

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** 
      ```json
    {
      "message": "Internal server error",
      "errors": []
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "Not found",
      "errors": [
          "Task with id 5 not found"
      ]
    }
    ```


<br><br>
**Update by ID**
----
  Updates and returns json data of a task.

* **URL**

  /todos/:id

* **Headers**  
    **Authorization:**

    `access_token`

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
  `due_date=[date]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "data": [
          {
              "id": "integer",
              "title": "string",
              "description": "string",
              "status": "boolean",
              "due_date": "date",
              "createdAt": "date",
              "updatedAt": "date"
          }
      ],
      "message": "Success updating task"
    }
    ```

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
      ```json
    {
      "message": "Internal server error",
      "errors": []
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "Not found",
      "errors": [
          "Task with id 5 not found"
      ]
    }
    ```

  OR

  * **Code:** 400 Bad request <br />
    **Content:** 
    ```json
    {
        "message": "Bad request",
        "errors": [
            "Error from validation"
        ]
    }
    ```

<br><br>
**Delete by ID**
----
  Delete data of a task.

* **URL**

  /todos/:id

* **Headers**  
    **Authentication:**

    `access_token`

* **Method:**

  `DELETE`
  
*  **URL Params**

    **Required:**
   
    `id=[integer]`


* **Data Params**

  ```
  None
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    None
    ```

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:**
      ```json
    {
      "message": "Internal server error",
      "errors": []
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "Not found",
      "errors": [
          "Task with id 5 not found"
      ]
    }
    ```