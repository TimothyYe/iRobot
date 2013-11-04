/*
 * POST message page.
 */

exports.index = function(req, res){
	var nonce = req.query.nonce;
	var signature = req.query.signature;
	var echostr = req.query.echostr;
	var timestamp = req.query.timestamp;

	console.log(req.query.nonce);
	res.send(req.query.echostr);


  var nonce = req.query.nonce;
  var signature = req.query.signature;
  var echostr = req.query.echostr;
  var timestamp = req.query.timestamp;

  console.log(req.query.nonce);
  res.send(req.query.echostr);
};
