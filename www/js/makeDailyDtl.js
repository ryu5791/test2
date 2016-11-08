/**
 * @brief   デイリー画面表示
 * @note    接頭語：mdd
 */


/** グローバル変数宣言
-------------------------------------*/
var gbl_makeDailyDtl_date;
var gbl_makeDailyDtl_memberRslt;
var gbl_makeDailyDtl_scoreRslt;


/***********************************************************
 ===========================================================
 * @brief   デイリー詳細画面表示開始 前準備1
 * @param	
 * @return	
 * @note	日付格納、メンバーテーブル取得
 ===========================================================
 **********************************************************/
function gmdd_startMakeDetailTbl(dailyRslt)
{
    gbl_makeDailyDtl_date = dailyRslt.date;
    gnmt_getAsMemberTbl(function(rslt){ lmdd_start2MakeDetailTbl(rslt) });
}

/***********************************************************
 * @brief   デイリー詳細画面表示開始  前準備2
 * @param    
 * @return    
 * @note    メンバーテーブル格納、スコアテーブル取得
 **********************************************************/
function lmdd_start2MakeDetailTbl(rslt)
{
    gbl_makeDailyDtl_memberRslt = $.extend(true, {}, rslt);
    gnst_getAsScoreTbl_date(function(rslt){ lmdd_start3MakeDetailTbl(rslt) });
}


/***********************************************************
 * @brief   デイリー詳細画面表示開始  前準備3
 * @param    
 * @return    
 * @note    スコアテーブル格納
 **********************************************************/
function lmdd_start3MakeDetailTbl(rslt)
{
    gbl_makeDailyDtl_scoreRslt = $.extend(true, {}, rslt);
    lmdd_makeDailyDtlTbl(gbl_makeDailyDtl_date, gbl_makeDailyDtl_memberRslt, gbl_makeDailyDtl_scoreRslt);
}

/***********************************************************
 * @brief   デイリー詳細テーブル作成
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmdd_makeDailyDtlTbl(keyDate, memberRslt, scoreRslt)
{
    var gameRsltFromScoreTbl;
    
    gameRsltFromScoreTbl = $.extend(true, {}, lmdd_getGameRslt(keyDate, scoreRslt));
    gameRsltFromScoreTbl = $.extend(true, {}, gmps_addName(gameRsltFromScoreTbl, memberRslt));

    lmdd_DailyDtlDisplay(gameRsltFromScoreTbl, keyDate);
}

/**
 * @brief   日付が一致するゲーム結果取得
 * @param    
 * @return    
 * @note    １ゲームにつき、４データ分（４人分）　
 **********************************************************/
function lmdd_getGameRslt(keyDate, scoreRslt)
{
    var num = 0;
    var ret = new Array();

    for(var i=0; i<scoreRslt.count; i++)
    {
        if(keyDate == scoreRslt[i].date)
        {
            ret[num] = $.extend(true, {}, scoreRslt[i]);
            num++;
        }
    }
    ret.count = num;
    return(ret);
}

/**
 * @brief   個人結果表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmdd_DailyDtlDisplay(gameRslt, keyDate)
{
    var dispRslt = new Array();
    var gameCount = 0;
    var onsList = document.getElementById('detail-list');
    var onsListItem = document.createElement("detail-list");
    onsListItem.innerHTML = "<ons-row>" +
                            "<ons-col>" +
                            "<header>"+keyDate +"  試合数：" + (gameRslt.count/4) +
                            "</header>" +
                            "</ons-col>"+
                            "</ons-row>";
    onsList.appendChild(onsListItem);
    ons.compile(onsListItem);

    for(var i=0; i<gameRslt.count; i++)
    {
        if(i%4==0)
        {
            dispRslt[gameCount] = new Array();
        }
        // 表示名、ゲーム数取得
        if(gameRslt[i].row != null)
        {
            dispRslt[gameCount][gameRslt[i].row] = $.extend(true, {}, gameRslt[i]);
        }
        else
        {
            switch(gameRslt[i].serveTurn)
            {
                case 1:
                    dispRslt[gameCount][0] = $.extend(true, {}, gameRslt[i]);
                    break;
                case 2:
                    dispRslt[gameCount][2] = $.extend(true, {}, gameRslt[i]);
                    break;
                case 3:
                    dispRslt[gameCount][1] = $.extend(true, {}, gameRslt[i]);
                    break;
                case 4:
                    dispRslt[gameCount][3] = $.extend(true, {}, gameRslt[i]);
                    break;
            }
        }
        // 4データ取得で1ゲーム記述
        if(i%4 == 3)
        {
            onsListItem = document.createElement("detail-list");
            onsListItem.innerHTML = "<ons-row id=detailRow"+((i+1)/4-1)+">" +
                                        "<ons-col>"+
                                            "<div style='-webkit-writing-mode:horizontal-tb'>"+
                                            "<header>"+
                                                      dispRslt[gameCount][0].date+
                                                      " No:"+dispRslt[gameCount][0].gameNo+
                                            "</header>"+
                                            "<header>"+"上段ゲーム数 = "
                                                    +dispRslt[gameCount][0].gamePt
                                                    + " |" 
                                                    +dispRslt[gameCount][0].name+"さん,"
                                                    +dispRslt[gameCount][1].name+"さん" +
                                            "</header>"+
                                            "<header>" +"下段ゲーム数 = "
                                                    +dispRslt[gameCount][2].gamePt
                                                    + " |" 
                                                    +dispRslt[gameCount][2].name+"さん,"
                                                    +dispRslt[gameCount][3].name+"さん"+
                                            "</header>"+
                                            "</div>"+
                                            "</ons-col>"+
                                    "<ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
            gameCount++;
        }
    }

    for(var i=0; i<gameCount; i++)
    {
        (function (n) {
            $("#detailRow" + i).click(function(){
                gmgm_gameDetailDisplay("", dispRslt[n]);
            });
        })(i);
    }
}



