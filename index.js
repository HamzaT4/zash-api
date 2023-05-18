const express = require('express');

const app = express();

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'zashprint.myshopify.com',
  'path': '/admin/api/2023-04/orders.json',
  'headers': {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': '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',
    'Cookie': '_secure_admin_session_id=dbb30c252ee7b3b1686bcd1f71786968; _secure_admin_session_id_csrf=dbb30c252ee7b3b1686bcd1f71786968'
  },
  'maxRedirects': 20
};
let orderObj = {};
function getData() {

      
    var req = https.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
          orderObj= body.toString()
        });
      
        res.on("error", function (error) {
          return(error);
        });
      });
      
      req.end();
}

getData();
    console.log('updated cors');
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });
app.get('/', (req, res) => {
    
    res.send(orderObj);
  });

  const port = 5000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});