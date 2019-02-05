var myConvo=require('../Conversation');
var ctrlEsseTre=require('../Classi/clsControllerS3.js');
var studente=require('../Classi/clsStudente.js');
var sessione=require('../Classi/clsSessione.js');
var sess;

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
            ], {'key': 'stop' }, 'stop_thread');
          
        //qui attivo la convo
        convo.activate();
        //02/01/2019
        convo.on('end', function (convo) {
        //estrarre le risposte
        var res=convo.extractResponses();
        if (res.scelta=='si' && res.username && res.password){
            console.log('*********************SONO IN END DI CONN_EVENTS_ WELCOME BACK');
            //qui parte login a essetre
           ctrlEsseTre.doLogin().then((studente)=> {
             
            console.log('::::::::::::::: ho lo studente '+studente.codFisc + ' matricola ID '+ studente.trattiCarriera[0].matId + ' persID'+ studente.persId + 'username '+ studente.userId + 'cdsID '+ studente.trattiCarriera[0].cdsId);
            sess=new sessione(message.user,true,studente.persId,studente.userId,studente.trattiCarriera[0].cdsId,studente.trattiCarriera[0].matId,studente.stuId,null,null,null,null,['login']);
           // convo.setVar('mySession', sess);
           controller.session=sess;
          

            }); 

        } /*else if( res.stop=='si' ){
            //faccio logout doLogout
           var logout= ctrlEsseTre.doLogout();
           console.log('il logout è andato '+ logout);
        

        } else {

            //non fare niente
            console.log('non faccio niente...')
        }
           */
            
        
        }) //fine convo.end()
     });
       
      
        
    });
 
      /* controller.studio.before('welcome_user', function(convo, next) {
           convo.setVar('bot', controller.studio_identity);
           next();
           disconnected
       });*/
 
       controller.on('reconnect', function(bot, message) {
           // the connection between the client and server experienced a disconnect/reconnect
            bot.reply(message, 'Some sub-space interference just caused our connection to be interrupted. But I am back now.');
       });
       controller.on('close', function(bot, message) {
        // quando chiudi il browser
         console.log('§§§§§§§§§§§§§§§§ AL CLOSE' + sess.user);
         controller.trigger('disconnected', bot);
         controller.session=null;
        });
        controller.on('disconnected', function(bot, message) {
       
         console.log('§§§§§§§§§§§§§§§§ MI SONO DISCONNESSO ' + sess.user);
         controller.session=null;

    });
     }
 
 //}
