# Todo Server

Base url: <http://localhost:3000>

## **Create Todo**

  Returns json data when create todo

- **Headers**

  Authorization: Bearer `<token>`

-   **URL**

    /todos

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

      **Required:**

      `title=[string]`\
      `description=[string]`\
      `due_date=[date]`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
          "data": {
            "status": false,
            "id": 6,
            "title": "Learn Angular 8",
            "description": "Learn how to create website using Angular 8",
            "due_date": "2020-02-20T00:00:00.000Z",
            "updatedAt": "2020-02-03T08:20:56.290Z",
            "createdAt": "2020-02-03T08:20:56.290Z"
          },
          "message": "Todo is successfully created"
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
          "message": "Bad Request",
          "errors": [
              "Title is required",
              "Due date is required"
          ]
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        {
          "message": "Internal Server Error",
          "error": "entity.parse.failed"
        }
        ```

## **Show Todos**

  Returns json data for all todo.

- **Headers**

    Authorization: Bearer `<token>`

-   **URL**

    /todos

-   **Method:**

    `GET`

-   **URL Params**

    None

-   **Data Params**

    None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        { "data": [
          {
            "id": 1,
            "title": "Learn Rest API",
            "description": "Learn how to create RESTful API",
            "status": false,
            "due_date": "2020-01-29T00:00:00.000Z",
            "createdAt": "2020-02-03T06:03:15.885Z",
            "updatedAt": "2020-02-03T06:03:15.885Z"
          },
          {
            "id": 2,
            "title": "Learn Angular",
            "description": "Learn how to create website using Angular",
            "status": false,
            "due_date": "2020-10-01T00:00:00.000Z",
            "createdAt": "2020-02-03T06:04:05.364Z",
            "updatedAt": "2020-02-03T07:19:52.767Z"
          },
          {
            "id": 4,
            "title": "Learn React",
            "description": "Learn how to create website using React",
            "status": false,
            "due_date": "2020-10-19T00:00:00.000Z",
            "createdAt": "2020-02-03T07:38:27.450Z",
            "updatedAt": "2020-02-03T07:38:27.450Z"
          }
        ],
        "message": "Successfully fetch todos"
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**

        ```json
        {
          "message": "Internal Server Error",
          "error": "entity.parse.failed"
        }
        ```

## **Get Todo By Id**

  Returns json data when get todo by id

- **Headers**

    Authorization: Bearer `<token>`

-   **URL**

    /todos/:id

-   **Method:**

    `GET`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Data Params**

     None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
          "data": {
            "id": 1,
            "title": "Learn Rest API",
            "description": "Learn how to create RESTful API",
            "status": false,
            "due_date": "2020-01-29T00:00:00.000Z",
            "createdAt": "2020-02-03T06:03:15.885Z",
            "updatedAt": "2020-02-03T06:03:15.885Z"
          },
          "message": "Successfully get todo with id 1"
        }
        ```

-   **Error Response:**

    -   **Code:** 404 NOT FOUND <br />
        **Content:**
        ```json
        {
          "message": "Not Found",
          "error": "Todo is not found with id 1011"
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**

        ```json
        {
          "message": "Internal Server Error",
          "error": "entity.parse.failed"
        }
        ```

    -   **Code:** 401 UNAUHTORIZED <br />
        **Content:**

        ```json
        {
          "message": "You are not authorized"
        }
        ```
## **Update Todo**

  Returns json data when update todo by id

- **Headers**

    Authorization: Bearer `<token>`

-   **URL**

    /todos/:id

-   **Method:**

    `PUT`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Data Params**

    `title=[string]`\
    `description=[string]`\
    `status=[boolean]`\
    `due_date=[date]`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
          "data": {
            "id": 1,
            "title": "Learn Rest API",
            "description": "Learn how to create RESTful API",
            "status": false,
            "due_date": "2020-01-29T00:00:00.000Z",
            "createdAt": "2020-02-03T06:03:15.885Z",
            "updatedAt": "2020-02-03T06:03:15.885Z"
          },
          "message": "Successfully get todo with id 1"
        }
        ```

