/**
 * @brief   Etc画面表示
 * @note    接頭語：met
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_makeEtc_id_pos;
var gbl_makeEtc_currentTotalTbl;
var gbl_makeEtc_ScoreTbl_date;
var gbl_makeEtc_ScoreTbl_id;
var gbl_makeEtc_memberTbl;
var gbl_makeEtc_rankTbl;


/***********************************************************
 ===========================================================
 * @brief   Etc画面表示開始 前準備1
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmet_startMakeEtc(id_pos)
{
    gbl_makeEtc_id_pos = id_pos;
    gntt_getAsTotalManageTbl(gbl_makeEtc_id_pos, function(rslt){gmet_start2MakeEtc(rslt)});
    
}

/***********************************************************
 * @brief   Etc画面表示開始 前準備2
 * @param    
 * @return    
 * @note    
 **********************************************************/
function gmet_start2MakeEtc(currentTbl)
{
    gbl_makeEtc_currentTotalTbl = $.extend(true, {}, currentTbl);
    gnmt_getAsMemberTbl(function(rslt){ gmet_start3MakeEtc(rslt) });

    
}

/***********************************************************
 * @brief   Etc画面表示開始 前準備3
 * @param    
 * @return    
 * @note    
 **********************************************************/
function gmet_start3MakeEtc(rslt)
{
    gbl_makeEtc_memberTbl = $.extend(true, {}, rslt);
    gnst_getAsScoreTbl_date(gbl_makeEtc_currentTotalTbl.scoreTbl, function(rslt){ gmet_start4MakeEtc(rslt) });
    
}

/***********************************************************
 * @brief   Etc画面表示開始 前準備4
 * @param    
 * @return    
 * @note    
 **********************************************************/
function gmet_start4MakeEtc(rslt)
{
    gbl_makeEtc_ScoreTbl_date = $.extend(true, {}, rslt);
    gnst_getAsScoreTbl_id(gbl_makeEtc_currentTotalTbl.scoreTbl, function(rslt){ lmet_makeEtc(rslt) });
    
}


/***********************************************************
 * @brief   Etc初期画面表示開始
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_makeEtc(scoreTbl_date)
{
    gbl_makeEtc_ScoreTbl_id = $.extend( true, {}, scoreTbl_date );

//    lmet_chemistry_chk();

    // タイトル表示
    //----------------------------------
    var onsEtc = document.getElementById('etc-toolbar');
    var onsEtcItem = document.createElement("etc-toolbar");
    
    if( gbl_makeEtc_id_pos == 0 )
    {
        onsEtcItem.innerHTML = "今期 エトセトラ";
    }
    else
    {
        onsEtcItem.innerHTML = gbl_makeEtc_currentTotalTbl.disp+" Etc.";
    }

    onsEtc.appendChild(onsEtcItem);
	ons.compile(onsEtcItem);

    // ボタン表示
    //----------------------------------
    var onsEtc = document.getElementById('etc-list');
    var onsEtcItem = document.createElement("etc-list");

    onsEtcItem.innerHTML = "<span style = 'line-height:200%'>" +
                            "<input type='button' id='bigUpset' onclick='lmet_btn(this)' style='WIDTH: 90%; position: absolute; left:5%' value='大逆転'>" +
                            "<br>" +
                            "<input type='button' id='mdlUpset' onclick='lmet_btn(this)' style='WIDTH: 90%; position: absolute; left:5%' value='中逆転'>" +
                            "<br>" +
                            "<input type='button' id='failUpset' onclick='lmet_btn(this)' style='WIDTH: 90%; position: absolute; left:5%' value='大逆転まであと一歩'>" +
                            "<br>" +
                            "<input type='button' id='chemistry' onclick='lmet_btn(this)' style='WIDTH: 90%; position: absolute; left:5%' value='相性'>" +
                            "<br>" +
                            "</span>";

    onsEtc.appendChild(onsEtcItem);
	ons.compile(onsEtcItem);
}



/***********************************************************
 * @brief   ボタン処理
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_btn(btn)
{
    var options;
    var onsEtc = document.getElementById('etc-list');
    
    switch(btn.id)
    {
        case 'bigUpset':
        case 'mdlUpset':
        case 'failUpset':
            options = {param1: btn};
            Navi.pushPage("pageEtcData.html", options);
            break;
        case 'chemistry':
            Navi.pushPage("pageEtcChm1.html");
            break;
    }


}


