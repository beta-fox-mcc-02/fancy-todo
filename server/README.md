# rest-api-todo

## **Show All todo list**

Returns json data of all todo list.

- **URL**

  /todos

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  None

- **Data Params**
  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[{ id : 1, title : "....", description : ".....", status : false, due_date : "2020-02-03T06:53:54.044Z" },{ id : 2, title : "....", description : ".....", status : false, due_date : "2020-02-03T06:53:54.044Z" }]`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "internal server error" }`

## **Add new todo list**

Insert new row into todo list.

- **URL**

  /todos

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**
  title,
  description,
  status,
  due_date

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ id : 3, title : "PHP Laravel", description : "Laravel tutorial", status : false, due_date : "2020-02-03T06:53:54.044Z" }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "internal server error" }`

    OR

  - **Code:** 400 <br />
    **Content:** `{ error : "validation error" }`

## **Find specific todo list by id**

Find one row by id from todo list.

- **URL**

  /todos/:id

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  id=[integer]

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 3, title : "....", description : ".....", status : false, due_date : "2020-02-03T06:53:54.044Z" }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "internal server error" }`

    OR

  - **Code:** 404 <br />
    **Content:** `{ error : "data not found" }`

## **Update todo list by id**

Update one row by id from todo list.

- **URL**

  /todos/:id

- **Method:**

  `PUT`

- **URL Params**
  **Required:**
  id=[integer]

- **Data Params**
  title,
  description,
  status,
  due_date

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 3, title : "....", description : ".....", status : false, due_date : "2020-02-03T06:53:54.044Z" }`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "internal server error" }`

    OR

  - **Code:** 400 <br />
    **Content:** `{ error : "validation error" }`

    OR

  - **Code:** 404 <br />
    **Content:** `{ error : "data not found" }`

## **Delete todo list by id**

Delete one row by id from todo list.

- **URL**

  /todos/:id

- **Method:**

  `DELETE`

- **URL Params**
  **Required:**
  id=[integer]

- **Data Params**
  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `data deleted successfully`

- **Error Response:**

  - **Code:** 500 <br />
    **Content:** `{ error : "internal server error" }`

    OR

  - **Code:** 404 <br />
    **Content:** `{ error : "data not found" }`
