var Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function(message){
    this.set("username", message.username);
    this.set("roomname", message.roomname);
    this.set("text", message.text);
  }
});

// var MessageView = Backbone.View.extend{
//   initialize: function(){

//   },
//   render: function(){
//     var html = [
//     "<div class='message'>",
//       "<div class='username'>",
//         this.model.get("username"),
//       "</div>",
//       "<div class='text'>",
//         this.model.get("text"),
//       "</div>",
//       "<div class='roomname'>",
//         this.mode.get("roomname"),
//       "</div>",
//     "</div>"
//     ].join("");

//     return this.$el.html(html);
//   }
// }

var Messages = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  model: Message,
  parse: function(data){
    console.log(data.results.length);
    return data.results;
  }
});

var messages = new Messages();
messages.fetch();
setInterval(function(){
  messages.reset();
  messages.fetch()
}, 1000)
// {
//   success: function(){
//     var messagesView = new MessagesView({ collection: messages });
//     messagesView.render();
//   }
// }


var MessagesView = Backbone.View.extend({
  initialize: function(){
    console.log("Messages view collection length", this.collection.length);
    var that = this;

    this.collection.on("sync", function(){
      console.log('changing');
      that.render();
    });
  },
  render: function(){
    //console.log(this.collection);
    // console.log(this.collecton.get(1));
     //console.log(this.collection.get("models"));
    $("#chats").empty();
    $("#chats").append(this.collection.map(function(message){
     return [
    "<div class='message'>",
      "<div class='username'>",
        _.escape(message.get("username")),
      "</div>",
      "<div class='text'>",
        _.escape(message.get("text")),
      "</div>",
      "<div class='roomname'>",
        _.escape(message.get("roomname")),
      "</div>",
    "</div>"
    ].join("");
    }));
  }
});


$('html').on("submit", "#send", function(event){
  event.preventDefault();
  var username = $('#username').val();
  var text = $('#message').val();
  var message = {
        username: username,
        text: text,
        roomname: 'cellar'
      };
  
  var newMessage = new Message(message);
  newMessage.save()
  //sendMessage(message);
  //messages.save(newMessage);

  $('#message').val("");
});

// function sendMessage(message){
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: "https://api.parse.com/1/classes/chatterbox",
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// }

var messagesView = new MessagesView({ collection: messages });
// messagesView.render();



// {
//   username: 'Mel Brooks',
//   text: 'Never underestimate the power of the Schwartz!',
//   roomname: 'lobby'
// };