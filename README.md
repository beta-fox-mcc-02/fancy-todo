# rest-api-todo

# Todo Routes
| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /todos | POST |title, description, due_date |201(Created), 400(Bad Request), 500(Internal Server Error)|Add Todo|
| /todos | GET |none|200(OK), 500(Internal Server Error)|Show Todos|
| /todos/:id | GET |none|200(OK), 404(Not Found), 500(Internal Server Error)|Show Todo|
| /todos/:id | PUT |title, description, status, due_date|200(OK), 400(Bad Request), 404(Not Found), 500(Internal Server Error)|Edit Todo|
| /todos/:id | DELETE |none|200(OK), 404(Not Found), 500(Internal Server Error)|Delete Todo|

**Add Todo**
----
  Create a new todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
        title=[string],
        description=[string],
        due_date=[date]

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
        "data": {
        "id": 4,
        "title": "Go to gym",
        "description": "Do some physical excercises",
        "status": false,
        "due_date": "2020-02-07",
        "updatedAt": "2020-02-03T09:28:58.928Z",
        "createdAt": "2020-02-03T09:28:58.928Z"
    },
    "msg": "Todo has been successfully created"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "msg": "Bad Request",
    "errors": [
        "Title cannot be empty",
        "Description cannot be empty"
    ]
}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`

<!-- * **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ``` -->
----

**Show Todos**
----
  Show all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "title": "Study Biology",
        "description": "Study for the upcoming test",
        "status": false,
        "due_date": "2020-02-10",
        "createdAt": "2020-02-03T08:06:34.064Z",
        "updatedAt": "2020-02-03T08:06:34.064Z"
    },
    {
        "id": 3,
        "title": "Cook dinner",
        "description": "Cook dinner for tonight",
        "status": false,
        "due_date": "2020-02-03",
        "createdAt": "2020-02-03T08:21:12.709Z",
        "updatedAt": "2020-02-03T08:21:12.709Z"
    },
    {
        "id": 4,
        "title": "Go to gym",
        "description": "Do some physical excercises",
        "status": false,
        "due_date": "2020-02-07",
        "createdAt": "2020-02-03T09:28:58.928Z",
        "updatedAt": "2020-02-03T09:28:58.928Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`

----

**Show Todo**
----
  Show one todo.

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
    **Content:** `[
    {
        "id": 2,
        "title": "Study Biology",
        "description": "Study for the upcoming test",
        "status": false,
        "due_date": "2020-02-10",
        "createdAt": "2020-02-03T08:06:34.064Z",
        "updatedAt": "2020-02-03T08:06:34.064Z"
    },
    {
        "id": 3,
        "title": "Cook dinner",
        "description": "Cook dinner for tonight",
        "status": false,
        "due_date": "2020-02-03",
        "createdAt": "2020-02-03T08:21:12.709Z",
        "updatedAt": "2020-02-03T08:21:12.709Z"
    },
    {
        "id": 4,
        "title": "Go to gym",
        "description": "Do some physical excercises",
        "status": false,
        "due_date": "2020-02-07",
        "createdAt": "2020-02-03T09:28:58.928Z",
        "updatedAt": "2020-02-03T09:28:58.928Z"
    }
]`
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Data not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "msg": "Internal Server Error" }`

----

**Edit Todo**
----
  Edit one todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

        title=[string],
        description=[string],
        status=[boolean]
        due_date=[date]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "title": "Study Physics",
        "description": "Study for upcoming exam",
        "status": false,
        "due_date": "2020-02-08",
        "createdAt": "2020-02-03T08:06:34.064Z",
        "updatedAt": "2020-02-03T10:08:41.205Z"
    }
]`
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "msg": "Bad Request",
    "errors": [
        "Title cannot be empty"
    ]
}`

    OR

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Data not found' }`

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ "msg": "Internal Server Error" }`

----

**Delete Todo**
----
  Delete one todo.

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
    **Content:** `{ "msg": "Todo has been successfully deleted" }`
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Data not found' }`

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{ "msg": "Internal Server Error" }`