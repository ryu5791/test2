//mobile backendのAPIキーを設定
//↓本番
//var ncmb = new NCMB("bb0194930176053bea3ec03024dc1962234cb96d0b372352234b17e25f525a9e","8960c3d8602554b25f6eb59a117ac883ee26a245eaab5553eecd610eea450ba0");
//↓テスト
var ncmb = new NCMB("15c1b1aa62fb0128a2b013dd7480250f71e00a80177d53e1cab99457a7dab5a4","85490ef92f820b634523453cc9353ea8068faec84ef3894c6cb1a193bfcdb7f1");

const ThisScoreTbl = "Score2016_2";

var regMem;         // regular member

window.onload = function(){
        regMem = new Array();
    regMem[0] = new set_regMem(1,"岩井","いわい");
    regMem[1] = new set_regMem(2,"大谷","おおたに");
	regMem[2] = new set_regMem(6,"木村","きむら");
	regMem[3] = new set_regMem(10,"住野","すみの");
	regMem[4] = new set_regMem(13,"中川","なかがわ");
	regMem[5] = new set_regMem(17,"野上","のがみ");
	regMem[6] = new set_regMem(18,"長谷川","はせがわ");
	regMem[7] = new set_regMem(22,"前田","まえだ");
	regMem[8] = new set_regMem(27,"矢澤","やざわ");
	regMem[9] = new set_regMem(29,"山本修","やまもと");
	regMem[10] = new set_regMem(31,"吉川","よしかわ");
	regMem[11] = new set_regMem(32,"和田","わだ");
	regMem[12] = new set_regMem(34,"大藤","おおふじ");
	regMem[13] = new set_regMem(39,"濱田","はまだ");
	regMem[14] = new set_regMem(40,"志水","しみず");
	regMem[15] = new set_regMem(48,"中前","なかまえ");
	regMem[16] = new set_regMem(49,"高橋","たかはし");
	regMem[17] = new set_regMem(50,"田村","たむら");
	regMem[18] = new set_regMem(52,"板倉","いたくら");
	regMem[19] = new set_regMem(53,"上村","うえむら");
	regMem[20] = new set_regMem(55,"榊","さかき");
	regMem[21] = new set_regMem(62,"清見","きよみ");
	regMem[22] = new set_regMem(63,"小嶋","こじま");
	regMem[23] = new set_regMem(64,"古川","ふるかわ");
	regMem[24] = new set_regMem(67,"栄里子","えり");
	regMem[25] = new set_regMem(72,"植田","うえだ");
	regMem[26] = new set_regMem(73,"一柳","いちりゅう");
	regMem[27] = new set_regMem(74,"徳武","とくたけ");
	regMem[28] = new set_regMem(75,"疋田","ひきだ");
	regMem[29] = new set_regMem(76,"名越","なごし");
	regMem[30] = new set_regMem(77,"宮田","みやた");
	regMem[31] = new set_regMem(78,"ひろみ","ひろみ");
	regMem[32] = new set_regMem(79,"キム","きむ");
	regMem[33] = new set_regMem(80,"福山","ふくやま");
	regMem[34] = new set_regMem(82,"片山","かたやま");
	regMem[35] = new set_regMem(84,"宮脇","みやわき");
	regMem[36] = new set_regMem(85,"大朝","おおとも");
	regMem[37] = new set_regMem(87,"浪江","なみえ");
	regMem[38] = new set_regMem(88,"齊藤","さいとう");
	regMem[39] = new set_regMem(89,"日高","ひだか");
	regMem[40] = new set_regMem(90,"田熊","たぐま");
	regMem[41] = new set_regMem(91,"井関","いせき");
	regMem[42] = new set_regMem(100,"角コーチ","すみ");
	regMem[43] = new set_regMem(149,"菊池","きくち");
	regMem[44] = new set_regMem(165,"大勝","おおかつ");
	regMem[45] = new set_regMem(177,"古田","ふるた");
	regMem[46] = new set_regMem(277,"南木","なんぼく");
	regMem[47] = new set_regMem(281,"西崎","にしざき");
    regMem[48] = new set_regMem(92,"大川","おおかわ");
    regMem[49] = new set_regMem(93,"平岡","ひらおか");
    regMem[50] = new set_regMem(66,"荒本","あらもと");
    regMem[51] = new set_regMem(298,"飯田","いいだ");
    regMem[52] = new set_regMem(94,"宮本","みやもと");
    regMem[53] = new set_regMem(96,"松下","まつした");
    regMem[54] = new set_regMem(301,"大朝J","おおともじ");
    regMem[55] = new set_regMem(95,"澤田","さわだ");
};

function set_regMem(id, dispName, nickname){       //
    this.id = id;
    this.dispName = dispName;
    this.nickname = nickname;
}

// IDから名前の取得（内部テーブルから）
function get_NameFromTbl(idNum){
    var i;
    var retStr = null;
    for(i in regMem){
        if(regMem[i].id == idNum){
//alert(i);
            retStr = regMem[i].dispName;
            break;
        }
    }
    
    return retStr;
}

