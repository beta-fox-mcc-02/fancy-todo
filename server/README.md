# rest-api-todo

***Read Todos***
----
  Returns json data about all todo list.
  
* **URL**

  /todos

* **Method**

  `GET`

* **URL Params**
  
  None

* **Data Params**
  
  None

* **Success Response:**
  
  **Code:** 200 <br />
  **Content:** 
  ```javascript
    {
        "data" : [
            {
                id : 1,
                title : "todos1",
                description : "description",
                status : true/false,
                due_date: DATE
            },...
        ]
    }

* **Error Response:**

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {   
        msg : 'something wrong with server or database'
    }
    ```


***Read By Id***
----
  Returns json data about todo list by id.
  
* **URL**

  /todos/:id

* **Method**

  `GET`

* **URL Params**
  
  **required**
  
  `id=[integer]`

* **Data Params**
  
  None

* **Success Response:**
  
  **Code:** 200 <br />
  **Content:** 
  ```javascript
    {
        "data" : 
        {
            id : id,
            title : "title",
            description : "description",
            status : true/false,
            due_date: DATE
        }
    }
    ```

* **Error Response:**

  **Code:** 404 <br />
  **Content:** 
  ```javascript
    {   
        msg : 'Data not Found'
    }
    ```


***Insert Todos***
----
  Insert new todo list to json data.
  
* **URL**

  /todos

* **Method**

  `POST`

* **URL Params**
  
  None

* **Data Params**
  
  **required**

  ```javascript
  {
      title : "title",
      description : "description",
      status : status,
      due_date : DATE
  }
  ```

* **Success Response:**
  
  **Code:** 201 <br />
  **Content:** 
  ```javascript
    {   "data" : 
        {
            id : 1, 
            title : "todos1", 
            description : "description", 
            status : true/false, 
            due_date: DATE
        },
            msg : "insert new data succes"
    }
    ````

* **Error Response:**

  **Code:** 400 <br />
  **Content:** 
  ```javascript
    {
        msg : 'Empty is not allowed'
    }
    ```

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {
        msg : 'something wrong with server or database'
    }
    ```

***Update Todos***
----
  Update todo list in json data by id.
  
* **URL**

  /todos/:id

* **Method**

  `PUT`

* **URL Params**
  
  **required**

  `id=[integer]`

* **Data Params**

  **required**

  ```javascript  
  {
      title : "title",
      description : "description",
      status : status,
      due_date : DATE
  }
  ```  
* **Success Response:**
  
  **Code:** 200 <br />
  **Content:** 
  ```javascript
    {
      msg : 'todo Id ${id} successfuly updated'
    }
    ```

* **Error Response:**

  **Code:** 400 <br />
  **Content:** 
  ```javascript
    {
        msg : 'Empty is not allowed'
    }
    ```

  **Code:** 404 <br />
  **Content:** 
  ```javascript
    {
        msg : 'Data not Found'
    }
    ```

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {
        msg : 'something wrong with server or database'
    }
    ```

***Delete Todos***
----
  Delete todo list in json data by id.
  
* **URL**

  /todos/:id

* **Method**

  `DELETE`

* **URL Params**
  
  **required**

  `id=[integer]`

* **Data Params**

  None

* **Success Response:**
  
  **Code:** 200 <br />
  **Content:** 
  ```javascript
    {
      msg : 'todo Id ${id} successfuly deleted'
    }
    ```
* **Error Response:**

  **Code:** 404 <br />
  **Content:** 
  ```javascript
    {
        msg : 'Data not Found'
    }
    ```

  **Code:** 500 <br />
  **Content:** 
  ```javascript
    {
        msg : 'something wrong with server or database'
    }
    ```