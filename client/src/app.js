function showTodo(todos) {
  console.log(todos);
  if (todos.data.data.length) {
    const weather = todos.data.data[0].currentWeather;
    console.log(todos.data.data);
    console.log(weather);
    $('.current-weather').text(`Cuaca hari ini: ${weather}`);

    todos.data.data.forEach(el => {
      console.log('isi el', el);
      $('#todos tr:last').after(`
      <tr>
        <th scope="row">${el.id}</th>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.status}</td>
        <td>${new Date(el.due_date).toDateString()}</td>
        <td>
          <a>Edit</a> |
          <a>Delete</a> 
        </td>
      </tr>
      `)
    });
  } else {
    $('#todos').append(`
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

// google sign in
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
  googleSignIn(id_token)
    .then(response => {
      localStorage.access_token = response.data.access_token;
      todosPage()
    })
    .catch(err => {
      console.log(err);
    })
}

function registerPage() {
  $('.register-user').show();
  $('#register-input-email').focus();

  $('.login-user').hide();
  $('.todos-table').hide();
  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').hide();

}

function loginPage() {
  $('.register-user').hide();

  $('.login-user').show();
  $('#login-input-email').focus();

  $('.todos-table').hide();
  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').hide();
}

function todosPage() {
  $('.register-user').hide();
  $('.login-user').hide();

  $('.todos-table').show();

  $('#success-alert').hide();
  $('#error-alert').hide();
  $('#logout').show();


  findAll()
    .then(todos => {
      console.log(todos);
      showTodo(todos)
    })
    .catch(err => {
      console.log('tidak boleh');
      console.log(err);
    })
}

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
  $('#register-input-email').val('');
  $('#register-input-password').val('');
  $('#register-input-email').focus();
  $('#login-input-email').val('');
  $('#login-input-password').val('');
  $('#login-input-email').focus();
}




// main function
$(document).ready(() => {

  // default view
  registerPage()

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

  // read all todos
  $('#read').on('click', () => {
    findAll()
      .then(todos => {
        $('#find-all-todos').empty();
        showTodo(todos)
      })
      .catch(err => {
        console.log('tidak boleh');
        console.log(err);
      })
  })

  // create new todo
  $('#create-todo').on('submit', (e) => {
    e.preventDefault();
    const title = $('#create-todo .todo-title').val();
    const description = $('#create-todo .todo-description').val();
    const due_date = $('#create-todo .todo-due-date').val();
    const status = false;
    const data = { title, description, status, due_date }
    console.log(data);
    create(data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })


  })
})