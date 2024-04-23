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


 
app.get("/api/:dateOrUnix?", (req, res) => {
  const { dateOrUnix } = req.params;

  // Check if dateOrUnix is undefined or empty
  if (!dateOrUnix) {
      const currentUnixTimestamp = Math.floor(Date.now()  );  
      const currentUtcTime = new Date().toUTCString();
      console.log(currentUnixTimestamp)
      return res.json({ unix: currentUnixTimestamp, utc: currentUtcTime });
  }

  // Check if dateOrUnix is a valid Unix timestamp
  if (!isNaN(dateOrUnix)) {
      const milliseconds = parseInt(dateOrUnix);
      const date = new Date(milliseconds);
      if (!isNaN(date.getTime())) {
          const unixTimestamp = date.getTime();
          return res.json({ unix: unixTimestamp, utc: date.toUTCString() });
      }
  }

  // Check if dateOrUnix is a valid date string
  const specificDate = new Date(dateOrUnix);
  if (!isNaN(specificDate.getTime())) {
      const unixTimestamp = specificDate.getTime();
      return res.json({ unix: unixTimestamp, utc: specificDate.toUTCString() });
  }

  // If dateOrUnix is neither a valid Unix timestamp nor a valid date string, return an error
  return res.status(400).json({ error: "Invalid Date" });
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

 

// Listen on port set in environment variable or default to 3000
var listener = app.listen( 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
