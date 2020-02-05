# rest-api-todo

**Show Todos**
----
  Returns json data all Todos.

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
    ```
    {
        "id": "....",
        "title": "....",
        "description": "....",
        "status": "....",
        "due_date": "....",
        "createdAt": "....",
        "updatedAt": "...."
    }
    ```
 
* **Error Response:**

    * **Code:** 401 <br />
    **Content:** 
    ```
    {
        "msg": "youre not authorized"
    }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```
    {
        "msg": "Internal Server Error"
    }
    ```

----

**Create Todos**
----
  Returns json new data Todos.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

    ```
    title:string
    description:string
    status:boolean
    due_date:date
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": ".....",
        "title": ".....",
        "description": ".....",
        "status": ".....",
        "due_date "......",
        "updatedAt "......",
        "createdAt"......."
    }
    ```
 
* **Error Response:**
    * **Code:** 400 <br />
    **Content:**
        ```
        {
            "errors": [
                "dont allow empty strings"
            ]
        }
        ```

    * **Code:** 500 <br />
    **Content:**
        ```
        {
            "msg": "Internal Server Error"
        }
        ```

----

**Show Todos By Id**
----
  Returns json data Todos based on Id.

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
    ```
    {
        "id": ".....",
        "title": ".....",
        "description": ".....",
        "status": ".....",
        "due_date": ".....",
        "updatedAt": ".....",
        "createdAt": "....."
    }
    ```
 
* **Error Response:**
    
    * **Code:** 401 <br />
    **Content:** 
    ```
    {
        "msg": "youre not authorized"
    }
    ```

  * **Code:** 404 <br />
    **Content:** 
    ```
    {
        "msg": "error. not found id"    
    }
    ```

----

**Update Todos**
----
  Returns json data Todos updated Based On Id.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    ```
    title:string
    description:string
    status:string
    due_date:string
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": ".....",
        "title": ".....",
        "description": ".....",
        "status": "....",
        "due_date": ".....",
        "updatedAt": ".....",
        "createdAt": "...."
    }
    ```
 
* **Error Response:**

    * **Code:** 401 <br />
    **Content:** 
    ```
    {
        "msg": "youre not authorized"
    }
    ```

    * **Code:** 400 <br />
        **Content:**
        ```
        {
            "errors": [
                "dont allow empty strings"
            ]
        }
        ``` 

    * **Code:** 404 <br />
        **Content:**
        ```
        {
            "msg": "error. not found id"
        }
        ``` 

    * **Code:** 500 <br />
    **Content:**
        ```
        {
            "msg": "Internal Server Error"
        }
        ```
----

**Delete Todos**
----
  Return json information delete.

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

    * **Code:** 401 <br />
    **Content:** 
    ```
    {
        "msg": "youre not authorized"
    }
    ```
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": ".....",
        "title": ".....",
        "description": "......",
        "status": "....",
        "due_date": ".....",
        "updatedAt": ".....",
        "createdAt": "....."
    }
    ```
 
* **Error Response:**
    * **Code:** 404 <br />
        **Content:**
        ```
        {
            "msg": "error. not found id"
        }
        ``` 

    * **Code:** 500 <br />
    **Content:**
        ```
        {
            "msg": "Internal Server Error"
        }


----


**Register Todos**
----
  Return json new user in todos.

* **URL**

  /register

* **Method:**

  `post`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
        "id": ".....",
        "email": "......",
        "password": ".......",
        "updatedAt": ".......",
        "createdAt": "......"
    }
    ```
 
* **Error Response:**
    * **Code:** 404 <br />
        **Content:**
        ```
        {
            "msg": "errors"
        }
        ``` 

    * **Code:** 500 <br />
    **Content:**
        ```
        {
            "msg": "Internal Server Error"
        }


----


**Login Todos**
----
  Return json json token.

* **URL**

  /login

* **Method:**

  `post`
  
*  **URL Params**

    None

* **Data Params**

    email:string
    password:string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        ""user": {
            "email": ".....",
            "id": "....."
        },
        "token": "....."
    }
    ```
 
* **Error Response:**
    * **Code:** 404 <br />
        **Content:**
        ```
        {
            "msg": "username/password wrong"
        }
        ```

    * **Code:** 400 <br />
        **Content:**
        ```
        {
            "msg": "username/password wrong"
        }
        ```

    * **Code:** 500 <br />
    **Content:**
        ```
        {
            "msg": "Internal Server Error"
        }