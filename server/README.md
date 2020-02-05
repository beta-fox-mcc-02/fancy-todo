**Show Holiday by Month**
----
  Returns json data all holidays from params month.

* **URL**

  /holidays/:month

* **Method:**

    `GET`
  
*  **URL Params**

    `month=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "holidays": [
        {
            "name": "Eid al-Adha",
            "description": "Eid al-Adha (Id ul-Adha) is an Islamic festival falling on the 10th day of the month of Dhul Hijja (Thou al-Hijja) to commemorate the willingness of Ibrahim (Abraham) to sacrifice his son.",
            "date": {
                "iso": "2020-07-31",
                "datetime": {
                    "year": 2020,
                    "month": 7,
                    "day": 31
                }
            },
            "type": [
                "National holiday"
            ],
            "locations": "All",
            "states": "All"
        }
    ]}
* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Show Holiday**
----
  Returns json data all holidays from January to December.

* **URL**

  /holidays

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
    {
    "holidays": [
        {
            "name": "New Year's Day",
            "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
            "date": {
                "iso": "2020-01-01",
                "datetime": {
                    "year": 2020,
                    "month": 1,
                    "day": 1
                }
            },
            "type": [
                "National holiday"
            ],
            "locations": "All",
            "states": "All"
        },
        {
            "name": "Chinese Lunar New Year's Day",
            "description": "Chinese New Year is the first day of the Chinese calendar, which is a lunisolar calendar mainly used for traditional celebrations.",
            "date": {
                "iso": "2020-01-25",
                "datetime": {
                    "year": 2020,
                    "month": 1,
                    "day": 25
                }
            },
            "type": [
                "National holiday"
            ],
            "locations": "All",
            "states": "All"
        },
        ...etc
* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Login User**
----
  Login user.

* **URL**

  /login

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `email=[string]`\
    `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ1c2VyQG1haWwuY29tIiwiaWF0IjoxNTgwODM2N"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "message": "Bad request",
    "error": "email / password wrong"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Create User**
----
  Register new user.

* **URL**

  /register

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `email=[string]`\
    `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "id": 9,
    "email": "new@mail.com",
    "password": "$2a$10$AmMC7FYFFOKFw9B1bsz56OU.GB5XGN7GKBQRMSoAJNgLHWusXfx0y"
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "message": "Bad request",
    "error": [
        "email is already registered"
        ]
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Create Todo**
----
  Returns json data from create Todo.

* **URL**

  /todos

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    `title=[string]`\
    `description=[string]`\
    `status=[boolean]`\
    `due_date=[date]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
    "message": "Insert data success",
    "data": {
        "id": 9,
        "title": "Test",
        "description": "Test",
        "status": false,
        "due_date": "2020-09-01T00:00:00.000Z",
        "user_id": 8,
        "updatedAt": "2020-02-04T16:37:20.628Z",
        "createdAt": "2020-02-04T16:37:20.628Z"
        }
    }
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "message": "Bad request",
    "error": [
        "Title is required",
        "Description is required",
        "Status is required",
        "Due date is required"
        ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "message": "Unauthorized",
    "error": "Login first"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Show Todos**
----
  Show all json data from findAll Todo.

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
    {
    "message": "Load data success",
    "data": [
        {
            "id": 1,
            "title": "tes",
            "description": "tes",
            "status": true,
            "due_date": "2020-02-04T11:11:18.702Z",
            "user_id": 7,
            "createdAt": "2020-02-04T11:11:18.702Z",
            "updatedAt": "2020-02-04T11:11:18.702Z"
        },
        {
            "id": 9,
            "title": "Test",
            "description": "Test",
            "status": false,
            "due_date": "2020-09-01T00:00:00.000Z",
            "user_id": 8,
            "createdAt": "2020-02-04T16:37:20.628Z",
            "updatedAt": "2020-02-04T16:37:20.628Z"
        }
    ]}
* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Show Todo by ID**
----
  Show json data by ID from findOne Todo.

* **URL**

  /todos/:id

* **Method:**

    `GET`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "message": "Load data success",
    "data": {
        "id": 9,
        "title": "Test",
        "description": "Test",
        "status": false,
        "due_date": "2020-09-01T00:00:00.000Z",
        "user_id": 8,
        "createdAt": "2020-02-04T16:37:20.628Z",
        "updatedAt": "2020-02-04T16:37:20.628Z"
        }
    }
* **Error Response:**

  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "message": "Unauthorized",
    "error": "Login first"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "message": "error not found",
    "data": null
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Update Todo by ID**
----
  Update json data by ID.

* **URL**

  /todos/:id

* **Method:**

    `PUT`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    `title=[string]`\
    `description=[string]`\
    `status=[boolean]`\
    `due_date=[date]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "message": "Update success",
    "data": [
        1,
        [
            {
                "id": 9,
                "title": "Learn React",
                "description": "Learning",
                "status": false,
                "due_date": "2020-03-02T00:00:00.000Z",
                "createdAt": "2020-02-04T16:37:20.628Z",
                "updatedAt": "2020-02-04T16:54:47.073Z",
                "user_id": 8
            }
        ]
    ]}
* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```json
    {
    "message": "Bad request",
    "error": [
        "Title is required",
        "Description is required",
        "Status is required",
        "Due date is required"
        ]
    }
  OR
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "message": "Unauthorized",
    "error": "Login first"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "message": "error not found",
    "error": "data not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----

**Delete Todo by ID**
----
  Destroy json data by ID.

* **URL**

  /todos/:id

* **Method:**

    `DELETE`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "data": 1,
    "message": "Deleted"
    }
* **Error Response:**
  * **Code:** 401 <br />
    **Content:**
    ```json
    {
    "message": "Unauthorized",
    "error": "Login first"
    }
  OR
  * **Code:** 404 <br />
    **Content:**
    ```json
    {
    "data": 0,
    "message": "error not found"
    }
  OR
  * **Code:** 500 <br />
    **Content:**
    ```json
    {
    "message": "Internal server error",
    "error": "entity.parse.failed"
    }
----