# rest-api-todo

 

----
add todo


* **URL**

  /todo/

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
         {
      title: 'bobby',
      desc: 'botol',
      status: 'on going',
      due_date: '07-11-2020' }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`
    

----
get all todos


* **URL**

  todo/

* **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
      [
         {
      title: 'bobby',
      desc: 'botol',
      status: 'on going',
      due_date: '07-11-2020' }
      ]
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
get one todo


* **URL**

  /todo/:id

* **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
         {
      title: 'bobby',
      desc: 'botol',
      status: 'on going',
      due_date: '07-11-2020' }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
update todo


* **URL**

  /todo/:id

* **Method:**

  `put`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
         {
      title: 'bobby',
      desc: 'botol',
      status: 'on going',
      due_date: '07-11-2020' }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
delete todo


* **URL**

  /todo/:id

* **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
         1
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

