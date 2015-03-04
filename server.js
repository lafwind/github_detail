var express = require('express'),
app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendfile('index.html', {root: __dirname })
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
