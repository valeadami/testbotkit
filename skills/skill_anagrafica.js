var myConvo=require('../Conversation');

module.exports = function(controller) {

    controller.hears('anagrafica','message_received', function(bot, message) {
  
        console.log('DALLA SKILL ANAGRAFICA ');
        bot.reply(message, {
            
            text: 'Ecco le opzioni dell \' anagrafica',
            quick_replies: [
                {
                    title: 'Matricola',
                    payload: 'Matricola'
                },
                {
                    title: 'Informazioni generali',
                    payload: 'Informazioni generali'
                },
                {
                  title: 'Corso di Laurea',
                  payload: 'Corso di Laurea'
              }
            ]
          },function() {});
    
    
          });
  
  }