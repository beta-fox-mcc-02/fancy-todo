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

   **Required:**
 
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
              "id": "integer",
              "title": "string",
              "description": "string",
              "status": "boolean",
              "due_date": "date",
              "createdAt": "date",
              "updatedAt": "date"
          }
      ],
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

* **Method:**

  `POST`
  
*  **URL Params**
 
   None

* **Data Params**  
  **Required:**

  `title=[string]`<br>
  `description=[string]`<br>
  `status=[boolean]`<br>
  `due_date=[date]`

* **Success Response:**

  * **Code:** 201 <br />
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
      "message": "success findByID"
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