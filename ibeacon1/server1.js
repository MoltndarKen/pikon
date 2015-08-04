

var http = require('http');
var WSServer = require('websocket').server;

var url = require('url');
var clientHtml = require('fs').readFileSync('client.html');
//全てのurlをcliantのパスを設定する
var plainHttpServer = http.createServer(function(req, res) {

  if(req.url.match(/^\/db\/\?(.*)/)){
    // 「//」がダブルクォーテーションのようにして扱ってやるのが正規表現。「^」は「最初の〜」という意味。\がエスケープで、その後のバックスラッシュを正規表現のくくりでなく、としてあつかうため。
    var mise="";
    var syohin="";
    var params=RegExp.$1.split("&");
    //このRegExpで正規表現の１番目のカッコ、すなわち(.*)を取り出している。
    console.log(params);
    for(var i=0;i<params.length;i++){
    //param(db以下のキーワーど検索の要素の数だけfor文を回す)
      var paramOne=params[i].split("=");
      //ここでさらに取り出したものを
      if(paramOne.length==2){
        if(paramOne[0]=="mise"){
          mise=paramOne[1];
        }else if(paramOne[0]=="syohin"){
          syohin=paramOne[1];
        }
      }
    }

    console.log(mise);
    console.log(syohin);

    res.writeHead(200, { 'Content-Type': 'application/json'});
    if(mise=="A" && syohin=="mc01"){
      //こういったurl、すなわちもし/db/?mise=A&syohin=mc01いったパスを通していればclient.htmlでなくしたのデータベースを表示する
      res.end('{"zaiko":2}');
    }else{
      res.end('{"zaiko":0}');
      //b店舗であれば抹茶チョコがおいていないので返せという意味
    }//ここでobjectで返せるからclientでmsg.zaikoで取れる
    //動的にテキストを生成している中で、
  }else{
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(clientHtml);
    //ここで7行目の取り出している。これでどんなパスを受け取ったかが分かる形になる。res.endは基本的にこの値を返すといったようなニュアンス。
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
//コメントアウトをハズズ
// if( (bleacon.major==3322 &&bleacon.minor==50316)||bleacon.major==26177 &&bleacon.minor==48667&&bleacon.accuracy<0.8){
      console.dir(bleacon);
      websocket.send(JSON.stringify(bleacon));
      //websocket.send("そばまで来ました!");
 //       dir(bleacon)
// }
  });
  // bleacon.major==26177 &&bleacon.minor==48667

}
