# TODOS #
### REST API built with Express and Sequelize ###
----

**REST API TODOS**
----

* **BASE URL**
  
      localhost:3000

* **Method:**
  
  `GET` | `POST` | `PUT` | `DELETE`
  

<br>

**Show Todos**
----
  Get all the todos info.

* **URL**

      /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ Todos }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

<br>

**Add Todo**
----
  Create a todo.

* **URL**

      /todos

* **Method:**

  `POST`

* **Data Params**

    * **title** : string
    * **description** : string
    * **due_date** : date

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ Created Item }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

<br>

**Show Todo by ID**
----
  Get a single todo info.

* **URL**

      /todos/:id

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      id (integer)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ A Single Todo (by ID) }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

<br>

**EDIT Todo by ID**
----
  Update a todo with new info.

* **URL**

      /todos/:id

* **Method:**

  `PUT`

* **Params**
  
  **Required:**
 
      id (integer)

* **Data Params**

  * **title** : string
  * **description** : string
  * **due_date** : date

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ title, description, status, due_date }`
 
* **Error Response:**
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Not Found" }`

<br>

**Delete Todo by ID**
----
  Delete a todo.

* **URL**

      /todos/:id

* **Method:**

  `DELETE`

* **Params**
  
  **Required:**
 
      id (integer)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Todo Deleted Successfully' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`