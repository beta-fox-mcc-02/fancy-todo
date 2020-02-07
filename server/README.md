# FANCY TODO #
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

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

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

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ Created Item }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

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
      
* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ A Single Todo (by ID) }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

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

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ title, description, status, due_date }`
 
* **Error Response:**
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Not Found" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

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

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Todo Deleted Successfully' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'Not authorized' }`

<br>

**Show Collaborator's ID**
----
  Show collaborator's ID.

* **URL**

      /todos/collaborator

* **Method:**

  `GET`

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ Collaborator ID }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Add Collaborator**
----
  Add collaborator.

* **URL**

      /todos/collaborator

* **Method:**

  `POST`

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Collaborator added successfully' }`
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'Failed. User already registered as a collaborator' }`
<br>

**Show Collaborator's Email**
----
  Show collaborator's email by ID.

* **URL**

      /todos/collaborator/:id

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      id (integer)

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ Collaborator's ID, Collaborator's Email }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`
<br>
<br>

---
## **User's Route** ##

**Register**
----
  Register as a new member.

* **URL**

      /register

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**
  * **email** : string
  * **password** : string

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

<br>

**Login**
----
  Login by email and password.

* **URL**

      /register

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**
  * **email** : string
  * **password** : string

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User's Token, User's Email }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg: 'Invalid Username / Password' }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

<br>

**Google Login**
----
  Login by a google account.

* **URL**

      /google-auth

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User's Token, User's Email }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

<br>

---
# FANCY FEATURES #

## GOOGLE GEOCODE ##
    Turn a location (address) into coordinates

## GOOGLE MAPS JAVASCRIPT API ##
    Turn coordinates into real map view (with a marker too, of course)

## COLLABORATOR ##
    You can add a collaborator (or two, three, four maybe? as you wish) so you don't have to manage todos by yourself