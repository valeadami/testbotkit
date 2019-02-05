var http = require("https");
var studente=require('./clsStudente.js');
var carriera=require('./clsCarriera.js');
var rigaLibretto=require('./clsRigaLibretto.js');
var appello=require('./clsAppello.js');
var request = require("request");

//login
var strUrlLogin='https://units.esse3.pp.cineca.it/e3rest/api/login';
//logout
var strUrlLogout='https://units.esse3.pp.cineca.it/e3rest/api/logout'
//anagrafica utente homepage dopo login ->carriere(userId)
var strUrlAnagraficaHome='https://units.esse3.pp.cineca.it/e3rest/api/anagrafica-service-v1/carriere/'; //s260856/
//scelgo link libretto
var strUrlGetLibretto="https://units.esse3.pp.cineca.it/e3rest/api/libretto-service-v1/libretti/"; //   /286879/righe/       /?filter=adDes%3D%3D'DIRITTO%20COSTITUZIONALE'
//per recuperare esami prenotabili vado sul libretto
var strUrlGetSingoloEsame='https://units.esse3.pp.cineca.it/e3rest/api/libretto-service-v1/libretti/'; // 286879/5057980  matId=286879  adsceId=5057980
//var strUrlAppelliPrenotabili='https://units.esse3.pp.cineca.it/e3rest/api/libretto-service-v1/libretti/' ;// 286879/righe/?filter=numAppelliPrenotabili%3D%3D1';
//qui recupero ultima data utile dell'appello collegato a una riga del libretto
var strUrlGetAppelloDaPrenotare='https://units.esse3.pp.cineca.it/e3rest/api/calesa-service-v1/appelli/'; //10094/117740/?stato=P'
var strUrlPostAppello='https://units.esse3.pp.cineca.it/e3rest/api/calesa-service-v1/appelli/'; //10094/117740/5/iscritti'
var strUrlDeleteAppello='https://units.esse3.pp.cineca.it/e3rest/api/calesa-service-v1/appelli/'; //10094/117740/5/iscritti/236437;'
//var strUrlGetAppelliPrenotati=strUrlGetSingoloEsame';
//qui ci vorrà user e pwd
function getEsseTreLogin(){
    return new Promise(function(resolve, reject) {
    var options = { 
        method: 'GET',
        url: strUrlLogin,
        headers: 
            { 
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
            },
        json: true 
    }
   
    request(options, function (error, response, body) {
        if (error) {
            reject(error);
            console.log('errore in doLogin '+ error);
        } else {
            if (response.statusCode==200){
                console.log(body);
                resolve(body); //ritorna una oggetto json
            }  
        }

    });

});
}
function doLogin(){
    return new Promise(function(resolve, reject) {
    getEsseTreLogin().then((body)=>{
       var stud; //15/01/2019 non studente perchè è un riferimento al modulo 
        stud=new studente(body.user.codFis,body.user.firstName,body.user.lastName,body.user.grpDes,body.user.grpId,body.user.id, body.user.persId,body.user.userId,body.user.trattiCarriera);
        stud.log()
        resolve(stud);

    });
});
}
//riscrivo doLogin con le promise
function doLogout(){

    var blnLogout=false;

    var options = { 
        method: 'GET',
        url: strUrlLogout,
        headers: 
            { 
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
            },
        json: true 
    }
   
    let rawData = '';
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
        if (response.statusCode==200){
            blnLogout=true;
            console.log('\n USCITO DALLA SESSIONE DI ESSETRE');
            studente=undefined;
        }else {

            //LOGout FAILED
            console.log('response.statusCode ' + response.statusCode);
            console.log('logout failed');
        }
        return blnLogout;
    });
}
//get carriere/userid-> anagrafica utente IN HOMEPAGE
//passo lo username dello studente s260856
function getCarrieraAnagraficaHome(userId){
return new Promise(function(resolve, reject) {
    var options = { 
        method: 'GET',
        url: strUrlAnagraficaHome +userId +'/', //passo userid dello studente loggato
        headers: 
            { 
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
            },
        json: true 
    }
  
    request(options, function (error, response, body) {
        if (error) {
            reject(error);
            console.log('errore in getCarrieraAnagraficaHome '+ error);
        } else {
            if (response.statusCode==200){
                console.log(body);
                resolve(body); //ritorna una oggetto json
            }  
        }

    });
  });
}

