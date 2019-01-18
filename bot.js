var Botkit = require('botkit');

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.anywhere({
    debug: true,
    replyWithTyping: true,
    studio_token: '2Le3K87SizoroDgZh96t7j6l6hT1goTbadoPEacFuYenKBxQvprdOeNG0HWl92fx',//process.env.studio_token,
    typingDelayFactor: 1.3
   /*verify_token: process.env.verify_token,
    access_token: process.env.page_token,*/
});
// Set up an Express-powered webserver to expose oauth and webhook endpoints
// We are passing the controller object into our express server module
// so we can extend it and process incoming message payloads 
var webserver = require('./server.js')(controller);

// Wildcard hears response, will respond to all user input with 'Hello World!'
controller.hears(['hello world'], 'message_received', function(bot,message) {

  // start a conversation to handle this response.

  bot.startConversation(message, function(err,convo) {

    convo.ask('How are you?')
 });
  });   
controller.hears('porco', 'message_received', function(bot, message) { //'(.*)'
  console.log('sono qui in porco...')
bot.reply(message, 'dio') ;
});
controller.hears('(.*)', 'message_received', function(bot, message) { //'(.*)'
  bot.reply(message, 'ciao' );
});
