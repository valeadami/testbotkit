var Botkit = require('botkit');
var myConvo=require('./Conversation');
//************************** gestione classi */
var ctrlEsseTre=require('./Classi/clsControllerS3.js');
var studente=require('./Classi/clsStudente.js');
var carrieraStudente=require('./Classi/clsCarriera.js');

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.anywhere({
    debug: true,
    replyWithTyping: true,
    studio_token: '2Le3K87SizoroDgZh96t7j6l6hT1goTbadoPEacFuYenKBxQvprdOeNG0HWl92fx',//process.env.studio_token,
    typingDelayFactor: 1.3
   /*verify_token: process.env.verify_token,
    access_token: process.env.page_token,*/
});

/**** DIALOGFLOW  */
const dialogflowMiddleware = require('botkit-middleware-dialogflow')({
  keyFilename: './botkit-test-2ee102654bc4.json'  // service account private key file from Google Cloud Console
  
 
});

controller.middleware.receive.use(dialogflowMiddleware.receive);

// Set up an Express-powered webserver to expose oauth and webhook endpoints
// We are passing the controller object into our express server module
// so we can extend it and process incoming message payloads 
var webserver = require('./server.js')(controller);
  //18/01/2019 apro il socket
  controller.openSocketServer(controller.httpserver);

  // Start the bot brain in motion!!
  controller.startTicking();

  var skConnEvent=require("./skills/conn_events.js")(controller);
  var skDemoReplies=require("./skills/demo_quick_replies.js")(controller);
  var skLibretto=require("./skills/skill_libretto.js")(controller);
  var skHelp=require("./skills/skill_help.js")(controller);
  var skStop=require("./skills/skill_stop.js")(controller);
  var skAnagrafica=require("./skills/skill_anagrafica.js")(controller);
  var skACarriera=require("./skills/skill_carriera.js")(controller);
  var skAppelliPrenotabili=require("./skills/skill_prenotazione.js")(controller);
  //********fine 18/01/2019 */
  controller.on('conversationStarted', function(bot, convo) {
    console.log('----------------> A conversation started with ', convo.context.user);
  });
  controller.on('conversationEnded', function(bot, convo) {
    console.log('<----------------- A conversation ended with ', convo.context.user + " message " + convo.message);
    
  });
// Wildcard hears response, will respond to all user input with 'Hello World!'
controller.hears(['hello world'], 'message_received', function(bot,message) {

  // start a conversation to handle this response.

  bot.startConversation(message, function(err,convo) {
    convo.setVar('foo','bar');
    console.log('The value of foo is {{vars.foo}}');
    
    convo.ask('How are you? {{responses.foo}} '); //{{vars.foo}} 
 });
  });   
controller.hears('porco', 'message_received', function(bot, message) { //'(.*)'
  console.log('sono qui in porco...')
bot.reply(message, 'dio ');
});
/*controller.hears('(.*)', 'message_received', function(bot, message) { //'(.*)'
  bot.reply(message, 'ciao' );
  console.log('utente '+ message.user + ', text ' + message.text  + ', canale '+ message.channel +', raw '+JSON.stringify(message.raw_message));
});
*/
/********************** DIALOGFLOW INTENT */
controller.hears(['Default Welcome Intent'], 'message_received', dialogflowMiddleware.hears, function(bot, message) {
  var replyText = message.fulfillment.text;  // message object has new fields added by Dialogflow
  
  bot.reply(message, replyText);
});
controller.hears(['Libretto'], 'message_received', dialogflowMiddleware.hears, function(bot, message) {
  //console.log('valore di message '+ JSON.stringify(message));
  var replyText='';
  bot.startConversation(message, function(err, convo) {
 //bot.createConversation(message, (err, convo) => {
  
  // DEFINISCO I THREAD
  convo.addMessage({ text:' add  nel thread del libretto ' }, 'default'); //default
 
 
  //convo.activate();// -> con start conversation non serve più activate!!
  //});

convo.on('end', function (convo) {
  
  console.log('here in end_____________________');
  if (message.entities.libretto){
    console.log('sono dentro if message.entities');
    ctrlEsseTre.getLibretto().then((libretto)=> {
        replyText+='**************** ecco il tuo libretto ****************** \n';
        if (Array.isArray(libretto)){
        
          for(var i=0; i<libretto.length; i++){
  
            replyText+=   libretto[i].adDes+ ', frequentato  nell \'anno ' +libretto[i].aaFreqId +', anno di corso ' +
            libretto[i].annoCorso + '\n ' ;
            }
            replyText+='\n '+myConvo.botQuestions.questMenuGenerico;
            bot.reply(message, replyText);  
          
         }
        }); 
    }  

 
    
});
//}

//});

});

});

