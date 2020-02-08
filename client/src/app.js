function showTodo(todos) {
  $('#todos tbody').empty();
  if (todos.data.data.length) {
    const weather = todos.data.data[0].currentWeather;
    $('.current-weather').html(`<p>Weather today: <strong>${weather.toUpperCase()}</strong></p>`);
    todos.data.data.forEach((el, index) => {
      const todoStatus = el.status ? 'Completed' : 'Uncomplete';
      $('#todos tbody').append(`
      <tr>
        <th scope="row">${el.id}</th>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>
          <strong>${todoStatus}</strong>
        </td>
        <td>${formatDate(el.due_date)}</td>
        <td>
          <a href="#" class="edit-todos" onclick="configUpdate(${el.id})">Edit</a> |
          <a href="#" class="delete-todos" onclick="configDelete(${el.id})" data-toggle="modal" data-target="#delete-modal">Delete</a> 
        </td>
      </tr>
      `)
    });
  } else {
    $('#todos tbody ').append(`
    <tr>
      <th scope="row">#</th>
      <td>N/A</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    `);
  }

}

// form update todo
let idUpdate;
function configUpdate(id) {
  findOne(id)
    .then(todo => {
      idUpdate = id;
      console.log('ini todo', todo);
      const date = dateUpdateForm(todo.data.data.due_date);
      $('#title-update-form').val(`${todo.data.data.title}`);
      $('#desc-update-form').val(`${todo.data.data.description}`);
      $('#due-date-update-form').val(date);
      $(`input[name="radio-update-form"][value="${todo.data.data.status}"]`).attr('checked', true);
      return todo;
    })
    .then(todo => {
      updatePage();
    })
    .catch(err => {
      console.log(err.response);
    })
  console.log(id);
}

// delete todo
let idDelete;
function configDelete(id) {
  idDelete = id;
  console.log(idDelete);
}

function dateUpdateForm(inpDate) {
  const fullDate = new Date(inpDate);
  let year = fullDate.getFullYear();
  let month = fullDate.getMonth() + 1;
  let date = fullDate.getDate();
  if (String(month).length === 1) month = `0${month}`;
  if (String(date).length === 1) date = `0${date}`;

  return `${year}-${month}-${date}`;
}


// google sign in
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  googleSignIn(id_token)
    .then(response => {
      localStorage.access_token = response.data.access_token;
      todosPage()
    })
    .catch(err => {
      console.log(err);
    })
}

// ==============SHOW==========================

function registerPage() {
  $('.register-user').show();
  $('#register-input-email').focus();

  $('.login-user').hide();
  $('.todos-table').hide();
  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').hide();
  $('#create-form').hide();
  $('#update-form').hide();

  $('#loading-page').hide();

}

function loginPage() {
  $('.register-user').hide();

  $('.login-user').show();
  $('#login-input-email').focus();

  $('.todos-table').hide();
  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').hide();
  $('#create-form').hide();
  $('#update-form').hide();

  $('#loading-page').hide();


}

function todosPage() {
  loadingPage();

  console.log('dari todosPage')
  findAll()
    .then(todos => {
      $('.register-user').hide();
      $('.login-user').hide();

      $('.todos-table').show();

      $('#success-alert').hide();
      $('#error-alert').hide();
      $('#logout').show();
      $('#create-form').hide();
      $('#update-form').hide();

      $('#loading-page').hide();
      console.log(todos);
      showTodo(todos)
    })
    .catch(err => {
      loginPage();
      getErrorMessages(err);
      console.log(err.response);
    })
}

function createPage() {
  $('.register-user').hide();
  $('.login-user').hide();

  $('.todos-table').hide();

  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').show();
  $('#create-form').show();
  $('#update-form').hide();

  $('#loading-page').hide();

}

function updatePage() {
  $('.register-user').hide();
  $('.login-user').hide();

  $('.todos-table').hide();

  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').show();
  $('#create-form').hide();
  $('#update-form').show();
  $('#loading-page').hide();

}

function loadingPage() {
  $('.register-user').hide();
  $('.login-user').hide();

  $('.todos-table').hide();

  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').show();
  $('#create-form').hide();
  $('#update-form').hide();
  $('#loading-page').show();
}

function searchByIdPage(searchById) {
  loadingPage();

  console.log('dari todosPage')

  findOne(searchById)
    .then(data => {
      console.log(data.data.data);
      data.data.data = [data.data.data];
      console.log(data);
      $('.register-user').hide();
      $('.login-user').hide();

      $('.todos-table').show();

      $('#success-alert').hide();
      $('#error-alert').hide();
      $('#logout').show();
      $('#create-form').hide();
      $('#update-form').hide();

      $('#loading-page').hide();
      showTodo(data);
    })
    .catch(err => {
      console.log(err.response);
      getErrorMessages(err);
    })
}

// ======================================================

function getErrorMessages(err) {
  const errMsg = [];
  if (Array.isArray(err.response.data.message)) {
    err.response.data.message.forEach(el => errMsg.push(el))
  } else {
    errMsg.push(err.response.data.message)
  }
  $('#error-message').text(`${errMsg.join(' and ')}`);
  $('#error-alert').show();
}

