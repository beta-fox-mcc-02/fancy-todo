# fancy-todo

**Add Todo**
----
    Make a new todo and Returns json data which contains title, description, status, due_date, createdAt, updatedAt.

* **URL**

  http://localhost:3000/todos

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   

* **Data Params**

    title : string,   
    description: string   
    status : boolean,    
    due_date : date

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {
        "msg" : "Create data success, 
        "data" : {
            id : 1, 
            title : "Learn Rest API", 
            description: "Learn how to create RESTful API with Expres", 
            status : false, 
            due_date : "2020-02-03T00:00:00.000Z", 
            cretedAt: "2020-02-03T08:10:53.372Z", 
            updatedAt: "2020-02-03T08:10:53.372Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    { 
        "msg" : 'bad request', 
        "errors" : ["Title is not empty"]
    }
    ```

  OR
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

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
***
  **Get All Todos**
----
  Returns array of json data for all available todos.

* **URL**

  http://localhost:3000/todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   none

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "msg" : "Find All Data Success" , 
        "data" : [
                    { id : 1, 
                    title : "Learn Rest API", 
                    description: "Learn how to create RESTful API with Expres", 
                    status : false, 
                    due_date : "2020-02-03T00:00:00.000Z", 
                    cretedAt: "2020-02-03T08:10:53.372Z", 
                    updatedAt: "2020-02-03T08:10:53.372Z"}
                ]
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error }
    ```


***
**Get Todo based on ID**
----
  Returns json data for todo contains title, description, status, due_date, createdAt, updatedAt.

* **URL**

  http://localhost:3000/todos/:id

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
    ```javascript
    { 
        "msg" : "Find Data By Id Success",
        "data" : {
                    id : 1, 
                    title : "Learn Rest API", 
                    description: "Learn how to create RESTful API with Expres", 
                    status : false, 
                    due_date : "2020-02-03T00:00:00.000Z", 
                    cretedAt: "2020-02-03T08:10:53.372Z", 
                    updatedAt: "2020-02-03T08:10:53.372Z"
                }  
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { "msg" : "Todo Is Not found" }
    ```
***

**Update Todo based on ID**
----
  edit one of attribute or attributes and Returns json data for todo contains title, description, status, due_date, createdAt, updatedAt.

* **URL**

  http://localhost:3000/todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

    title : string,   
    description: string   
    status : boolean,    
    due_date : date

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
    "msg": "Update data success",
    "data": [
        1,
        [
            {
                "id": 3,
                "title": "masa",
                "description": "Learn how to create RESTful API with Expres",
                "status": true,
                "due_date": "2020-01-29T00:00:00.000Z",
                "createdAt": "2020-02-03T06:48:56.968Z",
                "updatedAt": "2020-02-03T11:27:21.753Z"
            }
        ]
    ]
    }
    ```
 
* **Error Response:**

     * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    { 
        "msg" : 'bad request', 
        "errors" : ["Title is not empty"]
    }
    ```

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { "msg" : "Todo Is Not found" }
    ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```
***

**Delete Todo based on ID**
----
  Returns json data contains total todo which deleted

* **URL**

  http://localhost:3000/todos/:id

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
    ```javascript
    {
    "msg": "Delete data success",
    "data": 1
}
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    { "msg" : "Todo Is Not found" }
    ```

OR

* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***