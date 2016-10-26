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
    gameRsltFromScoreTbl = $.extend(true, {}, lmps_addName(gameRsltFromScoreTbl, memberRslt));
    
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
 **********************************************************/
function lmps_addName(gameRsltFromScoreTbl, memberRslt)
{
    for(var i=0; i<gameRsltFromScoreTbl.count; i++)
    {
        for(var j=0; j<memberRslt.count; j++)
        {
            if(gameRsltFromScoreTbl[i].ID == memberRslt[j].ID)
            {
                gameRsltFromScoreTbl[i].name = lmps_getDispName(memberRslt[j])
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
    var name = ["","","",""];
    var gamePt = [0,0,0,0];
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
        // 表示名、ゲーム数取得
        if(gameRslt[i].row != null)
        {
            name[gameRslt[i].row] = gameRslt[i].name;
            gamePt[gameRslt[i].row] = gameRslt[i].gamePt;
        }
        else
        {
            switch(gameRslt[i].serveTurn)
            {
                case 1:
                    name[0] = gameRslt[i].name;
                    gamePt[0] = gameRslt[i].gamePt;
                    break;
                case 2:
                    name[2] = gameRslt[i].name;
                    gamePt[2] = gameRslt[i].gamePt;
                    break;
                case 3:
                    name[1] = gameRslt[i].name;
                    gamePt[1] = gameRslt[i].gamePt;
                    break;
                case 4:
                    name[3] = gameRslt[i].name;
                    gamePt[3] = gameRslt[i].gamePt;
                    break;
            }
        }
        // 4データ取得で1ゲーム記述
        if(i%4 == 3)
        {
            onsListItem = document.createElement("person-list");
            onsListItem.innerHTML = "<ons-row id=detailRow"+i+">" +
                                        "<ons-col>"+
                                            "<header>"+"["+((i+1)/4)+"]"+
                                                      dateGameNoRslt[gameCount].date+
                                                      " No:"+dateGameNoRslt[gameCount].gameNo+
                                            "</header>"+
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
                                                    +name[3]+"さん"+
                                            "</header>"+
                                        "</ons-col>"+
                                    "<ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
                                                      
                                    
            
            
            gameCount++;
        }
    }
    
}