//********LIBRETTO */
function getEsseTreLibretto(matId){
    return new Promise(function(resolve, reject) {
    var options = { 
        method: 'GET',
        url: strUrlGetLibretto + matId +"/righe",
        headers: 
            { 
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
            },
        json: true 
    }
   
    request(options, function (error, response, body) {
        if (error) {
            reject(error);
            console.log('errore in doLogin '+ error);
        } else {
            if (response.statusCode==200){
                console.log(body);
                resolve(body); //ritorna una oggetto json
            }  
        }

    });

});

}
//getSingoloEsame(matID, adsceId)
function getSingoloEsame(matId, adsceId){ //matID, adsceId
    return new Promise(function(resolve, reject) {
        var options = { 
            method: 'GET',
            url: strUrlGetSingoloEsame  + matId +'/righe/' + adsceId,
            headers: 
                { 
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
                },
            json: true 
        }
        request(options, function (error, response, body) {
            console.log('url di singolo esame '+ options.url);
            if (error) {
                reject(error);
                console.log('errore in getSingoloEsame '+ error);
            } else {
                if (response.statusCode==200){
                 
                    resolve(body); 
                }  
            }
    
        });
    
    }); 
}

function getEsame(matId, adsceId){ //matId, adsceId
    return new Promise(function(resolve, reject) {
      
        var rawData='';
        getSingoloEsame(matId, adsceId).then((body)=>{ //matId, adsceId
            rawData=JSON.stringify(body);
            console.log('\n\nQUESTO IL BODY del SINGOLO ESAME ' +rawData);
          
            singoloEsame=new rigaLibretto(body.aaFreqId,body.adCod, 
                body.adDes,body.adsceId, body.annoCorso, body.chiaveADContestualizzata.adId, 
                body.dataFreq,body.dataScadIscr,body.esito.dataEsa);
            singoloEsame.log();
            resolve(singoloEsame);
          
        });
      
    });
}

// FA IL LOGIN
function doLogin(){
    return new Promise(function(resolve, reject) {
    getEsseTreLogin().then((body)=>{
       var stud; //15/01/2019 non studente perchè è un riferimento al modulo 
        stud=new studente(body.user.codFis,body.user.firstName,body.user.lastName,body.user.grpDes,body.user.grpId,body.user.id, body.user.persId,body.user.userId,body.user.trattiCarriera);
        stud.log()
        resolve(stud);

    });
});
}
//CARRIERA 
function getCarriera(userid){
    return new Promise(function(resolve, reject) {
        var rawData='';
        var car;
        getCarrieraAnagraficaHome(userid).then((body)=>{
            car=new carriera(body[0].aaId, body[0].aaImm1, body[0].aaImmSu, body[0].aaOrdId, body[0].aaRegId,
                body[0].cdsCod, body[0].cdsDes, body[0].cdsId, body[0].dataChiusura,body[0].dataImm, body[0].dataImm1, body[0].dataImmSu,
                body[0].matId, body[0].matricola, body[0].motStastuCod, body[0].motStastuDes, body[0].ordCod, body[0].ordDes,body[0].pdsCod,
                body[0].pdsDes,body[0].pdsId, body[0].tipoCorsoCod,body[0].tipoCorsoDes, body[0].tipoTititCod, body[0].tipoTititDes);
           car.log();
            //per debug
            rawData=JSON.stringify(body);
            console.log('\n\nQUESTO IL BODY della carriera' +rawData);
            resolve(car);
        });
    });


}//FINE CARRIERA

