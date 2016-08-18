//mobile backendのAPIキーを設定
var ncmb = new NCMB("bb0194930176053bea3ec03024dc1962234cb96d0b372352234b17e25f525a9e","8960c3d8602554b25f6eb59a117ac883ee26a245eaab5553eecd610eea450ba0");

//データをmobile backendに保存するメソッド
function saveData(){

    var Score = ncmb.DataStore("Score2016_2");
    
    Score   .order("date")
            .count()
            .fetchAll()
            .then(function(results){
                var i;
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

// 日毎管理テーブル作成 //
function makeDailyManageTbl(totalNum)
{
    var tblInfo = new Object();
    
    tblInfo.ptrNum = 0;
    tblInfo.bkDate = "";
    tblInfo.totalDate = 0;
    tblInfo.scoreNum = 0;
    
    makeDailyManageTbl_per100(totalNum, tblInfo);

/*
    var bkDate;
    var totalDate = 0;
    var scoreNum = 0;
    var i;
    
    alert(scoreRslt[i].date + "  " + scoreRslt.count)
    
    for(i=0; i<scoreRslt.count; i++)
    {
        scoreNum++;
        if(bkDate != scoreRslt[i].date)
        {
//            if(totalDate != 0)
//            {
//                saveDailyDate( scoreRslt[i].date, scoreNum/4 );
//            }
            totalDate++;
            scoreNum=0;
            bkDate = scoreRslt[i].date;
        }
        
//        if(i==(scoreRslt.count-1))
//        {
//            saveDailyDate( scoreRslt[i].date, scoreNum/4 );
//        }
    }

    alert("totalDate = " + totalDate);
*/
}

// 日毎管理テーブル作成 100ずつ //
function makeDailyManageTbl_per100(totalNum, tblInfo)
{
    var Score = ncmb.DataStore("Score2016_2");

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
                    tblInfo.scoreNum++;
                    saveDailyDate( tblInfo.bkDate, tblInfo.scoreNum/4, true );
                    alert("tblInfo.totalDate = " + tblInfo.totalDate);
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