-   **Error Response:**

    -   **Code:** 404 NOT FOUND <br />
        **Content:**
        ```json
        {
          "message": "Not Found",
          "error": "Todo is not found with id 1011"
        }
        ```

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
          "message": "Bad Request",
          "errors": [
              "Title is required"
          ]
        }
        ```

    -   **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**

        ```json
        {
          "message": "Internal Server Error",
          "error": "entity.parse.failed"
        }
        ```
    -   **Code:** 401 UNAUHTORIZED <br />
        **Content:**

        ```json
        {
          "message": "You are not authorized"
        }
        ```

## **Delete Todo**

  Returns json data when delete todo by id

- **Headers**

    Authorization: Bearer `<token>`

-   **URL**

    /todos/:id

-   **Method:**

    `DELETE`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Data Params**

     None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
          "message": "Delete todo with 1 successfully"
        }
        ```

-   **Error Response:**

    -   **Code:** 404 NOT FOUND <br />
        **Content:**
        ```json
        {
          "message": "Not Found",
          "error": "Todo is not found with id 1011"
        }
        ```
    -   **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**

        ```json
        {
          "message": "Internal Server Error",
          "error": "entity.parse.failed"
        }
        ```

    -   **Code:** 401 UNAUHTORIZED <br />
        **Content:**

        ```json
        {
          "message": "You are not authorized"
        }
        ```

## **Register user**

  Returns json data when user register

-   **URL**

    /users/register

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

      **Required:**

      `email=[string]`\
      `password=[string]`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
          "message": "Register success",
          "user": {
            "id": 18,
            "email": "halo@gmail.com"
          }
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
          "message": "Bad Request",
          "errors": [
              "Invalid email format"
          ]
        }
        ```

## **Login**

  Returns token when user login

-   **URL**

    /users/login

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

      **Required:**

      `email=[string]`\
      `password=[string]`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "message": "Login successfully",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiaGFuc2luQGdtYWlsLmNvbSIsImlhdCI6MTU4MDgwOTk2NH0.54RxdGe1bFzqffwQAxpPowrtKZHyOKU4gZs75mIimyw"
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
          "message": "email / password is incorrect"
        }
        ```
# 3rd Party API

## **Google Location**

  Returns json data from google when user input location

-   **URL**

    /locations

-   **Method:**

    `GET`

-   **URL Params**

     **Required:**

    `search=[string]`

