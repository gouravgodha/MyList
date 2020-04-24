var twilio = require('twilio');

var accountSid = 'ACc4793851ee59eb850d28fcc8f351406a'; // Your Account SID from www.twilio.com/console
var authToken = '0fec4e8f31593ff4871ebce2e7cb3819';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello This is gourav!',
    to: '+919993589582',  // Text this number
    from: '+18646416609' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