//ottieni il libretto-> piano di studi
//modificata il 15/01/2019 tolto idMat
function getLibretto(matId){
    return new Promise(function(resolve, reject) {
    //array che contiene le righe del libretto
    var libretto=[];
    var rawData='';
    getEsseTreLibretto(matId).then((body)=>{
            //controllo che body sia un array
            if (Array.isArray(body)){
                rawData=JSON.stringify(body);
                console.log('\n\nQUESTO IL BODY del libretto ' +rawData);
                //creo oggetto libretto
                for(var i=0; i<body.length; i++){

                    libretto[i]= new rigaLibretto(body[i].aaFreqId,body[i].adCod,
                        body[i].adDes,body[i].adsceId, body[i].annoCorso, body[i].chiaveADContestualizzata,
                        body[i].dataFreq,body[i].dataScadIscr,body[i].esito);

                        libretto[i].log();

                }
                resolve(libretto);
            }
   });
});// fine getLibretto
}
//25/01/2019  286879/righe/?filter=numAppelliPrenotabili%3D%3D1'
function getAppelliPrenotabili(matId){
    return new Promise(function(resolve, reject) {
        var options = { 
            method: 'GET',
            url: strUrlGetSingoloEsame  + matId +'/righe/?filter=numAppelliPrenotabili%3D%3D1',
            headers: 
                { 
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
                },
            json: true 
        }
        request(options, function (error, response, body) {
            console.log('url di appelli prenotabili'+ options.url);
            if (error) {
                reject(error);
                console.log('errore in appelli prenotabili '+ error);
            } else {
                if (response.statusCode==200){
                 
                    resolve(body); 
                }  
            }
    
        });
    });

} //fine getAppelliPrenotabili
//function getPrenotazioni(matid)
function getPrenotazioni(matId){
    return new Promise(function(resolve, reject) {
    //array che contiene le righe del libretto
    var prenotazioni=[];
    var rawData='';
    getAppelliPrenotabili(matId).then((body)=>{
            //controllo che body sia un array
            if (Array.isArray(body)){
                rawData=JSON.stringify(body);
                console.log('\n\nQUESTO IL BODY ESAMI PRENOTABILI ' +rawData);
                //creo oggetto libretto
                for(var i=0; i<body.length; i++){

                    prenotazioni[i]= new rigaLibretto(body[i].aaFreqId,body[i].adCod, 
                        body[i].adDes,body[i].adsceId, body[i].annoCorso, 
                        body[i].dataFreq,body[i].dataScadIscr,body[i].esito);

                        prenotazioni[i].log();

                }
                resolve(prenotazioni);
            }
   });
});
} 

// recupero la lista delle prenotazioni (appelli prenotati) -> LEGGO DAL LIBRETTO PER NUM_PRENOTAZIONI=1
function getAppelliPrenotati(matId){
    return new Promise(function(resolve, reject) {
        var options = { 
            method: 'GET',
            url: strUrlGetSingoloEsame  + matId +'/righe/?filter=numPrenotazioni%3D%3D1',
            headers: 
                { 
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
                },
            json: true 
        }
        request(options, function (error, response, body) {
            console.log('url di appelli prenotati'+ options.url);
            if (error) {
                reject(error);
                console.log('errore in appelli prenotati '+ error);
            } else {
                if (response.statusCode==200){
                 
                    resolve(body); 
                }  
            }
    
        });
    });

} //fine getAppelliPrenotaTI
function getPrenotati(matId){
    return new Promise(function(resolve, reject) {
    //array che contiene le righe del libretto
    var prenotazioni=[];
    var rawData='';
    getAppelliPrenotati(matId).then((body)=>{
            //controllo che body sia un array
            if (Array.isArray(body)){
                rawData=JSON.stringify(body);
                console.log('\n\nQUESTO IL BODY APPELLI PRENOTATI ' +rawData);
                //creo oggetto libretto
                for(var i=0; i<body.length; i++){

                    prenotazioni[i]= new rigaLibretto(body[i].aaFreqId,body[i].adCod, 
                        body[i].adDes,body[i].adsceId, body[i].annoCorso, 
                        body[i].dataFreq,body[i].dataScadIscr,body[i].esito);

                        prenotazioni[i].log();

                }
                resolve(prenotazioni);
            }
   });
});
} 
//prenotazione: ottengo l'appello da prenotare 10094/117740/?stato=P'
//25/01/2019  
function getSingoloAppelloDaPrenotare(cdsId,adId){
    return new Promise(function(resolve, reject) {
        var options = { 
            method: 'GET',
            url: strUrlGetAppelloDaPrenotare  + cdsId +'/' + adId +'/?stato=P',
            headers: 
                { 
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
                },
            json: true 
        }
        request(options, function (error, response, body) {
            console.log('url di getSingoloAppelloDaPrenotare'+ options.url);
            if (error) {
                reject(error);
                console.log('errore in getSingoloAppelloDaPrenotare '+ error);
            } else {
                if (response.statusCode==200){
                 
                    resolve(body); 
                }  
            }
    
        });
    });

} 