-   **Data Params**

    None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
        "data": {
          "predictions": [
            {
                "description": "Kuningan, Kuningan Regency, West Java, Indonesia",
                "id": "4fa07cb40d953b94bac8e985f9cd8254161dc306",
                "matched_substrings": [
                    {
                        "length": 8,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJV7CG2yIUby4RoOIo_PHoAQQ",
                "reference": "ChIJV7CG2yIUby4RoOIo_PHoAQQ",
                "structured_formatting": {
                    "main_text": "Kuningan",
                    "main_text_matched_substrings": [
                        {
                            "length": 8,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Kuningan Regency, West Java, Indonesia"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Kuningan"
                    },
                    {
                        "offset": 10,
                        "value": "Kuningan Regency"
                    },
                    {
                        "offset": 28,
                        "value": "West Java"
                    },
                    {
                        "offset": 39,
                        "value": "Indonesia"
                    }
                ],
                "types": [
                    "locality",
                    "political",
                    "geocode"
                ]
            },
            {
                "description": "Kuningan, Karet Kuningan, South Jakarta City, Jakarta, Indonesia",
                "id": "b381a53e577d7ff7832021c2058b6a739bcf850f",
                "matched_substrings": [
                    {
                        "length": 8,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJUReS4fjzaS4RYhVBXx2muvE",
                "reference": "ChIJUReS4fjzaS4RYhVBXx2muvE",
                "structured_formatting": {
                    "main_text": "Kuningan",
                    "main_text_matched_substrings": [
                        {
                            "length": 8,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Karet Kuningan, South Jakarta City, Jakarta, Indonesia"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Kuningan"
                    },
                    {
                        "offset": 10,
                        "value": "Karet Kuningan"
                    },
                    {
                        "offset": 26,
                        "value": "South Jakarta City"
                    },
                    {
                        "offset": 46,
                        "value": "Jakarta"
                    },
                    {
                        "offset": 55,
                        "value": "Indonesia"
                    }
                ],
                "types": [
                    "administrative_area_level_5",
                    "political",
                    "geocode"
                ]
            },
            {
                "description": "Kuningan, West Java, Indonesia",
                "id": "46a40c6b6c7caee91222962a967f1b7e2c8b6e76",
                "matched_substrings": [
                    {
                        "length": 8,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJF_Y7zjYSby4RULoo_PHoAQM",
                "reference": "ChIJF_Y7zjYSby4RULoo_PHoAQM",
                "structured_formatting": {
                    "main_text": "Kuningan",
                    "main_text_matched_substrings": [
                        {
                            "length": 8,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "West Java, Indonesia"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Kuningan"
                    },
                    {
                        "offset": 10,
                        "value": "West Java"
                    },
                    {
                        "offset": 21,
                        "value": "Indonesia"
                    }
                ],
                "types": [
                    "administrative_area_level_2",
                    "political",
                    "geocode"
                ]
            },
            {
                "description": "Kuningan City, Jalan Professor Doktor Satrio, RT.14/RW.4, Kuningan, Karet Kuningan, South Jakarta City, Jakarta, Indonesia",
                "id": "28d83f100605af08b6edf27b7d88991a7e520753",
                "matched_substrings": [
                    {
                        "length": 8,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJ6UdZViTzaS4RUpRN_R2PDUI",
                "reference": "ChIJ6UdZViTzaS4RUpRN_R2PDUI",
                "structured_formatting": {
                    "main_text": "Kuningan City",
                    "main_text_matched_substrings": [
                        {
                            "length": 8,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Jalan Professor Doktor Satrio, RT.14/RW.4, Kuningan, Karet Kuningan, South Jakarta City, Jakarta, Indonesia"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Kuningan City"
                    },
                    {
                        "offset": 15,
                        "value": "Jalan Professor Doktor Satrio"
                    },
                    {
                        "offset": 46,
                        "value": "RT.14"
                    },
                    {
                        "offset": 52,
                        "value": "RW.4"
                    },
                    {
                        "offset": 58,
                        "value": "Kuningan"
                    },
                    {
                        "offset": 68,
                        "value": "Karet Kuningan"
                    },
                    {
                        "offset": 84,
                        "value": "South Jakarta City"
                    },
                    {
                        "offset": 104,
                        "value": "Jakarta"
                    },
                    {
                        "offset": 113,
                        "value": "Indonesia"
                    }
                ],
                "types": [
                    "shopping_mall",
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "description": "Kuningan Jawa Barat, Jalan Raya Bandorasa, Bandorasa Wetan, Kuningan Regency, West Java, Indonesia",
                "id": "53c6ece9c29abfa958acbd4b18f1aa605fef212b",
                "matched_substrings": [
                    {
                        "length": 8,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJXXM2atwZby4Rd7tvppw4S40",
                "reference": "ChIJXXM2atwZby4Rd7tvppw4S40",
                "structured_formatting": {
                    "main_text": "Kuningan Jawa Barat",
                    "main_text_matched_substrings": [
                        {
                            "length": 8,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Jalan Raya Bandorasa, Bandorasa Wetan, Kuningan Regency, West Java, Indonesia"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Kuningan Jawa Barat"
                    },
                    {
                        "offset": 21,
                        "value": "Jalan Raya Bandorasa"
                    },
                    {
                        "offset": 43,
                        "value": "Bandorasa Wetan"
                    },
                    {
                        "offset": 60,
                        "value": "Kuningan Regency"
                    },
                    {
                        "offset": 78,
                        "value": "West Java"
                    },
                    {
                        "offset": 89,
                        "value": "Indonesia"
                    }
                ],
                "types": [
                    "shopping_mall",
                    "point_of_interest",
                    "establishment"
                ]
              }
          ],
          "status": "OK"
          }
        }
        ```