//データをmobile backendに保存するメソッド
function saveData(){



    var Score = ncmb.DataStore( ThisScoreTbl );
    
    Score   .order("date")
            .count()
            .fetchAll()
            .then(function(results){
                alert("results.count : "+results.count);
                makeDailyManageTbl(results.count);
            })
            .catch(function(err){
                alert("err1:"+err);
            })
    
//    //クラス名を指定して新規クラスを作成
//    var Data = ncmb.DataStore("Data");
//
//    //Dataクラスのインスタンスを作成
//    var data = new Data();
//
//    //作成したインスタンスのaisatsuというフィールドに文字データを設定
//    data.set("aisatsu", "hello, world!");
//
//    //設定したデータをmobile backendに保存
//    data.save()
//        .then(function(object) {
//              //成功する時の処理
//              $("#message").html("<p>データ保存に成功!</p>");
//          })
//        .catch(function(error) {
//              //エラーが発生する時の処理
//              $("#message").html("error:" + error.message);          
//          });
} 

//テーブル作成
function makeDailyTbl()
{
    var Score = ncmb.DataStore( ThisScoreTbl );
    
    Score   .order("date")
            .count()
            .fetchAll()
            .then(function(results){
//                alert("results.count : "+results.count);
                makeDailyManageTbl(results.count);
            })
            .catch(function(err){
                alert("err1:"+err);
            })
    
}




// 日毎管理テーブル作成 //
function makeDailyManageTbl(totalNum)
{
    var Score = ncmb.DataStore( ThisScoreTbl );
    var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
    var totalTbl = new TotalTbl();
    var DailyStore = ncmb.DataStore("DailyManageTbl");
    var dailyStore = new DailyStore();
    var tblInfo = new Object();
    var ScoreLatest;
    var manageLatest;
        Score   .order("updateDate", true)
                .count()
                .limit(1)
                .fetchAll()
                .then(function(resultScore){
                    ScoreLatest = resultScore[0].updateDate;
//    alert("ScoreLatest: "+ ScoreLatest);
                    TotalTbl.fetchAll()
                            .then(function(resultManage){
                                if( ChkDailyRefresh(ScoreLatest, resultManage) == true )    /* リフレッシュありならば */
//                                if((resultManage.length == 0) || (ScoreLatest != resultManage[0].latest))
//                                manageLatest = resultManage[0].latest;
//                                if(ScoreLatest != manageLatest)
                                {
                                    totalTbl.set("latest", ScoreLatest)
                                            .save()
                                            .then(function(resultSave){
                                                
                                            })
                                            .catch(function(err){
                                                    alert("makeDailyManageTbl save Err :" + err);
                                            });
                                    DailyStore  .fetchAll()
                                                .then(function(resultDelete){
                                                    var i;
                                                    for(i=0; i<resultDelete.length; i++){
                                                        resultDelete[i].delete();
                                                    }
                                                    tblInfo.ptrNum = 0;
                                                    tblInfo.bkDate = "";
                                                    tblInfo.totalDate = 0;
                                                    tblInfo.scoreNum = 0;
                                                    
                                                    makeDailyManageTbl_per100(totalNum, tblInfo);
                                                })
                                                .catch(function(err){
                                                    alert("makeDailyManageTbl delete Err :" + err);
                                                });
                                    
                                }
                                else
                                {
                                    //完了!(更新なし)
//                                    alert("更新なし");
                                    finishDailyStore();
                                }
                            })
                            .catch(function(err){
                                alert("makeDailyManageTbl2 Err :" + err);
                            })

                })
                .catch(function(err){
                    alert("makeDailyManageTbl Err :" + err);
                })

}

function ChkDailyRefresh(ScoreLatest, resultManage)
{
    var ret = false;
    
    if(resultManage.length == 0)
    {
        ret = true;
    }
    else
    if(ScoreLatest != resultManage[0].latest)
    {
        resultManage[0].delete();
        ret = true;
    }
    
    return ret;
}


// 日毎管理テーブル作成 100ずつ //
function makeDailyManageTbl_per100(totalNum, tblInfo)
{
    var Score = ncmb.DataStore(ThisScoreTbl);

    Score   .order("date")
            .skip(tblInfo.ptrNum)
            .fetchAll()
            .then(function(results){
                var i;
                for(i=0; i<results.length; i++)
                {
                    tblInfo.scoreNum++;
                    if(tblInfo.bkDate != results[i].date)
                    {
                        if(tblInfo.totalDate != 0){
                            saveDailyDate( tblInfo.bkDate, tblInfo.scoreNum/4, false );
                        }
                        tblInfo.totalDate++;
                        tblInfo.scoreNum=0;
                        tblInfo.bkDate = results[i].date;
                    }
                }
                // 終了確認 //
                tblInfo.ptrNum += results.length;
                if(tblInfo.ptrNum == totalNum)
                {
                    //完了!
                    tblInfo.scoreNum++;
                    saveDailyDate( tblInfo.bkDate, tblInfo.scoreNum/4, true );
                    alert("tblInfo.totalDate = " + tblInfo.totalDate);
                    finishDailyStore();
                }
                else
                {
                    makeDailyManageTbl_per100(totalNum, tblInfo);
                }
            })
            .catch(function(err){
                alert("err2:"+err);
            })



}



