/**
 * @brief   Etc画面表示 相性画面3
 *                      ペア結果表示 
 * @note    接頭語：metChm3
 */

/** グローバル変数宣言
-------------------------------------*/

/***********************************************************
 ===========================================================
 * @brief   相性画面3 - ペア結果表示
 * @param   
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmetChm3_startChemistry(gmDateInfo, name, pairName)
{
    var dispRslt = new Array();
    var gameCount = 0;
    var gameRslt = new Array();

    // 試合情報取得
    gameRslt = lmetChm3_getGameInfo(gmDateInfo);
    gameRslt.count = gameRslt.length;
    gameRslt = gmps_addName( gameRslt, gbl_makeEtc_memberTbl );
    
    // 
    var onsList = document.getElementById('etcChm3-list');
    var onsListItem = document.createElement("etcChm3-list");
    onsListItem.innerHTML = "<ons-row>" +
                            "<ons-col>" +
                            "<header>"+name +"・"+pairName + "ペア" +"  試合数：" + (gameRslt.length/4) +
                            "</header>" +
                            "<header>" +"----------------------------------------"+
                            "</header>" +
                            "<header  style='font-size: 14px'>"+"※下記クリックで試合詳細表示" +
                            "</header>" +
                            "</ons-col>"+
                            "</ons-row>";
    onsList.appendChild(onsListItem);
    ons.compile(onsListItem);

    for(var i=0; i<gameRslt.length; i++)
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
            onsListItem = document.createElement("etcChm3-list");
            onsListItem.innerHTML = "<ons-row id=etcChm3Row"+((i+1)/4-1)+">" +
                                        "<ons-col>"+
                                            "<div style='-webkit-writing-mode:horizontal-tb'>"+
                                            "<header>"+
                                                      dispRslt[gameCount][0].date+
                                                      " No:"+dispRslt[gameCount][0].gameNo+" --------------------------"+
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
            $("#etcChm3Row" + i).click(function(){
                gmgm_gameDetailDisplay("", dispRslt[n]);
            });
        })(i);
    }




}


/**
 * @brief   日付からゲーム情報取得
 * @param   
 * @return    
 * @note    
 **********************************************************/
function lmetChm3_getGameInfo(gameInfo)
{
    var ptr = 0;
    var scoreTbl = gbl_makeEtc_ScoreTbl_date;
    var pairTbl = new Array();

    // 日付からゲーム情報取得
    for(var i=0; i<gameInfo.length; i++)
    {
        for(var j=0; j<scoreTbl.count; j+=4)
        {
            if((gameInfo[i].date==scoreTbl[j].date)&&(gameInfo[i].gameNo==scoreTbl[j].gameNo))
            {
                pairTbl[ptr++] = $.extend(true, {}, scoreTbl[j++]);
                pairTbl[ptr++] = $.extend(true, {}, scoreTbl[j++]);
                pairTbl[ptr++] = $.extend(true, {}, scoreTbl[j++]);
                pairTbl[ptr++] = $.extend(true, {}, scoreTbl[j++]);

                break;
            }
        }
    }
    
    return pairTbl;
}
