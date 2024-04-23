// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


 

app.get("/api/:dateOrUnix", (req, res) => {
  const { dateOrUnix } = req.params;

   
  if (!isNaN(dateOrUnix)) {
      try {
          const milliseconds = parseInt(dateOrUnix);
          const date = new Date(milliseconds);
          const unixTimestamp = date.getTime();
          res.send({ unix: unixTimestamp, utc: date.toUTCString() });
      } catch (error) {
          res.send({ error: "Invalid Date" });
      }
  } else {
     
      try {
          const specificDate = new Date(dateOrUnix);
          const unixTimestamp = specificDate.getTime();
          res.send({ unix: unixTimestamp, utc: specificDate.toUTCString() });
      } catch (error) {
          res.send({ error: "Invalid Date" });
      }
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

 

// Listen on port set in environment variable or default to 3000
var listener = app.listen( 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
