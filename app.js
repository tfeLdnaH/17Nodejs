/*var http = require('http'),
    path = require('path'),
    fs = require('fs');


function handle_incoming_request(req, res) {
    if (req.method.toLowerCase() == 'get'
        && req.url.substring(0, 9) == '/content/') {
        serve_static_file(req.url.substring(1), res);
    } else {
        res.writeHead(404, { "Content-Type" : "application/json" });

        var out = { error: "not_found",
                    message: "'" + req.url + "' not found" };
        res.end(JSON.stringify(out) + "\n");
    }
}

function serve_static_file(file, res) {
    var rs = fs.createReadStream(file);
    var ct = content_type_for_path(file);
    res.writeHead(200, { "Content-Type" : ct });

    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
        return;
    });

    rs.on('readable', () => {
        var d = rs.read();
        if (d) {
            res.write(d);
        }
    });

    rs.on('end', () => {
        res.end();  // we're done!!!
    });
}


function content_type_for_path (file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return "text/html";
        case ".js": return "text/javascript";
        case ".css": return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}


var s = http.createServer(handle_incoming_request);

s.listen(8080);*/

/*
C:\Users\Anderson\Desktop\PytonGitUI5JSAngularETC\NodeJS\src>curl -i -X GET http://localhost:8080/content/test.html
HTTP/1.1 200 OK
Content-Type: text/html
Date: Sun, 05 Nov 2017 13:09:11 GMT
Connection: keep-alive
Transfer-Encoding: chunked

<html>
<head>
<title> WooO! </title>
</head>
<body>
<h1> Hello World! </h1>
</body>
</html>
*/


/*
//Serving Up More Than Just HTML - code is written bellow
//The second problem is that you can currently serve up only HTML static content. The
//content_type_for_path function only ever returns "text/html" . It would be nice if it were a
//bit more flexible, which you can accomplish as follows: 
//Now you can call the curl command with a number of different file types and should get the
//expected results. For binary files such as JPEG images, you can use the -o flag to curl to tell
//it to write the output to the specified filename. First, copy a JPEG to your current folder, run
//server with node server.js , and then add the following:

//C:\Users\Anderson\Desktop\PytonGitUI5JSAngularETC\NodeJS\src>curl -i -X GET http://localhost:8080/content/slide.jpg
//HTTP/1.1 404 OK
//Content-Type: application/json
//Date: Sun, 05 Nov 2017 13:22:36 GMT
//Connection: keep-alive
//Transfer-Encoding: chunked

//{"error":"not_found","message":"'slide.jpg' not found"}

var http = require('http'),
    path = require('path'),
    fs = require('fs');


function handle_incoming_request(req, res) {
    if (req.method.toLowerCase() == 'get'
        && req.url.substring(0, 9) == '/content/') {
        serve_static_file(req.url.substring(9), res);
    } else {
        res.writeHead(404, { "Content-Type" : "application/json" });

        var out = { error: "not_found",
                    message: "'" + req.url + "' not found" };
        res.end(JSON.stringify(out) + "\n");
    }
}


function serve_static_file(file, res) {
    var rs = fs.createReadStream(file);

    var ct = content_type_for_path(file);
    res.writeHead(200, { "Content-Type" : ct });

    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
    });

    rs.on('readable', () => {
        var data = rs.read();
        if (!res.write(data)) {
            rs.pause();
        }
    });

    res.on('drain', () => {
        rs.resume();
    });

    rs.on('end', () => {
        res.end();  // we're done!!!
    });
}

function content_type_for_path (file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return "text/html";
        case ".js": return "text/javascript";
        case ".css": return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}


var s = http.createServer(handle_incoming_request);

s.listen(8080); */

//Shuffling data from stream ( rs in the preceding example) to stream ( res ) is such a common
//scenario that the Stream class in Node.js has a convenience method to take care of all this for
//you: pipe . The serve_static_file function then becomes much simpler:

var http = require('http'),
    path = require('path'),
    fs = require('fs');


