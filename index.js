var rem = require('rem');

var client = new rem.Client();
// client.debug = true;

function getAPIKey (username, password, next)
{
  client.json('https://reports.rushorder.com/json/index.cfm').post('form', {
    username: username,
    password: password,
  }, function (err, json) {
    if (err) {
      return next(err);
    }
    if (!json || json.STATUS != 'SUCCESS') {
      return next(new Error(json && json.DETAILS));
    }
    return next(null, json.APIKEY);
  });
}

// Gets all inventory
function getInventory (apikey, customerCode, next) {
  client.json('https://reports.rushorder.com/json/index.cfm/', apikey, '/', customerCode, '/inventory/').get(next);
}

// Gets shipped orders
function getOrderByNumber (apikey, customerCode, orderNumber, next) {
  client.json('https://reports.rushorder.com/json/index.cfm/', apikey, '/', customerCode, '/orders/', orderNumber).get(next);
}

exports.getAPIKey = getAPIKey;
exports.getInventory = getInventory;
exports.getOrderByNumber = getOrderByNumber;
