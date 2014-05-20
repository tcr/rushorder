var rem = require('rem');

var client = new rem.Client();
client.debug = true;

function getAPIKey (username, password, next)
{
  client.json('https://reports.rushorder.com/json/index.cfm').post('form', {
    username: username,
    password: password,
  }, function (err, json) {
    if (err) {
      return next(err);
    }
    console.log(json);
    if (!json || json.STATUS != 'SUCCESS') {
      return next(new Error(json && json.DETAILS));
    }
    return next(null, json.APIKEY);
  })
}

function getInventory (apikey, next) {
  client.json('https://reports.rushorder.com/json/index.cfm/', apikey, '/oti/inventory/').get(next)
}

exports.getAPIKey = getAPIKey;
exports.getInventory = getInventory;
