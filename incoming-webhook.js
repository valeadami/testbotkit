module.exports = function(webserver, controller) {
    // Receive post data from fb, this will be the messages you receive 
    webserver.post('/botkit/receive', function(req, res) {
        // respond to FB that the webhook has been received.
       // res.status(200);
       // res.send('ok dal post');

        var bot = controller.spawn({});

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res, bot);
    });
    // Perform the FB webhook verification handshake with your verify token 
    webserver.get('/botkit/receive', function(req, res) {
    
                res.send('Sono nel get');
           
        
    });
}