// getAppelloDaPrenotare(cdsId,adId)
function getAppelloDaPrenotare(cdsId,adId){
    return new Promise(function(resolve, reject) {
        var appelliDaPrenotare=[];
        var rawData='';

        getSingoloAppelloDaPrenotare(cdsId,adId).then((body)=>{
            //controllo che body sia un array
            if (Array.isArray(body)){
                rawData=JSON.stringify(body);
                console.log('\n\nQUESTO IL BODY ESAMI PRENOTABILI ' +rawData);
                //creo oggetto libretto
                for(var i=0; i<body.length; i++){

                    appelliDaPrenotare[i]= new appello(body[i].aaCalId,body[i].adCod, body[i].adDes, body[i].adId,body[i].appId, body[i].cdsCod,
                        body[i].cdsDes,body[i].cdsId,body[i].condId,body[i].dataFineIscr,body[i].dataInizioApp, body[i].dataInizioIscr, body[i].desApp);

                        appelliDaPrenotare[i].log();

                }
                resolve(appelliDaPrenotare);
            }
   });
 });

} 
//26/01/2019 POST DI UN APPELLO TORNA BODY VUOTO QUINDI VERIFICA MSG DI RITORNO 201
//'https://units.esse3.pp.cineca.it/e3rest/api/calesa-service-v1/appelli/10094/117740/5/iscritti'
//attenzione: nel body devo inviare adsceId 5057981 che è la riga dell'appello da web
function postSingoloAppelloDaPrenotare(cdsId,adId,appId,adsceId){ //csdId= 10094 adId=117740 appId=5  adsceId= 5057981
    return new Promise(function(resolve, reject) {
        var options = { 
            method: 'POST',
            url: strUrlPostAppello  + cdsId +'/' + adId +'/'+ appId +'/iscritti',
            headers: 
                { 
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
                },
                body:{
                    "adsceId": adsceId
                   
                  },
            json: true 
        }
        request.post(options, function (error, response, body) {
            console.log('url di postSingoloAppelloDaPrenotare'+ options.url);
            var res=false;
            if (error) {
                reject(error);
                console.log('errore in postSingoloAppelloDaPrenotare '+ error);
            } else {
                if (response.statusCode==201){
                 
                    console.log('************ 201 OK');
                    res= true;
                    
                }  else{
                    console.log('************ NOK IN POST PRENOTAZIONE APPELLO');
                    res= false;

                }
                resolve(res);
            }
    
        });
   
    });
} 

// var strUrlDeleteAppello='https://units.esse3.pp.cineca.it/e3rest/api/calesa-service-v1/appelli/'; //10094/117740/5/iscritti/236437;'
function deleteSingoloAppelloDaPrenotare(cdsId,adId,appId,studId){ //csdId= 10094 adId=117740 appId=5  studId= 236437
    return new Promise(function(resolve, reject) {
        var options = { 
            method: 'DELETE',
            url: strUrlDeleteAppello  + cdsId +'/' + adId +'/'+ appId +'/iscritti/'+ studId,
            headers: 
                { 
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic czI2MDg1NjpRM1ZSQUFRUA=='
                },
               
            json: true 
        }
        request(options, function (error, response, body) {
            console.log('url di deleteSingoloAppelloDaPrenotare'+ options.url);
            var res=false;
            if (error) {
                reject(error);
                console.log('errore in deleteSingoloAppelloDaPrenotare '+ error);
            } else {
                if (response.statusCode==200){
                 
                    console.log('************ DELETE 200 OK');
                    res= true;
                    
                }  else{
                    console.log('************ NOK IN DELETE APPELLO');
                    res= false;

                }
                resolve(res);
            }
    
        });
   
    });
} 

exports.doLogin= doLogin;
exports.doLogout = doLogout;
exports.getCarrieraAnagraficaHome=getCarrieraAnagraficaHome;
exports.getLibretto=getLibretto;
exports.getCarriera=getCarriera;
exports.getEsame=getEsame;
exports.getPrenotazioni=getPrenotazioni;
exports.getAppelloDaPrenotare=getAppelloDaPrenotare;
exports.postSingoloAppelloDaPrenotare=postSingoloAppelloDaPrenotare;
exports.deleteSingoloAppelloDaPrenotare=deleteSingoloAppelloDaPrenotare;
exports.getPrenotati=getPrenotati;
