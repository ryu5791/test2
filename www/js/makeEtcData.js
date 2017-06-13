/**
 * @brief   Etc画面表示 -逆転試合など
 * @note    接頭語：metDt
 */

/** グローバル変数宣言
-------------------------------------*/
/* ※makeEtc.jsのグローバル変数を使用 */



/***********************************************************
 ===========================================================
 * @brief   Etc画面表示開始 逆転試合
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmetDt_startMakeEtcData( btn )
{
    var disp_score_tbl = new Array();
    switch(btn.id)
    {
        case 'bigUpset':
            disp_score_tbl = lmetDt_get_bigUpset();
            break;
        case 'mdlUpset':
            disp_score_tbl = lmetDt_get_mdlUpset();
            break;
        case 'failUpset':
            disp_score_tbl = lmetDt_get_failUpset();
            break;
    }
    
    disp_score_tbl.count = disp_score_tbl.length;
    disp_score_tbl = gmps_addName( disp_score_tbl, gbl_makeEtc_memberTbl );
    
    lmetDt_DailyDtlDisplay( disp_score_tbl, "大逆転" );
}

/***********************************************************
 * @brief   大逆転試合の取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_get_bigUpset()
{
    var rtn_data = new Array();
    var i,j,topIndex;
    var scoreTbl_date;
    
    scoreTbl_date = gbl_makeEtc_ScoreTbl_date;
    
    for(i=0,j=0; i<scoreTbl_date.count; i++)
    {
        if(scoreTbl_date[i].gamePt == 3)
        {
            
            if(lmetDt_chk_bigUpset(i, scoreTbl_date)==true)
            {
                topIndex = (i-(i%4));
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
            }
            i=(i+(4-(i%4)))-1;
        }
    }
    return rtn_data;
}

/**
 * @brief   大逆転ゲームのチェック
 * @param    
 * @return    
 * @note    サーバ順にソートされていることが前提
 **********************************************************/
function lmetDt_chk_bigUpset( ptr, scoreTbl_date )
{
    var rtn=false;
    var top_ptr = (ptr-(ptr%4));    // 最初のサーバの添え字
    
    if ( scoreTbl_date[top_ptr+2].serve2nd == 1 )
    {   // 第7ゲーム キープの場合
        if ( (scoreTbl_date[top_ptr+1].serve2nd == 0)           // 第6ゲーム
          && (scoreTbl_date[top_ptr  ].serve2nd == 1)           // 第5ゲーム
          && (scoreTbl_date[top_ptr+3].serve1st == 0)           // 第4ゲーム
           )
        {
            rtn=true;
        }
    }
    else
    {   // 第7ゲーム ブレイクの場合
        if ( (scoreTbl_date[top_ptr+1].serve2nd == 1)
          && (scoreTbl_date[top_ptr  ].serve2nd == 0)
          && (scoreTbl_date[top_ptr+3].serve1st == 1)
           )
        {
            rtn=true;
        }
    }
    
    return rtn;
}

/***********************************************************
 * @brief   中逆転試合の取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_get_mdlUpset()
{
    var rtn_data = new Array();
    var i,j,topIndex;
    var scoreTbl_date;
    
    scoreTbl_date = gbl_makeEtc_ScoreTbl_date;
    
    for(i=0,j=0; i<scoreTbl_date.count; i++)
    {
        if(scoreTbl_date[i].gamePt == 3)
        {
            
            if(lmetDt_chk_mdlUpset(i, scoreTbl_date)==true)
            {
                topIndex = (i-(i%4));
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
            }
            i=(i+(4-(i%4)))-1;
        }
    }
    return rtn_data;
}

/**
 * @brief   中逆転ゲームのチェック
 * @param    
 * @return    
 * @note    サーバ順にソートされていることが前提
 **********************************************************/
function lmetDt_chk_mdlUpset( ptr, scoreTbl_date )
{
    var rtn=false;
    var top_ptr = (ptr-(ptr%4));    // 最初のサーバの添え字
    
    if ( scoreTbl_date[top_ptr+2].serve2nd == 1 )
    {   // 第7ゲーム キープの場合
        if ( (scoreTbl_date[top_ptr+1].serve2nd == 0)           // 第6ゲーム
          && (scoreTbl_date[top_ptr  ].serve2nd == 1)           // 第5ゲーム
           )
        {
            rtn=true;
        }
    }
    else
    {   // 第7ゲーム ブレイクの場合
        if ( (scoreTbl_date[top_ptr+1].serve2nd == 1)
          && (scoreTbl_date[top_ptr  ].serve2nd == 0)
           )
        {
            rtn=true;
        }
    }
    
    return rtn;
}

