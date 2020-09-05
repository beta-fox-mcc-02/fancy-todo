function addTodoList() {
   $("#showTodoList").html('')
   $("#alert").html('')
   $("#alertAddTodo").html('')
   
   $.ajax({
      method: "POST",
      url: `${URL}/todos`,
      data : {
         title: $("#addTitle").val(),
         description: $("#addDescription").val(),
         due_date : $("#addDueDate").val()
      },
      headers : {
         token : localStorage.getItem("token")
      }
   })
      .done(todos => {
         // console.log(todos.msg)
         let success = `
         <div class="alert alert-success mx-auto" role="alert">
            ${todos.msg}
         </div>
         `
         $("#alert").show()
         $("#alert").html(success)
         $("#addTitle").val('')
         $("#addDescription").val('')
         $("#addDueDate").val('')
         $("#modalAddTodo").hide()
         $("#todoList").show()
         fetchTodoList()         
      })
      .fail(err => {
         let fail = `
         <div class="alert alert-danger mx-auto" role="alert">
            ${err.responseJSON.message}
         </div>
         `
         $("#alertAddTodo").show()
         $("#alertAddTodo").html(fail)
      })
}

function fetchTodoList() {
   $("#showTodoList").html('')
   
   $.ajax({
      method: "GET",
      url: `${URL}/todos`,
      headers : {
        token : localStorage.getItem("token")
      }
   })
      .done(todos => {
         let data =''
         if(todos.length === 0) {   
            data = 
            `
               <tr class="text-center">
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
               </tr>
            `
         } else {
            todos.forEach(todo => {
               let description
               let title
               if(todo.title.length > 20) {
                  title = todo.title.substring(0, 20) + '.....'
               } else {
                  title = todo.title
               }
               if(todo.description.length > 40) {
                  description = todo.description.substring(0, 40) + '......'
               } else {
                  description = todo.description
               }
               // console.log(todo)
               data +=
                  `
                  <tr class="text-center">
                    <td>${title}</td>
                    <td>${description}</td>
                    ${todo.status ? `<td class="text-success">complete</td>` : `<td class="text-danger">uncomplete</td>`}
                    <td>${convertDate(todo.due_date)}</td>
                    <td>
                        <a href="#" onclick="getModalTodo(${todo.id})">Edit</a> || 
                        <a onclick="showModalDeleteTodo(${todo.id})" class="btn-deleteTodo" href="#" >Delete</a>
                    </td>
                  </tr>
                  `
            }
            )   
         }
         $("#loadingTodoList").hide()
         $("#showTodoList").html(data)

      })
      .fail(err => {
         let danger = `
         <div class="alert alert-danger mx-auto" role="alert">
            ${err.responseJSON.msg}
         </div>
         `
         $("#alert").show()
         $("#alert").html(danger)
      })
}

function getModalTodo(id) {
   $("#todoList").hide()
   $("#alertTodo").html('')
   $("#modalUpdateTodo").show()
   $.ajax({
      method: "GET",
      url: `${URL}/todos/${id}`,
      headers : {
         token : localStorage.token
      }
   })
      .then(todo => {
         $("#todoUpdate").html(
            `
            <div class="form-group">
               <label for="title">Title</label>
               <input type="text" class="form-control" value="${todo.data.title}" id="updateTitle" placeholder="title" required  autofocus>
            </div>
            <div class="form-group">
               <label for="description">Description</label>
               <input type="text" class="form-control"   id="updateDescription" placeholder="description" value="${todo.data.description}" required>
            </div>
            <div class="form-group">
               <label for="due_date">Due_date</label><br>
               <label>${convertDate(todo.data.due_date)}</label>
               <input type="date" class="form-control" id="updateDueDate" placeholder="new date">
            </div>
            <select name="status" id="updateStatus">
               <option value="true">Complete</option>
               <option value="false">Uncomplete</option>
            </select>
            <button onclick="event.preventDefault(); updateTodoList(${todo.data.id}, '${convertDate(todo.data.due_date)}')" class="btn btn-success">Save</button>
            `
         )
      })
      // 
}