//anagrafica doLogin
controller.hears(['getStudente'], 'message_received', dialogflowMiddleware.hears, function(bot, message) {
  //console.log('valore di message '+ JSON.stringify(message));
  var replyText='';
  bot.startConversation(message, function(err, convo) {
 //bot.createConversation(message, (err, convo) => {
  
  // DEFINISCO I THREAD
  convo.addMessage({ text:' qui sono in anagrafica ' }, 'default'); //default
 
 
  //convo.activate();// -> con start conversation non serve più activate!!
  //});

convo.on('end', function (convo) {
  
  console.log('here in end_____________________');
 // if (message.entities.libretto){
    console.log('mi connetto a essetre ');
    ctrlEsseTre.doLogin().then((studente)=> {
        replyText+='**************** dati dello STUDENTE ****************** \n';
        
        replyText+='codice fiscale '+ studente.codFisc + ' matricola ID '+ studente.trattiCarriera[0].matId + ' corso di laurea '+ studente.trattiCarriera[0].cdsDes ;
        replyText+='\n '+myConvo.botQuestions.questMenuGenerico;
         bot.reply(message, replyText); 
        console.log('ho lo studente '+studente.codFisc + 'matricola ID '+ studente.trattiCarriera[0].matId);
        }); 
    //}  

 
    
});


});

});

//getCarriera
controller.hears(['getCarriera'], 'message_received', dialogflowMiddleware.hears, function(bot, message) {
  //console.log('valore di message '+ JSON.stringify(message));
  var replyText='';
  bot.startConversation(message, function(err, convo) {
 //bot.createConversation(message, (err, convo) => {
  
  // DEFINISCO I THREAD
  convo.addMessage({ text:' qui sono in carriera ' }, 'default'); //default
 
 
  //convo.activate();// -> con start conversation non serve più activate!!
  //});

convo.on('end', function (convo) {
  
  console.log('here in end_____________________');
 // if (message.entities.libretto){
    console.log('mi connetto a essetre per carriera');
    ctrlEsseTre.getCarriera('s260856').then((carriera)=> {
        replyText+='**************** dati della CARRIERA ****************** \n';
        
        replyText+='anno immatricolazione  '+ carriera.aaId + ' numero matricola  '+ carriera.matricola + ' corso di laurea '+ carriera.cdsDes +', tipoCorsoDes '+ carriera.tipoCorsoDes ;
       
        
        replyText+='\n '+myConvo.botQuestions.questMenuGenerico;
         bot.reply(message, replyText); 
        console.log('ho la carriera di '+carriera.matricola);
        }); 
    //}  

 
    
});


});

});
//getSingoloEsame
controller.hears(['getSingoloEsame'], 'message_received', dialogflowMiddleware.hears, function (bot, message) {

  var replyText = '';
  bot.startConversation(message, function (err, convo) {

    convo.addMessage({ text: ' qui ho sentito il nome di un esame ' }, 'default'); //default


    convo.on('end', function (convo) {

      console.log('here in end_____________________');
      // if (message.entities.libretto){
      console.log('mi connetto a essetre per SINGOLO ESAME');
      ctrlEsseTre.getEsame('286879','5057980').then((esame) => { //'286879','5057980'
        replyText += '**************** dati del SINGOLO ESAME ****************** \n';

        replyText += 'esame di ' + esame.adDes +', anno  ' + esame.aaFreqId + 'adsceId ' + esame.adsceId + ' data frequenza ' + esame.dataFreq ;//+ ', esito ' + esame.esito.dataEsa;

        replyText += '\n ' + myConvo.botQuestions.questMenuGenerico;
        bot.reply(message, replyText);
       // console.log('ho la singolo esame di ' + esame.adDes);
      });
    });

  });
})

