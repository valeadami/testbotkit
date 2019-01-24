var myConvo=require('../Conversation');

module.exports = function(controller) {

    controller.hears('stop','message_received', function(bot, message) {
  
     /* bot.reply(message, {
          text: myConvo.botQuestions.questLogout,
          
        },function() {});
  */
        bot.startConversation(message, function(err,convo) {
        console.log('SONO NELLA SKILL STOP');
            convo.addQuestion('confermi di uscire - skill stop ?', [
                {
                    pattern:'si',
                    callback: function(response, convo) {
                        convo.say('Arrivederci! dalla skill stop');
                        convo.next();
                       /* setTimeout(function() {
                            process.exit();
                        }, 3000);*/
                    }
                },
                {
                    pattern: 'no',
                    default: true,
                    callback: function(response, convo) {
                        convo.say('Ok rimango in ascolto dalla skill stop ...');
                        convo.gotoThread('default');
                        convo.next();
                    }
                }
            ], { }, 'default');
            
        });
            
    });     
  }