function updateTodoList(id, date) {
   $("#showTodoList").html('')
   $("#alertTodo").html('')
   // console.log(id, date)
   let newDate = $("#updateDueDate").val()
   if(!newDate) {
      newDate = date
   }
   const title = $("#updateTitle").val()
   const description = $("#updateDescription").val()
   $.ajax({
      method: "PUT",
      url: `${URL}/todos/${id}`,
      data : {
         title,
         description,
         status : $("#updateStatus").val(),
         due_date : new Date(newDate),
      },
      headers : {
         token : localStorage.getItem("token")
      }
   })
      .done(todo => {
         $("#modalUpdateTodo").hide()
         $("#todoList").show()
         let success = `
         <div class="alert alert-success mx-auto" role="alert">
            ${todo.msg}
         </div>
         `
         $("#alert").show()
         $("#alert").html(success)
         fetchTodoList()
      })
      .fail(err => {
         let error = `
         <div class="alert alert-danger mx-auto" role="alert">
            ${err.responseJSON.msg}, cannot use date before now
         </div>
         `
         $("#alertTodo").html(error)
      })
}

function showModalDeleteTodo(id) {
   $("#todoList").hide()
   $("#modalDeleteTodo").show()
   $("#deleteTodoConfirm").on("click", function(el) {
      el.preventDefault()
      deleteTodoList(id)
   })
}

function deleteTodoList(id) {
   $("#showTodoList").html('')

   $.ajax({
      method: "DELETE",
      url: `${URL}/todos/${id}`,
      headers : {
         token : localStorage.token
      }
   })
      .done(todo => {
         $("#modalDeleteTodo").hide()
         $("#todoList").show()
         let success = `
         <div class="alert alert-success mx-auto" role="alert">
            ${todo.msg}
         </div>
         `
         $("#alert").show()
         $("#alert").html(success)
         fetchTodoList()
      })
      .fail(err => {
         let danger = `
         <div class="alert alert-danger mx-auto" role="alert">
            ${err.responseJSON.msg}
         </div>
         `
         $("#alert").show()
         $("#alert").html(danger)
      })
}

function convertDate (date) {
   const year = new Date(date).getFullYear()
   let month = new Date(date).getMonth()+1
   let newDate = new Date(date).getDate()
   if(month < 10) {
      month = '0' + month
   }
   if(newDate < 10) {
      newDate = '0' + newDate
   }  
   return `${year}/${month}/${newDate}`
}

function zomato() {
  $("#zomatoList").hide()
   $.ajax({
      method: "GET",
      url: `${URL}/search`,
      headers : {
         token : localStorage.token
      }
   })
      .done(data => {
        //  console.log(data)
         let restaurant = []
         let restoId = []
         let restoAddress =[]
         data.restaurants.forEach((resto, i) => {
            if(i < 20) {
               restaurant.push(resto.restaurant.name)
               restoId.push(resto.restaurant.id)
               restoAddress.push(resto.restaurant.location.locality)
            }
         })
         let newData = ''
         let counter = 0
         restaurant.forEach((resto,i) => {
            newData += 
            `
               <tr>
                  <td>${++counter}</td>
                  <td>${resto}</td>
                  <td>${restoAddress}</td>
                  <input type="hidden" value="${restoId[i]}">
                  <td><button class="btn btn-primary" onclick="event.preventDefault(); selectResto('${resto}', ${restoId[i]})">Select</button></td>
               </tr>
            `
         })
         $("tbody#loading").hide()
         $("#zomatoList").show()
         $("#zomatoList").html(newData)
      })
      .fail(err => {
         let fail = `
         <div class="alert alert-danger mx-auto" role="alert">
            You have reached maximum for today, please comeback tomorrow
         </div>
         `
         $("#alert").show()
         $("#alert").html(fail)
      })
}


function selectResto(resto, id) {
   $("#listZomato").hide()
   $("#zomatoModal").show()
   $("#addZomatoTitle").val(`${resto}`)
}

function addZomatoList() {
   $("#showTodoList").html('')
   $("#alert").html('')
   $.ajax({
      method: "POST",
      url: `${URL}/todos`,
      data : {
         title: $("#addZomatoTitle").val(),
         description: $("#addZomatoDescription").val(),
         due_date : $("#addZomatoDueDate").val()
      },
      headers : {
         token : localStorage.getItem("token")
      }
   })
      .done(todos => {
         // console.log(todos.msg)
         let success = `
         <div class="alert alert-success mx-auto" role="alert">
            ${todos.msg}
         </div>
         `
         $("#alert").show()
         $("#alert").html(success)
         $("#addZomatoTitle").val('')
         $("#addZomatoDescription").val('')
         $("#addZomatoDueDate").val('')
         fetchTodoList()         
      })
      .fail(err => {
         // console.log(err)
         let fail = `
         <div class="alert alert-danger mx-auto" role="alert">
            ${err.responseJSON.message}
         </div>
         `
         $("#alertZomatoTodo").show()
         $("#alertZomatoTodo").html(fail)
      })
}