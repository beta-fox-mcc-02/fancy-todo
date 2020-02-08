# fancy-todo

* **BASE URL**

  http://localhost:3000

# Todo #

**create**
----

* **URL**

  /todos

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "createdAt": <due_date>,
        "updatedAt": <due_date>
    }`
 
* **Error Response:**

   **Code:** 500 ERROR <br />
    **Content:** `{ error : "" }`


**findAll**
----

* **URL**

  /todos

* **Method:**

  `GET`

* **Data Params**

  `{
      "id": ... ,
      "title": ... ,
      "description": ... ,
      "status": ... ,
      "due_date": ...
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "createdAt": <date>,
        "updatedAt": <date>
    }`
 
* **Error Response:**

   **Code:** 500 ERROR <br />
    **Content:** `{ error : "Validation error" }`

**findByPk**
----

* **URL**

  /todos/:id

* **Method:**

  `GET`

*  **URL Params**

  todos/:id

**Required:**

`id=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "createdAt": <date>,
        "updatedAt": <date>
    }`
 
* **Error Response:**

   **Code:** 500 ERROR <br />
    **Content:** `{ error : "Sequelize error, data    cannot be found" }`

**update**
----

* **URL**

  /todos/:id

* **Method:**

  `PUT`

*  **URL Params**

  todos/:id

**Required:**

`id=[integer]`

* **Data Params**

  `{
      "id": ... ,
      "title": ... ,
      "description": ... ,
      "status": ... ,
      "due_date": ...
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "createdAt": <date>,
        "updatedAt": <date>
    }`
 
* **Error Response:**

   **Code:** 500 ERROR <br />
    **Content:** `{ error : "Bad request" }`

**destroy**
----

* **URL**

  /todos

* **Method:**

  `DELETE`

*  **URL Params**

  todos/:id

**Required:**

`id=[integer]`

* **Data Params**

  `{
      "id": ... ,
      "title": ... ,
      "description": ... ,
      "status": ... ,
      "due_date": ...
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "createdAt": <date>,
        "updatedAt": <date>
    }`
 
* **Error Response:**

   **Code:** 400 ERROR <br />
    **Content:** `{ error : "Bad request" }`

----

# User #

**findAll**
----

* **URL**

  /users/findAll

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "username": <username>,
        "email": <email>,
        "createdAt": <date>,
        "updatedAt": <date>
    }`
 
* **Error Response:**

   **Code:** 400 ERROR <br />
    **Content:** `{ error : "Internal server error" }`


 **register**
----

* **URL**

  /users/register

* **Method:**

  `POST`

  * **Data Params**

  `{
      "username": ... ,
      "email": ... ,
      "password": ... ,
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "username": <username>,
        "email": <email>,
        "createdAt": <date>,
        "updatedAt": <date>
    }`
 
* **Error Response:**

   **Code:** 500 ERROR <br />
    **Content:** `{ error : "Sequelize error" }`
    `{ error : "Sequelize validation error" }`



** login **
---

* **URL**

  /users/login

* **Method:**

  `POST`

  * **Data Params**

  `{
      "username": ... (required),
      "email": ... ,
      "password": ... (required),
    }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": <id>,
        "username": <username>,
        "email": <email>,
        "createdAt": <date>,
        "updatedAt": <date>
    }, msg: "login success"`
 
* **Error Response:**

   **Code:** 400 ERROR <br />
    **Content:** `{ error : "Auth error" }`

