    // ゲーム数、人数 //
    const GAME_WIN_POINT = 4;
    const GAME_MAX = (GAME_WIN_POINT*2)-1;

    // ゲーム数 //
    const GAME_RESULT_EMPTY = 0;
	const GAME_RESULT_UP = 1;
	const GAME_RESULT_DN = 2;

var showDialog = function(id){
//    alert("OK");
    app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

document.addEventListener("pageinit", function(e) {
  if (e.target.id == "my-page") {
//    document.getElementById("my-content").innerHTML = "Item A<br>";
        makeDailyTbl();
        
  }else if(e.target.id == "detailPage")
  {
        var page = dailyNavi.getCurrentPage();
//alert(page.options.param1.date);
        makeDetailTbl(page.options.param1);
  }
  else if(e.target.id == "period-page")
  {
      makeRankTbl();
  }
}, false);

// 成績表画面作成 //
function makeRankDisplay(rankRslt)
{
        var onsList = document.getElementById('rank-list');
        var onsListItem = document.createElement("rank-list");
        onsListItem.innerHTML = "<table  border='1' cellspacing='0'>"+
                                "<tr>" +
                                "<th width='30'>No</th>" +
                                "<th width='60'>会員名</th>" +
                                "<th width='30'>pt</th>" +
                                "<th width='40'>game</th>" +
                                "<th width='40'>grs</th>" +
                                "<th width='30'>win</th>" +
                                "<th width='40'>Net</th>" +
                                "</tr>"+
                                "</table>";
        onsList.appendChild(onsListItem);
        ons.compile(onsListItem);
        
        for( var i = 0; i< rankRslt.length; i++ )
        {
            var gross = (rankRslt[i].gamePt/rankRslt[i].gameNum).toFixed(2);
            var a_net = ((+gross) + (+rankRslt[i].HDCP)).toFixed(2);
            var no;
            if(i<rankRslt.validNum)
            {
                no=i+1;
            }
            else
            {
                no="";
            }
//            alert();
            onsListItem = document.createElement("rank-list");
            onsListItem.innerHTML =  "<table  border='1' cellspacing='0'>"+
                                "<tr>" +
                                "<th width='30'>"+ no +"</th>" +
                                "<th width='60'>"+ rankRslt[i].name +"</th>" +
                                "<th width='30'>"+ rankRslt[i].gamePt +"</th>" +
                                "<th width='40'>"+ rankRslt[i].gameNum +"</th>" +
                                "<th width='40'>"+ gross +"</th>" +
                                "<th width='30'>"+ rankRslt[i].winNum +"</th>" +
                                "<th width='40'>"+ a_net +"</th>" +
                                "</tr>" +
                                "</table>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
                                
}


/* 日毎マスター画面作成 */
function makeDailyMasterDisplay(dailyRslt)
{
        var onsList = document.getElementById('ons-list');
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            var onsListItem = document.createElement("ons-list");
            onsListItem.innerHTML = "<ons-row id = dailyRow"+i+">" +
                                        "<ons-col>"+
                                            "<header>"+dailyRslt[i].date
                                                    +" 試合数："
                                                    +dailyRslt[i].gameNum
                                                    +
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
        
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            (function (n) {
                $("#dailyRow" + i).click(function(){
                    goToDailyDetailDisplay(dailyRslt[n]);
                });
            })(i);
        }
    
}

/* 詳細画面へ移行 */
function goToDailyDetailDisplay(rslt)
{
//    alert(rslt.date);
    var options = {param1: rslt};
    dailyNavi.pushPage("page3.html", options);
}

/* 詳細画面作成 */
function makeDetailDisplay(detailRslt)
{
//  alert("a" + detailRslt.count);
    var name = ["","","",""];
    var gamePt = [0,0,0,0];
    var onsListItem;
    

    var onsList = document.getElementById('detail-list');
    onsListItem = document.createElement("detail-list");
    
            onsListItem.innerHTML = "<ons-row>" +
                                        "<ons-col>"+
                                            "<header>"+detailRslt[0].date; +
                                            "</header>" +
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
    
    for( var i = 0; i< detailRslt.length; i++ )
    {
        if(detailRslt[i].row != null)
        {
            name[detailRslt[i].row] = get_NameFromID(detailRslt[i].ID);
            gamePt[detailRslt[i].row] = detailRslt[i].gamePt;
        }
        else
        {
            switch(+(detailRslt[i].serveTurn))
            {
                case 1:
                    name[0] = get_NameFromID(detailRslt[i].ID);
                    gamePt[0] = detailRslt[i].gamePt;
                    break;
                case 2:
                    name[2] = get_NameFromID(detailRslt[i].ID);
                    gamePt[2] = detailRslt[i].gamePt;
                    break;
                case 3:
                    name[1] = get_NameFromID(detailRslt[i].ID);
                    gamePt[1] = detailRslt[i].gamePt;
                    break;
                case 4:
                    name[3] = get_NameFromID(detailRslt[i].ID);
                    gamePt[3] = detailRslt[i].gamePt;
                    break;
            }
        }
        
        /* 4データで１ゲーム分の記述 */
        if(i%4 == 3)
        {
            onsListItem = document.createElement("detail-list");
            onsListItem.innerHTML = "<ons-row id=detailRow"+i+">" +
                                        "<ons-col>"+
                                            "<header>"+"NO." + (i+1)/4 +
                                            "</header>" +
                                            "<header>"+"上段ゲーム数 = "
                                                    +gamePt[0]
                                                    + " |" 
                                                    +name[0]+"さん,"
                                                    +name[1]+"さん" +
                                            "</header>"+
                                            "<header>" +"下段ゲーム数 = "
                                                    +gamePt[2]
                                                    + " |" 
                                                    +name[2]+"さん,"
                                                    +name[3]+"さん"
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
        }
    }
    
    for(var i=0; i<detailRslt.length; i++)
    {
        (function (n) {
            $("#detailRow" + i).click(function(){
                goTogameDetailDisplay(detailRslt[n], ((n+1)/4));        // ゲーム内容表示
                                                                        // (n+1)/4 : ゲームNo
            });
        })(i);
        
    }
}

// ゲーム内容表示
function goTogameDetailDisplay(rslt, gameNo)
{
//     alert(rslt.date + ":" + gameNo);
     get_gameDetail(rslt.date, gameNo);      // ゲーム内容取得
}

// ゲーム内容ウインド表示
function dispGameDetailWindow(rslt)
{
//    alert(rslt[0].ID +":" + rslt[1].ID +":" + rslt[2].ID +":" +rslt[3].ID);
    // rowがnullならサーブ順に表示
    if(rslt[0].row == null)
    {
        var tempDt = rslt.concat();
        rslt[(tempDt[0].serveTurn-1)] = $.extend(true, {}, tempDt[0]);
        rslt[(tempDt[1].serveTurn-1)] = $.extend(true, {}, tempDt[1]);
        rslt[(tempDt[2].serveTurn-1)] = $.extend(true, {}, tempDt[2]);
        rslt[(tempDt[3].serveTurn-1)] = $.extend(true, {}, tempDt[3]);

        // 2番目と3番目を入れ替える
        var tempBf = $.extend(true, {}, rslt[1]);
        rslt[1] = $.extend(true, {}, rslt[2]);
        rslt[2] = $.extend(true, {}, tempBf);
    }

    alert(  rslt[0].date + "  No." + rslt[0].gameNo + "\n" +
            get_NameFromID_space(rslt[0].ID, 6) + get_dispPersonScore(rslt[0], 0) +"\n" +
            get_NameFromID_space(rslt[1].ID, 6) + get_dispPersonScore(rslt[1], 1) +"\n" +
            get_dispGameScore(rslt) +"\n" +
            get_NameFromID_space(rslt[2].ID, 6) + get_dispPersonScore(rslt[2], 2) +"\n" +
            get_NameFromID_space(rslt[3].ID, 6) + get_dispPersonScore(rslt[3], 3)
            );
}

// スペース付きのIDから名前取得
// strNum: 文字数(半角)
function get_NameFromID_space(id, strNum)
{
    var enCnt = 0;
    var str;
    
    id = +(id);
    str = get_NameFromID(id);
    
    for (var i = 0;  i < str.length; i++) {
        enCnt += str.charCodeAt(i) <= 255 ? 1 : 2;
        if (enCnt > strNum) {
            return str.substr(0, i);
        }
    }

    if( enCnt != strNum ){
        for(;enCnt<strNum; enCnt=enCnt+2)
        {
            str = str+"　";
        }
    }
    
    return str;
}

// 人のスコア表示
function get_dispPersonScore(rslt, row)
{
    var str = "|";
    
    for(var i=0; i<GAME_MAX; i++)
    {
        //サーブ1巡目
        if(i<4)
        {
            if(i==(rslt.serveTurn-1))
            {
                if(rslt.serve1st==1)
                {
                    str += "○";
                }
                else
                {
                    str += "Ｘ";
                }
            }
            else
            {
                str += "　";
            }
        }
        else
        {//サーブ2巡目
            if(i==(rslt.serveTurn-1+4))
            {
                if(rslt.serve2nd==1)
                {
                    str += "○";
                }
                else if(rslt.serve2nd==0)
                {
                    str += "Ｘ";
                }
                else
                {
                    str += "　";
                }
            }
            else
            {
                str += "　";
            }
        }
    }
    
    str += "|";
    return str;
}

// ゲームのスコア表示（上下段両方）
function get_dispGameScore(rslt)
{
    var str = "－－－|";
    var score = new Array(GAME_MAX);

    // ゲーム経過結果取得
    for(var i=0; i<GAME_MAX; i++)
    {
        score[i] = get_columnGame(rslt, i);
    }

    // 上段結果表示
    for(var i=0; i<GAME_MAX; i++)
    {
        if(score[i]==GAME_RESULT_UP)
        {
            str += "◎";
        }
        else
        {
            str += "　";
        }
    }
    
    str += ("| " + rslt[0].gamePt + "\n" + "－－－|");
    
    // 下段結果
    for(var i=0; i<GAME_MAX; i++)
    {
        if(score[i]==GAME_RESULT_DN)
        {
            str += "◎";
        }
        else
        {
            str += "　";
        }
    }
    
    str += ("| " + rslt[2].gamePt);
    
    return(str);
}
//            "－－－" + "|" +"◎　◎　◎　◎|　5"+"\n" +
//            "－－－" + "|" +"　◎　◎　◎　|　3"+"\n" +

// ゲーム経過結果、1列分取得
function get_columnGame(rslt, col)
{
    var ret = GAME_RESULT_EMPTY;
    
    for(var i=0; i<4; i++)
    {
        if((col%4)==(rslt[i].serveTurn-1))     // サーブ順が一致
        {
            if(col<4)                       // サーブ一巡目
            {
                if(i<2)                     // 上段
                {
                    if(rslt[i].serve1st==1)
                    {
                        ret = GAME_RESULT_UP;
                    }
                    else if(rslt[i].serve1st==0)
                    {
                        ret = GAME_RESULT_DN;
                    }
                }
                else                        // 下段
                {
                    if(rslt[i].serve1st==1)
                    {
                        ret = GAME_RESULT_DN;
                    }
                    else if(rslt[i].serve1st==0)
                    {
                        ret = GAME_RESULT_UP;
                    }
                }
            }
            else                            // サーブ２巡目
            {
                if(i<2)                     // 上段
                {
                    if(rslt[i].serve2nd==1)
                    {
                        ret = GAME_RESULT_UP;
                    }
                    else if(rslt[i].serve2nd==0)
                    {
                        ret = GAME_RESULT_DN;
                    }
                }
                else                        // 下段
                {
                    if(rslt[i].serve2nd==1)
                    {
                        ret = GAME_RESULT_DN;
                    }
                    else if(rslt[i].serve2nd==0)
                    {
                        ret = GAME_RESULT_UP;
                    }
                }
            }
        }
    }
    return ret;
}
