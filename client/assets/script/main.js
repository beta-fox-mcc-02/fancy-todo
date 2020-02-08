$(".loginContainer").hide()
$(".contentContainer").hide()
$(".detailContainer").hide()
$("#map").show()
$("#editContainer").hide()

function tokenCheck() {
  if (!localStorage.access_token) {
    showLoginPage()
  } else {
    showMainContent()
  }
}

function showLoginPage() {
  $(".loginContainer").show()
  $('#loginButton').show()
  $('#registerLink').show()
  $(".contentContainer").hide()
  $('#registerButton').hide()
  $('#loginLink').hide()
}

function showMainContent() {
  fetchStandard('ongoing')
  fetchImportant('ongoing')
  fetchCollId()
  $(".loginContainer").hide()
  $(".detailContainer").hide()
  $(".contentContainer").show()
  $('#map').show()
  $('#editContainer').hide()
  $('#userGreeting').empty()
  $('#userGreeting').append(`<h3>Hello, ${getUsername(localStorage.userEmail)}!</h3>`)
}

function fetchStandard(status) {
  let fetch;
  if (status !== 'filtered') {
    fetch = fetchTodo()
  } else {
    fetch = searchTodo()
  }

  fetch
    .done(todos => {
      let standards = todos.filter(todo => todo.priority === 'standard')

      if (status === 'ongoing') {
        standards = standards.filter(todo => !todo.status)
      } else if (status === 'done') {
        standards = standards.filter(todo => todo.status)
      }

      $('#standardCard').empty()
      standards.forEach(todo => {
        $('#standardCard').append(
          `<div class="card" style="margin-bottom: 1rem" id=${todo.id}>
            <div class="card-body">
              <h5 class="card-title">${todo.title}</h5>
              <h5> test </h5>
              <h6 class="card-subtitle mb-2 text-muted">${todo.status ? "Done" : "Ongoing"}</h6>
              <p class="card-text">${todo.description}</p>
              <button class="btn btn-info btn-sm show-detail fas fa-book-open" style="position: absolute;
              top: 0.1rem; right: 0.1rem; font-size: 10px" id=${todo.id}></button>
            </div>
          </div>`
        )
      })
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something\'s wrong',
        text: err.responseJSON.msg
      })
    })
}

function fetchImportant(status) {
  let fetch;
  if (status !== 'filtered') {
    fetch = fetchTodo()
  } else {
    fetch = searchTodo()
  }

  fetch
    .done(todos => {
      let importants = todos.filter(todo => todo.priority === 'important')

      if (status === 'ongoing') {
        importants = importants.filter(todo => !todo.status)
      } else if (status === 'done') {
        importants = importants.filter(todo => todo.status)
      }

      $('#importantCard').empty()
      importants.forEach(todo => {
        $('#importantCard').append(
          `<div class="card" style="margin-bottom: 1rem">
            <div class="card-body">
              <h5 class="card-title">${todo.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${todo.status ? "Done" : "Ongoing"}</h6>
              <p class="card-text">${todo.description}</p>
              <button class="btn btn-info btn-sm show-detail fas fa-book-open" style="position: absolute;
              top: 0.1rem; right: 0.1rem; font-size: 10px" id=${todo.id}></button>
            </div>
          </div>`
        )
      })
      showDetail()
    })
}

function showDetail() {
  $('.show-detail').click(event => {
    event.preventDefault()
    fetchOne(event.target.id)
    $(".contentContainer").hide()
    $(".detailContainer").show()
  })
}

const signOut = () => {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function getUsername(email) {
  let username = ''
  for (let i = 0; i < email.length; i++) {
    if (email[i] === '@') {
      break
    } else {
      username += email[i]
    }
  }
  return username
}

function datePlaceholder(duedate) {
  const date = new Date(duedate)
  const dd = date.getDate()
  const mm = date.getMonth() + 1
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`
}


// DOCUMENT MANIPULATION
$(document).ready(function () {
  tokenCheck()
  $('#loginButton').click(event => {
    event.preventDefault()
    login()
  })

  $('#registerButton').click(event => {
    event.preventDefault()
    register()
  })

  $('#registerLink').click(event => {
    event.preventDefault()
    $('#loginButton').hide()
    $('#registerLink').hide()
    $('#registerButton').show()
    $('#loginLink').show()
    $('.loginRegisterForm').removeAttr('id')
    $('.loginRegisterForm').attr('id', 'registerform')
    $("#email").val('')
    $("#password").val('')
  })

  $('#loginLink').click(event => {
    event.preventDefault()
    $('#loginButton').show()
    $('#registerLink').show()
    $('#registerButton').hide()
    $('#loginLink').hide()
    $('.loginRegisterForm').removeAttr('id')
    $('.loginRegisterForm').attr('id', 'loginform')
    $("#email").val('')
    $("#password").val('')
  })

  $('#logoutButton').click(event => {
    localStorage.clear()
    signOut()
    tokenCheck()
    Swal.fire({
      icon: 'success',
      text: 'You\'ve been logged out successfully',
      showConfirmButton: false,
      timer: 1500
    })
  })

  $('#ongoingTodos').click(event => {
    fetchStandard('ongoing')
    fetchImportant('ongoing')
  })

  $('#doneTodos').click(event => {
    fetchStandard('done')
    fetchImportant('done')
  })

  $('#allTodos').click(event => {
    fetchStandard()
    fetchImportant()
  })

  $('#addTodoButton').click(event => {
    addTodo()
  })

  $('#backButton').click(event => {
    showMainContent()
    $(".detailContainer").hide()
  })

  $('#addCollaborator').submit(event => {
    event.preventDefault()
    addCollaborator()
    showMainContent()
  })

  $('#searchForm').submit(event => {
    event.preventDefault()
    fetchStandard('filtered')
    fetchImportant('filtered')
  })

  $('#searchInput').click(() => {
    $('#searchInput').val('')
  })
});
// END OF DOCUMENT MANIPULATION