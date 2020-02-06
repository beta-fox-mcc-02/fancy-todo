$(".loginContainer").hide()
$(".contentContainer").hide()
$(".detailContainer").hide()

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
  $(".loginContainer").hide()
  $(".contentContainer").show()
}

function fetchStandard(status) {
  fetchTodo()
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
              <h6 class="card-subtitle mb-2 text-muted">${todo.status ? "Done" : "Ongoing"}</h6>
              <p class="card-text">${todo.description}</p>
              <button class="btn btn-info btn-sm show-detail fas fa-book-open" style="position: absolute;
              top: 0.1rem; right: 0.1rem; font-size: 10px" id=${todo.id}></button>
            </div>
          </div>`
        )
      })
    })
}

function fetchImportant(status) {
  fetchTodo()
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
    console.log(event.target.id)
    fetchOne(event.target.id)
    $(".contentContainer").hide()
    $(".detailContainer").show()
  })
}

function initMap() {
  let map;
  let loc = { lat: -6.219349299999999, lng: 106.8139745 }
  map = new google.maps.Map(document.getElementById('map'), {
    center: loc,
    zoom: 17,
    mapTypeId: 'satellite'
  });
  const marker = new google.maps.Marker({ position: loc, map: map });
}

const signOut = () => {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}



// DOCUMENT MANIPULATION
$(document).ready(function () {
  tokenCheck()
  $('#loginButton').click(event => {
    event.preventDefault()
    login()
  })

  $('#registerButton').click(event => {
    console.log(event.target.id)
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
});
// END OF DOCUMENT MANIPULATION