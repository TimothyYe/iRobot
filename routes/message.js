/*
 * POST message page.
 */
var parseString = require('xml2js').parseString;

exports.index = function(req, res){
		console.log(req.rawBody.toString());

		parseString(req.rawBody, function (err, result) {
		console.dir(result);

		console.log(result.xml.FromUserName[0]);
		console.log(result.xml.MsgType[0]);
		console.log(result["xml"]["Content"][0]);

		if(result["xml"]["Content"][0].indexOf("空气") != -1 ||
			result["xml"]["Content"][0].indexOf("质量") != -1) {
				console.log('Yes!');
			}

		res.send('ok');
		});
	};
