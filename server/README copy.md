# rest-api-todo

**Show Todos**
----
  Returns json data about all todo.

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
    ```javascript
    {
    msg: "success read all data!",
    data: [
        {
          id: 1,
          title: "Makan Malam",
          description: "Pagi",
          status: false,
          due_date: "2020-03-01T00:00:00.000Z",
          createdAt: "2020-02-03T11:41:54.847Z",
          updatedAt: "2020-02-03T11:41:54.847Z"
        },
        {
          id: 2,
          title: "Makan Sarapan",
          description: "Pagi",
          status: false,
          due_date: "2020-03-01T00:00:00.000Z",
          createdAt: "2020-02-03T11:48:42.031Z",
          updatedAt: "2020-02-03T11:48:42.031Z"
        },
        {
          id: 3,
          title: "Makan Buah",
          description: "Malam",
          status: false,
          due_date: "2020-03-01T00:00:00.000Z",
          createdAt: "2020-02-03T11:49:15.103Z",
          updatedAt: "2020-02-03T11:49:15.103Z"
        }
    ]
}
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    { error : 'Internal Server Error'}
    ```
  OR

  * **Code:** 400 <br />
    **Content:** 
    ```javascript
    { error : 'Validation Error' }
    ```





**Create Todo**
----
  Returns json data created.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**
 
   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      msg: "SUCCESS ENTRY DATA",
      data: {
          id: 4,
          title: "Makan Nasi Padang",
          description: "Siang",
          status: false,
          due_date: "2020-03-01T00:00:00.000Z",
          updatedAt: "2020-02-03T11:49:41.675Z",
          createdAt: "2020-02-03T11:49:41.675Z"
          }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : 'Internal Server Error'}`



**Get Todo By ID**
----
  Returns json data with id equals to the params.

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
    ```javascript
    { data: 
        { 
          id: 2, 
          title: "Belajar Rest API", 
          description: "Belajar hari pertama", status: false, 
          due_date: "2020-03-01T00:00:00.000Z",
          createdAt: "2020-02-03T07:28:31.024Z",
          updatedAt: "2020-02-03T07:28:31.024Z"
        }, 
      msg: "Success read user"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    { error : 'Internal Server Error'}
    ```


    
**Update Todo**
----
  Returns json data changed by id.

* **URL**

  /todos/:id

* **Method:**

  `PUT`

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
      msg: "Succes update data!",
      data: {
          id: 2,
          title: "Belajar ERROR",
          description: "Perubahan",
          status: true,
          due_date: "2020-03-01T00:00:00.000Z",
          createdAt: "2020-02-03T11:48:42.031Z",
          updatedAt: "2020-02-03T12:07:51.020Z"
      }
    }

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    { error : 'Internal Server Error'}
    ```



**Delete Todo**
----
  Returns json data .

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

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        msg: "succes delete data!",
        data: 1
    }

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```
    { error : 'Internal Server Error'}
    ```