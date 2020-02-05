**REST API TODO**
----
  Membuat REST API dengan Express dan Sequelize 

* **BASE URL**

  http://localhost:3000
  

**CREATE TODO**
---

*  **URL**

    `/todos`

* **Method:**

  `POST`
  

* **Data Params**
```
  title      : STRING
  description: STRING
  status     : BOOLEAN
  due_date   : DATE
```
* **Success Response:**

  * **Status:** 201 <br />
    **Content:** <br />
    ```
    [
        {
            "id": 1,
            "title": "REST API",
            "description": "Initial Study",
            "status": false,
            "due_date": "2020-02-03T00:00:00.000Z",
            "createdAt": "2020-02-03T07:14:05.920Z",
            "updatedAt": "2020-02-03T07:14:05.920Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Status:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```
    {
        "message": [
            "Bad Request",
            "Title can't be empty, please fill the title"
        ]
    }
    ```
    
  * **Status:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```
    {
        "message": "Internal Server Error"
    }
    ```


**FIND ALL**
---

*  **URL**

    `/todos`

* **Method:**

  `GET`
  

* **Success Response:**

  * **Status:** 201 <br />
    **Content:** <br />
    ```
    [
        {
            "id": 1,
            "title": "REST API",
            "description": "Initial Study",
            "status": false,
            "due_date": "2020-02-03T00:00:00.000Z",
            "createdAt": "2020-02-03T07:14:05.920Z",
            "updatedAt": "2020-02-03T07:14:05.920Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Status:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```
    {
        "message": "Internal Server Error"
    }
    ```


**FIND ONE**
---
*  **URL**

    `/todos/:id`

* **Method:**

  `GET`
  

* **Success Response:**

  * **Status:** 200 <br />
    **Content:** <br />
    ```
    [
        {
            "id": 1,
            "title": "REST API",
            "description": "Initial Study",
            "status": false,
            "due_date": "2020-02-03T00:00:00.000Z",
            "createdAt": "2020-02-03T07:14:05.920Z",
            "updatedAt": "2020-02-03T07:14:05.920Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Status:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
        "message": [
            "ID does not exists"
        ]
    }
    ```
    
  * **Status:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```
    {
        "message": "Internal Server Error"
    }
    ```

**UPDATE ONE**
---
*  **URL**

    `/todos/:id`

* **Method:**

  `PUT`
  

* **Data Params**
```
  title      : STRING
  description: STRING
  status     : BOOLEAN
  due_date   : DATE
```
* **Success Response:**

  * **Status:** 200 <br />
    **Content:** <br />
    ```
        [
            {
                "id": 1,
                "title": "REST API",
                "description": "Advance Study",
                "status": true,
                "due_date": "2020-04-25T00:00:00.000Z",
                "createdAt": "2020-02-03T07:14:05.920Z",
                "updatedAt": "2020-02-03T10:48:38.154Z"
            }
        ]
    ```
 
* **Error Response:**

  * **Status:** 400 VALIDATION ERROR <br />
    **Content:** 
    ```
    {
        "message": [
            "Bad Request",
            "Title can't be empty, please fill the title"
        ]
    }
    ```
  * **Status:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
        "message": [
            "ID does not exists"
        ]
    }
    ```
    
  * **Status:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```
    {
        "message": "Internal Server Error"
    }

**DELETE ONE**
---
*  **URL**

    `/todos/:id`

* **Method:**

  `DELETE`
  

* **Success Response:**

  * **Status:** 200 <br />
    **Content:** <br />
    ```
    [
        {
            "id": 1,
            "title": "REST API",
            "description": "Initial Study",
            "status": false,
            "due_date": "2020-02-03T00:00:00.000Z",
            "createdAt": "2020-02-03T07:14:05.920Z",
            "updatedAt": "2020-02-03T07:14:05.920Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Status:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
        "message": [
            "ID does not exists"
        ]
    }
    ```
    
  * **Status:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```
    {
        "message": "Internal Server Error"
    }