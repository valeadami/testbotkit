var myConvo=require('../Conversation');

module.exports = function(controller) {

    controller.hears('prenotazione','message_received', function(bot, message) {
  
        console.log('DALLA SKILL PRENOTAZIONE ');
        bot.reply(message, {
            
            text: 'Ecco le opzioni della prenotazione appelli',
            quick_replies: [
                {
                    title: 'Appelli prenotabili',
                    payload: 'Appelli prenotabili'
                },
               
                {
                  title: 'Appelli prenotati',
                  payload: 'Appelli prenotati'
              },
             
              {
                title: 'Eliminare appello prenotato',
                payload: 'Eliminare appello prenotato'
            },
            ]
          },function() {});
    
    
          });
  
  }