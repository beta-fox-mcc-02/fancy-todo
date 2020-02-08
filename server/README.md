# rest-api-todo
## Find All
Returns the all of todo's data.


#### URL

* /todos

#### Method:

* GET

#### URL Params

##### Required:

* None

##### Data Params

* None

#### Success Response:

Code: 200
```
Content: [{
    id : 1,
    title : "Ngoding",
    description : "Ngoding JS, express, sequelize",
    status : false,
    due_date : "2020-02-02"
}]
```

#### Error Response:

Code: 500 NOT FOUND
```
Content: { msg : "Server Error" }
```


## Create
Create a Todo's data.


#### URL

* /todos

#### Method:

* POST

#### URL Params

##### Required:

* None

##### Data Params

*   data : {
        title : string,
        description : string,
        status : boolean,
        due_date : date
    }

#### Success Response:

Code: 201
```
Content: [{
    title : "Ngoding",
    description : "Ngoding JS, express, sequelize",
    status : false,
    due_date : "2020-02-02"
}]
```

#### Error Response:
Code: 500 NOT FOUND
```
Content: { msg : "Server Error" }
```


## Update
Update the Todo's data.

#### URL

* /todos

#### Method:

* PUT

#### URL Params

##### Required:

* id: integer

##### Data Params

* data : {
    title : string,
    description : string,
    status : boolean,
    due_date : date
}

#### Success Response:

Code: 200
```
Content: {
    title : "Ngoding",
    description : "Ngoding JS, express, sequelize",
    status : false,
    due_date : "2020-02-02"
}
```

#### Error Response:
Code: 400 
```
Content: { msg : "Validation Error" }
```

Code: 404 NOT FOUND
```
Content: { msg : "No updated data rows" }
```

Code: 500 NOT FOUND
```
Content: { msg : "Server Error" }
```



## Delete
Delete the Todo data.

#### URL

* /todos

#### Method:

* DELETE

#### URL Params

##### Required:

* id: integer

##### Data Params

* None

#### Success Response:

Code: 200
```
Content: {
    “data” : 1
    msg: “Delete Data Success”
}
```

#### Error Response:

Code: 404 NOT FOUND
```
Content: { msg : "No deleted data rows" }
```


Code: 500 NOT FOUND
```
Content: { msg : "Server Error" }
```



## FindById
Find the Todo data.

#### URL

* /todos

#### Method:

* GET

#### URL Params

##### Required:

* id: integer

##### Data Params

* None

#### Success Response:

Code: 200
```
    data: {
        "id": 5,
        "title": "Ngoding JS",
        "description": "Ngoding JS, express, sequelize",
        "status": false,
        "due_date": "2020-02-02T17:00:00.000Z",
        "createdAt": "2020-02-03T10:55:23.848Z",
        "updatedAt": "2020-02-03T10:55:23.848Z"
    }

```

#### Error Response:

Code: 404 NOT FOUND
```
Content: { "msg": "No result data rows" }
```