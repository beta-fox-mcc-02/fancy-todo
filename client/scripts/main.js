function hideShow() {
      // Show all task
      if(localStorage.access_token) {
        // Hide
        $('#register-form').hide();
        $('#login-form').hide();
        $('#login-navbar').hide();
        $('#sign-up-navbar').hide();
        $('#edit-task-form').hide();

        // Show
        $('#logout-navbar').show();
        $('#task-list').show();
        $('#newtask-form').show();
        showTaskList();
        $('#error-message').remove();
    } else {
        // Show
        $('#login-form').show();
        $('#login-navbar').show();
        $('#sign-up-navbar').show();
        
        // Hide
        $('#logout-navbar').hide();
        $('#task-list').hide();
        $('#newtask-form').hide();
        $('#register-form').hide();
        $('#edit-task-form').hide();

        $('#error-message').remove();
    }
}


// ========= API related function ===============
function login(email, password) {
    return $.ajax({
        url:'http://localhost:3000/login',
        type: 'POST',
        data: {
            email, password
        }
    })
}

function googleSignIn(access_token) {
    return $.ajax({
      method: 'post',
      url: 'http://localhost:3000/googleSignIn',
      headers: {
        access_token
      }
    })
  }

function register(email, password) {
    return $.ajax({
        url: 'http://localhost:3000/register',
        type: 'POST',
        data: {
            email, password
        }
    })
}

function findAll() {
    return $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.access_token
        }
    })
}

function update(id, title, description, status, due_date) {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
}

function deleteTask(id) {
    return $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
}

function findOne(id) {
    return $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
}

let deleteID;
function getID(id) {
    deleteID = id;
}

let updateID;
function renderUpdate(id) {
    console.log('masuk di sini')
    findOne(id)
        .done(task => {
            updateID = id;

            $('#title-edit-form').val(task.data.title)
            $('#desc-edit-form').val(task.data.description);
            $('#due-date-edit-form').val(task.due_date);
            $(`input[name="radio-update-form"][value="${task.data.status}"]`).attr('checked', true);
            updatePage();
        })
        .fail(err => {
            console.log(err);
        })
        .always(_=> {
            console.log('Complete')
        })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    googleSignIn(id_token)
      .then(res => {
          console.log(res)
        localStorage.access_token = res.access_token;
        hideShow()
      })
      .catch(err => {
        console.log(err);
      })
  }


// ===========================================

// ============ Layout =======================

function showTaskList() {
    findAll()
        .done(task => {
            $('#task-list tbody').empty();
            let table = '';
            if(task.data.length) {
                task.data.forEach( el => {
                    let date = new Date(el.due_date);
                    date = date.toDateString()
                    
                    const taskStatus = el.status ? 'Complete' : 'Uncomplete'
                    table += `<tr>`
                    table += `<th scope="row">${el.id}</th>`
                    table += `<td>${el.title}</td>`
                    table += `<td>${el.description}</td>`
                    table += `<td>${taskStatus}</td>`
                    table += `<td>${date}</td>`
                    table += `<td>`
                    table +=  `<a href="#" class="edit-todos" onclick="renderUpdate(${el.id})">Edit</a> |`
                    table +=  `<a href="#" class="delete-todos" onclick="getID(${el.id})" data-toggle="modal" data-target="#delete-modal">Delete</a>`
                    table += `</td>`
                })
                $('#task-list tbody').append(table)
            } else {
                $('#task-list tbody').append('<h3 style="text-align:center">No task yet</h3>')
            }
        })
        .fail(err => {
            console.log(err);
        })
        .always(_=> {
            console.log('Complete');
        })
}

function updatePage() {
    $('#login-form').hide();
    $('#register-form').hide();
    $('#newtask-form').hide();
    $('#task-list').hide();

    $('#edit-task-form').show();
}

// ===========================================

// Main function
$(document).ready(function() {
    
    hideShow();

    // Click sign up navbar
    $('#sign-up-navbar').on('click', e => {
        e.preventDefault();
        $('#register-form').show();
        $('#login-form').hide();
    })

    // Click login navbar
    $('#login-navbar').on('click', e => {
        e.preventDefault();
        $('#register-form').hide();
        $('#login-form').show();
    })

    // Login
    $('#login-form').submit( e => {
        e.preventDefault();
        const email = $('#login_inputEmail').val();
        const password = $('#login_inputPassword').val();
        login(email, password)
            .done(token => {
                localStorage.setItem('access_token', token)
                console.log('Logged In')

                hideShow();
                showTaskList();
            })
            .fail(err => {
                console.log(err)
                $("#error_message").html(`<h5 style="color: red">${err.responseJSON.message}</h5>`);
                //TODO: Menampilkan pesan error dari validasi
            })
            .always(_=> {
                console.log('Complete');
            })
    })


    // Register new user
    $('#register-form').submit( e => {
        e.preventDefault();
        const email = $('#register_inputEmail').val();
        const password = $('#register_inputPassword').val();
        register(email, password)
            .done(token => {
                console.log('Registered', token)
                hideShow();
                // TODO: Hide register form, show login form, tampilkan pesan success register
            })
            .fail(err => {
                console.log(err)
                $("#error_message").html(`<h5 style="color: red">${err.responseJSON.message}</h5>`);
                //TODO: Menampilkan pesan error dari validasi
            })
            .always(_=> {
                console.log('Complete');
            })
    })

    // Logout
    $('#logout-navbar').on('click', e => {
        e.preventDefault();
        localStorage.clear();

        hideShow()
        console.log('Logged out')
    })

    // Delete task
    $('#delete-confirm-ok').on('click', _=> {
        console.log(deleteID)
        deleteTask(deleteID)
            .done(task => {
                showTaskList();
                $('#delete-modal').modal('toggle');
                hideShow();
            })
            .fail(err => {
                $("#error_message").html(`<h5 style="color: red">${err.responseJSON.message}</h5>`);
                console.log(err)
            })
            .always(_=> {
                console.log('Complete')
            })
    })

    // Add new task
    $('#newtask-form').submit(e => {
        e.preventDefault();
        const title = $('#title-add-form').val();
        const description = $('#desc-add-form').val();
        const due_date = $('#due-date-add-form').val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/todos',
            data: {
                title,
                description,
                due_date
            },
            headers: {
                access_token: localStorage.access_token
            }
        })
            .done(task => {
                showTaskList();
                console.log(task);
                hideShow();
            })
            .fail(err => {
                console.log(err);
            })
            .always(_=> {
                console.log('Complete')
            })

    })

    // Update task info
    $('#edit-task-form').submit(e => {
        e.preventDefault();

        const title = $('#title-edit-form').val();
        const description = $('#desc-edit-form').val();
        const due_date = $('#due-date-edit-form').val();
        const status = $('input[name="radio-update-form"]:checked').val();
        console.log(updateID)

        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/todos/${updateID}`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title,
                description,
                status,
                due_date
            }
        })
            .done(_=> {
                console.log('success updated task', updateID)
                // showTaskList();
                hideShow();
            })
            .fail(err => {
                $("#error_message").html(`<h5 style="color: red">${err.responseJSON.message}</h5>`);
            })
    })

    // Cancel edit
    $('#cancel-edit-form').on('click', e => {
        e.preventDefault();
        hideShow();
    })

})