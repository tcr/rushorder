# rushorder

A basic library for interacting with RushOrder.com

```
npm install rushorder
```

Example:

```
var ro = require('rushorder');
ro.getAPIKey('username', 'password', function (err, key) {
  console.log(key);
  ro.getInventory(key, function (err, inventory) {
    console.log(inventory);
  });
});
```

## license

MIT