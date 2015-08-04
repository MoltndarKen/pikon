Bleacon = require('bleacon');
Bleacon.startScanning();

Bleacon.on('discover', function(bleacon) {
    if( bleacon.major==3322 &&bleacon.minor==50316){
   console.dir(bleacon);
  }
});

// bleacon.uuid=='b9407f30f5f8466eaff925556b57fe6d'