/* 日毎管理テーブル 1データ保存 */
function saveDailyDate( date, game, finalDt )
{
    var DailyStore = ncmb.DataStore("DailyManageTbl");
    var dailyStore = new DailyStore();
    
    dailyStore  .set("date", date)
                .set("gameNum", game)
                .save()
                .then(function(dailyStore){
                    if(finalDt == true)
                    {
                        alert("complete!");
                    }
                })
                .catch(function(err){
                    alert("saveDailyDate error : " + err);
                });
    
}


/* 日毎管理テーブル作成後の処理 */
function finishDailyStore()
{
    getDailyTblInfo();
}

/* 日毎管理テーブル情報取得 */
function getDailyTblInfo()
{
    var DailyStore = ncmb.DataStore("DailyManageTbl");
    
    DailyStore
        .order("date")
        .fetchAll()
        .then(function(dailyRslt){
            makeDailyMasterDisplay(dailyRslt);
        })
         .catch(function(err){
            alert("getDailyTblInfo error : " + err);
        });
   
}

/* 詳細画面作成 */
function makeDetailTbl(rslt)
{
alert(g_rslt.date);
    var ptrNum = 0;
    var Score = ncmb.DataStore( ThisScoreTbl );
    Score
        .equalTo("date",rslt.date)
        .order("gameNo")
        .count()
        .fetchAll()
        .then(function(detailRslt){
            makeDetailTbl_per100(detailRslt, ptrNum, rslt.date);
        })
        .catch(function(err){
            alert("makeDetailTbl error : " + err);
        });
    
}

/* 詳細画面作成 100ずつ */
function makeDetailTbl_per100(detailRslt, ptrNum, date)
{
    var Score = ncmb.DataStore( ThisScoreTbl );
    ptrNum += 100;
    /* 全データ取得ならば */
    if( detailRslt.count <= ptrNum )
    {
        makeDetailDisplay(detailRslt);
    }
    else
    {
    /* まだデータ必要ならば */
        Score
            .equalTo("date",date)
            .order("gameNo")
            .skip(ptrNum)
            .fetchAll()
            .then(function(detailRsltNext){
                /* データをコピーして次の100データ取得 */
                for(var i=0; i<detailRsltNext.length; i++)
                {
                    detailRslt[ptrNum+i] = detailRslt[i];
                }
                makeDetailTbl_per100(detailRslt, ptrNum, date);
            })
             .catch(function(err){
                alert("makeDetailTbl_per100 error : " + err);
            });
    }
}


//mobile backendへの会員登録を行うメソッド
function login (){
    //テキストボックスからユーザー名とパスワードを取得
    var userName = $("#user_name").val();
    var password = $("#password").val();

    //ユーザークラスのインスタンスを作成
    var user = new ncmb.User();

    //インスタンスにユーザー名とパスワードを設定
    user.set("userName", userName)
        .set("password", password);

    //会員登録を行うsignUpByAccountメソッドを実行
    user.signUpByAccount()
        .then(function (object){
            //成功する時の処理
            ncmb.User.login(userName, password)
                     .then(function(data){
                        // ログイン後処理
                        getCurrentUser();              
                     })
                     .catch(function(err){
                        // エラー処理
                        console.log("error:" + error.message);
                     });
        })
        .catch(function (error){
            //エラーが発生する時の処理
            console.log("error:" + error.message);
        });
}


//ログイン中のユーザー名を取得して画面に表示する
function getCurrentUser(){
    //ログイン中の会員を取得
    var user = ncmb.User.getCurrentUser();

    //取得した会員のユーザー名を表示する
    $("#current_user").text("ログイン中のユーザー名："　+ user.get("userName"));
}

//$(function() {
//  // 3候補リストに表示するデータを配列で準備
//  var data = [
//    "accepts",
//    "action_name",
//    "add",
//    "add_column",
//    "add_index",
//    "add_timestamps",
//    "after_create",
//    "after_destroy",
//    "after_filter",
//    "all",
//  ];
//
//  // 2オートコンプリート機能を適用
//  $("#txtKeywd").autocomplete({
//    source: data,
//    autoFocus: true,
//    delay: 500,
//    minLength: 2
//  });
//});
//
//var dataList = [
//    ['とうきょうとしんじゅくく', '東京都新宿区'],
//    ['とうきょうとしながわく',   '東京都品川区'],
//    ['とうきょうとすぎなみく',   '東京都杉並区']
//];
//
//$(function() {
//    /* input要素にオートコンプリートを適用 */
//    $('input[name=address]').autocomplete({
//        source : function(request, response) {
//            var re   = new RegExp('^(' + request.term + ')'),
//                list = [];
// 
//            $.each(dataList, function(i, values) {
//                if(values[0].match(re) || values[1].match(re)) {
//                    list.push(values[1]);
//                }
//            });
//            response(list);
//        }
//    });
//});
//

