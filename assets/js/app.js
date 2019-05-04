
// FUNCTIONS
// ============
function setBackgroundImage(myObject, imageUrl) {
  myObject.css({
               "background-image": "url(" + imageUrl + ")",
               "background-position": "center",
               "background-size": "cover",         
               "background-attachment": "fixed"  
               });
};

function showThankYouModal() {
    var modal_dialog = $('<div class="modal-dialog bg-light border border-success text-dark p-2 text-center" style="width:450px;"></div>');
    var modal_content = $(' <div class="modal-content"></div>');
    var modal_header = $('<h4 class="modal-title">Thank You, ' + firstName + '!</h4>');
    var button_close = $('<button type="button" class="close" data-dismiss="modal">&times;</button>');
    var modal_body = $('<div class="modal-body"></div>');
    var p_lead = $('<p class="lead">You have been successfully signed in.</p>');
    var p_secondary = $('<p class="text-secondary"><small>Please take a seat and you will be called shortly!</small></p>');
    var modal_footer = $('<div class="modal-footer"></div>');
    var button_success = $('<button type="button" class="btn btn-success float-right" data-dismiss="modal">Close</button>');

    modal_dialog.append(modal_content);
    modal_dialog.append(modal_header);
    modal_dialog.append(button_close);
    modal_dialog.append(modal_body);
    modal_dialog.append(p_lead);
    modal_dialog.append(p_secondary);
    modal_dialog.append(button_success);
    modal_dialog.append(modal_footer);
    
    $("#modal-success").append(modal_dialog);
    $("#modal-success").modal('show');   
};

function getVisitorData(data) {
  var visitors = data.val();
  var keys = Object.keys(visitors);
  console.log("Visitors: " + visitors);
  console.log("Keys: " + keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    console.log("Key[" + i + "]: " + k );

    var firstName = visitors[k].firstName;
    var lastName = visitors[k].lastName;
    var phone = visitors[k].phone;
    var visitPurpose = visitors[k].visitPurpose;
    
    $(".formData").val("");
    $('input[name="firstName"]').val(firstName);
    $('input[name="lastName"]').val(lastName);
    $('input[name="phone"]').val(phone);
    $('select[name="reason"] option:selected').text(visitPurpose);   
  };
  
};

function errData(err) {
 console.log('Error: ' + err);
};

var jumbotron = $("#section-jumbotron");
// var imageUrl = 'assets/images/image2.jpg';
var imageUrl = 'https://mdbootstrap.com/img/Photos/Others/background.jpg'

// GLOBAL VARIABLES
// ================
    // var regNumber;
    var countryBirth;
    var createdBy;
    var firstName;
    var lastName;
    var healthInfo;
    var meetingWith;
    var status;
    var timeIn;
    var timeOut;
    var visitDate;
    var visitPurpose;
    var phone;
    var childKey;
 
 
  

// MAIN PROCESS
// ============


