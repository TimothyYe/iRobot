var fs = require('fs');
var file = './data.json';
var obj;
var time

fs.readFile(file, 'utf-8', function(err, data){
	if(err) {
		console.log('err!');
		return;
	}

	obj = JSON.parse(data);
  time = obj[0].time_point;
	console.log('Latest update:' + time);

  for(var aq in obj){
		console.log(obj[aq].area + '-' + obj[aq].position_name + ' AQ:' + obj[aq].aqi + ' Level:' + obj[aq].quality + ' PM2.5:' + obj[aq].pm2_5);
	}
});

