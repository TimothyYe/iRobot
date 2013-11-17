/*
 * POST message page.
 */
var parseString = require('xml2js').parseString;
var fs = require('fs');
var builder = require('xmlbuilder');
var winston = require('winston');
var request = require('request');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: '/home/timothy/iRobot/running.log' })
    ]
});

function readDetailData (callback){

	var file = './data.json';
	var obj;
	var time;
	var content = '';

		fs.readFile(file, 'utf-8', function(err, data){
			if(err) {
				console.log('err!');
				return;
			}

			obj = JSON.parse(data);
			time = obj[0].time_point;
			time = time.replace("T", " ");
			time = time.replace("Z", "");
			content += '数据更新时间: \n' + time + '\n';

			for(var aq in obj){
				content += obj[aq].area + '-' + obj[aq].position_name + ' 空气指数:' + obj[aq].aqi + ' 空气等级:' + obj[aq].quality + ' PM2.5:' + obj[aq].pm2_5;
				content += '\n';
			}

			callback(content);
		});
}

function getVimTips (callback){
	request('http://vim-tips.com/random_tips.json', function (error, response, body) {
		if(!error && response.statusCode == 200) {
			result = JSON.parse(body);

			content = '今日Vim技巧: \n' + result.content + '\n' + result.comment;

			callback(content);
		}
	}

}

function createXmlResponse(jsonObj, content, callback){
	var doc = builder.create();

	doc.begin('xml')
		.ele('ToUserName')
			.txt(jsonObj.xml.FromUserName[0])
		.up()
		.ele('FromUserName')
			.txt('PowerfulTim')
		.up()
		.ele('CreateTime')
			.txt('12345678')
		.up()
		.ele('MsgType')
			.txt('text')
		.up()
		.ele('Content')
			.txt(content);

	  var ret = doc.toString({ pretty: true});
		callback(ret);
}

exports.index = function(req, res){

	parseString(req.rawBody, function (err, result) {

		logger.log('Receive content:' + result["xml"]["Content"][0] + ' from user:' + result.xml.FromUserName[0]);

		if(result["xml"]["Content"][0].indexOf("空气") != -1 ||
			result["xml"]["Content"][0].indexOf("质量") != -1) {
				readDetailData(function(content){

					createXmlResponse(result, content, function(xmlString){
						logger.log(xmlString);
						res.send(xmlString);
					});
				});
			}

		if(result["xml"]["Content"][0].toUpperCase().indexOf("VIM") != -1)

				getVimTips(function(content){
					createXmlResponse(result, content, function(xmlString){
						logger.log(xmlString);
						res.send(xmlString);
					});
				});
			}

	});
};

