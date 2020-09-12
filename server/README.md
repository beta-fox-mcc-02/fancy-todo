# Todos routes
Base url : http://localhost:3000/

**Show Todos**
----
  Returns all json todos data.

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
    [
        {
            "id": 3,
            "title": "Learn REST API",
            "description": "Learn how to create RESTful API !",
            "status": false,
            "due_date": "2020-01-29T00:00:00.000Z",
            "createdAt": "2020-02-03T06:44:03.841Z",
            "updatedAt": "2020-02-03T06:44:03.841Z"
        },
        {
            "id": 2,
            "title": "create todo",
            "description": "create todo with API",
            "status": true,
            "due_date": "2020-01-29T00:00:00.000Z",
            "createdAt": "2020-02-03T06:43:01.872Z",
            "updatedAt": "2020-02-03T07:16:35.617Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ msg : "Server error" }`
 

**Create Todos**
----
  Create json todos data.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
   
   `title=[STRING]` \
   `desciprtion=[STRING]` \
   `status=[BOOLEAN]` \
   `due_date=[DATE]` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
         "data": {
            "id": 4,
            "title": "Learn REST API",
            "description": "Learn REST API",
            "status": false,
            "due_date": "2020-01-29T00:00:00.000Z",
            "updatedAt": "2020-02-03T10:41:06.941Z",
            "createdAt": "2020-02-03T10:41:06.941Z"
         },
         "msg": "success post todo list"
      }
    ```
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ msg : "Server error" }`


**Update Todos**
----
  Update json todos data.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**
   
   `title=[STRING]` \
   `desciprtion=[STRING]` \
   `status=[BOOLEAN]` \
   `due_date=[DATE]` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
   ```json
   {
      "data": [
         1,
         [
            {
               "id": 4,
               "title": "Learn REST API",
               "description": "Learn REST API 2",
               "status": false,
               "due_date":"2020-01-29T00:00:00.000Z",
               "createdAt":"2020-02-03T10:41:06.941Z",
               "updatedAt":"2020-02-03T10:49:08.909Z"
            }
         ]
      ],
         "msg": "success update by id"
   }
   ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Page not found" }`

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ msg : "Server error" }`

**Show One Todos Data**
----
  Show one json todos data.

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
        "id": 4,
        "title": "Learn REST API",
        "description": "Learn REST API 2",
        "status": false,
        "due_date": "2020-01-29T00:00:00.000Z",
        "createdAt": "2020-02-03T10:41:06.941Z",
        "updatedAt": "2020-02-03T10:49:08.909Z"
      },
         "msg": "success get todo list by id"
      }
   ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Page not found" }`

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ msg : "Server error" }`


**Delete Todos**
----
  Delete json todos data.

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
         "msg": "success get todo list by id"
      }
   ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Page not found" }`

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ msg : "Server error" }`


