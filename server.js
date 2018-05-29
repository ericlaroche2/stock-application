

var request = require("request")
const express = require('express');
const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get('/api/stock', (req, res) => {
  console.log('GET');
  var config = require('./config');
  let APapikey = config.apikey; //alphavantage apikey
  const alpha = require('alphavantage')({ key: APapikey });
  var url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=F&outputsize=full&apikey="+APapikey
  console.log(url);
    request({
        url: url,
        json: true
    }, function (error, response, data) {
      if (!error && response.statusCode === 200) {
        var json = JSON.stringify(data);
        //console.log(json);
        res.json([json]);
        //res.render('index.ejs', {data: json});
      } else {
        console.log("ERROR IN ALPHAVANTAGE API");

      }
    });
});




const port = 5000;

app.listen(port, () => `Server running on port ${port}`);