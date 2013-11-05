/*
 * POST message page.
 */
var parseString = require('xml2js').parseString;
var fs = require('fs');


exports.index = function(req, res){
		console.log(req.rawBody.toString());

		parseString(req.rawBody, function (err, result) {
		console.dir(result);

		console.log(result.xml.FromUserName[0]);
		console.log(result.xml.MsgType[0]);
		console.log(result["xml"]["Content"][0]);

		if(result["xml"]["Content"][0].indexOf("空气") != -1 ||
			result["xml"]["Content"][0].indexOf("质量") != -1) {
				var content = readDetailData();
				console.log(content);
			}

		res.send('ok');
		});
	};

var readDetailData = function(){

	var file = './data.json';
	var obj;
	var time;
	var content;

		fs.readFile(file, 'utf-8', function(err, data){
			if(err) {
				console.log('err!');
				return;
			}

			obj = JSON.parse(data);
			time = obj[0].time_point;
			content += 'Latest update:' + time + '\n';

			for(var aq in obj){
				content += obj[aq].area + '-' + obj[aq].position_name + ' AQ:' + obj[aq].aqi + ' Level:' + obj[aq].quality + ' PM2.5:' + obj[aq].pm2_5;
				content += '\n';
			}
		}
	}
