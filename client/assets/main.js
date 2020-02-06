function toggleRegister() {
   $('#login').hide()
   $('#register').show()
   $('#home').hide()
}

function toggleLogin() {
   $('#login').show()
   $('#register').hide()
   $('#home').hide()
}

function toggleHome () {
   $('#login').hide()
   $('#register').hide()
   $('#home').show()
   $('#add-myTodo').hide()
   $('#edit-myTodo').empty()
}
// =========================================================================

function onSignIn(googleUser) {
   // var profile = googleUser.getBasicProfile();
   const token = googleUser.getAuthResponse().id_token;
   // console.log(token, `ini awalnya`);

   axios({
      method: `POST`,
      url: `http://localhost:3000/users/gSignIn`,
      data: {
         token
      }
   })
      .then(({ data }) => {
         // console.log(data, `ini tokennya`);
         localStorage.setItem(`token`, data.token)
         $('#login').hide()
         $('#register').hide()
         $('#home').show()
         fetchMyTodo()
         Swal.fire(
            'Login Success bosq!',
            'welcome back bosq',
            'success'
         )
      })
      .catch(err => {
         console.log(err);
      })
}

function signOut() {
   if (localStorage.token) {
      $('#content-myTodo').empty()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
         console.log('User signed out.');
         localStorage.removeItem(`token`)
         Swal.fire(
            'Logout succesfully!',
            'see you bos q',
            'success'
         )
      });
      $('#login').show()
      $('#home').hide()
      $('#register').hide()
      $('#add-myTodo').hide()
      $('#edit-myTodo').empty()

   }
   else {
      Swal.fire(
         'Did you already login?',
         'login dulu dong bos',
         'question'
      )
   }
}

function fetchMyTodo() {
   let token = localStorage.getItem(`token`)
   axios({
      method: `GET`,
      url: `http://localhost:3000/todos/mytodo`,
      headers: {
         token
      }
   })
      .then(({ data }) => {
         console.log(data, `fetch todooooooooo`);
            let content = ``

            for (let i = 0; i <= data.length - 1; i++) {
               let status = ''
               if (data[i].status) {
                  status = `Done`
               } else {
                  status = `Undone`
               }
               let tanggalan = new Intl.DateTimeFormat('id', {
                  weekday: `long`, year: `numeric`, month: `long`, day: `numeric`
               }).format(new Date(data[i].due_date))

               content += `
               <div class="card text-center shadow my-3" style="opacity: .95">
                        <div class="card-body">
                           <h5 class="card-title">${data[i].title}</h5>
                           <p class="card-text">${data[i].description}</p>
                           <p class="card-text">status: ${status}</p>
                           <a href="#" class="btn btn-secondary mx-1" onclick="toggleEditTodo(${data[i].id})"><i class="fas fa-pencil-alt"></i></a>
                           <a href="#" class="btn btn-danger mx-1" onclick="deleteTodo(${data[i].id})"><i class="fas fa-trash"></i></a>
                        </div>
                        <div class="card-footer text-muted">
                           Due date: ${tanggalan}
                        </div>
                     </div>
               `
            }
            $('#content-myTodo').html(content)
      })
      .catch(err => {
         console.log(err);
      })
}

function toggleAddTodo() {
   $('#add-myTodo').show()
   $('#edit-myTodo').empty()
}

function deleteTodo(id) {
   let token = localStorage.getItem(`token`)
   axios({
      method: `DELETE`,
      url: `http://localhost:3000/todos/${id}`,
      headers: {
         token
      }
   })
      .then(_ => {
         console.log(`deleted`);
         fetchMyTodo()
         $('#edit-myTodo').empty()
         Swal.fire(
            'Data deleted bosq!',
            '',
            'success'
         )
      })
      .catch(err => {
         console.log(err);
      })
}