/***********************************************************
 * @brief   逆転失敗試合の取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_get_failUpset()
{
    var rtn_data = new Array();
    var i,j,topIndex;
    var scoreTbl_date;
    
    scoreTbl_date = gbl_makeEtc_ScoreTbl_date;
    
    for(i=0,j=0; i<scoreTbl_date.count; i++)
    {
        if(scoreTbl_date[i].gamePt == 3)
        {
            
            if(lmetDt_chk_failUpset(i, scoreTbl_date)==true)
            {
                topIndex = (i-(i%4));
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
                rtn_data[j++] = $.extend(true, {}, scoreTbl_date[topIndex++]);
            }
            i=(i+(4-(i%4)))-1;
        }
    }
    return rtn_data;
}

/**
 * @brief   逆転失敗ゲームのチェック
 * @param    
 * @return    
 * @note    サーバ順にソートされていることが前提
 **********************************************************/
function lmetDt_chk_failUpset( ptr, scoreTbl_date )
{
    var rtn=false;
    var top_ptr = (ptr-(ptr%4));    // 最初のサーバの添え字
    
    if ( scoreTbl_date[top_ptr+2].serve2nd == 1 )
    {   // 第7ゲーム キープの場合
        if ( (scoreTbl_date[top_ptr+1].serve2nd == 1)           // 第6ゲーム
          && (scoreTbl_date[top_ptr  ].serve2nd == 0)           // 第5ゲーム
          && (scoreTbl_date[top_ptr+3].serve1st == 1)           // 第4ゲーム
           )
        {
            rtn=true;
        }
    }
    else
    {   // 第7ゲーム ブレイクの場合
        if ( (scoreTbl_date[top_ptr+1].serve2nd == 0)
          && (scoreTbl_date[top_ptr  ].serve2nd == 1)
          && (scoreTbl_date[top_ptr+3].serve1st == 0)
           )
        {
            rtn=true;
        }
    }
    
    return rtn;
}


/**
 * @brief   結果表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_DailyDtlDisplay(gameRslt, keyDate)
{
    var dispRslt = new Array();
    var gameCount = 0;
//    var onsList = document.getElementById('etcData-list');
//    var onsListItem = document.createElement("etcData-list");

    // タイトル表示
    //----------------------------------
    var onsList = document.getElementById('etcData-toolbar');
    var onsListItem = document.createElement("etcData-toolbar");
    
    if( gbl_makeEtc_id_pos == 0 )
    {
        onsListItem.innerHTML = "今期 エトセトラ";
    }
    else
    {
        onsListItem.innerHTML = gbl_makeEtc_currentTotalTbl.disp+" Etc.";
    }

    onsList.appendChild(onsListItem);
    ons.compile(onsListItem);

    // 各試合表示
    //----------------------------------
    onsList = document.getElementById('etcData-list');
    onsListItem = document.createElement("etcData-list");

    onsListItem.innerHTML = "<ons-row>" +
                            "<ons-col>" +
                            "<header>"+keyDate +"  試合数：" + (gameRslt.length/4) +
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
            onsListItem = document.createElement("etcData-list");
            onsListItem.innerHTML = "<ons-row id=etcDataRow"+((i+1)/4-1)+">" +
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
            $("#etcDataRow" + i).click(function(){
                gmgm_gameDetailDisplay("", dispRslt[n]);
            });
        })(i);
    }
}



///***********************************************************
// * @brief   逆転試合
// * @param    
// * @return    
// * @note    
// **********************************************************/
//function lmet_reverse(scoreTbl_date)
//{
//    var cnt=0;
//    var rtn_data = new Array();
//    var i,j;
//    
//    for(i=0,j=0; i<scoreTbl_date.count; i++)
//    {
//        if(scoreTbl_date[i].gamePt == 3)
//        {
//            if(chk_behindWin(i, scoreTbl_date)==true)
//            {
//                cnt++;
//            }
//            i=(i+(4-(i%4)))-1;
//        }
//    }
//    alert(cnt);
//    
//}
//
//
///***********************************************************
// * @brief   
// * @param    
// * @return    
// * @note    サーバ順にソートされていることが前提
// **********************************************************/
//function chk_behindWin( ptr, scoreTbl_date )
//{
//    var rtn=false;
//    var top_ptr = (ptr-(ptr%4));    // 最初のサーバの添え字
//    
//    if ( scoreTbl_date[top_ptr+2].serve2nd == 1 )
//    {   // 第7ゲーム キープの場合
//        if ( (scoreTbl_date[top_ptr+1].serve2nd == 0)
//          && (scoreTbl_date[top_ptr  ].serve2nd == 1)
////          && (scoreTbl_date[top_ptr+3].serve1st == 0)
//           )
//        {
//            rtn=true;
//        }
//    }
//    else
//    {   // 第7ゲーム ブレイクの場合
//        if ( (scoreTbl_date[top_ptr+1].serve2nd == 1)
//          && (scoreTbl_date[top_ptr  ].serve2nd == 0)
////          && (scoreTbl_date[top_ptr+3].serve1st == 1)
//           )
//        {
//            rtn=true;
//        }
//    }
//    
//    return rtn;
//}
//