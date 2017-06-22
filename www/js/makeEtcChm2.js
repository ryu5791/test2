/**
 * @brief   Etc画面表示 相性画面2
 *                      結果表示 
 * @note    接頭語：metChm2
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_makeEtcChm_thrGameNum;              // ゲーム数閾値
var gbl_makeEtcChm_gameInfo = new Array();    // 各ペアとの試合情報 (次の画面遷移時に使用)

/***********************************************************
 ===========================================================
 * @brief   相性
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmetChm2_startChemistry(index)
{
    lmetChm2_chemistry_rslt(index);
}

/***********************************************************
 * @brief   相性データ作成
 * @param   index: 該当するデータのランクテーブルの配列添え字 
 * @return    
 * @note    
 **********************************************************/
function lmetChm2_chemistry_rslt(index)
{
    var rankTbl = gbl_makeEtc_rankTbl;
    var id = rankTbl[index].ID;
    var start_index=null;
    var id_num=0;
    var pairInfo = new Object();
    var str="";

    // 該当するIDの総試合数
    for(var i=0; i<gbl_makeEtc_ScoreTbl_id.count; i++)
    {
        if(gbl_makeEtc_ScoreTbl_id[i].ID == id)
        {
            if( start_index == null )     // 初回のみ
            {
                start_index = i;
            }
            id_num++;
        }
    }

    pairInfo = lmet_getPairData(id, start_index, id_num);

    // 表示
    lmet_makeChemistryDisplay(pairInfo, rankTbl[index].name);
    

/*    alert("length:" + pairInfo.length);
    
    for(var i=0; i<pairInfo.length; i++ )
    {
        str += (pairInfo[i].name + ",");
        str += (pairInfo[i].gameNum + ",");
        str += (pairInfo[i].winNum + ",");
        str += ((pairInfo[i].chemPt).toFixed(3) + "\n");
    }

    alert(":" + str);
*/
}

/***********************************************************
 * @brief   ペア情報取得
 * @param    
 * @return    
 * @note    相性度順にソートも行う
 **********************************************************/
function lmet_getPairData(id, start_index, id_num)
{
    var pairInfo = new Array();
    var scoreTbl = gbl_makeEtc_ScoreTbl_id;
    var ptr=0;
    var gross;
    var test;

    gbl_makeEtcChm_thrGameNum = gmrk_getGameNumAvg(gbl_makeEtc_rankTbl);        // ゲーム数閾値取得

    gross = lmet_get_gross(id);
    for(var i=0; i<gbl_makeEtc_rankTbl.count; i++)
    {
        var gameNum=0;
        var gamePt=0;
        var winNum=0;
        gbl_makeEtcChm_gameInfo[ptr] = new Array();
        
        // 各ペアとの勝利数等を集計
        for(var j=start_index; j<start_index+id_num; j++)
        {
            if( gbl_makeEtc_rankTbl[i].ID == scoreTbl[j].pairID )
            {
                gbl_makeEtcChm_gameInfo[ptr][gameNum] = new lmet_setgameInfo(scoreTbl[j].date,
                                                                             scoreTbl[j].gameNo);   // 各ペアとの試合情報 (次の画面遷移時に使用)
                gameNum++;
                gamePt += (scoreTbl[j].gamePt - lmet_getLostGame(j));
                if( scoreTbl[j].gamePt == 5 )
                {
                    winNum++;
                }
            }
        }
        // 一度でも組んだことがあれば戻り値の配列に追加
        if( gameNum != 0 )
        {
            pairInfo[ptr] = new lmet_setPairInfo(
                                				scoreTbl[j].pairID,
									            gbl_makeEtc_rankTbl[i].gross,
									            gbl_makeEtc_rankTbl[i].name,
									            gameNum,
									            gamePt,
									            winNum,
                                                lmet_jdgThrGameOver(gbl_makeEtc_rankTbl[i].gameNum, gbl_makeEtcChm_thrGameNum),
                                                (gamePt/gameNum - ((gross +gbl_makeEtc_rankTbl[i].gross)/2-3.25)+5),
                                                ptr
                                                );
            ptr++;
        }
    }

    // 相性度順にソート
    pairInfo = lmet_sortChmData(pairInfo);
    
    return pairInfo;
}


/**
 * @brief   該当試合で失ったポイント取得
 * @param   
 * @return    
 * @note    
 **********************************************************/
