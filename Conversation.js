var Conversation={
    'type':'Conversation',
    'utOnBoarding':'ciao',

    'botOnBoarding':{

        'respOnBoarding':'Ciao! Sono il bot dell’Università degli studi di Trieste. Posso aiutarti a prenotare un appello, vedere il tuo libretto, vedere i risultati di un esame. Per connetterti a essetre ho bisogno delle tue credenziali',
        'respLogin':'Per connetterti a essetre ho bisogno delle tue credenziali. In generale, la username è nel formato s20856',
        'respMenu':'Sei al menu: dì o digita anagrafica per anagrafica studente, carriera per informazioni generali sul tuo corso, libretto per conoscere la tua carriera, prenotazione per prenotare appello, help per ricevere aiuto, stop per terminare la conversazione',
        'respHelp':'sono qui per aiutarti',
        'respGuida':'Bene, hai chiesto aiuto! Puoi darmi istruzione via chat o in modalità vocale. Ascolto le tue parole, quindi se vuoi continuare dimmi o scrivi prenotazione, libretto o esito. Per uscire dalla chat dì stop, per annullare un\'operazione dì annulla'
    },
    'botQuestions':{

        'questLogin':'vuoi continuare con il login?',
        'questMenu':'cosa vuoi fare ora? dì o digita anagrafica per anagrafica studente, carriera per informazioni generali sul tuo corso, libretto per conoscere la tua carriera, prenotazione per prenotare appello, help per ricevere aiuto, stop per terminare la conversazione',
        'questMenuGenerico':'Come posso aiutarti ora? dì o digita anagrafica per anagrafica studente, carriera per informazioni generali sul tuo corso, libretto per conoscere la tua carriera, prenotazione per prenotare appello, help per ricevere aiuto, stop per terminare la conversazione',
        'questLibretto':'che cosa vuoi sapere del libretto?',
        'questUsername':'qual’è la tua username? In genere è nel formato s123456',
        'questPrenPassword':'qual’è la tua password? In genere è composta da otto caratteri alfanumerici, ad esempio Q3VRAAQP',
        'questLogout':'Vuoi uscire?'
    }
}
module.exports=Conversation;