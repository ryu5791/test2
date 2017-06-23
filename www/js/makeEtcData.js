/**
 * @brief   Etc画面表示 -逆転試合など
 * @note    接頭語：metDt
 */

/** グローバル変数宣言
-------------------------------------*/



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
    var sort_tbl = new Object();
    var title = "";
    var memo = "";


    switch(btn.id)
    {
        case 'bigUpset':
            disp_score_tbl = lmetDt_get_bigUpset();
            title = "大逆転";
            memo = "0-3から逆転した試合です！";
            break;
        case 'mdlUpset':
            disp_score_tbl = lmetDt_get_mdlUpset();
            title = "中逆転";
            memo = "1-3から逆転した試合です^^";
            break;
        case 'failUpset':
            disp_score_tbl = lmetDt_get_failUpset();
            title = "逆転回避";
            memo = "0-3から追いつかれたけどなんとか勝った試合です";
            break;
        case 'allKeep':
            disp_score_tbl = lmetDt_get_allKeep();
            title = "全キープ";
            memo = "全ゲームキープのプロっぽい試合です";
            break;
        case 'allBreak':
            disp_score_tbl = lmetDt_get_allBreak();
            title = "全ブレイク";
            memo = "全ゲームブレイクの〇〇試合です";
            break;
    }

    disp_score_tbl.count = disp_score_tbl.length;
    disp_score_tbl = gmps_addName( disp_score_tbl, gbl_makeEtc_memberTbl );
    sort_tbl = lmetDt_get_sort_tbl( disp_score_tbl );
    sort_tbl.win.count = sort_tbl.win.length;
    sort_tbl.win = gmps_addName( sort_tbl.win, gbl_makeEtc_memberTbl );
    sort_tbl.lose.count = sort_tbl.lose.length;
    sort_tbl.lose = gmps_addName( sort_tbl.lose, gbl_makeEtc_memberTbl );

    lmetDt_DailyDtlDisplay( disp_score_tbl, title, memo, sort_tbl );
}


/**
 * @brief   回数の多い人順にソート
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_get_sort_tbl( disp_score_tbl )
{
    var sortTbl = new Object();
    var index;

    sortTbl.win = new Array();
    sortTbl.lose = new Array();

    // 回数集計
    for(var i=0; i<disp_score_tbl.count; i++)
    {
        if(disp_score_tbl[i].gamePt == 5)
        {   // 勝ちの集計
            index = lmetDt_id_exist(disp_score_tbl[i].ID, sortTbl.win);
            if( index == DATA_NON )
            {   // idがテーブルに存在しないなら
                index = sortTbl.win.length;
                sortTbl.win[index] = new lmetDt_set_sortTbl( disp_score_tbl[i].ID );
            }
            sortTbl.win[index].num++;
        }
        else
        {   // 負けの集計
            index = lmetDt_id_exist(disp_score_tbl[i].ID, sortTbl.lose);
            if( index == DATA_NON )
            {   // idがテーブルに存在しないなら
                index = sortTbl.lose.length;
                sortTbl.lose[index] = new lmetDt_set_sortTbl( disp_score_tbl[i].ID );
            }
            sortTbl.lose[index].num++;
        }

    }

    sortTbl.win = lmetDt_tbl_sort(sortTbl.win);
    sortTbl.lose = lmetDt_tbl_sort(sortTbl.lose);

    
    return sortTbl;
}

/**
 * @brief   id有無判定（ソートテーブル）
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_id_exist(id, sortTbl)
{
    var ret = DATA_NON;
    
    for(var i=0; i<sortTbl.length; i++)
    {
        if(id == sortTbl[i].ID)
        {
            ret = i;
            break;
        }
    }
    
    return ret;
}

/**
 * @brief   テーブルをソート
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_tbl_sort(sortTbl)
{
    // ソート
    for(var i=0; i<sortTbl.length-1;i++)
    {
		for(var j=sortTbl.length-1; j>i;j--)
		{
			if(sortTbl[j].num>sortTbl[j-1].num)
			{
				var t = sortTbl[j];
				sortTbl[j]=sortTbl[j-1];
				sortTbl[j-1]=t;
			}
		}
	}
    
    return sortTbl;
}

/**
 * @brief   ソートテーブル作成
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_set_sortTbl(id)
{
    this.ID = id;
    this.num = 0;
    this.name = "";
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


/***********************************************************
 * @brief   全ゲームキープ試合の取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_get_allKeep()
{
    var rtn_data = new Array();
    var i,j,topIndex;
    var scoreTbl_date;
    
    scoreTbl_date = gbl_makeEtc_ScoreTbl_date;
    
    for(i=0,j=0; i<scoreTbl_date.count; i++)
    {
        if(scoreTbl_date[i].gamePt == 3)
        {
            
            if(lmetDt_chk_allKeep(i, scoreTbl_date)==true)
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
 * @brief   全ゲームキープのチェック
 * @param    
 * @return    
 * @note    サーバ順にソートされていることが前提
 **********************************************************/
