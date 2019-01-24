var myConvo=require('../Conversation');

module.exports = function(controller) {

    controller.hears('help','message_received', function(bot, message) {
  
      bot.reply(message, {
          text: myConvo.botOnBoarding.respGuida,
          
        },function() {});
  
  
        });
  
  }