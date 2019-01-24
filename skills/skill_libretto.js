module.exports = function(controller) {

    controller.hears('libretto','message_received', function(bot, message) {
        console.log('DALLA SKILL LIBRETTO');
      bot.reply(message, {
          
          text: 'Sono nel libretto!',
          quick_replies: [
              {
                  title: 'Elenco esami',
                  payload: 'Elenco esami'
              },
              {
                  title: 'Esami sostenuti anno scorso',
                  payload: 'Esami sostenuti anno scorso'
              },
              {
                title: 'Esami sostenuti questo anno',
                payload: 'Esami sostenuti questo anno'
            }
          ]
        },function() {});
  
  
        });
  
  }