function lmet_getLostGame(index)
{
    var scoreTbl = gbl_makeEtc_ScoreTbl_id;
    var ret;

    if(scoreTbl[index].gamePt == 5) // 勝ったとき
    {
        for(var i=0; i<scoreTbl.count; i++)
        {
            if((scoreTbl[index].date == scoreTbl[i].date)
             &&(scoreTbl[index].gameNo == scoreTbl[i].gameNo) )     // 同一試合なら
             {
                 if(scoreTbl[i].gamePt != 5)                        // 負けた相手のゲームポイント取得
                 {
                     ret = scoreTbl[i].gamePt;
                     break;
                 }
             }
        }
    }
    else    // 負けたとき
    {
        ret = 5;
    }
    return ret;
}

/**
 * @brief   グロス取得
 * @param   id:    該当ID
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


/**
 * @brief   規定試合達成判定
 * @param   
 * @return    
 * @note    true:達成
 **********************************************************/
function lmet_jdgThrGameOver(gameNum, thrGameNum)
{
    if(gameNum >= thrGameNum)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * @brief   相性度順にソート
 * @param   
 * @return    
 * @note    
 **********************************************************/
function lmet_sortChmData(rslt)
{
    var btmPt=rslt.length-1;
	var validNum=0;
	
    // 有効・無効判定 & 有効は前半、無効は後半に移動する
	for(var topPt = 0; topPt<btmPt; topPt++)
	{
		if( rslt[topPt].thrOk == false )
		{
			for(;btmPt>topPt;btmPt--)
			{
				if( rslt[btmPt].thrOk == true )
				{
					var tmp = rslt[topPt];
					rslt[topPt] = rslt[btmPt];
					rslt[btmPt] = tmp;
					break;
				}
			}
		}
	}

	rslt.validNum = btmPt;	// 有効データ数を格納

    // 有効データのソート
	for(var i=0; i<rslt.validNum-1;i++)
	{
		for(var j=rslt.validNum-1; j>i;j--)
		{
			if(rslt[j].chemPt>rslt[j-1].chemPt)
			{
				var t = rslt[j];
				rslt[j]=rslt[j-1];
				rslt[j-1]=t;
			}
		}
	}
	
	// 無効データのソート
	for(var i=rslt.validNum; i<rslt.length-1;i++)
	{
		for(var j=rslt.length-1; j>i;j--)
		{
			if(rslt[j].chemPt>rslt[j-1].chemPt)
			{
				var t = rslt[j];
				rslt[j]=rslt[j-1];
				rslt[j-1]=t;
			}
		}
	}

    return rslt;
}

/***********************************************************
 * @brief   相性度表示
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_makeChemistryDisplay(pairInfo, name)
{
    // タイトル表示
    //----------------------------------
    var onsList = document.getElementById('etcChm2-toolbar');
    var onsListItem = document.createElement("etcChm2-toolbar");
    
    onsListItem.innerHTML = "相性度";

    onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // 表の表示
    //----------------------------------
    onsList = document.getElementById('etcChm2-list');
    onsListItem = document.createElement("etcChm2-list");
    // 対象者名
	onsListItem.innerHTML =  name +"さん"+ "<br>" +
							"--------------------<br>" 
                            ;
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // 規定試合到達者の表の項目表示
    onsListItem = document.createElement("etcChm2-list");
	onsListItem.innerHTML = "●規定試合を満たす人との相性" +
                            "<table	 border='1' cellspacing='0'>"+
							"<tr>" +
							"<th width='60'>name</th>" +
							"<th width='50'>gm</th>" +
							"<th width='50'>win</th>" +
							"<th width='60'>相性度</th>" +
							"</tr>"+
							"</table>";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // 規定試合到達者の表のデータ表示
    for( var i=0; ((i<pairInfo.validNum) && (i<gbl_makeEtc_currentTotalTbl.ChNum)); i++)
    {
        onsListItem = document.createElement("rank-list");
        onsListItem.innerHTML = "<table	 border='1' cellspacing='0'>"+
    							"<tr>" +
    							"<th width='60' id=nameCell" + i + ">"+pairInfo[i].name+"</th>" +
    							"<th width='50'>"+pairInfo[i].gameNum+"</th>" +
    							"<th width='50'>"+pairInfo[i].winNum+"</th>" +
    							"<th width='60'>"+(pairInfo[i].chemPt).toFixed(3)+"</th>" +
    							"</tr>"+
    							"</table>";
    	onsList.appendChild(onsListItem);
    	ons.compile(onsListItem);
    }

    // 規定試合未到達者の表の項目表示
    onsListItem = document.createElement("etcChm2-list");
    onsListItem.innerHTML = "<BR>●規定試合未満の人との相性" +
                            "<table	 border='1' cellspacing='0'>"+
							"<tr>" +
							"<th width='60'>name</th>" +
							"<th width='50'>gm</th>" +
							"<th width='50'>win</th>" +
							"<th width='60'>相性度</th>" +
							"</tr>"+
							"</table>";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // 規定試合未到達者の表のデータ表示
    for( var i=0, j=pairInfo.validNum; ((j<pairInfo.length) && (i<gbl_makeEtc_currentTotalTbl.ChNum)); i++, j++)
    {
        onsListItem = document.createElement("etcChm2-list");
        onsListItem.innerHTML = "<table     border='1' cellspacing='0'>"+
    							"<tr>" +
    							"<th width='60' id=nameCell" + j + ">"+pairInfo[j].name+"</th>" +
    							"<th width='50'>"+pairInfo[j].gameNum+"</th>" +
    							"<th width='50'>"+pairInfo[j].winNum+"</th>" +
    							"<th width='60'>"+(pairInfo[j].chemPt).toFixed(3)+"</th>" +
    							"</tr>"+
    							"</table>";
    	onsList.appendChild(onsListItem);
    	ons.compile(onsListItem);
    }
    
    for( var i = 0; i< pairInfo.length; i++ )
	{
		(function (n) {
			$("#nameCell" + i).click(function(){
				lmet_goToEtcChm3(gbl_makeEtcChm_gameInfo[pairInfo[n].ptr], name, pairInfo[n].name);			// 個人画面へ移行!
			});
		})(i);
	}
    
    
    // その他説明等表示
	onsListItem = document.createElement("etcChm2-list");
	onsListItem.innerHTML = "<header>"+ "gm:試合数" + "</header>"+
							"<header>"+ "win:勝利数" + "</header>"+
                            "<header>"+ "上位" +gbl_makeEtc_currentTotalTbl.ChNum + "名まで表示しています" + "</header>";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // その他説明等表示
    onsListItem = document.createElement("etcChm2-list");
	onsListItem.innerHTML = '<div style="font-size: 14px">' +
                                '<br>※相性度について'+
                                '<br>'+
                                '・ペアとのグロスより結果が良ければ相性度は高くなります'+
                                '<br>'+
                                '・相性度が5ならばグロスから予想されるスコア通りの結果が出ていることになります'+
                                '<br>'+
                                '・奪われたゲーム数も加味されています。'+
                                '<br>'+
                                '　(5-3で勝つより5-0で勝つほうが相性度は高い)'+
                                '<br>'+
                                '・計算式='+
                                '<br>'+
                                '　(2人の平均得失点差)-(グロスによる平均得失点差)+5'+
                                '</div>';

    
    "<header>"+ "gm:試合数" + "</header>"+
							"<header>"+ "win:勝利数" + "</header>"+
                            "<header>"+ "上位" +gbl_makeEtc_currentTotalTbl.ChNum + "名まで表示しています" + "</header>";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);


}

/***********************************************************
 * @brief    個人画面へ移行
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmet_goToEtcChm3(rslt, name, pairName)
{
	var options = {param1: rslt, param2: name, param3: pairName};
	Navi3.pushPage("pageEtcChm3.html", options);
}


/**
 * @brief   ペア情報
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_setPairInfo(pairID, gross, name, gameNum, gamePt, winNum, thrOk, chemPt, ptr)
{
    this.pairID	=pairID;	
	this.gross	=gross;	
	this.name	=name;	
	this.gameNum=gameNum;
	this.gamePt	=gamePt;	
	this.winNum	=winNum;	
    this.thrOk  =thrOk;         // 規定試合達成
    this.chemPt =chemPt;        // 相性度
    this.ptr    =ptr;
}

/**
 * @brief   試合情報
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmet_setgameInfo(date, gameNo)
{

    this.date   =date;
    this.gameNo =gameNo;
}

/***********************************************************
 ===========================================================
 * @brief   
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmetChm2_back_to_Chm2()
{
    Navi3.popPage();
}

