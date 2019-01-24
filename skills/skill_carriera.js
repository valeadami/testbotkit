var myConvo=require('../Conversation');

module.exports = function(controller) {

    controller.hears('carriera','message_received', function(bot, message) {
  
        console.log('DALLA SKILL CARRIERA ');
        bot.reply(message, {
            
            text: 'Ecco le opzioni della carriera',
            quick_replies: [
                {
                    title: 'Immatricolazione',
                    payload: 'Immatricolazione'
                },
               
                {
                  title: 'Info generali',
                  payload: 'Info generali'
              }
            ]
          },function() {});
    
    
          });
  
  }