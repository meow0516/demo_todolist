let token = null;

getAllTasks();
// var logininfo = {
//     "url": "https://api-nodejs-todolist.herokuapp.com/user/login",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Content-Type": "application/json"
//     },
//     "crossDomain" : true,
//     "data": JSON.stringify({
//       "email": "meow0516@gmail.com",
//       "password": "12345678"
//     }),
//   };

// $.ajax(logininfo).done(function (response) {
//       token = response.token;
//       console.log(response);
//       // console.log(token);
//       getAllTasks();

// });
            
// get all task
function getAllTasks(){
  var getTaskSettings = {
    // "url": "https://api-nodejs-todolist.herokuapp.com/task",
    "url": "https://todo-list-api-server.herokuapp.com/api/task",
    "method": "GET",
    // "timeout": 0,
    // "headers": {
      // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
      // "Authorization": "Bearer "+ token,
    //   "Content-Type": "application/json"
    // },
  };
  
  $.ajax(getTaskSettings).done(function (response) {
    console.log(response);
    taskArray = response
    taskArray.forEach(taskList => {

      completeStatus = taskList['completed'];
      taskId = taskList['id'];
      description = taskList['description'];

      new_todo_format = $('.none').clone().removeClass('none');
      new_todo_format.find('.content').text(description);

      content_arr.push({
      id: taskId,
      completed: completeStatus,
      description: description
      });

      if ( completeStatus == false) {
        $('li.none').before(new_todo_format);
      }
      else{        
          new_todo_format.find('.complete').removeClass('icon-check-empty').addClass('icon-check');
          $('li.none').before(new_todo_format);        
        }
        
      });
      $('#todolist').css("background-color","#b8d1ee");
  });
  
}
            
// add task
function addTask(description){
  var addTaskSettings = {
    // "url": "https://api-nodejs-todolist.herokuapp.com/task",
    "url": "https://todo-list-api-server.herokuapp.com/api/task",
    "method": "POST",
    "timeout": 0,
    "headers": {
      // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "description": description,
    }),
  };

  $.ajax(addTaskSettings).done(function (response) {
    console.log(response);
    taskId = response['id'];
    completeStatus = response.data['completed'];
    content_arr.push({
      id: taskId,
      completed: completeStatus,
      description: description
    });
  });
}

// update task
function updateTask(id, description){
  var updateSettings = {
      // "url": "https://api-nodejs-todolist.herokuapp.com/task/"+id,
      "url": "https://todo-list-api-server.herokuapp.com/api/task/"+id,
      "method": "PUT",
      "timeout": 0,
      "headers": {
          // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
          "Authorization": "Bearer "+ token,
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "description": description,
          }),
        };
        
  $.ajax(updateSettings).done(function (response) {
      console.log(response);
    });

}

// complete task postman ver
function completeTask(id){
  var updateSettings = {
      // "url": "https://api-nodejs-todolist.herokuapp.com/task/"+id,
      "url": "https://todo-list-api-server.herokuapp.com/api/task/"+id,
      "method": "PUT",
      "timeout": 0,
      "headers": {
          // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
          "Authorization": "Bearer "+ token,
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "completed": true,
          }),
        };
        
  $.ajax(updateSettings).done(function (response) {
      console.log(response);
    });

}

// cancel complete postman ver
function cancelCompleteTask(id){
  var updateSettings = {
      // "url": "https://api-nodejs-todolist.herokuapp.com/task/"+id,
      "url": "https://todo-list-api-server.herokuapp.com/api/task/"+id,
      "method": "PUT",
      "timeout": 0,
      "headers": {
          // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
          "Authorization": "Bearer "+ token,
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "completed": false,
          }),
        };
        
  $.ajax(updateSettings).done(function (response) {
      console.log(response);
    });

}
        
// delete task
function deleteTask(id){
  var deleteSettings = {
    // "url": "https://api-nodejs-todolist.herokuapp.com/task/"+id,
    "url": "https://todo-list-api-server.herokuapp.com/api/task/"+id,
    "method": "DELETE",
    "timeout": 0,
    "headers": {
      // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY",
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json",
    },
  };

  $.ajax(deleteSettings).done(function (response) {
    console.log(response);
  });
}



  