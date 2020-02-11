let token = localStorage.getItem('token')
let gToken = localStorage.getItem('gToken')
let welcome = localStorage.getItem('welcome')

if (!token) {
    localStorage.setItem('welcome', 'welcome')
}

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
        $('#nav-holiday').hide()
        $('#holidays').hide()
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
    $('#holidays').hide()
    $('#nav-home').hide()

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

    $('#nav-g-logout').on('click', (e) => {
        e.preventDefault()
        signOut()
    })

    fetch()
    
    homePage()

    $('#nav-home').on('click', () => {
        if (welcome) {
            $('#home').hide()
            $('#welcome').show()
            $('#register').hide()
            $('#login').hide()
            $('#add-todo').hide()
            $('#nav-holiday').hide()
            $('#holidays').hide()
        } else {
            $('#welcome').hide()
            $('#home').show()
            $('#list-todo').show()
            $('#nav-add-todo').show()
            $('#nav-holiday').show()
            $('#add-todo').hide()
            $('#edit-todo').hide()
            $('#holidays').hide()
        }
    })

    $('#nav-login').on('click', () => {
        $('#nav-home').show()
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

    $('#form-register').on('submit', (event) => {
        event.preventDefault()
        register()
    })

    $('#form-add-todo').on('submit', (e) => {
        e.preventDefault()
        addTodo()
    })

    $('#catet-btn').on('click', () => {
        fetch()
        $('#nav-home').show()
        $('#welcome').hide()
        $('#nav-add-todo').show()
        $('#home').show()
        $('#list-todo').show()
        $('#nav-holiday').show()
        $('#holidays').hide()

    })

    $('#nav-holiday').on('click', () => {
        getHolidays()
        $('#nav-home').show()
        $('#nav-add-todo').hide()
        $('#nav-holiday').hide()
        $('#holidays').show()
        $('#list-todo').hide()
    })
})