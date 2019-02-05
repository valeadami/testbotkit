var myConvo=require('../Conversation');

module.exports = function(controller) {


    // if (process.env.studio_token) {
       controller.on('hello', function(bot, message) {
        bot.reply(message,'benvenuto welcome back, sono il bot dell\' università di Trieste');
        bot.startConversation(message, function(err,convo) {
 
         // DEFINISCO I THREAD
         convo.addMessage({ text: myConvo.botOnBoarding.respOnBoarding }, 'default');
         convo.addMessage({ text: myConvo.botOnBoarding.respLogin }, 'login_thread');
         convo.addMessage({ text: myConvo.botOnBoarding.respMenu }, 'menu_thread');
         convo.addMessage({ text: 'SONO NEL THREAD STOP' }, 'stop_thread');
       
    
         
         // Create a yes/no question in the default thread...
   
         convo.addQuestion(myConvo.botQuestions.questLogin, [
   
             {
                 pattern: 'si', //yes
                 callback: function (response, convo) {
                     console.log('****************************dentro la callback di si');
                     convo.gotoThread('login_thread');
                     convo.next();
                 },
             },
             {
                 pattern: 'no', //no
                 callback: function (response, convo) {
                     console.log('hai detto no al login, vadi al stop thread')
                     convo.gotoThread('stop_thread');
                     convo.next();
                 },
             },
            
             {
                 default: true,
                 callback: function (response, convo) {
                    // convo.gotoThread('default_thread');
                     convo.repeat();
                     convo.next();
                 },
             }
         ], { 'key': 'scelta' }, 'default');
        
       //MENU LOGIN
       convo.addQuestion({ text: myConvo.botQuestions.questPrenUsername }, [
         {
             pattern: 's[0-9]', //pattern
             callback: function (response, convo) {
                 // verificare la validità della username
                 convo.next();
   
             }
         }], { 'key': 'username' }, 'login_thread');
   
     //chiedo la password 
     convo.addQuestion(myConvo.botQuestions.questPrenPassword, [
         {
             pattern: '[0-9]', //pattern
             callback: function (response, convo) {
                 // verificare la validità della pwd
                 convo.gotoThread('menu_thread');
         
                 convo.next();
   
             }
         }], { 'key': 'password' }, 'login_thread');
         //convo.addMessage({ text: myConvo.botOnBoarding.questMenu }, 'menu_thread');
         //stop thread
         convo.addQuestion('confermi di uscire dal thread ?', [
             {
                 pattern:'si',
                 callback: function(response, convo) {
                     convo.say('Arrivederci! dal thread ');
                     convo.next();
                  
                 }
             },
         {
             pattern: 'no',
             default: true,
             callback: function(response, convo) {
                 convo.say('Ok rimango in ascolto dal thread ...');
                 convo.gotoThread('default');
                 convo.next();
             }
         }
         ], { }, 'stop_thread');
       
     //qui attivo la convo
     convo.activate();
     });
    
       
       
});
 
       controller.on('welcome_back', function(bot, message) {
          
           bot.reply(message,'benvenuto welcome back, sono il bot dell\' università di Trieste');
           bot.startConversation(message, function(err,convo) {
    
            // DEFINISCO I THREAD
            convo.addMessage({ text: myConvo.botOnBoarding.respOnBoarding }, 'default');
            convo.addMessage({ text: myConvo.botOnBoarding.respLogin }, 'login_thread');
            convo.addMessage({ text: myConvo.botOnBoarding.respMenu }, 'menu_thread');
            convo.addMessage({ text: 'SONO NEL THREAD STOP' }, 'stop_thread');
          
       
            
            // Create a yes/no question in the default thread...
      
            convo.addQuestion(myConvo.botQuestions.questLogin, [
      
                {
                    pattern: 'si', //yes
                    callback: function (response, convo) {
                        console.log('****************************dentro la callback di si');
                        convo.gotoThread('login_thread');
                        convo.next();
                    },
                },
                {
                    pattern: 'no', //no
                    callback: function (response, convo) {
                        console.log('hai detto no al login, vadi al stop thread')
                        convo.gotoThread('stop_thread');
                        convo.next();
                    },
                },
               
                {
                    default: true,
                    callback: function (response, convo) {
                       // convo.gotoThread('default_thread');
                        convo.repeat();
                        convo.next();
                    },
                }
            ], { 'key': 'scelta' }, 'default');
           
          //MENU LOGIN
          convo.addQuestion({ text: myConvo.botQuestions.questPrenUsername }, [
            {
                pattern: 's[0-9]', //pattern
                callback: function (response, convo) {
                    // verificare la validità della username
                    convo.next();
      
                }
            }], { 'key': 'username' }, 'login_thread');
      
        //chiedo la password 
        convo.addQuestion(myConvo.botQuestions.questPrenPassword, [
            {
                pattern: '[0-9]', //pattern
                callback: function (response, convo) {
                    // verificare la validità della pwd
                    convo.gotoThread('menu_thread');
            
                    convo.next();
      
                }
            }], { 'key': 'password' }, 'login_thread');
            //convo.addMessage({ text: myConvo.botOnBoarding.questMenu }, 'menu_thread');
            //stop thread
            convo.addQuestion('confermi di uscire dal thread ?', [
                {
                    pattern:'si',
                    callback: function(response, convo) {
                        convo.say('Arrivederci! dal thread ');
                        convo.next();
                     
                    }
                },
            {
                pattern: 'no',
                default: true,
                callback: function(response, convo) {
                    convo.say('Ok rimango in ascolto dal thread ...');
                    convo.gotoThread('default');
                    convo.next();
                }
            }
            ], { }, 'stop_thread');
          
        //qui attivo la convo
        convo.activate();
        });
       
       
        
        });
 
      /* controller.studio.before('welcome_user', function(convo, next) {
           convo.setVar('bot', controller.studio_identity);
           next();
       });*/
 
       controller.on('reconnect', function(bot, message) {
           // the connection between the client and server experienced a disconnect/reconnect
            bot.reply(message, 'Some sub-space interference just caused our connection to be interrupted. But I am back now.');
       });
     }
 
 //}