function handle_incoming_request(req, res) {
    if (req.method.toLowerCase() == 'get'
        && req.url.substring(0, 9) == '/content/') {
        serve_static_file(req.url.substring(1), res);
    } else {
        res.writeHead(404, { "Content-Type" : "application/json" });

        var out = { error: "not_found",
                    message: "'" + req.url + "' not found" };
        res.end(JSON.stringify(out) + "\n");
    }
}


function serve_static_file(file, res) {
    var rs = fs.createReadStream(file);
    var ct = content_type_for_path(file);
    res.writeHead(200, { "Content-Type" : ct });

    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
        return;
    });

    rs.pipe(res);
}

function content_type_for_path (file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return "text/html";
        case ".js": return "text/javascript";
        case ".css": return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}


var s = http.createServer(handle_incoming_request);

s.listen(8080);

//the result
/*
C:\Users\Anderson\Desktop\PytonGitUI5JSAngularETC\NodeJS\src>curl -i -X GET http://localhost:8080/content/slide.jpg
HTTP/1.1 200 OK
Content-Type: image/jpeg
Date: Sun, 05 Nov 2017 13:28:23 GMT
Connection: keep-alive
Transfer-Encoding: chunked

#%'%#//33//@@@@@@@@@@@@@@@&&0##0+.'''.+550055@@?@@@@@@@@@@@@ └ôK"  ─ ¼                           !1AQaqüæ"í2B▒┴ÐR#­ßbrÆ3CSâ├éD±ó$▓cs4┬Ê%5      !1AQaæüq2B"bí▒┴Ré3â­ÐßÆ# ┌   ? ÓÊI$$Æ@Q@"ÇäàQ-<ı¿õ½R
ÈFJ─I¦ÿºå~ä"2)└q#¡PÞþç$­ã.8dä4ÄúâºêØ@┤C└núêN┐Mç$■D¸§á b98S\7¨JÏeñ7b` 3÷<ÚN«ÒZQë:õ n.2EE=¥┌¢xW¿    £=▄pCÈ^áÄsj\ÝÎûTà[êiªH▄rı╔c·ÜZvÏD³Sá½│─ïx×╩¥ yµ¬mq0ÁäÄ×=¬Ù`:É}─'7ïúÞ)p╦÷ñ7═PÿÚ=idrÛEêv─>)╝H¯@"ß¤aKâtñ▄{Ð└ÓpÕÍÇf=à4åN#─8 xÄ'$ ßƒ÷ª±nä‗ jÇýÏîðgN?xIö èNA9├ß╦@ä¾ùÍø╚h─ôùLbqOl
<2@┘$─bI¢YºwÔÜæËÜxâÃ$Éæ(FÜA9$Æ`×#ÝKI@┬2I▒)ÝæK@¦%<Ð%ÓÇ░t4¹Q<]'@Í┼©RsÏ¿nN9┐Ñïp`ï:R@ÍCJwû(º▓D@ºîÐöúñ|\GÊ$`N$ªÆÞ%á│ä£1KH!0þðÑwý═5©ánÉæ'6
*k/■Õ■H²*"Í!´hËÅÊéãÕ  ▀©Õ¼▓¼IËºåjãßìÝÎ* ╠AH+Î¸{SFA>Ó° ÚL(
@Æ@Ø$▓AA$Æ@áI$Æ ÆHá     "é Æ( JÎ¹ÞyVÞVü²´(3ÊI$hRI$
! êURVá0<ÄjÁ%jñI┼║)╗÷ðu'┼î~Éê1ë─qK─ê═2²%JYÃ[ÆÇÚgt²)°Å>I▒|z3OïbrÔ"n.Ám´Û[\[ÛT╝5HlIm'Ü8µrSƒÁ±ªL%È▒¢¢¯ÂÀ[mk[g½▒e¨.7È│$YZþÌùðÂ®fiøÝ¯sËíß░PhPçùB!└ñ çÃ ¢å`9õûn8£
íGç-Ê£ È:qdç║¦êî▒9@▄ƒæI©þ─"┘éùã hÅÁ.÷"▄·Ê9┴f8¾═×)┼▓õø£‗püq<É=]HÄ#0╚@á\ÃÑ:@Ó¦¢¬¦å┘u=#ÓÅ¢3¯à╚¾╚ñAcÖõ║z~ÉïK╠╣/­Úê├¡ËgÞ¨g¼x     Cý)ô╠3aA¢è÷ßÂ▄m§<║±¤¦ÿ╩]Jú┴ÖHpÁ4î║¼4ßÜû╩ÈÌ]ÊÀëcRL³ÉT1╔5║Y?GËõE╠ì@       m#K«^Q1&'1¶Ô²¿i÷µÁÂØûªÚ
ÊÑPS‗ÿ4âÛ%7v┘kÝ×\Õ1RØLÿîðfilzô╬¡ÊãæT5ÅÏÇum┌nÀ3P[Àß¿╦è┐SÊáê0ò9>qåÝe20XÜ╦{■Ð¦ëfª`L░·  ┤ww╩×Ö3JG┌Ñ©íR┌ÁJbı t╚t¿£Å¡Pèiþ▄«m¹uÍÒ[╔Áêö└È\░ q%K©lÀ¹m8È╣ätJZAëÈ¦hîµM%­N#E├$rSð▓║©üJU#Æ;È5!8H┬`ãCü┴Ì,îÇÞq┼ãS"1R8DJ)áw#Åj│■?pÄ&┌¿ÓµbÖ+┌m«Ì¼ud­û>─>(èÿ█\─ÚòÇ‗Ð'·Rîú#r!É5ð'.äÔ÷bøø(ÆMùðâÇs╦é!╦ SÄe│ÔèÞHqEëIJiO!0ü┌Ç!â#¶áü$EE5Ê@õ┤ÆåC4© Ç‗RY╚F¯îÄB`║b─#÷ûf  z¨#!qPëHµ"<Eû¯¨Ú}¥▀j½ql­½B:ü%§7╣╦èò!qNÛîî'(ãqÿ╠Ñ┐Ì¸+¹û©¼¶¥1º_ZRubV:ä:qH`òf5┤îó┴@
I"Ç èHñÇ èHI$ü$ÆHö$AVü²´*¬Î­?í²ÕzI"ìI"ü"      ┴")p*ı>JÁjÃ^+HöqO        9¥6!└<│O©êtC╦éÉD¥‗ÞM8'┼îI<æNÄdî?:|@±Ä,┤FÖcé1_û(ý:▄u)iUî!:d<e╔F1ùÇ<Êc╠ÃÞ@Ûùrì
éò2j│E¨òGl▓®mJu*■‗íy+ÊgÈ9b     lrß═81lG┤[‗ÚHx£d_¼ë¥yáÒÖ¢Ï¶ÓîA╦Á!ê¢ |ƒ¼$s$õÄùçÞIï§îP4  ýpä░╦4µ└ð#┴ÍÇHdx±A╦ÄE8Äeÿ# 1@ËÃ3@çø4Ó┼ÃÆAØ ÓHÛ]¯█kNÊ╩ò(äyôë\sü!╗ÎíSJ·½ù×óÁ┤¡:>\¬JÖb╠1ÝJÃÈ¸ÀQÂì9BS╠\╬Ôu_W.þY×aA
§hÈìZr"ñK└Ä     ä╦│▀,®¦Ý§5 g  q.9 ¾¡z¥º▄*└ÊJ:d├nk'½ Éª£║ı²ü╬±l8j'©D£:çºú  ÷-ÃÙÚ)GoQ┤I‗b²╦═¬f["K:¶Öërê╠é#▄©jø´
║>\╚ù±Dì9¾R-l·: [\╦ë¿`è½úÂË┼q▄T¥ÿ┤║│À»FÛùù?0H}N>Ñ¼HvÒ3µÐÆu/'q@eÐÖGÉ┴øüZGSÞÖ÷ÒÃ└YtÁ½ÊíR┤┼:c9£ \ÎóóÛõÏx¡ì÷Í¡¯▀V┌Ì:Ù&.YÿµÙ7Ü¶M■[lÒuKú─×ÙÂê³¦& ³Ar├Ê[╝³rò!#ø╚©÷,²¤f╝█>gIìGË(╔1ı[║Ì}ıZ«·õK¿┤Xñ┤ÄÅÐ ³Ý┴Ó)Ý+Ñ¦m>{o©Á┼R'IõF!s~ëÅ²m╠å S Å§.┴└=k7Ü╬O)£L%óXH8ÉÛFìòÛ┬ì1¬s:c╠¡¤VmóÍ¹µiåúsëÞƒ§?ú÷║Á.╚Èê)oÖƒ1È«QËm{x█÷·VÇ╣Ç±r%╩Ô¯©Êë uf¢
$Ò.¤²W)Kz»¿üÈækï§¡oJÊìM÷åáÔRnÉ}++»0Â¢#½³Õ3┤M·ÿ+Q▀;9ô3ß¨ËâHÄb®¯‗1█.øÑ ñ2¾╩UwïÐ74Ô1"á¶)àÀN`°Åb¾¤V─├z®åÛP╦x▀)GL¯k└<Zç■Ñƒ^Á[èÆ½^r®P¹Êær¼ëj,\hÄ$t s(Äºðªä½¦B`J¿äe @}/Ô[~Ñ┌Ý¯v¬¾ºF1Lkää@ûõ©ØÜ³Ý█òº­FZjpûzçåQqÔîâÄÉT½=wÚ=ªûÕ~g^eÛ£NRæ¸b║}ÎeÏ-¼n.jZ┬`qÄxiÚuí┤ÝöÂ┌5)S yòePæÃQ├╣s>À▄³╩ö÷┌R­├±+§³#ÙNtÞõƒÜI2╗-!Bdéy╦┘(ªA;å(µùRGéAÙAÊKèÖ XúÈÇéw@MtÚôZ╩?zî┤ƒı*       ézó®R êH─K4ËV¼ó`eü═1±H╠±)Ú  `Æü$ÆH        $ÇæA IÆII&IA$ÆI V┐ü²´*╩¤­?í²õÞáèì("ÇóSéêA8*ï4U©p#åJ¡.
ÈpeªRDæùS└ÔÜä³§õüß¶ër*A×YbBÄ!£x }D¶w╔║]:$µ=Òâ&─3ÝOwæÈ4Â@£¨'qnG═ ╬Ã"2ÚF1$¸å=êóÏtéÒ®îz\ÒÍùÔ2ÚOl:p@ÒÜv~XúëÚ·Æêb²¼ÇeÅ$p#û£║Raƒ²ÞåËÌ5Ø©)cƒNIÊs8á%▓·ÞÝ¿`³SC>Q.8▄hÚáÓ£Æ¦}A5░2sA%>ƒÖä5ìDr%zF ╠╝‗─ÂÆ÷«‗Ø]Tc-DôÅ<½FÓµ·õî£ë´UÕý1V»Ò8¦Èö┴K?we┌(nr½RQ╚CºÑ1ÿéûX.ùtÏv¹[ùÕ1(©æ\Î).Þ´Æ┐▒KN´nF$Æ;┴
ü..+OË▒7j.2ı.Óövñå&XÜåØ§ØXÖBÄ~!éuÐkZÃ&ä¥àþ>ò$╩┌¶©╩2}%└Ò┴s¥▓¶÷┼­Î!º│7V¢,¾┌AærjK3╔T§ôy6©╣ı?`I╠╝£®w)î²Ú┼Ö¾M╦>ıñu^ï}a­å,║*¸4-®ÜÀÚ┼ÁHõs■ïünªr3êü_§G  ÒV²h²+=Wó╠w¡ªrË║nCÔ[ıüÛÙ╗j¶¿┬àxı.µ0.q┴s%êÃè8+ä╚ ]­ýI‗lBN¦JÄùÐ?²╦ƒ■!  ¿.¢éõ²»wUãî[Ä%ÎOwVT-jÍÇı*q2 ¶,Ìk9*o█q▄v┌ö)Çka*DßÔÜ▒Â┌+6┴×£@ôe½è}¡═+½zwñ'   Çuƒèm§Èm-jWæ ─xAÒ#ÉP¸M=@8└z¼¥¾RO£ [¼.÷øÜ'(éAÚü§DÒ=µ│|1ä{ó¼+-¤Gƒ  ÁÒNúÏ▒y¡¤G┼b(╚ÒËÑZÄýÇp!Ã$HÞTÀzÁ¿ÝÀÞL┬Ñ8FCù7²Ù/*Ô_5$[]¯ý,ÒÀÎòýDby ╝└▒%â®\©¦7¬bò┼─Û@cªES~*╚ûÇ&ÉqÔ×OÁ5±,¿L├┼Þ¥ö┐ò¯ËN3:¬█ƒ*í9ß¯×Õþ|s/D¶¥ı=Àm®>u╦T£O├å¯RôøJ‗Û6vÁndà(ÖiòÕ¸ò..o+V«ÑIJ<ƒ!Ï¿^█³ı¡KwaV&.8?ÕÎ4¬[\UúP╝Þ╚┬GÖ{TïU╚Ké$Ó╔Ä┤╔Ê
2ñûJ9 óÿRD H29åIø7f┼7 £üäâÒ4 ]Êg`8ºÚ£"DáF¼ëw2'Æ\@ºã®1N£Lþ/v1J│■#ub~N│ð((▓\Tı¡«(0¡JT§Äá╬8¸á       ╔`Æü ëÚZøWº7M▄█Só?ìS├yh2è¿  ░7┐.R3ú«>Ý7>.ıà©mÀøuXÊ╗Çäª5EïßÆ
ê"R@E_Ñ▒o5á*R▓½(H<ÝA@á«  å¦Áÿ|Ø]`▒Ä£]Aqksk-4ºF|ªH"é ÆI J¤­?í²ÕUZ■¶?╝á¤EQóEPäAN  ®Ð═TZÑâ+p═è½Hd¡├èÊÉ9ºÂgY©µ╚váû,H|x▓`wnÈ­0÷G─GRxsÇ═6>ÌÈµÒ┌8é°bsNÇ±88dÇãB]N8'Â.┘È¦Þ‗ ─:Y┼╩# _▒x┼▓bÞ©¤×ÛCúÀÁÓ±pPë┴ýHÇ#.EëÞD°ê:\Õ÷áÕÕ╔ÅJi$À▒8·
ÃÈüQLr[çÚ{9 pêlƒæN0╦æÜQ×æ(­ûh░b<x{P`zéCÖÒÆ/â±%øÑ.:yfÇÛÚÛ]û╔yN¯Ê$yÈåÖ┼±├èÒNa┼u¬Q×║R0ÿlbX®H´½ZZ▄GMjQ®Éö(Súè`î@0\q▀w7µ$ õÖ=Ùrÿ1Ø─ê╩\┬ÕÀÛ╬ù╩╩╬æıPæ¼îâp\æ-ÇCöz±ËgpO║êî±UQnæùJÏ¶┤_v­ä█╣c¿udØJµÁjú3Nc
r¤®yÈ[  >,ýº¡©]ÈxèôäÒÔ9×!U%╚÷$+À¶▒Ô)ÇAÉ£§└Û¹o¼e#RÍÓÊ tÆ▒-w;█8╩6ıM12‗<ð¢▄.»¬
8              ┼ÅBñàöı½N▒ò┼Ij®RD╚£╔<T.¨¡#¿¶@³K▓▀C÷«Æ³Áì├  *B¾²│w╗█'9█■ QÉpY]╣§fßqoR┌qªıüëÿ%£q3┴wÐ█£ ;uFã¬]2Ò¬´þV■ìì9¢*Lf├Y=éþ┐î³$┬ñr "uôï╗¥$¾W│Èó·╦æõyþ¿àA╗ÎÎä×=╠hR§u§:öÚBF "N-¸ûÝ╠¯«'q1°ò®6]A$
*/