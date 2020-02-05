function updateCard(userid) {
  var x = document.getElementById("addtodo");
  var y = document.getElementById("updatetodo");
  localStorage.setItem('targetid', userid)
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";

  } else {
    x.style.display = "none";
    y.style.display = "block";

  }
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  axios({
    method: 'post',
    url: 'http://localhost:3000/user/gSign',
    data:{
      id_token
    }
  })
  .then(({data})=>{
    console.log(data);
    localStorage.setItem('token', data.token)
    $('#regis').hide();
    $('#first').show();
    $('#first').show();
    $('#crud').show();
    
    $('#ForUser').append(`
      <a> ${data.name}</a>	
      `)
  })
  .catch(err =>{
    console.log(err);
  })

}

function fetchTodos() {
  let pk = localStorage.token
  axios({
    method: 'get',
    url: `http://localhost:3000/todo/user/${pk}`,
    headers:{
      'token': pk
    }
  })
  .then(({data}) =>{
    console.log(data);
    $('#feed').empty()
    $.each(data, function (index, val) {
      let pr = val.id

      $('#feed').append(`

      <div class="card" style="width: 18rem; margin-bottom: 1rem;">
      <div class="card-body">
        <h5 class="card-title">${val.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${val.status}</h6>
        <p class="card-text">${val.desc}</p>
        <h6 class="mb-3">duedate: ${val.due_date}</h6>
        <button class="btn btn-warning" onclick="updateCard('${val.id}')" id="${pr}">update</button>
        <button class="btn btn-danger" onclick="destroy('${val.id}')" id="${pr}">delete</button>            
      </div>
    </div>

      `)
    })

  })
  .catch(err =>{
    console.log(err);
    
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear()
    console.log('User signed out.');
  });
}

function destroy(id) {
  let pk = localStorage.token
  axios({
    method: 'delete',
    url: `http://localhost:3000/todo/${id}`,
    headers:{
      'token': pk
    }
  })
  .then(data =>{
    console.log(data, 'hasil delete');
    fetchTodos()
  })
  .catch(err =>{
    console.log(err);
  })
}

$( document ).ready(function() {

  
  if(localStorage.token){
    $('#regis').hide();
    $('#first').show();
    $('#first').show();
    $('#crud').show();
    fetchTodos()
  }else{
    $('#regis').show();
    $('#first').hide();
    $('#first').hide();
    $('#crud').hide();
  }

  $('form#form-group').submit((event)=>{
    event.preventDefault();
    let name = $('#InputName').val();
    console.log(name);

    console.log('y=yissssss');
    
  })

  $('#addtodo').submit((event) => {
    event.preventDefault();
    const title = $('#InputTitle').val();
    const desc = $('#InputDesc').val();
    const status = $('#InputStatus').val();
    const due_date = $('#InputDates').val();
    const pk = localStorage.getItem('token')

    console.log(pk, title, desc, status, due_date)

    axios({
      method: 'post',
      url: `http://localhost:3000/todo/`,
      data:{
        title,
        desc,
        status,
        due_date
      },
      headers:{
        'token': pk
      }
    })
    .then (data =>{
      // console.log(data);
      $('#InputTitle').val('')
      $('#InputDesc').val('')
      $('#InputStatus').val('')
      $('#InputDates').val('')
      fetchTodos()
    })
    .catch(err =>{
      console.log(err);
      
    })
  });

  $('#updatetodo').submit((event) => {
    event.preventDefault();
    const title = $('#UpdateTitle').val();
    const desc = $('#UpdateDesc').val();
    const status = $('#UpdateStatus').val();
    const due_date = $('#UpdateDates').val();
    const pk = localStorage.getItem('token')
    const pr = localStorage.getItem('targetid')

    console.log(title, desc, status, due_date, pr)

    axios({
      method: 'put',
      url: `http://localhost:3000/todo/${pr}`,
      data:{
        title,
        desc,
        status,
        due_date
      },
      headers:{
        'token': pk
      }
    })
    .then (data =>{
      console.log(data);
      $('#UpdateTitle').val('')
      $('#UpdateDesc').val('')
      $('#UpdateStatus').val('')
      $('#UpdateDates').val('')
      fetchTodos()
      updateCard()
    })
    .catch(err =>{
      console.log(err);
      
    })
  });

});
