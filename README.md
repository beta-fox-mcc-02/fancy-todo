# fancy-todo

**Title**
----
  create todo

* **URL**`

`/todos` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`title, description, status, due_date` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "status": .....,
      "id": ....,
    "title": "....",
    "description": "....",
    "due_date": ".....",
    "UserId": ....,
    "updatedAt": ".....",
    "createdAt": "....."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ errors : [....] }` 

**Title**
----
  get all todo

* **URL**

`/todos` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `[
       { data }
       ]`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

**Title**
----
  get one todo

* **URL**

`/todos/:id` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "status": .....,
      "id": ....,
    "title": "....",
    "description": "....",
    "due_date": ".....",
    "UserId": ....
    "updatedAt": ".....",
    "createdAt": "....."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

    OR

   * **Code:** 404 <br />

    **Content:** `{ msg : "......" }` 

**Title**
----
  update todo

* **URL**

`/todos/:id` 

* **Method:**

`PUT` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

   `title, description, status, due_date

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      msg : 'there's no data with id ${req.params.id}'
      }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ "msg" : 'there's no data with id ${req.params.id}' }` 

  OR

  + **Code:** 404 <br />

    **Content:** `{ "msg" : "there's no data with id ${req.params.id}" }` 
    

   OR

   * **Code:** 400 <br />

    **Content:** `{ errors: ['.....', '......'] }` 

**Title**
----
  update status todo

* **URL**

`/todos/:id` 

* **Method:**

`PATCH` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`status` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "status": .....,
      "id": ....,
    "title": "....",
    "description": "....",
    "due_date": ".....",
    "UserId": ....
    "updatedAt": ".....",
    "createdAt": "....."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

    OR

   * **Code:** 404 <br />

    **Content:** `{ msg : "data not found" }` 

   OR

   * **Code:** 401 <br />

    **Content:** `{ msg : "requirement doesn't met" }` 

**Title**
----
  delete todo

* **URL**

`/todos/:id` 

* **Method:**

`DELETE` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
       "msg" : "data with id ${req.params.id} has been deleted"

   }`
 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

    OR

   * **Code:** 404 <br />

    **Content:** `{ msg : "there's no data with id ${req.params.id}" }` 

**Title**
----
  create user

* **URL**

`/users/register` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`email, passwords` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": ...,
       "email": "...",
      "password": "...",
       "updatedAt": "...",
       "createdAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ errors : [....] }` 

**Title**
----
  login user

* **URL**

`/users/login` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`email, passwords` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "token": "...",
    "msg": "login successfully"
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 404 <br />

    **Content:** `{ "msg": "email / password is wrong" }` 

 OR

  + **Code:** 400 <br />

    **Content:** `{ "msg": "there's no token in your headers" }` 

OR

+ **Code:** 401 <br />

    **Content:** `{ "msg": "invalid token" }` 

**Title**
----
  get weather API

* **URL**

`/weathers/:city` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`city=['string']` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "weather": "...",
    "city": "...."
     }`

 
  + **Code:** 404 <br />

    **Content:** `{ "msg": "There's no city such as ${req.params.city}" }`
