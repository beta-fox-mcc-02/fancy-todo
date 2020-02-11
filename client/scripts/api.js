function fetch() {
    $.ajax("http://localhost:3000/todos", {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            $('#todo-content').html('')
            let todoList = response.data
            todoList.forEach(todo => {
                let status = todo.status
                if (status === false) {
                    status = `<button class="btn btn-dark" onclick="statusHandle(${todo.id})">Udah dong</button>`
                } else {
                    status = 'Mantab!'
                }
                $('#todo-content').append(`
                <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td align="center">${new Date(todo.due_date).toDateString()}</td>
                <td align="center">${status}</td>
                <td align="center">
                    <ul>
                        <i class="far fa-edit ngaps-icon" onclick="editTodoForm(${todo.id})"></i> |
                        <i class="far fa-trash-alt ngaps-icon" onclick="deleteTodo(${todo.id})"></i>
                    </ul>
                </td>
                </tr>`)
            });
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete fetch')
        })
}

function addTodo() {
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
            fetch()
            $('#home').show()
            $('#list-todo').show()
            $('#add-todo').hide()
            $('#nav-add-todo').show()
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
    $('#holidays').hide()

    $.ajax('http://localhost:3000/todos/' +  id, {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        },
        params: id
    })
        .done(response => {
            let todo = response.data
            let date = todo.due_date

            let dateToUpdate = ''

            for (let i = 0; i < date.length; i++) {
                if (i <= 9) {
                    dateToUpdate += date[i]
                }
            }
            
            
            $('#edit-todo').append(`
            <h2>Edit Todo</h2>

            <form class="ngaps-form" id="form-edit-todo">
                <input type="hidden" value="${id}">

                <label for="title">Title:</label><br>
                <input type="text" name="title" id="edit-title" value="${todo.title}" required><br><br>
                
                <label for="description">Description:</label><br>
                <input type="text" name="description" id="edit-description" value="${todo.description}"><br><br>

                <label for="due-date">Due-date:</label><br>
                <input type="date" name="due-date" id="edit-due-date" value="${dateToUpdate}" required><br><br>    
                    
                <input type="submit" value="Edit Todo" id="submit" onclick="editTodo(${id})">
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
            fetch()
            $('#home').show()
            $('#list-todo').show()
            $('#add-todo').hide()
            $('#nav-add-todo').show()
            $('#holidays').hide()
            $('#edit-todo').hide()
            $('#holidays').hide()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete update todo')
        })
}

function deleteTodo(id) {
    $.ajax('http://localhost:3000/todos/' +  id, {
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            fetch()
            $('#home').show()
            $('#list-todo').show()
            $('#add-todo').hide()
            $('#nav-add-todo').show()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete delete todo')
        })
}

function getHolidays() {
    $.ajax("http://localhost:3000/holidays", {
        method: 'GET'   
    })
        .done(response => {
            let holidays = response.data
            $('#holidays-content').html('')
            holidays.forEach(holiday => {
                $('#holidays-content').append(`
                    <tr>
                    <td>${new Date(holiday.date.iso).toDateString()}</td>
                    <td>${holiday.name}</td>
                    </tr>`)
            })
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete fetch holidays')
        })
}

function statusHandle(id) {
    event.preventDefault()

    $.ajax('http://localhost:3000/todos/' +  id, {
        method: 'PUT',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            status: true
        }
    })
        .done(response => {
            fetch()
            $('#home').show()
            $('#list-todo').show()
            $('#add-todo').hide()
            $('#nav-add-todo').show()
            $('#holidays').hide()
            $('#edit-todo').hide()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete update todo')
        })
}