$(document).ready(function(){
    //Enables scrolling of sections on the page
    $(function(){
        var scroll = new SmoothScroll('a[href*="#section-"]');
    });

    // Material Select Initialization
    // $('.mdb-select').materialSelect();

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCmHmdKbE5Bo0Gu1kzo82FZ7Fbbv47AK7o",
        authDomain: "vmsapp-dd2e5.firebaseapp.com",
        databaseURL: "https://vmsapp-dd2e5.firebaseio.com",
        projectId: "vmsapp-dd2e5",
        storageBucket: "vmsapp-dd2e5.appspot.com",
        messagingSenderId: "284192092734"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();
   

      $("#dashboard").on("click", function(){
        window.location.href = "https://iamjpyo.github.io/group_project/start.html";
      });

      // Capture checkin Button Click
      $("#checkin-btn").on("click", function(event) {
        // Prevent the page from refreshing
        event.preventDefault();

        // Grabbed values from the form
        firstName = $("#first_name").val().trim();
        lastName = $("#last_name").val().trim();
        phone = $("#phone").val().trim();
        visitPurpose = $("#reason").val().trim();
        
        // regNumber = "";
        visitDate = "";
        meetingWith = "";
        timeIn = "";
        timeOut = "";
        status = "";
        countryBirth = "";
        healthInfo = "";
        childkey = "";

        // Creates local "temporary" object for holding the visitor data
        var visitor = {
            // regNumber: regNumber,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            visitPurpose: visitPurpose,
            visitDate: visitDate,
            meetingWith: meetingWith,
            timeIn: timeIn,
            timeOut: timeOut,
            status: status,
            countryBirth: countryBirth,
            healthInfo: healthInfo,  
            // childkey: childkey,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        // console.log(visitor);

        //Pushes new visitor data to the database and auto-generates a unique key (childKey) every time a new child is added 
        database.ref().push(visitor);
        showThankYouModal();
          
        //Clears the form
        $("form").trigger("reset");

        // //Hides the modal-success after 2 seconds
        // setTimeout(function() {
            $("#modal-success").modal('hide');
        // }, 5000);

        //Hides the modal-signin after 2 seconds
        // setTimeout(function() {
            $("#modal-signin").modal('hide');
        // }, 1000);
        
      });


    //Creates Firebase event for adding visitor info to the database when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
          
        //Firebase watcher + initial loader. Store everything into a variable.
            visitor = childSnapshot.val();
            console.log(visitor);

            // regNumber = visitor.regNumber;
            firstName = visitor.firstName;
            lastName = visitor.lastName;
            phone = visitor.phone;
            visitPurpose = visitor.visitPurpose;
            visitDate = visitor.visitDate;
            meetingWith = visitor.meetingWith;
            timeIn = visitor.timeIn;
            timeOut = visitor.timeOut;
            status  = visitor.status;
            countryBirth = visitor.countryBirth;
            healthInfo= visitor.healthInfo;
            childkey = visitor.dateAdded;
            // console.log(childkey); 
          
            //Append new row to the table with the new train input
            var newRow = $("<tr class='clickableRow'>");
            newRow.append($("<td class='text-center'><button class='edit btn btn-danger btn-xs' data-key='" + childkey + "'>Edit</button></td>"));
            // newRow.attr("data-key", childKey);
            // newRow.append($("<td>" + regNumber + "</td>"));
            newRow.append($("<td>" + firstName + "</td>"));
            newRow.append($("<td>" + lastName + "</td>"));
            newRow.append($("<td>" + phone + "</td>"));
            newRow.append($("<td>" + visitPurpose + "</td>"));
            newRow.append($("<td>" + visitDate + "</td>"));
            newRow.append($("<td>" + meetingWith + "</td>"));
            newRow.append($("<td>" + timeIn + "</td>"));
            newRow.append($("<td>" + timeOut + "</td>"));
            newRow.append($("<td>" + status + "</td>"));
            newRow.append($("<td>" + countryBirth + "</td>"));
            newRow.append($("<td>" + healthInfo + "</td>"));
            newRow.append($("<td class='key'>" + childkey + "</td>"));
            
          
          $("#add-row").append(newRow);

            }, function(errorObject) {
                console.log("Errors handled: " + errorObject.code);
    });

});  

$(document.body).on("click", "tr", ".clickable", function(event){
  //Edit rows
  database = firebase.database();
  var ref = database.ref();
  var $thisRow = $(this).closest("tr");       // Finds the closest row <tr> 
  var $tds = $thisRow.find("td");             // Finds all children <td> elements
      // $tds = $thisRow.find("td:nth-child(2)"); // Finds the 2nd <td> element
    
    $('input[name="firstName"]').val($thisRow.find("td:nth-child(2)").text());  
    $('input[name="lastName"]').val($thisRow.find("td:nth-child(3)").text());
    $('input[name="phone"]').val($thisRow.find("td:nth-child(4)").text());
    $('select[name="reason"] option:selected').text($thisRow.find("td:nth-child(5)").text()); 
  // var index = 0;
  // $.each($tds, function(index) {  
  //   index             // Visits every single <td> element
  //   console.log($(this).text());        // Prints out the text within the <td>
  // });

  // var thisRowKey = $(this).find('.key').text();
  // var thisRow = $("tr.clickableRow").html();
  // console.log(thisRow);
  // console.log(thisRowKey);
   
  //  console.log("Reference: " + ref);
  //  ref.once("value", getVisitorData, errData);


}); 

// $(document.body).on("click", "tr", ".clickableRow", function () {
//   // $("tr.clickableRow").click(function () {
//     console.log("works")
//     var rows = document.getElementById("visitor-table").getElementsByTagName("tr");
//     function getFirstCol(row) {
//       alert(row.getElementsByTagName('td')[1].innerHTML);
//     }

//     console.log(getFirstCol(rows[1]));

// });

     

