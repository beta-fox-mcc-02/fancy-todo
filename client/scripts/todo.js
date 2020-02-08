const modal = $('.modal')
const checkLogin = () => {
  let isLogin = false
  if (typeof (Storage) !== "undefined") {
    const token = localStorage.token
    if (token) {
      isLogin = true
    }
  }
  return isLogin
}

const hideForm = () => {
  $('.form-register').hide()
  $('.form-login').hide()
}

const initGooglePlaceApi = () => {
  const input = document.getElementById('search-location')
  if (input) {
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
    const searchBox = new google.maps.places.SearchBox(input, {
      bounds: defaultBounds,
    });
    searchBox.addListener('places_changed', function () {
      let places = searchBox.getPlaces();
      if (places.length) {
        places = places[0]
        $('#location-detail').show()
        $('#location-detail-name').text(places.name)
        $('#location-detail-address').text(places.formatted_address)
        $('#location-detail-phone-number').text(places.formatted_phone_number ? places.formatted_phone_number : '-')
        const paramsLocation = [{
          name: places.name,
          address: places.formatted_address,
          phone_number: places.formatted_phone_number ? places.formatted_phone_number : '-',
          google_place_id: places.place_id,
        }]
        $('#location').val(JSON.stringify(paramsLocation))
        getLocationDetail(places.place_id)
      }
    })
  }
}

const parseDate = (date) => {
  date = date.toLocaleDateString()
  const array = date.split('/')
  const year = array[2]
  const month = +array[0] < 10 ? `0${array[0]}` : `${array[0]}`
  const day = +array[1] < 10 ? `0${array[1]}` : `${array[1]}`
  return `${year}-${month}-${day}`
}

const openModalNewTask = () => {
  $('#search-location').val('')
  initGooglePlaceApi()
  const minDate = parseDate(new Date())
  $('#due_date').attr('min', minDate)
  $('#todo-location').hide()
  $('.modal #options-locations').prop('checked', false)
  $('#modal-body-nearby-places').hide()
  $('#location-detail').hide()
  $('#sp-loader').hide()
  $('#title').val('')
  $('#description').val('')
  $('#due_date').val('')
  $('#todo-status-form').addClass('hide')
  $('.modal form').attr('id', 'form-add-new-task')
  const locationChecked = $('.modal #options-locations:checked')
  if (locationChecked.length) {
    $('#todo-location').show()
  }
  $('#modal-add-edit').show()
  $('#modal-title').text('Add New Task')
}

const closeModal = () => {
  $('.modal').hide()
}

const openModalEdit = (id) => {
  initGooglePlaceApi()
  findTodo(id)
}

const openModalDelete = (id) => {
  $('#modal-delete').show()
  $('#deleted-todo-id').val(id)
}

$(document).ready(() => {
  let isLogin = checkLogin()
  if (isLogin) {
    findUser()
      .done((response) => {
        $('#navbarDropdown').show()
        $('#header-login').addClass('hide')
        $('#navbarDropdown').text(response.user.username)
        hideForm()
        getAllTodo()
      }).fail((err) => {
        $('.form-register').hide()
        $('.form-login').removeClass('hide').show()
        $('.todo-container').hide()
      });
  } else {
    $('.form-register').hide()
    $('.todo-container').hide()
    $('#header-login').removeClass('hide')
    $('#navbarDropdown').addClass('hide')
    $('#header-username').addClass('hide')
  }

  $('#add-new-task').on('click', (e) => {
    e.preventDefault()
    openModalNewTask()
  })

  $('#btn-close-modal-new-task, #btn-close-modal').on('click', (e) => {
    closeModal()
  })

  $('.modal-header .close').on('click', (e) => {
    closeModal()
  })

  $('#navbar-logout').on('click', (e) => {
    e.preventDefault()
    localStorage.clear()
    $('#header-login').removeClass('hide')
    $('#header-username').addClass('hide')
    $('#navbarDropdown').addClass('hide')
    $('.todo-container').hide()
    $('.modal').hide()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
    $('#form-login').show()
  })

  $('#btn-anchor-register').on('click', (e) => {
    e.preventDefault();
    $('#form-login').hide()
    $('#form-register').show()
    $('div.alert').hide()
    $('#input-email-login').val('')
    $('#input-password-login').val('')
  })

  $('#btn-anchor-login').on('click', (e) => {
    e.preventDefault();
    $('#form-login').show()
    $('#form-register').hide()
    $('div.alert').hide()
  })

  $('#form-login').on('submit', (e) => {
    e.preventDefault()
    $('#success-register').addClass('hide')
    login()
  })

  $('#form-register').on('submit', (e) => {
    e.preventDefault()
    register()
  })

  $('.modal').on('submit', '#form-add-new-task', (e) => {
    e.preventDefault()
    createTodo()
  })

  $('.modal').on('submit', '#form-edit-task', (e) => {
    e.preventDefault()
    const id = $('#todo-id').val()
    updateTodo(id)
  })

  $('#modal-delete').on('click', '#delete-todo', (e) => {
    e.preventDefault()
    const id = $('#deleted-todo-id').val()
    deleteTodo(id)
  })

  $('#options-locations').on('change', (e) => {
    const checked = e.target.checked
    if (checked) {
      $('#todo-location').show()
    } else {
      $('#todo-location').hide()
      $('#modal-body-nearby-places').hide()
      $('#location').val('')
      $('#search-location').val('')
      $('#location-detail').hide()
    }
  })

  $(window).on('click', (e) => {
    if ($(e.target).hasClass('modal')) {
      closeModal()
    }
  })
})