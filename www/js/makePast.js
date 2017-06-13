/**
 * @brief   過去成績画面表示
 * @note    接頭語：mpt
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_makePast_TotalManageTbl;      // トータル管理テーブル結果


/***********************************************************
 ===========================================================
 * @brief    過去成績画面表示開始  前準備1
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmpt_startPastDisplay()
{
    gbl_makePast_TotalManageTbl = $.extend(true, {}, gntt_getTotalManageTblAll());
    lmpt_makePastDisplay( gbl_makePast_TotalManageTbl );
}

/***********************************************************
 * @brief    過去成績画面表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmpt_makePastDisplay( totalRslt )
{
    const START_ID = 1;
    
    var onsList = document.getElementById('past-list');

    for( var i=START_ID; i<totalRslt.count; i++)
    {
	    var onsListItem = document.createElement("past-list");
        onsListItem.innerHTML = "<span style = 'line-height:150%'>" +
                                totalRslt[i].disp +
                                "<input type='button' id=rankBtn"+i+" style='position: absolute; left:30%' value='ranking'>" +
                                "<input type='button' id=dailyBtn"+i+" style='position: absolute; left:58%' value='daily'>" + 
                                "<input type='button' id=etcBtn"+i+" style='position: absolute; left:80%' value='etc.'>" + 
                                "</span>" +
                                "<br>";
		onsList.appendChild(onsListItem);
		ons.compile(onsListItem);
    }

    for( var i=START_ID; i<totalRslt.count; i++ )
    {
        (function(n){
            $("#rankBtn"+i).click(function(){
                lmpt_goToPastRankingDisplay(n);
            });
        })(i);
    }

    for( var i=START_ID; i<totalRslt.count; i++ )
    {
        (function(n){
            $("#dailyBtn"+i).click(function(){
                lmpt_goToPastDailyDisplay(n);
            });
        })(i);
    }

    for( var i=START_ID; i<totalRslt.count; i++ )
    {
        (function(n){
            $("#etcBtn"+i).click(function(){
                lmpt_goToPastEtcDisplay(n);
            });
        })(i);
    }

}

/***********************************************************
 * @brief    過去ランク画面へ移行
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmpt_goToPastRankingDisplay(id)
{
    var options = {param1: id};

//    pastNavi.pushPage("pagePastRank.html", options);
    preNavi.pushPage("pageRank.html", options);
}

/***********************************************************
 * @brief    過去デイリー画面へ移行
 * @param    
 * @return	
 * @note	
 **********************************************************/
function lmpt_goToPastDailyDisplay(id)
{
    var options = {param1: id};

    preNavi.pushPage("pageDaily.html", options);
}

/***********************************************************
 * @brief    過去ETC.画面へ移行
 * @param    
 * @return    
 * @note	
 **********************************************************/
function lmpt_goToPastEtcDisplay(id)
{
    var options = {param1: id};

    preNavi.pushPage("pageEtc.html", options);
}