function toggleEditTodo(id) {
   $('#add-myTodo').hide()
   axios({
      method: `GET`,
      url: `http://localhost:3000/todos/${id}`
   })
      .then(({ data }) => {
         let content = `
                  <div class="card shadow" style="opacity: .95">
                        <h3 class="text-center p-3 mt-3">Edit todo</h3>
                        <form id="editTodo-form" class="pl-5 pr-5 pb-4">
                           <div class="form-group">
                              <input type="text" class="form-control" id="form-editTodo-title" value="${data.title}">
                              <small id="emailHelp" class="form-text text-muted">Please explain your title
                                 briefly.</small>
                           </div>
                           <div class="form-group">
                              <input type="text" class="form-control" id="form-editTodo-description"
                                 value="${data.description}">
                              <small id="emailHelp" class="form-text text-muted">Specific description for your
                                 todo.</small>
                           </div>
                           <div class="form-group">
                              <input type="date" class="form-control" id="form-editTodo-dueDate" value="${data.due_date}">
                              <small id="emailHelp" class="form-text text-muted">Due date for your todo.</small>
                           </div>
                           <div class="form-group form-check">
                              <input type="checkbox" class="form-check-input" id="form-editTodo-status" value="${data.status}">
                              <label class="form-check-label" for="form-editTodo-status">Done</label>
                            </div>
                           <div class="text-center">
                              <button type="submit" class="btn btn-info mt-3" onclick="editTodo(${data.id})">Submit</button>
                           </div>
                        </form>
                     </div>
         `
         $('#edit-myTodo').html(content)
      })
      .catch(err => {
         console.log(err);
      })
}

function editTodo(id) {
   let title = $('#form-editTodo-title').val()
   let description = $('#form-editTodo-description').val()
   let status = $('#form-editTodo-status').val()
   let due_date = $('#form-editTodo-dueDate').val()
   let token = localStorage.token

   axios({
      method: `PUT`,
      url: `http://localhost:3000/todos/${id}`,
      data : {
         title, description, status, due_date
      },
      headers : {
         token
      }
   })
      .then(_ => {
         console.log(`updated`);
         $('#edit-myTodo').empty()
         Swal.fire(
            'update Success bosq!',
            '',
            'success'
         )
         fetchMyTodo()
      })
      .catch (err => {
         console.log(err);
      })
}


// ==================================================================================
$(document).ready(() => {
   if (!localStorage.token) {
      $('#login').show()
      $('#register').hide()
      $('#home').hide()
      $('#add-myTodo').hide()

   }
   else {
      $('#login').hide()
      $('#register').hide()
      $('#home').show()
      $('#add-myTodo').hide()
      fetchMyTodo()
   }

   $('#login-form').submit((e) => {
      e.preventDefault()
      let email = $('#form-email-login').val()
      let password = $('#form-password-login').val()

      axios({
         method: `POST`,
         url: `http://localhost:3000/users/login`,
         data: {
            email, password
         }
      })
         .then(({ data }) => {
            localStorage.setItem(`token`, data.token)

            fetchMyTodo()

            $('#login').hide()
            $('#home').show()
            $('#register').hide()
            Swal.fire(
               'Login Success bosq!',
               'welcome back bosq',
               'success'
            )
         })
         .catch(err => {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'email / password salah nich!',
            })
         })
   })

   $('#register-form').submit((e) => {
      e.preventDefault()
      let email = $('#form-email-register').val()
      let password = $('#form-password-register').val()

      axios({
         method: `POST`,
         url: `http://localhost:3000/users/register`,
         data: {
            email, password
         }
      })
         .then(({ data }) => {
            $('#login').show()
            $('#home').hide()
            $('#register').hide()

            Swal.fire(
               'Register Success bosq!',
               'Now you can login with your account',
               'success'
            )

         })
         .catch(err => {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'did you fill it correctly?',
               footer: `fill with email format and password minimum is 5`
            })
         })
   })

   $('#addTodo-form').submit((e) => {
      console.log(`jalan`);

      e.preventDefault()
      let token = localStorage.getItem(`token`)
      let title = $('#form-addTodo-title').val()
      let description = $('#form-addTodo-description').val()
      let due_date = $('#form-addTodo-dueDate').val()
      axios({
         method: `POST`,
         url: `http://localhost:3000/todos`,
         headers: {
            token
         },
         data: {
            title, description, due_date
         }
      })
         .then(({ data }) => {
            console.log(data, `new todooooooo`);
            $('#add-myTodo').hide()
            fetchMyTodo()
            Swal.fire(
               'Add new todo successfully!',
               '',
               'success'
            )
         })
         .catch(err => {
            next(err)
         })
   })
})