function addTodoList() {
   $("#showTodoList").empty()
   
   $.ajax({
      method: "POST",
      url: "http://localhost:3000/todos",
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
         console.log('masuk create')
         fetchTodoList()         
      })
      .fail(err => {
         $("#successCreateTodo").hide()
         $("#failCreateTodo").show()
         console.log('error create')
         console.log(err)
      })
}

function fetchTodoList() {
   $("#showTodoList").empty()
   console.log('masuk fetch')
   
   $.ajax({
      method: "GET",
      url: "http://localhost:3000/todos",
      headers : {
        token : localStorage.getItem("token")
      }
   })
      .done(todos => {
         console.log(todos)
         let data =''
         if(todos.length === 0) {   
            data = 
            `
               <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
               </tr>
            `
         } else {
            todos.forEach(todo => {
               // console.log(todo)
               data +=
                  `
                  <tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
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
         $("#failCreateTodo").hide()
         $("#successCreateTodo").hide()
         $("#showTodoList").html(data)

      })
      .fail(err => {
         console.log(err)
         console.log('fail fetch todo list')
      })
}

function getModalTodo(id) {
   $("#todoList").hide()
   $("#modalUpdateTodo").show()
   $.ajax({
      method: "GET",
      url: `http://localhost:3000/todos/${id}`,
      headers : {
         token : localStorage.token
      }
   })
      .then(todo => {
         console.log(todo)
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
            <button onclick="event.preventDefault(); updateTodoList(${todo.data.id}, '${convertDate(todo.data.due_date)}')" class="btn btn-secondary" id="updateTodoConfirm">Confirm Update</button>
            `
         )
      })
      // 
}

function updateTodoList(id, date) {
   $("#showTodoList").empty()
   // console.log(id, date)
   let newDate
   if(!newDate) {
      newDate = date
   } else {
      newDate = $("#updateDueDate").val()
   }
   const title = $("#updateTitle").val()
   const description = $("#updateDescription").val()
   $.ajax({
      method: "PUT",
      url: `http://localhost:3000/todos/${id}`,
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
         console.log(todo)
         $("#modalUpdateTodo").hide()
         $("#todoList").show()
         fetchTodoList()
      })
      .fail(err => {
         console.log(err)
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
   $("#showTodoList").empty()

   $.ajax({
      method: "DELETE",
      url: `http://localhost:3000/todos/${id}`,
      headers : {
         token : localStorage.token
      }
   })
      .done(todo => {
         $("#modalDeleteTodo").hide()
         $("#todoList").show()
         fetchTodoList()
      })
      .fail(err => {
         console.log(err)
      })
}

function convertDate (date) {
   console.log('masuk')
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
   $.ajax({
      method: "GET",
      url: `http://localhost:3000/search`,
      headers : {
         token : localStorage.token
      }
   })
      .done(data => {
         let restaurant = []
         let restoId = []
         data.restaurants.forEach((resto, i) => {
            if(i < 10) {
               restaurant.push(resto.restaurant.name)
               restoId.push(resto.restaurant.id)
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
                  <input type="hidden" value="${restoId[i]}">
                  <td><button class="btn btn-primary" id="restoSelected" onclick="event.preventDefault(); selectResto('${resto}', ${restoId[i]})">Select</button></td>
               </tr>
            `
         })
         $("#zomatoList").html(newData)
         
      })
      .fail(err => {
         console.log(err)
      })
}

// $("#restoSelected").on("click", function(el) {
//    selectResto()
// })

function selectResto(resto, id) {
   console.log('masuk select Resto')
   $("#listZomato").hide()
   $("#zomatoModal").show()
   $("#addZomatoTitle").val(`${resto}`)
   
}