function clearInput() {
  // register form
  $('#register-input-email').val('');
  $('#register-input-password').val('');
  $('#register-input-email').focus();

  // login form
  $('#login-input-email').val('');
  $('#login-input-password').val('');
  $('#login-input-email').focus();

  // create form
  $('#title-create-form').val('');
  $('#desc-create-form').val('');
  $('#due-date-create-form').val('');
  $('#title-create-form').focus();
}

function formatDate(inp) {
  const fullDate = new Date(inp);
  const year = fullDate.getFullYear();
  let month = fullDate.getMonth() + 1;
  let date = fullDate.getDate();

  if (String(month).length === 1) month = `0${month}`;
  if (String(date).length === 1) date = `0${date}`;

  let day;
  const dayNumber = fullDate.getDay();

  if (dayNumber === 0) day = 'Sunday';
  else if (dayNumber === 1) day = 'Monday';
  else if (dayNumber === 2) day = 'Tuesday';
  else if (dayNumber === 3) day = 'Wednesday';
  else if (dayNumber === 4) day = 'Thursday';
  else if (dayNumber === 5) day = 'Friday';
  else if (dayNumber === 6) day = 'Saturday';

  return `${day}, ${date}-${month}-${year}`;
}


// =========================main function==================================
$(document).ready(() => {

  // default view
  if (!localStorage.access_token) {
    registerPage()
  } else {
    todosPage()
  }

  // fancy-todo-nav is clicked
  $('#fancy-todo-nav').on('click', () => {
    // err.response.data.message
    // if(!localStorage.access_token){
    //   registerPage();
    //   $('#error-message').text(`You`);
    //   $('#error-alert').show();
    // }
    todosPage();
  })

  // register is clicked
  $('.dont-have-account').on('click', () => registerPage())

  // login is clicked
  $('.already-have-account').on('click', () => loginPage())

  // register
  $('#register-user').on('submit', e => {
    e.preventDefault();
    const email = $('#register-input-email').val();
    const password = $('#register-input-password').val();
    const data = { email, password };
    console.log(data);
    register(data)
      .then(user => {
        loginPage();
        clearInput();
        $('#success-message').text('Register success! Please login to see your to do list');
        $('#success-alert').show();
      })
      .catch(err => {
        clearInput();
        registerPage();
        getErrorMessages(err);
        console.log(err.response);
      })
  })

  // login
  $('#login-user').on('submit', e => {
    e.preventDefault();
    const email = $('#login-input-email').val();
    const password = $('#login-input-password').val();
    const data = { email, password };
    // loadingPage();
    login(data)
      .then(response => {
        localStorage.access_token = response.data.access_token;
        todosPage();
        clearInput();
      })
      .catch(err => {
        clearInput();
        loginPage();
        console.log(err.response);
        getErrorMessages(err);
      })
  })


  // logout
  $('#logout').on('click', e => {

    // logout manual
    localStorage.clear();

    // sign out google
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    registerPage();
  })

  // cancel new todo
  $('#cancel-create-form').on('click', () => {
    clearInput();
    todosPage();
  })

  // form new todo
  $('#btn-create-form').on('click', () => {
    console.log('Masuk form');
    clearInput();
    createPage();
  })

  // create new todo
  $('#create-form').on('submit', e => {
    e.preventDefault();
    const title = $('#title-create-form').val();
    const description = $('#desc-create-form').val();
    const status = false;
    const due_date = $('#due-date-create-form').val();
    const data = { title, description, status, due_date };

    console.log('di luar create');
    create(data)
      .then(res => {
        console.log('dieksekusi di dalam create');
        console.log(res.data);
        todosPage();
      })
      .catch(err => {
        getErrorMessages(err);
        clearInput();
        console.log(err.response);
      })
    console.log('Tersubmit');

  })

  // cancel update todo
  $('#cancel-update-form').on('click', () => {
    todosPage();
  })

  // update todo
  $('#update-form').on('submit', e => {
    e.preventDefault();

    const title = $('#title-update-form').val();
    const description = $('#desc-update-form').val();
    const due_date = $('#due-date-update-form').val();
    const status = $('input[name="radio-update-form"]:checked').val();
    console.log(title, description, due_date, status);
    const data = { title, description, status, due_date };
    update(idUpdate, data)
      .then(res => {
        console.log(res.data);
        todosPage();
      })
      .catch(err => {
        console.log(err.response);
        getErrorMessages(err);
      })
  })

  // delete todo
  $('#btn-delete-todo').on('click', () => {
    destroy(idDelete)
      .then(res => {
        console.log(res.data);
        todosPage()
        return res
      })
      .then(res => {
        $('#delete-modal').modal('toggle');
      })
      .catch(err => {
        todosPage();
        console.log(err.response);
        getErrorMessages(err);
      })
  })

  // search by id
  $('#search-by-id-form').on('submit', e => {
    e.preventDefault();
    const searchById = $('#search-by-id-input').val();
    $('#search-by-id-input').val('')
    searchByIdPage(searchById);
  })

})