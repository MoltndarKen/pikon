var mysql = require('mysql');
//var encoding = require('encording-japanese')
var jschardet = require('jschardet');
var Iconv = require('iconv').Iconv;
var http = require('http');
var WSServer = require('websocket').server;

var url = require('url');
var clientHtml = require('fs').readFileSync('client.html');
//全てのurlをcliantのパスを設定する
var plainHttpServer = http.createServer(function(req, res) {

  if(req.url.match(/^\/db\/\?(.*)/)){
    var mise="";
    var syohin="";
    var params=RegExp.$1.split("&");
    //このRegExpで正規表現の
    ////console.log(params);
    for(var i=0;i<params.length;i++){
      var paramOne=params[i].split("=");
      if(paramOne.length==2){
    
        if(paramOne[0]=="syohin"){
          syohin=paramOne[0];
        }else if(paramOne[1]=="mise"){
          mise=paramOne[1];
        }
      }
    }
    //ここでhttp://localhost:8888/db/?mise=A&syohin=mc01としたときの帰ってくる値を考える。このしたのあたいは
    //あきらかに検索画面で入力した出力が帰ってきている
    console.log("shop="+mise);//ここで検索後のmiseのあたいが取れるつまり、
    console.log("item_id="+syohin);
    //console.log(getItems(mise));
    res.writeHead(200, { 'Content-Type': 'application/json'});
    //このresには上のplainHttpServerの値へのfunction関数の値を示している
    if(mise=="A" && syohin=="mc01"){
      recordA={stock:2};//ibeaconの形をみるとこれがハッシュの書き方だね。
        //var recordA = getItems(syohin);
        console.log("zaiko="+recordA.stock);
        //console.log(JSON.parse(recordA).stock);
      //このれこーどの中身をデータベースの１要素と定義してやればいい。
      //console.log("zaiko="+recordA.stock);
      //record.zaikoで在庫数を獲得できた。
      //この部分をいじってやることで在庫数を獲得する。。
      // if(JSON.parse(recordA).stock>0)
      if(recordA.stock>0){
        // var allText = unescape(encodeURIComponent(mise + "店に" + "抹茶チョコ" + "はあります。"));
        // res.write("<head><meta charset=\"utf-8\" /><\/head>"+"<body>"+ allText +"<\/body>");
        //console.log("A shop macha here!");
          res.end("A shop macha here!");
        //res.end("have a macha!!");
      }else{
        res.end("NO zaiko!");
      }
      //こういったurl、すなわちもし/db/?mise=A&syohin=mc01いったパスを通していれば
    }else{//もし{mise=="B" && syohin=="mc01"なら}
       recordB={stock:0};
          //recordB=getItems(mise);
       if(recordB.stock>0){
        // var allText = unescape(encodeURIComponent(mise + "店に" + "抹茶チョコ" + "はあります。"));
        // res.write("<head><meta charset=\"utf-8\" /><\/head>"+"<body>"+ allText +"<\/body>");
        //res.end("have a macha!!");
        res.end("B shop macha here!");
        console
      }else{
        res.end("No zaiko!");
      }
      //res.end('{"zaiko":0}');
    }//ここでobjectで返せるからclientでmsg.zaikoで取れる
    //動的にテキストを生成している中で、
  }else{
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(clientHtml);
  }
}).listen(8888);

var webSocketServer = new WSServer({httpServer: plainHttpServer});
var accept = ['localhost', '127.0.0.1'];
var websocket;

webSocketServer.on('request', function (req) {
  req.origin = req.origin || '*';
  if (accept.indexOf(url.parse(req.origin).hostname) === -1) {
    req.reject();
    console.log(req.origin + ' access not allowed.');
    return;
  }

  websocket = req.accept(null, req.origin);

  websocket.on('message', function(msg) {
    console.log('"' + msg.utf8Data + '" is recieved from ' + req.origin + '!');
    receive();
    //if (msg.utf8Data === 'Hello') {
       // websocket.send('sended from WebSocket Server');
      //ここのなかにもし送信後の挙動を記述することができる。
      //receive();
        //websocket.send(receive)
    //}
  });

  websocket.on('close', function (code,desc) {
    console.log('connection released! :' + code + ' - ' + desc);
  });
});

function receive()
{
    Bleacon = require('bleacon');
  Bleacon.startScanning();

  Bleacon.on('discover', function(bleacon) {
//      if( bleacon.major==3322 &&bleacon.minor==50316){
//      console.dir(bleacon);
//      websocket.send(bleacon.accuracy);
// //       dir(bleacon)
//      }
//console.dir(bleacon);
// if( (bleacon.major==3322 &&bleacon.minor==50316)||(bleacon.major==26177 &&bleacon.minor==48667)&&bleacon.accuracy<0.8){
  if(true){
      console.dir(bleacon);

      websocket.send(JSON.stringify(bleacon));
      //websocket.send("そばまで来ました!");
 //       dir(bleacon)
    if(bleacon.major==3322 &&bleacon.minor==50316){
      return 'A';
    }
     if(bleacon.major==26177 &&bleacon.minor==48667){
      return 'B';
    }
}
  });
  // bleacon.major==26177 &&bleacon.minor==48667

}
