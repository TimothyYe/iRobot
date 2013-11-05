var cronJob = require('cron').CronJob;
var request = require('request');
var fs = require('fs');

var job = new cronJob('*/15 * * * *', function(){
	request('http://www.pm25.in/api/querys/pm2_5.json?city=chengdu&avg=false&stations=yes&token=9zsQCyiC3cdFR8GzaCsp').pipe(
		fs.createWriteStream('data.json', { encoding: 'utf-8'}));

	request('http://www.pm25.in/api/querys/pm2_5.json?city=chengdu&avg=true&stations=no&token=9zsQCyiC3cdFR8GzaCsp').pipe(
		fs.createWriteStream('avg.json', { encoding: 'utf-8'}));
  }, function () {
    // This function is executed when the job stops
  },
  true /* Start the job right now */
);
