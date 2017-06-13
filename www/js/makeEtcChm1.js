/**
 * @brief   Etc画面表示 相性画面１
 *                      top画面 
 * @note    接頭語：metCh1
 */

/***********************************************************
 ===========================================================
 * @brief   相性top画面 前準備
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmetChm1_startChemistry()
{
    var RankScore = ncmb.DataStore( gbl_makeEtc_currentTotalTbl.rankTbl );
    var thrGameNum;

    RankScore
	.order("ID")
	.count()
	.limit(1000)
	.fetchAll()
	.then(function(rslt){
        gbl_makeEtc_rankTbl = $.extend( true, {}, rslt );
    	thrGameNum = gmrk_getGameNumAvg( gbl_makeEtc_rankTbl );						// 閾値取得
		gbl_makeEtc_rankTbl = gmrk_sortRankData(gbl_makeEtc_rankTbl, thrGameNum);	// データソート
        lmetChm1_chemistry_disp();
	})
	.catch(function(err){
		alert("gmetChm1_startChemistry err:"+err);
	});

    
}

/***********************************************************
 * @brief   相性top画面
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetChm1_chemistry_disp()
{
    var rankTbl = gbl_makeEtc_rankTbl;
    
    // タイトル表示
    //----------------------------------
    var onsEtc = document.getElementById('etcChm1-toolbar');
    var onsEtcItem = document.createElement("etcChm1-toolbar");
    
    if( gbl_makeEtc_id_pos == 0 )
    {
        onsEtcItem.innerHTML = "今期 相性度";
    }
    else
    {
        onsEtcItem.innerHTML = gbl_makeEtc_currentTotalTbl.disp+" 相性度";
    }

    onsEtc.appendChild(onsEtcItem);
    ons.compile(onsEtcItem);

    // ボタン表示
    //----------------------------------
    onsEtc = document.getElementById('etcChm1-list');
    onsEtcItem = document.createElement("etcChm1-list");
    onsEtcItem.innerHTML =  "●対象者を選択してください<br>";
                                
    onsEtc.appendChild(onsEtcItem);
    ons.compile(onsEtcItem);
    for(var i=0; i<rankTbl.count; i++)
    {
        onsEtc = document.getElementById('etcChm1-list');
        onsEtcItem = document.createElement("etcChm1-list");
        onsEtcItem.innerHTML =  "<span style = 'line-height:150%'>" +
                                "<input type='button' id='etcChm1_name" + i + "'" +
                                " onclick='lmetChm1_btn("+i+")' style='WIDTH: 40%; position: absolute; left:5%'" + 
                                "value=" + rankTbl[i].name + ">" +
                                "<br>" +
                                "</span>";

        onsEtc.appendChild(onsEtcItem);
    	ons.compile(onsEtcItem);
    }
}

/***********************************************************
 * @brief   
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmetChm1_btn(index)
{
    var options = {param1: index};
    Navi2.pushPage("pageEtcChm2.html", options);
}

/***********************************************************
 * @brief   ペア情報配列取得
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_getPairData(id, start_pos, id_num)
{
    var pairInfo = new Array();
    var ptr=0;
    
    for(var i=0; i<gbl_makeEtc_rankTbl.count; i++)
    {
        var gameNum=0;
        var gamePt=0;
        var winNum=0;
        
        for(var j=start_pos; j<start_pos+id_num; j++)
        {
            if( gbl_makeEtc_rankTbl[i].ID == gbl_makeEtc_ScoreTbl_id[j].pairID )
            {
                gameNum++;
                gamePt += gbl_makeEtc_ScoreTbl_id[j].gamePt;
                if( gbl_makeEtc_ScoreTbl_id[j].gamePt == 5 )
                {
                    winNum++;
                }
            }
        }
        if( gameNum != 0 )
        {
            pairInfo[ptr] = new lmet_setPairInfo(
    			            					gbl_makeEtc_ScoreTbl_id[j].pairID,
									            gbl_makeEtc_rankTbl[i].gross,
									            gbl_makeEtc_rankTbl[i].name,
									            gameNum,
									            gamePt,
									            winNum);
            ptr++;
        }
    }
    
    return pairInfo;
}

/***********************************************************
 * @brief   
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_get_gross(id)
{
    var ret = 0;
    
    for( var i=0; i<gbl_makeEtc_rankTbl.count; i++ )
    {
        if( gbl_makeEtc_rankTbl[i].ID == id )
        {
            ret = gbl_makeEtc_rankTbl[i].gross;
            break;
        }
    }
    
    return ret;
}


/***********************************************************
 * @brief   
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_setPairInfo(pairID, gross, name, gameNum, gamePt, winNum)
{
    this.pairID	=pairID;	
	this.gross	=gross;	
	this.name	=name;	
	this.gameNum=gameNum;
	this.gamePt	=gamePt;	
	this.winNum	=winNum;	
    
}

/***********************************************************
 ===========================================================
 * @brief   
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmetChm1_back_to_Chm1()
{
    Navi2.popPage();
}