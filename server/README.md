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

## **Google Location Detail**

  Returns json data from google when application get location detail based user's location input

-   **URL**

    /locations/detail

-   **Method:**

    `GET`

-   **URL Params**

     **Required:**

    `place_id=[string]`

-   **Data Params**

    None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "html_attributions": [],
            "result": {
            "formatted_address": "Jl. Letjen S. Parman No.28, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470, Indonesia",
            "formatted_phone_number": "(021) 56989999",
            "geometry": {
                "location": {
                    "lat": -6.176901399999999,
                    "lng": 106.789553
                },
                "viewport": {
                    "northeast": {
                        "lat": -6.174440799999999,
                        "lng": 106.7935095
                    },
                    "southwest": {
                        "lat": -6.180554799999999,
                        "lng": 106.7876547
                    }
                }
            },
            "name": "Central Park",
            "rating": 4.6
            },
            "status": "OK"
        }
        ```
    -   **Code:** 400 <br />
        **Content:**
        ```json
        {
            "error_message": "Missing the placeid or reference parameter.",
            "html_attributions": [],
            "status": "INVALID_REQUEST"
        }
        ```

## **Google Location Nearby**

  Returns json data from google, when application search 5 nearby restaurants while user create new task or edit task

-   **URL**

    /locations/nearby

-   **Method:**

    `GET`

-   **URL Params**

     **Required:**

    `radius=[integer]`
    `type=[string]`
    `location=[string]`

-   **Data Params**

    None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "results":
            [
                  {
                    "geometry": {
                        "location": {
                            "lat": -6.174096599999999,
                            "lng": 106.795039
                        },
                        "viewport": {
                            "northeast": {
                                "lat": -6.172670719708497,
                                "lng": 106.7963166302915
                            },
                            "southwest": {
                                "lat": -6.175368680291502,
                                "lng": 106.7936186697085
                            }
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                    "id": "20a41d93df6c6454282d754dd35dc2a78bb780b5",
                    "name": "Harlys Residence",
                    "opening_hours": {
                        "open_now": true
                    },
                    "photos": [
                        {
                            "height": 4160,
                            "html_attributions": [
                                "<a href=\"https://maps.google.com/maps/contrib/111611019326001990583\">galih dani</a>"
                            ],
                            "photo_reference": "CmRaAAAA8wRvZte8WlSoUdOZsQpuDB36A6x4BuTqZkwbH5y9BxkVHEyBcFGXl39vqvMiLY1xWEjEtQ9G-TKNPFmTc_9UgHFvbqGPXuE6KbdKOsiRtB1EtuU23Q-tGLiqGWgQZFH2EhDqAFsYujER-JHc3Ek6tR9NGhRmZewDyuZQxSDMRrJj85IwiVQfoQ",
                            "width": 3120
                        }
                    ],
                    "place_id": "ChIJOc14Omf2aS4RGaqaUNGW8Pc",
                    "plus_code": {
                        "compound_code": "RQGW+92 Jakarta, Indonesia",
                        "global_code": "6P58RQGW+92"
                    },
                    "rating": 4.1,
                    "reference": "ChIJOc14Omf2aS4RGaqaUNGW8Pc",
                    "scope": "GOOGLE",
                    "types": [
                        "lodging",
                        "restaurant",
                        "food",
                        "point_of_interest",
                        "establishment"
                    ],
                    "user_ratings_total": 1406,
                    "vicinity": "Jalan Tomang Tinggi No.2, Tomang"
                 }
            ]
        }
        ```
    -   **Code:** 400 <br />
        **Content:**
        ```json
        {
            "html_attributions": [],
            "results": [],
            "status": "INVALID_REQUEST"
        }
        ```

