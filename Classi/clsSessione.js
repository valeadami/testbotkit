function Sessione(user, login, persId, userId, cdsId,matId, stuId,appId, adsceId, intent_name, scelta) {
    this.user=user //user che prendo dal message ad esempio 1d20e05a-dbc7-2d4d-e642-02cb7e22c22a
    this.login = login; //boolean se ha fatto login a EsseTre
    this.persId=persId; //da EsseTre
    this.userId=userId;  //da EsseTre
    //interi
    this.cdsId=cdsId; //da EsseTre per libretto-
    this.matId=matId; //da EsseTre
    this.stuId=stuId; //da EsseTre
    this.appId=appId; //da EsseTre
    this.adsceId=adsceId; //per libretto-> singolo esame
    //array di stringhe
    this.intent_name=intent_name; //mi serve per sapere quale intent DF è stato attivato
    this.scelta=scelta; //le stringhe delle scelte delle quick reply
   
    //stringhe
  
    
    this.log = function() {
        if (process.env.DEBUG_MODE){
            console.log('sono in debug mode');


            console.log('CREATO OGGETTO SESSIONE: user=' + this.user + ', login ' + this.login +', persId  ' + this.persId + ', userId  ' + this.userId + ', cdsId' + this.cdsId + ', matricola id ' 
                + this.matId + ', stuId '+ this.stuId + ',  appId '+ this.appId+ ', adsceId '+ this.adsceId +', intent name '+this.intent_name + ', scelta '+ this.scelta);
        } else {

            console.log('CREATO OGGETTO SESSIONE');
        }
       
    };
    this.getIntentName=function (){
        var str='';
        if (typeof this.intent_name!=='undefined' ){
            console.log('********* getIntentName ');
           for(var i=0; i<this.intent_name.length; i++){

            str+='intent name ' + this.intent_name[i];

           }

        } else{
           str= 'manca nome intent';
        }
        return str;

    };

    this.getScelta=function (){
        var str='';
        if (typeof this.scelta!=='undefined' ){
            console.log('********* getScelta ');
           for(var i=0; i<this.scelta.length; i++){

            str+='scelta name ' + this.scelta[i];

           }

        } else{
           str= 'manca nome intent';
        }
        return str;

    };
    /*this.greeting = function() {
      alert('Hi! I\'m ' + this.name.first + '.');
    };*/
  }

 module.exports = Sessione;
