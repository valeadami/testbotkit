/*  data: 14/01/2019

modulo per le domande e risposte del bot


*/
var Conversation={
    'type':'Conversation',
    'utOnBoarding':'ciao',

    'botOnBoarding':{

        'respOnBoarding':'Ciao! Sono il bot dell’Università degli studi di Trieste. Posso aiutarti a prenotare un appello, vedere il tuo libretto, vedere i risultati di un esame. Per connetterti a essetre ho bisogno delle tue credenziali',
        'respLogin':'Per connetterti a essetre ho bisogno delle tue credenziali',
        'respMenu':'Sei al menu: dì o digita libretto per conoscere la tua carriera, carriera per informazioni generali sul tuo corso, anagrafica per anagrafica studente, help per ricevere aiuto, stop per terminare la conversazione',
        'respHelp':'sono qui per aiutarti',
        'respGuida':'Bene, hai chiesto aiuto! Puoi darmi istruzione via chat o in modalità vocale. Ascolto le tue parole, quindi se vuoi continuare dimmi o scrivi prenotazione, libretto o esito. Per uscire dalla chat dì stop, per annullare un\'operazione dì annulla'
    },
    'botQuestions':{

        'questLogin':'vuoi continuare con il login?',
        'questMenu':'cosa vuoi fare ora? Puoi dire libretto per accedere al tuo libretto, anagrafica per dati sul tuo conto o prenotazione per prenotare un appello',
        'questMenuGenerico':'Come posso aiutarti ora? Puoi chiedere dettagli su un esame, prenotare un appello o tornare al menu',
        'questLibretto':'che cosa vuoi sapere del libretto?',
        'questUsername':'qual’è la tua username? In genere è nel formato s123456',
        'questPrenPassword':'qual’è la tua password? In genere è composta da otto caratteri alfanumerici, ad esempio Q3VRAAQP',
        'questLogout':'Vuoi uscire?'
    }
}
module.exports=Conversation;