function fetch() {
    $.ajax("http://localhost:3000/todos", {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todos => {
            let todoList = todos.data
            console.log(todoList)
            todoList.forEach(todo => {
                $('#list-todo').append(`
                <tbody>
                <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td align="center">${new Date(todo.due_date).toDateString()}</td>
                <td align="center">
                    <ul>
                        <i class="far fa-edit ngaps-icon" onclick="editTodoForm(${todo.id})"></i> |
                        <i class="far fa-trash-alt ngaps-icon" onclick="deleteTodo(${todo.id})"></i>
                    </ul>
                </td>
                </tr>
                </tbody>`)
            });
        })
        .fail(err => {
            console.log('error')
            console.log(err)
        })
        .always(_ => {
            console.log('complete fetch')
        })
}

function addTodo() {
    event.preventDefault()
    console.log($('#add-title').val())
    console.log($('#add-description').val())
    console.log($('#add-due-date').val())

    $.ajax("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#add-title').val(),
            description: $('#add-description').val(),
            due_date: $('#add-due-date').val()
        }
    })
        .done(response => {
            console.log(response)
            location.reload(true)
            homePage()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete add todo')
        })
}

function editTodoForm(id) {
    $('#edit-todo').html('')
    $('#register').hide()
    $('#home').hide()
    $('#add-todo').hide()
    $('#login').hide()
    $('#edit-todo').show()

    $.ajax('http://localhost:3000/todos/' +  id, {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        },
        params: id
    })
        .done(response => {
            let todo = response.data
            
            $('#edit-todo').append(`
            <h2>Edit Todo</h2>

            <form class="ngaps-form" id="form-edit-todo" onsubmit="editTodo(${id})">
                <label for="title">Title:</label><br>
                <input type="text" name="title" id="edit-title" value="${todo.title}" required><br><br>
                
                <label for="description">Description:</label><br>
                <input type="text" name="description" id="edit-description" value="${todo.description}"><br><br>

                <label for="due-date">Due-date:</label><br>
                <input type="date" name="due-date" id="edit-due-date" value="${todo.due_date}"><br><br>    
                    
                <input type="submit" value="Edit Todo" id="submit">
            </form>
            `)
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete fetch one')
        })
}

function editTodo(id) {
    event.preventDefault()
    console.log(id)

    console.log($('#edit-title').val())
    console.log($('#edit-description').val())
    console.log($('#edit-due-date').val())

    $.ajax('http://localhost:3000/todos/' +  id, {
        method: 'PUT',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            due_date: $('#edit-due-date').val()
        }
    })
        .done(response => {
            console.log(response)
            location.reload(true)
            homePage()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete update todo')
        })
}

function deleteTodo(id) {
    console.log(id)

    $.ajax('http://localhost:3000/todos/' +  id, {
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            console.log(response)
            location.reload(true)
            homePage()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete delete todo')
        })
}