let token = localStorage.getItem('token')

function homePage() {
    $('#home').show()
    $('#register').hide()
    $('#login').hide()
    $('#add-todo').hide()
}

$(document).ready(() => {
    if (token) {
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#nav-add-todo').show()
        $('#nav-home').show()
        $('#nav-logout').show()
    } else {
        $('#nav-home').hide()
        $('#nav-register').show()
        $('#nav-login').show()
        $('#nav-add-todo').hide()
        $('#nav-logout').hide()
        $('#list-todo').hide()
    }

    $('#nav-logout').on('click', () => {
        logout()
    })

    homePage()

    fetch()

    $('#nav-home').on('click', () => {
        homePage()
    })

    $('#nav-login').on('click', () => {
        $('#register').hide()
        $('#home').hide()
        $('#add-todo').hide()
        $('#login').show()
    })

    $('#nav-register').on('click', () => {
        $('#register').show()
        $('#home').hide()
        $('#add-todo').hide()
        $('#login').hide()
    })

    $('#nav-add-todo').on('click', () => {
        $('#register').hide()
        $('#home').hide()
        $('#add-todo').show()
        $('#login').hide()
    })

    $('#form-login').on('submit', () => {
        login()
    })

    $('#form-register').on('submit', () => {
        register()
    })

    $('#form-add-todo').on('submit', () => {
        addTodo()
    })
})