//getAppelliPrenotabili: non serve intent qui...??
controller.hears('Appelli prenotabili', 'message_received', function(bot, message) {

  var replyText = '';
  bot.startConversation(message, function (err, convo) {

    convo.addMessage({ text: ' questi sono gli appelli prenotabili' }, 'default'); //default


    convo.on('end', function (convo) {

      console.log('here in end_____________________');
      // if (message.entities.libretto){
      console.log('mi connetto a essetre per ELENCO ESAMI PRENOTABILI ');
      ctrlEsseTre.getPrenotazioni('286879').then((prenotazioni) => { 
       
        if (Array.isArray(prenotazioni)){
        
          for(var i=0; i<prenotazioni.length; i++){
  
            replyText+=   prenotazioni[i].adDes+ '\n ' ;
            }
            replyText+='\n Quale appello vuoi prenotare ora?';
            bot.reply(message, replyText);  
          
         }
      
      });
    });

  });
})
// ottieni elenco appelli prenotati
controller.hears('Appelli prenotati', 'message_received', function(bot, message) {

  var replyText = '';
  bot.startConversation(message, function (err, convo) {

    convo.addMessage({ text: ' questi sono gli appelli prenotati' }, 'default'); //default


    convo.on('end', function (convo) {

      console.log('here in end_____________________');
      // if (message.entities.libretto){
      console.log('mi connetto a essetre per ELENCO ESAMI PRENOTATI ');
      ctrlEsseTre.getPrenotati('286879').then((prenotazioni) => { 
       
        if (Array.isArray(prenotazioni)){
        
          for(var i=0; i<prenotazioni.length; i++){
  
            replyText+=   prenotazioni[i].adDes+ '\n ' ;
            }
            replyText+='\n Cosa vuoi fare ora?';
            bot.reply(message, replyText);  
          
         }
      
      });
    });

  });
})
//POST PRENOTAZIONE
controller.hears(['prenotazione'], 'message_received', dialogflowMiddleware.hears, function (bot, message) {
  
  var replyText = '';
  bot.startConversation(message, function (err, convo) {
  
    convo.addMessage({ text: ' queste sono le date disponibili per appello selezionato ' }, 'default'); //default
    ctrlEsseTre.getAppelloDaPrenotare(10094,117740).then((appelliDaPrenotare) => { //'286879','5057980'
    replyText += '**************** dati del SINGOLO APPELLO  ****************** \n';
    if (Array.isArray(appelliDaPrenotare)) {
      for(var i=0; i<appelliDaPrenotare.length; i++){
        replyText += ' data appello  ' + appelliDaPrenotare[i].dataInizioApp;//+ ', esito ' + esame.esito.dataEsa;
      }
    }
    replyText += '\n' + message.fulfillment.text; //ok procedo confermi? da DF
    bot.reply(message, replyText);

   
  
    });
    
   
    convo.on('end', function (convo) {

      console.log('here in end_____________________');
       
    });

  });
})
//hears confermo...parte il post

//POST PRENOTAZIONE
controller.hears(['prenotazione - yes'], 'message_received', dialogflowMiddleware.hears, function (bot, message) {
  console.log('********* PRENOTAZIONE YES HERE*********');
  //console.log(JSON.stringify(message));
  var replyText = message.fulfillment.text;
  bot.reply(message, replyText);
  //faccio il post
  ctrlEsseTre.postSingoloAppelloDaPrenotare(10094,117740,5,5057981).then((res)=>{
    if (res){

      console.log('ok con la prenotazione dal bot.js');
      bot.reply(message,' OK DONE');
    } else {
      console.log('Nok con la prenotazione dal bot.js');
      bot.reply(message,' SCUSA HO UN ERRORE');
    }

  });
  
 
 
})
//ELIMINARE LA PRENOTAZIONE
controller.hears('Eliminare appello prenotato', 'message_received', function(bot, message) {

  var replyText = '';
  bot.reply(message, 'ok procedo con cancellare la prenotazione...');
  //deleteSingoloAppelloDaPrenotare
  ctrlEsseTre.deleteSingoloAppelloDaPrenotare(10094,117740,5,236437).then((res)=>{
    if (res){

      console.log('ok con cancellazione dal bot.js');
      bot.reply(message,' OK CANCELLATO PRENOTAZIONE');
    } else {
      console.log('Nok con la prenotazione dal bot.js');
      bot.reply(message,' SCUSA HO UN ERRORE CANCALLANDO LA PRENOTAZIONE');
    }

  });
  
  /*
  bot.startConversation(message, function (err, convo) {

    convo.addMessage({ text: ' queste sono gle prenotazioni che hai fatto' }, 'default'); //default


    convo.on('end', function (convo) {

      console.log('here in end_____________________');
      // if (message.entities.libretto){
      console.log('mi connetto a essetre per ELENCO ESAMI PRENOTABILI ');
      ctrlEsseTre.getPrenotazioni('286879').then((prenotazioni) => { 
       
        if (Array.isArray(prenotazioni)){
        
          for(var i=0; i<prenotazioni.length; i++){
  
            replyText+=   prenotazioni[i].adDes+ '\n ' ;
            }
            replyText+='\n Quale appello vuoi prenotare ora?';
            bot.reply(message, replyText);  
          
         }
      
      });
    });

  });*/
})