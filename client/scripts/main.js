let token = localStorage.getItem('token')
let gToken = localStorage.getItem('gToken')

function homePage() {
    if (token) {
        $('#home').show()
        $('#register').hide()
        $('#login').hide()
        $('#add-todo').hide()
        $('#edit-todo').hide()
        $('#welcome').hide()
        $('#catet-text').hide()
    } else {
        $('#home').show()
        $('#register').hide()
        $('#login').hide()
        $('#add-todo').hide()
        $('#edit-todo').hide()
        $('#welcome').show()
        $('#catet-btn').hide()
    }
}

function btnSignOutCondition() {
    if (gToken) {
        $('#nav-g-logout').show()
        $('#nav-logout').hide()
    } else {
        $('#nav-g-logout').hide()
        $('#nav-logout').show()
    }
}

function afterGSignIn(e) {
    e.preventDefault()
    // location.reload(true)
    $('#home').show()
    $('#register').hide()
    $('#login').hide()
    $('#add-todo').hide()
    $('#edit-todo').hide()
    $('#welcome').hide()
    $('#list-todo').show()
    $('#nav-login').hide()
    $('#nav-add-todo').show()
    $('#nav-register').hide()
    if (gToken) {
        $('#nav-g-logout').show()
        $('#nav-logout').hide()
    } else {
        $('#nav-g-logout').hide()
        $('#nav-logout').show()
    }
}

$(document).ready(() => {
    if (token) {
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#nav-add-todo').show()
        $('#nav-home').show()

        if (gToken) {
            $('#nav-g-logout').show()
            $('#nav-logout').hide()
        } else {
            $('#nav-g-logout').hide()
            $('#nav-logout').show()
        }
    } else {
        $('#nav-home').hide()
        $('#nav-register').show()
        $('#nav-login').show()
        $('#nav-add-todo').hide()
        $('#nav-logout').hide()
        $('#nav-g-logout').hide()
        $('#list-todo').hide()
    }

    $('#nav-logout').on('click', () => {
        logout()
    })

    fetch()
    
    homePage()

    $('#nav-home').on('click', () => {
        $('#nav-add-todo').show()
        $('#home').show()
        $('#add-todo').hide()
        $('#edit-todo').hide()
        $('#list-todo').show()
    })

    $('#nav-login').on('click', () => {
        $('#register').hide()
        $('#home').hide()
        $('#add-todo').hide()
        $('#login').show()
        $('#welcome').hide()
    })

    $('#nav-register').on('click', () => {
        $('#register').show()
        $('#home').hide()
        $('#add-todo').hide()
        $('#login').hide()
        $('#welcome').hide()
    })

    $('#nav-add-todo').on('click', () => {
        $('#register').hide()
        $('#home').hide()
        $('#add-todo').show()
        $('#login').hide()
        $('#edit-todo').hide()
        $('#nav-add-todo').hide()
    })

    $('#form-login').on('submit', (event) => {
        event.preventDefault()
        login()
    })

    $('#form-register').on('submit', () => {
        register()
    })

    $('#form-add-todo').on('submit', () => {
        addTodo()
    })

    $('#catet-btn').on('click', () => {
        fetch()
        $('#nav-home').show()
        $('#welcome').hide()
        $('#nav-add-todo').show()
        $('#list-todo').show()
    })

    // afterGSignIn()
})