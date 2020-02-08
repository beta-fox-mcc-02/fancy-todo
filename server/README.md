# rest-api-todo

Base URL: `http://localhost:3000`

**Get Todos**
----
  Returns json data about todos.

* **URL**

  /todos/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  **  **Content:** 
      ```json
      [
        {
          "id": 1,
          "title": "Makan2",
          "description": "Makan sarapan",
          "status": false,
          "due_date": "2020-02-07T00:00:00.000Z",
          "createdAt": "2020-02-03T08:04:32.332Z",
          "updatedAt": "2020-02-03T08:18:23.682Z"
        },
        {
            "id": 4,
            "title": "Makan2",
            "description": "Makan sarapan",
            "status": false,
            "due_date": "2020-02-07T00:00:00.000Z",
            "createdAt": "2020-02-03T09:20:05.021Z",
            "updatedAt": "2020-02-03T09:20:05.021Z"
        }
      ]
      ```
 
* **Error Response:**

  * **Code:** 500 <br />
  *  **Content:** `{ msg : "Internal Server Error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
  *  **Content:** `{ msg : "No data found." }`
--------------

**Get One Todo**
----
  Returns json data about a todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id: string`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  **  **Content:** 
      ```json
      {
          "id": 1,
          "title": "Makan2",
          "description": "Makan sarapan",
          "status": false,
          "due_date": "2020-02-07T00:00:00.000Z",
          "createdAt": "2020-02-03T08:04:32.332Z",
          "updatedAt": "2020-02-03T08:18:23.682Z"
      }`
      ```
 
* **Error Response:**

  * **Code:** 500 <br />
  *  **Content :** 
    ```
    { msg : "Internal Server Error" }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
  *  **Content :** 
    ```
    { msg : "No data found." }
    ```

--------------

**Add Todo**
----
  Add data todo into db.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

* **Data Params**

  title: string   
  description: string   
  status: boolean   
  due_date: date

* **Success Response:**

  * **Code:** 201 <br />
  *  **Content:** 
      ```json
        {
        "todo": {
            "id": 4,
            "title": "Makan2",
            "description": "Makan sarapan",
            "status": false,
            "due_date": "2020-02-07T00:00:00.000Z",
            "updatedAt": "2020-02-03T09:20:05.021Z",
            "createdAt": "2020-02-03T09:20:05.021Z"
        },
        "msg": "Create todo success"
      }
      ```

* **Error Response:**

  * **Code:** 500 <br />
  *  **Content:** 
      ```
      { msg : "Internal Server Error" }
      ```

    OR

  * **Code:** 400 BAD REQUEST <br />
  *  **Content:** 
      ```
      { msg : "Validation error" }
      ```

--------------

**Update Todo**
----
  Update data todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id: string`

* **Data Params**

  title: string   
  description: string   
  status: boolean   
  due_date: date

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** `
   {
    "todo": [
        1
    ],
    "msg": "update todo success"
}`
 
* **Error Response:**

  * **Code:** 500 <br />
  *  **Content:** `{ msg : "Internal Server Error" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
  *  **Content:** `{ msg : "Validation error" }`


--------------

**Update Status Todo**
----
  Update todo status data.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id: string`

* **Data Params**

  status: boolean   

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** `
   {
    "todo": [
        1
    ],
    "msg": "update status success"
}`
 
* **Error Response:**

  * **Code:** 500 <br />
  *  **Content:** `{ msg : "Internal Server Error" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
  *  **Content:** `{ msg : "Validation error" }`

--------------

**Delete Todo**
----
  Delete data todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id: string`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** `
   {
    "todo": 1,
    "msg": "Delete todo success"
}`
 
* **Error Response:**

  * **Code:** 500 <br />
  *  **Content:** `{ msg : "Internal Server Error" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
  *  **Content:** `{ msg : "Validation error" }`