function lmetDt_chk_allKeep( ptr, scoreTbl_date )
{
    var rtn=false;
    var top_ptr = (ptr-(ptr%4));    // 最初のサーバの添え字
    
    if ( (scoreTbl_date[top_ptr  ].serve1st == 1)           // 第1ゲーム
      && (scoreTbl_date[top_ptr+2].serve1st == 1)           // 第3ゲーム
      && (scoreTbl_date[top_ptr  ].serve2nd == 1)           // 第5ゲーム
      && (scoreTbl_date[top_ptr+2].serve2nd == 1)           // 第7ゲーム
       )
    {
        rtn=true;
    }
    
    return rtn;
}

/***********************************************************
 * @brief   全ゲームブレイク試合の取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_get_allBreak()
{
    var rtn_data = new Array();
    var i,j,topIndex;
    var scoreTbl_date;
    
    scoreTbl_date = gbl_makeEtc_ScoreTbl_date;
    
    for(i=0,j=0; i<scoreTbl_date.count; i++)
    {
        if(scoreTbl_date[i].gamePt == 3)
        {
            
            if(lmetDt_chk_allBreak(i, scoreTbl_date)==true)
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
 * @brief   全ゲームブレイクのチェック
 * @param    
 * @return    
 * @note    サーバ順にソートされていることが前提
 **********************************************************/
function lmetDt_chk_allBreak( ptr, scoreTbl_date )
{
    var rtn=false;
    var top_ptr = (ptr-(ptr%4));    // 最初のサーバの添え字
    
    if ( (scoreTbl_date[top_ptr  ].serve1st == 0)           // 第1ゲーム
      && (scoreTbl_date[top_ptr+2].serve1st == 0)           // 第3ゲーム
      && (scoreTbl_date[top_ptr  ].serve2nd == 0)           // 第5ゲーム
      && (scoreTbl_date[top_ptr+2].serve2nd == 0)           // 第7ゲーム
       )
    {
        rtn=true;
    }
    
    return rtn;
}

/**
 * @brief   結果表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_DailyDtlDisplay(gameRslt, title, msg, sort_tbl)
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
        onsListItem.innerHTML = "今期 " + title;
    }
    else
    {
        onsListItem.innerHTML = gbl_makeEtc_currentTotalTbl.disp+" "+title;
    }

    onsList.appendChild(onsListItem);
    ons.compile(onsListItem);

    // 各試合表示
    //----------------------------------
    onsList = document.getElementById('etcData-list');
    onsListItem = document.createElement("etcData-list");

    onsListItem.innerHTML = "<ons-row>" +
                            "<ons-col>" +
                            "<header>" +
                            "●"+msg+"<br>"+
                            "</header>" +
                            "<header>" +"  試合数：" + (gameRslt.length/4) +
                            "</header>" +
                            "<header>" +"----------------------------------------"+
                            "</header>" +
                            "<header  style='font-size: 14px'>"+
                            "※下記クリックで試合詳細表示" +
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
    
    // 順位表示
    //----------------------------------
    onsListItem = document.createElement("etcData-list");
    onsListItem.innerHTML = "----------------------------------------<br>"
                            + "●勝った回数<br>";
    onsList.appendChild(onsListItem);
    ons.compile(onsListItem);

    lmetDt_disp_sort(sort_tbl.win);

    onsListItem = document.createElement("etcData-list");
    onsListItem.innerHTML = "----------------------------------------<br>"
                            + "●負けた回数<br>";
    onsList.appendChild(onsListItem);
    ons.compile(onsListItem);

    lmetDt_disp_sort(sort_tbl.lose);
    
}

/**
 * @brief   ソート結果表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetDt_disp_sort(sort_tbl)
{
    var rank = 1;
    var onsList = document.getElementById('etcData-list');
    var onsListItem = document.createElement("etcData-list");

    for(var i=0; (i<3)&&(i<sort_tbl.length); i++, rank++)
    {
        onsListItem = document.createElement("etcData-list");
        onsListItem.innerHTML = "　" + rank + "位 　"
                                + sort_tbl[i].name + "さん　"
                                + sort_tbl[i].num + "回<br>";

        // 次の人も回数が同じなら表示させる
        while((i<sort_tbl.length-1)&&(sort_tbl[i].num == sort_tbl[i+1].num))
        {
            i++;
            rank++;
            onsListItem.innerHTML += ("　　　　" + sort_tbl[i].name + "さん<br>");
        }
        onsList.appendChild(onsListItem);
        ons.compile(onsListItem);
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