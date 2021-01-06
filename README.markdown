# strophe.mam.js

Sumber Source : [Strophe.RSM](https://github.com/strophe/strophejs-plugin-rsm)

Library Strophe Vuejs : Install terlebih dahulu 

1: vue-strophe.js (sumber https://github.com/Zengxm/strophejs)

## Install Pertama

    npm install vue-strophe.js
	
## Install Library strophe mam

    npm install strophejs-plugin-mam

## Usage
    connection.mam.query("you@example.com", {
      "with": "juliet@capulet.com",
      onMessage: function(message) {
				console.log("Message from ", $(message).find("forwarded message").attr("from"),
					": ", $(message).find("forwarded message body").text());
				return true;
      },
      onComplete: function(response) {
				console.log("Got all the messages");
      }
		});


