
$(document).ready(function(){

  /* Adding Username */
  var makeAssignment,getAssignment;


  //function to find an existing user
  var authenticateUser = function(username, password){
    console.log(username, password);
    var query = new Parse.Query("User");
    query.equalTo("username", username);
    query.equalTo("password", password);
    query.find({
      success: function(){
        //window.location.href = "Assignment.html";
      },
      error: function(){
        //todo: add bootstrap error messages
        /*
          <div class="alert alert-danger" role="alert">
            <a href="#" class="alert-link">...</a>
          </div>
        */


        alert("Wrong username and password. Try again!")
      }
    });
  }



  var newUser = function (username, password){
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert("new user has been created", user.get("username"));
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);

      }
    });
  }


  //Getting the class, if the class does not exist- parse will create the class first
  makeAssignment = function (assignmentName, username, time){
    var Assignment = Parse.Object.extend("Assignment");

    //Creating a new instance of the class
    var assignment = new Assignment();
    
    var assignmentName = "Reading hw";
    var time = 35;
    var assignment_data = {assignment: assignmentName, username: username, time: time};

    /* Save the Assignment */

    assignment.save(assignment_data).then(function(object) {
      //things to do after the save takes place
      //alert("yay! it worked");
      
    });
  }

  getAssignment = function (username){
    //get all the assignments for a user

    var query = new Parse.Query("Assignment");
    query.equalTo("username", username);
    query.find({
      success: function(results){
        alert(" yes was able to get the assignments ");
        for (var i = 1; i < results.length; i++){
          console.log(results[i]);
        }
      },
      error: function(){

      }
    });

  }

  var testOtherFunctions = function (){

    /*testing newuser function*/
    newUser("Issam", "password1");

    /* Testing makeassignment function */
    var assignmentName = "Reading hw";
    var time = 35;
    makeAssignment(assignmentName, "Issam", time);

    getAssignment("Issam");
  }

  //get the username and password that the user has entered in the landing page
  var username = $("#username").val();
  var password = $("#password").val();
  alert(username + " " + password);
  authenticateUser(username, password);

  //create new user
  newUser("test", "password");

});
  

