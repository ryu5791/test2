/**
 * @brief   個人画面表示
 * @note    接頭語：mps
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_makePerson_id;
var gbl_makePerson_memberRslt;
var gbl_makePerson_scoreRslt;


/***********************************************************
 ===========================================================
 * @brief    個人画面表示開始  前準備1
 * @param    
 * @return    
 * @note	ID格納、メンバーテーブル取得
 ===========================================================
 **********************************************************/
function gmps_startPersonDisplay(personRslt)
{
    gbl_makePerson_id = personRslt.ID;
    gnmt_getAsMemberTbl(function(rslt){ lmps_start2PersonDisplay(rslt) });
}

/***********************************************************
 * @brief    個人画面表示開始  前準備2
 * @param    
 * @return    
 * @note	メンバーテーブル格納、スコアテーブル取得
 **********************************************************/
function lmps_start2PersonDisplay(rslt)
{
    gbl_makePerson_memberRslt = $.extend(true, {}, rslt);
    gnst_getAsScoreTbl_date(function(rslt){ lmps_start3PersonDisplay(rslt) });
}

/***********************************************************
 * @brief   個人画面表示開始  前準備3
 * @param    
 * @return    
 * @note    スコアテーブル格納
 **********************************************************/
function lmps_start3PersonDisplay(rslt)
{
    gbl_makePerson_scoreRslt = $.extend(true, {}, rslt);
    lmps_makePersonTbl(gbl_makePerson_id, gbl_makePerson_memberRslt, gbl_makePerson_scoreRslt);
}

/***********************************************************
 * @brief   個人結果テーブル作成
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmps_makePersonTbl(keyId, memberRslt, scoreRslt)
{
    var dateGameNoFromScoreTbl;
    var gameRsltFromScoreTbl;
    var dispName;
    
    dateGameNoFromScoreTbl = $.extend(true, {}, lmps_getDateGameNo(keyId, scoreRslt));
    gameRsltFromScoreTbl = $.extend(true, {}, lmps_getGameRslt(scoreRslt, dateGameNoFromScoreTbl));
    gameRsltFromScoreTbl = $.extend(true, {}, gmps_addName(gameRsltFromScoreTbl, memberRslt));
    
    for(var i=0; i<memberRslt.count; i++)
    {
        if(keyId == memberRslt[i].ID)
        {
            dispName = lmps_getDispName(memberRslt[i]);
        }
    }
    
    lmps_PersonDisplay( gameRsltFromScoreTbl, dateGameNoFromScoreTbl, dispName);
}

/**
 * @brief   IDが一致する日付とゲームNo取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmps_getDateGameNo(keyId, scoreRslt)
{
    var num = 0;
    var ret = new Array();
    
    for(var i=0; i<scoreRslt.count; i++)
    {
        if(keyId == scoreRslt[i].ID)
        {
            ret[num] = $.extend(true, {}, scoreRslt[i]);
            num++;
        }
    }
    ret.count = num;
    return(ret);
}

/**
 * @brief   日付とゲームNoが一致するゲーム結果取得
 * @param    
 * @return    
 * @note    １ゲームにつき、４データ分（４人分）　
 **********************************************************/
function lmps_getGameRslt(scoreRslt, dateGameNoFromScoreTbl)
{
    var num = 0;
    var ret = new Array();
    
    for(var i=0; i<dateGameNoFromScoreTbl.count; i++)
    {
        for(var j=0; j<scoreRslt.count; j++)
        {
            if (( dateGameNoFromScoreTbl[i].date == scoreRslt[j].date )
             && ( dateGameNoFromScoreTbl[i].gameNo == scoreRslt[j].gameNo ))
            {
                ret[num] = $.extend(true, {}, scoreRslt[j]);   // ソートされているので4つ連続で取得
                num++;
                j++;
                ret[num] = $.extend(true, {}, scoreRslt[j]);
                num++;
                j++;
                ret[num] = $.extend(true, {}, scoreRslt[j]);
                num++;
                j++;
                ret[num] = $.extend(true, {}, scoreRslt[j]);
                num++;
                j++;
                break;                
            }
        }
    }
    ret.count = num;
    return(ret);
}

/**
 * @brief   名前取得
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmps_addName(gameRsltFromScoreTbl, memberRslt)
{
    for(var i=0; i<gameRsltFromScoreTbl.count; i++)
    {
        for(var j=0; j<memberRslt.count; j++)
        {
            if(gameRsltFromScoreTbl[i].ID == memberRslt[j].ID)
            {
                gameRsltFromScoreTbl[i].name = lmps_getDispName(memberRslt[j]);
                break;
            }
        }
    }
    return gameRsltFromScoreTbl;
}

/**
 * @brief   表示名取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmps_getDispName(memRslt)
{
    var ret;
    
    if(memRslt.dispName != null)
    {
        ret = memRslt.dispName;
    }
    else
    {
        ret = memRslt.name;
    }
    return ret;
}


/**
 * @brief   個人結果表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmps_PersonDisplay( gameRslt, dateGameNoRslt, dispName )
{
    var dispRslt = new Array();
    var gameCount = 0;
    var onsList = document.getElementById('person-list');
    var onsListItem = document.createElement("person-list");
    onsListItem.innerHTML = "<ons-row>" +
                            "<ons-col>" +
                            "<header>"+dispName + "さん　試合数：" + dateGameNoRslt.count +
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
            onsListItem = document.createElement("person-list");
            onsListItem.innerHTML = "<ons-row id=detailRow"+((i+1)/4-1)+">" +
                                        "<ons-col>"+
                                            "<header>"+
                                            "<div class='sample_01'>"+
                                            "["+((i+1)/4)+"] "+
                                                      dateGameNoRslt[gameCount].date+
                                                      " No:"+dateGameNoRslt[gameCount].gameNo+
                                            "</div>"+
                                            "</header>"+
                                            "<header>"+
                                            "<div class='sample_01'>"+
                                            "上段ゲーム数 = "
                                                    +dispRslt[gameCount][0].gamePt
                                                    + " |" 
                                                    +dispRslt[gameCount][0].name+"さん,"
                                                    +dispRslt[gameCount][1].name+"さん" +
                                            "</div>"+
                                            "</header>"+
                                            "<header>"+
                                            "<div class='sample_01'>"+
                                            "下段ゲーム数 = "
                                                    +dispRslt[gameCount][2].gamePt
                                                    + " |" 
                                                    +dispRslt[gameCount][2].name+"さん,"
                                                    +dispRslt[gameCount][3].name+"さん"+
                                            "</div>"+
                                            "</header>"+
                                        "</ons-col>"+
                                    "<ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
            gameCount++;
        }
    }

    for(var i=0; i<dateGameNoRslt.count; i++)
    {
        (function (n) {
            $("#detailRow" + i).click(function(){
                gmgm_gameDetailDisplay("["+(n+1)+"] ", dispRslt[n]);
            });
        })(i);
    }
}





