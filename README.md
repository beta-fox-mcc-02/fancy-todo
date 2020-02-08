# fancy-todo

## **Register user**

Register new user account.

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**

```javascript
  email: {
      type: 'string',
      validate: 'valid email address'
  },
  password: {
      type: 'string',
      validate: 'at least 6 characters'
  }
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      msg: "YOUR ACCOUNT REGISTERED SUCCESSFULLY";
    }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      error: "internal server error";
    }
    ```

## **Login user**

Login into existed user account.

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**

```javascript
  email: {
      type: 'string',
      validate: 'valid email address'
  },
  password: {
      type: 'string',
      validate: 'at least 6 characters'
  }
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      email: "<email address>",
      token: "<web token>";
    }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      error: "EMAIL OR PASSWORD IS WRONG";
    }
    ```

## **Login with google account**

Login with google account.

- **URL**

  /googleLogin

- **Method:**

  `POST`

- **URL Params**
  **Required:**
  None

- **Data Params**
  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      token: "<web token>";
    }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      error: "EMAIL OR PASSWORD IS WRONG";
    }
    ```

## **Show All todo list**

Returns json data of all todo list by user_id.

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
    **Content:**
    ```javascript
    [
      {
        id: 1,
        title: "....",
        description: ".....",
        status: false,
        due_date: "2020-02-03T06:53:54.044Z"
      },
      {
        id: 2,
        title: "....",
        description: ".....",
        status: false,
        due_date: "2020-02-03T06:53:54.044Z"
      }
    ];
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      error: "internal server error";
    }
    ```

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
    **Content:**
    ```javascript
    {
        id : 3, title : "Live Code preparation",
        description : "study for live code",
        status : false,
        due_date : "2020-02-03T06:53:54.044Z"
    }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**

    ```javascript
    {
      error: "internal server error";
    }
    ```

    OR

  - **Code:** 400 <br />
    **Content:**
    ```javascript
    {
      error: "validation error";
    }
    ```

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
    **Content:**
    ```javascript
    {
        id : 3,
        title : "....",
        description : ".....",
        status : false,
        due_date : "2020-02-03T06:53:54.044Z"
    }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**

    ```javascript
    {
      error: "internal server error";
    }
    ```

    OR

  - **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      error: "data not found";
    }
    ```

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
  due_date

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        id : 3,
        title : "....",
        description : ".....",
        status : false,
        due_date : "2020-02-03T06:53:54.044Z" }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**

    ```javascript
    {
      error: "internal server error";
    }
    ```

    OR

  - **Code:** 400 <br />
    **Content:**

    ```javascript
    {
      error: "validation error";
    }
    ```

    OR

  - **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      error: "data not found";
    }
    ```

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
    **Content:**
    ```javascript
    {
      msg: "data deleted successfully";
    }
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**

    ```javascript
    {
      error: "internal server error";
    }
    ```

    OR

  - **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      error: "data not found";
    }
    ```

## **Show weather info**

Returns json data of jakarta weather for the next 5 days.

- **URL**

  /search

- **Method:**

  `GET`

- **URL Params**
  **Required:**
  None

- **Data Params**
  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript
    [
      {
        date: "2020-02-03T06:53:54.044Z",
        weather: "Heavy rain",
        min_temp: "27.9",
        max_temp: "30.7"
      },
      {
        date: "2020-02-04T06:53:54.044Z",
        weather: "Light rain",
        min_temp: "24.9",
        max_temp: "29.7"
      },
      {
        date: "2020-02-05T06:53:54.044Z",
        weather: "Heavy rain",
        min_temp: "27.9",
        max_temp: "30.7"
      },
      {
        date: "2020-02-06T06:53:54.044Z",
        weather: "Light rain",
        min_temp: "24.9",
        max_temp: "29.7"
      },
      {
        date: "2020-02-07T06:53:54.044Z",
        weather: "Light rain",
        min_temp: "24.9",
        max_temp: "29.7"
      }
    ];
    ```

    **Error Response:**

  - **Code:** 500 <br />
    **Content:**

    ```javascript
    {
      error: "internal server error";
    }
    ```
