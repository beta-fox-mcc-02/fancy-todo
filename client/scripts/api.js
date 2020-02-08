function login(data) {
    // data = {email, password}
    return $.ajax({
        url:'http://localhost:3000/login',
        type: 'POST',
        data
    })
}

function register(data) {
    // data = {email, password}
    return $.ajax({
        url:'http://localhost:3000/login',
        type: 'POST',
        data
    })
}

function findAll() {
    return $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'GET',
        headers: {
            'access_token': localStorage.getItem('access_token')
        }
    })
}

function createTask(data) {
    // data = {title, description, due_date}
    return $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'POST',
        headers: {
            'access_token': localStorage.getItem('access_token')
        }
    })
}
