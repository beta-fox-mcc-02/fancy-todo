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

const openModalNewTask = () => {
  $('#modal-add-edit').show()
  $('#modal-title').text('Add New Task')
  $('.modal .btn-success').attr('id', 'submit-new-task')
}

const closeModal = () => {
  $('.modal').hide()
}

const openModalEdit = (id) => {
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
      .then((response) => {
        hideForm()
        getAllTodo()
      }).catch((err) => {
      });
  } else {
    $('.form-register').hide()
    $('.todo-container').hide()
  }

  $('#header-login').addClass('hide')
  $('#header-logout').parent().removeClass('hide')

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

  $('#header-logout').on('click', (e) => {
    e.preventDefault()
    localStorage.clear()
    $('#header-login').removeClass('hide')
    $('#header-logout').parent().addClass('hide')
    $('.todo-container').hide()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('#form-login').show()
  })

  $('#btn-anchor-register').on('click', (e) => {
    e.preventDefault();
    $('#form-login').hide()
    $('#form-register').show()
  })

  $('#btn-anchor-login').on('click', (e) => {
    e.preventDefault();
    $('#form-login').show()
    $('#form-register').hide()
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

  $('.modal').on('click', '#submit-new-task', (e) => {
    e.preventDefault()
    createTodo()
  })

  $('.modal').on('click', '#submit-edit-task', (e) => {
    e.preventDefault()
    const id = $('#todo-id').val()
    updateTodo(id)
  })

  $('#modal-delete').on('click', '#delete-todo', (e) => {
    e.preventDefault()
    const id = $('#deleted-todo-id').val()
    deleteTodo(id)
  })
})