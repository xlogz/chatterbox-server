// YOUR CODE HERE:
//https://api.parse.com/1/classes/chatterbox

// var App = function(){
//http://127.0.0.1:3000/
// }
  var app = {
    server: 'https://127.0.0.1:3000/classes/messages',
    init : function(){},
    send: function(message){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'GET',
        success: function (data) {
          console.log('chatterbox: Message received');
          app.clearMessages();
          app.addMessages(data.results);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Unable to load messages');
        }
      });
    },
    clearMessages: function(){
      $("#chats").empty();
    },
    addMessages: function(messages){
      _.each(messages, function(message){
        app.addMessage(message);});
        $("#chats").scrollTop($("#chats")[0].scrollHeight);
    },
    addMessage: function(message){
      // create a div with a class message
      var $message = $("<div></div>");
      $message.addClass("message");

      // create a span with a class username
      var $username = $("<div></div>");
      $username.addClass("username");
      $username.text(message.username);

      // create a div with a class text
      var $text = $("<div></div>");
      $text.text(_.escape(message.text));

      // create a div with a class roomname
      var $roomName = $("<div></div>");
      $roomName.addClass("roomname");
      $roomName.text(message.roomname);
      // cputsernahe 

      $message.append($username);
      $message.append($text);
      $message.append($roomName);

      $("#chats").prepend($message);

      $message.on("click", function(event){
        var friend = $(this).text();
        app.addFriend(friend);
      });
    },
    addRoom: function(roomName){
      var $room = $("<a></a>");
      $room.text(roomName);
      $("#roomSelect").append($room);
    },
    friends: [],
    addFriend: function(user){
      this.friends.push(user);
    },
    handleSubmit: function(text){
      app.send(text);
      app.fetch();
    }
  };

   
  // store 100 mess 
  // loop over the new response and compare
  // the id of the current message with the id of the first message of prev. array
  // [1, 2, 3, 4, 5, 6],    [3, 4, 5, 6, 7, 8]
  // [1, 2, 3, 4]


  // $('#send').submit(function(){
  //   console.log("hello!");
  //   debugger;
  //   var message = $('#message').val();
  //   app.handleSubmit(message);
  // });

  $('html').on("submit", "#send", function(event){
    event.preventDefault();
    var username = $('#username').val();
    var text = $('#message').val();
    var message = {
          username: username,
          text: text,
          roomname: 'cellar'
        };
    app.handleSubmit(message);
    $('#message').val("");
  });



  setInterval(app.fetch, 1000);

  // $("#chats").on("click", ".username", function(event){
  //   debugger;
  //   var friend = $(this).text();
  //   app.addFriend(friend);
  // });


  
