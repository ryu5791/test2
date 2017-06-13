/**
 * @brief    ランク画面表示
 * @note    接頭語：mrk
 */

/** 定数宣言
-------------------------------------*/

/** グローバル変数宣言
-------------------------------------*/
var gbl_makeRank_RankTbl;			// ランクテーブル結果
var gbl_makeRank_bkScoreLatest;		// スコア更新日時
var gbl_makeRank_memberTbl;			// メンバーテーブル結果
var gbl_makeRank_scoreTbl;			// スコアテーブル結果
var gbl_makeRank_thrGameNum;		// ゲーム数閾値

var gbl_makeRank_currentTotalTbl;        // 現在使用中の管理テーブル
var gbl_makeRank_currentRankTblName;
var gbl_makeRank_id_pos;

/***********************************************************
 ===========================================================
 * @brief	ランク画面表示開始 前準備1
 * @param	
 * @return	
 * @note	
 ===========================================================
 **********************************************************/
function gmrk_startMakeRankDisplay(id_pos)
{
    gbl_makeRank_id_pos = id_pos;
    gntt_getAsTotalManageTbl(id_pos, function(rslt){lmrk_start2MakeRankDisplay(rslt)});
}

/***********************************************************
 ===========================================================
 * @brief    ランク画面表示開始 前準備1
 * @param	
 * @return	
 * @note	過去成績からのBack押下時
 ===========================================================
 **********************************************************/
function gmrk_startMakeRankDisplay_back()
{
    gntt_getAsTotalManageTbl(gbl_makeRank_id_pos, function(rslt){lmrk_start2MakeRankDisplay(rslt)});
}

/***********************************************************
 * @brief    ランク画面表示開始 前準備2
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_start2MakeRankDisplay(currentTbl)
{
    gbl_makeRank_currentTotalTbl = $.extend(true, {}, currentTbl);
	gnmt_getAsMemberTbl(function(rslt){ lmrk_chkAsRenewScoreTbl_rank(rslt) });
}

/***********************************************************
 * @brief	ランクテーブルに対し、スコア更新チェック
 * @param	memRslt: メンバーテーブル結果
 * @return	
 * @note	
 **********************************************************/
function lmrk_chkAsRenewScoreTbl_rank(memRslt)
{
	var Score = ncmb.DataStore( gbl_makeRank_currentTotalTbl.scoreTbl );

	gbl_makeRank_memberTbl = $.extend(true, {}, memRslt);

	Score						// データベース検索
	.order("updateDate", true)
	.count()
	.limit(1)
	.fetchAll()
	.then(function(resultScore){
    	gbl_makeRank_bkScoreLatest = resultScore[0].updateDate;
        if( (gbl_makeRank_currentRankTblName == gbl_makeRank_currentTotalTbl.rankTbl)
         && (gbl_makeRank_bkScoreLatest == gbl_makeRank_currentTotalTbl.rankLatest))
        {   // テーブル取得済みで更新なしならば
            lmrk_makeRankDisplay(gbl_makeRank_RankTbl);    			// next!	表示！
        }
        else if( gbl_makeRank_bkScoreLatest != gbl_makeRank_currentTotalTbl.rankLatest)
    	{	// 更新ありならば
			gnst_getAsScoreTbl_id(gbl_makeRank_currentTotalTbl.scoreTbl, function(rslt){ lmrk_deleteAsRankTbl(rslt) });		// next!
		}
		else
		{	// 更新なしならば
			lmrk_getAsRankTblFromDtbs();							// next!
		}
	})
	.catch(function(err){
		alert("lmrk_chkAsRenewScoreTbl_rank2 err:"+err);
	});
}

/***********************************************************
 * @brief	ランクテーブル削除
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_deleteAsRankTbl(scoreRslt)
{
	var RankScore = ncmb.DataStore( gbl_makeRank_currentTotalTbl.rankTbl );

	gbl_makeRank_scoreTbl = $.extend(true, {}, scoreRslt);
	RankScore
	.fetchAll()
	.then(function(results){
		for(var i=0; i<results.length; i++)
		{
			results[i].delete();
		}
		lmrk_startMakeAsRankTbl();				 // next!
	})
	.catch(function(err){
		alert("lmrk_deleteAsRankTbl err:" + err);
	});
}

/***********************************************************
 * @brief	ランクテーブル作成開始
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_startMakeAsRankTbl()
{
	var tblInfo = new Object();

	tblInfo.ptrNum = 0;		// 解析中ポインタ
	tblInfo = lmrk_clear_tblInfo( tblInfo );
	
	memberRslt = $.extend(true, {}, gbl_makeRank_memberTbl);
	scoreRslt = $.extend(true, {}, gbl_makeRank_scoreTbl);
	
	lmrk_addUpAsRankTbl( tblInfo, memberRslt, scoreRslt );
}

/***********************************************************
 * @brief	スコアテーブル集計（ランクテーブル作成のために）
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_addUpAsRankTbl( tblInfo, memberRslt, scoreRslt )
{
	do{
		tblInfo.gameNum++;									// 試合数
		tblInfo.pt += scoreRslt[tblInfo.ptrNum].gamePt;		// ポイント
		if( scoreRslt[tblInfo.ptrNum].gamePt == 5 )
		{
			tblInfo.winNum++;								// 勝利数
		}
		tblInfo.ptrNum++;
		// ID変化あり、または終了時はデータベースへ保存
		if( ( tblInfo.ptrNum >= scoreRslt.count )
		 || ( scoreRslt[tblInfo.ptrNum-1].ID != scoreRslt[tblInfo.ptrNum].ID))
		{
			lmrk_saveRankData( tblInfo, memberRslt, scoreRslt );

			if( tblInfo.ptrNum >= scoreRslt.count )
			{	// 集計終了時
                lmrk_restoreAsTotalManageTbl_rank();
			}
			else
			{	// 集計継続
				tblInfo = lmrk_clear_tblInfo( tblInfo );
			}
		}
		
	}while(tblInfo.ptrNum < scoreRslt.count);
}

/**
 * @brief	集計情報クリア
 * @param	
 * @return	
 * @note	ptrNum以外を初期化
 **********************************************************/
function lmrk_clear_tblInfo( tblInfo )
{
	tblInfo.gameNum = 0;	//	試合数
	tblInfo.pt = 0;			//	ポイント
	tblInfo.winNum = 0;		//	勝利数
	
	return tblInfo;
}

/**
 * @brief	集計情報をデータベースへ保存
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_saveRankData( tblInfo, memberRslt, scoreRslt )
{
	var RankScore = ncmb.DataStore( gbl_makeRank_currentTotalTbl.rankTbl );
	var rankScore = new RankScore();	

	tblInfo = lmrk_getMemberData( scoreRslt[tblInfo.ptrNum-1].ID, memberRslt, tblInfo );
	
	rankScore
	.set("ID", scoreRslt[tblInfo.ptrNum-1].ID)
	.set("gameNum", tblInfo.gameNum)
	.set("gamePt", tblInfo.pt)
	.set("winNum", tblInfo.winNum)
	.set("name", tblInfo.dispName)
	.set("HDCP", tblInfo.HDCP)
	.set("gross", (+tblInfo.pt)/(+tblInfo.gameNum))
	.set("net",((+tblInfo.pt)/(+tblInfo.gameNum)+tblInfo.HDCP))
	.save()
	.then(function(){
	})
	.catch(function(err){
		alert("lmrk_saveRankData err:" + err);
	});
}

/**
 * @brief	メンバーデータ取得
 * @param	
 * @return	
 * @note	表作成時に必要な名前とハンディキャップを取得
 **********************************************************/
function lmrk_getMemberData(id, memberRslt, tblInfo)
{
	for(var i=0; i<memberRslt.count; i++)
	{
		if( id == memberRslt[i].ID )
		{
			tblInfo.dispName = memberRslt[i].dispName;
  		    tblInfo.HDCP = memberRslt[i].get(gbl_makeRank_currentTotalTbl.hdcpTbl);
            if( memberRslt[i].get(gbl_makeRank_currentTotalTbl.hdcpTbl) == null )
            {
                tblInfo.HDCP = 0;
            }
            else
            {
                tblInfo.HDCP = +memberRslt[i].get(gbl_makeRank_currentTotalTbl.hdcpTbl);
            }

			return tblInfo;
		 }
	}
	alert("該当IDなし ID:" + id);
	return tblInfo;
}

/***********************************************************
 * @brief	ランク保存日時更新
 * @param	
 * @return	
 * @note	メンバデータ作成後に実施
 **********************************************************/
function lmrk_restoreAsTotalManageTbl_rank()
{
    var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
	var totalTbl = new TotalTbl();

    totalTbl.set("objectId", gbl_makeRank_currentTotalTbl.objectId);
    totalTbl.set("rankLatest", gbl_makeRank_bkScoreLatest).update()
    .then(function(rslt){
        gbl_makeRank_currentTotalTbl.rankLatest = rslt.rankLatest;
        lmrk_getAsRankTblFromDtbs();
    })
    .catch(function(err){
        alert("lmrk_remakeAsTotalManageTbl_rank err:" + err);
    });

}

/***********************************************************
 * @brief	ランクテーブル取得(データベースから)
 * @param	
 * @return	
 * @note	閾値以上と未満でのソートも実施
 **********************************************************/
function lmrk_getAsRankTblFromDtbs()
{
	var RankScore = ncmb.DataStore( gbl_makeRank_currentTotalTbl.rankTbl );

	RankScore
	.order("ID")
	.count()
	.limit(1000)
	.fetchAll()
	.then(function(rslt){
		gbl_makeRank_thrGameNum = gmrk_getGameNumAvg( rslt );						// 閾値取得
		gbl_makeRank_RankTbl = gmrk_sortRankData(rslt, gbl_makeRank_thrGameNum);		// データソート
        gbl_makeRank_currentRankTblName = gbl_makeRank_currentTotalTbl.rankTbl;
		lmrk_makeRankDisplay(gbl_makeRank_RankTbl);									// next!	表示！
	})
	.catch(function(err){
		alert("lmrk_getAsRankTblFromDtbs err:"+err);
	});
}

/***********************************************************
 ===========================================================
 * @brief	平均ゲーム数取得
 * @param	rslt:	ランクテーブル
 * @return	ret:	平均値
 * @note	会員のみの平均値
 ===========================================================
 **********************************************************/
function gmrk_getGameNumAvg( rslt )
{
	var sum=0;
	var num=0;
	var ret=0;
	
	for(var i=0; i<rslt.count; i++)
	{
        if(lmrk_chk_member(rslt[i].ID)==true)
		{
			sum += rslt[i].gameNum;
			num++;
		}
	}
	if(num!=0)
	{
		ret = Math.floor(sum/num);
	}
	
	return( ret );
}

/**
 * @brief   会員判定
 * @param	id:判定ID
 * @return	true:会員
 * @note	
 **********************************************************/
function lmrk_chk_member(id)
{
    var ret=true;
    var memTbl=gbl_makeRank_memberTbl;
    
    for(var i=0; i<memTbl.count; i++)
    {
        if( memTbl[i].ID == id )
        {
            if ((memTbl[i].get(gbl_makeRank_currentTotalTbl.hdcpTbl) == null)
             || (memTbl[i].get(gbl_makeRank_currentTotalTbl.hdcpTbl) == ""))
            {
                ret=false;
            }
        }
    }
    
    return( ret );
}

/***********************************************************
 ===========================================================
 * @brief	ランクソート
 * @param	
 * @return	
 * @note	閾値以上と未満で別々にソート
 ===========================================================
 **********************************************************/
function gmrk_sortRankData(rslt, thrGameNum)
{
	var btmPt=rslt.count-1;
	var validNum=0;
	
	// 有効・無効判定 & 有効は前半、無効は後半に移動する
	for(var topPt = 0; topPt<btmPt; topPt++)
	{
		if( lmrk_chkValidDat(rslt[topPt].gameNum, thrGameNum)==false )
		{
			for(;btmPt>topPt;btmPt--)
			{
				if( lmrk_chkValidDat(rslt[btmPt].gameNum, thrGameNum)==true )
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
			if(rslt[j].net>rslt[j-1].net)
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
			if(rslt[j].net>rslt[j-1].net)
			{
				var t = rslt[j];
				rslt[j]=rslt[j-1];
				rslt[j-1]=t;
			}
		}
	}

	return(rslt);
}

/**
 * @brief	ゲーム数 有効無効判定
 * @param	
 * @return	true :閾値以上
 *			false:閾値未満
 * @note	
 **********************************************************/
function lmrk_chkValidDat(gameNum, thrGameNum)
{
	if(gameNum >= thrGameNum)
	{
		return true;	// 有効
	}
	else
	{
		return false;	// 無効
	}
}

/***********************************************************
 * @brief	ランクテーブル表示
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_makeRankDisplay(rankRslt)
{
    // タイトル表示
    //----------------------------------
    var onsList = document.getElementById('rank-toolbar');
	var onsListItem = document.createElement("rank-toolbar");
    
    if( gbl_makeRank_id_pos == 0 )
    {
        onsListItem.innerHTML = "成績一覧";
    }
    else
    {
        onsListItem.innerHTML = gbl_makeRank_currentTotalTbl.disp;
    }

    onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // bottom表示
    //----------------------------------
    var onsList = document.getElementById('rank-bottom-toolbar');
    var onsListItem = document.createElement("rank-bottom-toolbar");
    
    if( gbl_makeRank_id_pos == 0 )
    {
        onsListItem.innerHTML = '<div style="font-size: 14px">' +
                                '<br>※表中の名前クリックで個人成績</div>';

    }
    else
    {
        onsListItem.innerHTML = '<ons-list-item modifier="tappable" class="item"  id="rank-content"  onclick="lmrk_back_to_Past()">'
                              + '<div>&lt; BACK</div>'
                              + '</ons-list-item>';
    }

    onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // 表の表示
    //----------------------------------
    onsList = document.getElementById('rank-list');
	onsListItem = document.createElement("rank-list");
	// 表の項目表示
	onsListItem.innerHTML = "<table	 border='1' cellspacing='0'>"+
							"<tr>" +
							"<th width='30'>No</th>" +
							"<th width='60'>name</th>" +
							"<th width='40'>pt</th>" +
							"<th width='30'>gm</th>" +
							"<th width='40'>grs</th>" +
							"<th width='30'>win</th>" +
							"<th width='40'>Net</th>" +
							"</tr>"+
							"</table>";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);
	// 表のデータ表示
	for( var i = 0; i< rankRslt.count; i++ )
	{
		var gross = (rankRslt[i].gamePt/rankRslt[i].gameNum).toFixed(2);
		var a_net = ((rankRslt[i].gamePt/rankRslt[i].gameNum) + (+rankRslt[i].HDCP)).toFixed(2);
		var no;
		if(i<rankRslt.validNum)
		{
			no=i+1;
		}
		else
		{
			no="";
		}
		onsListItem = document.createElement("rank-list");
		onsListItem.innerHTML = "<table	 border='1' cellspacing='0'>"+
								"<tr>" +
								"<th width='30'>"+ no +"</th>" +
								"<th width='60' id=nameCell" + i + ">"+ rankRslt[i].name +"</th>" +
								"<th width='40'>"+ rankRslt[i].gamePt +"</th>" +
								"<th width='30'>"+ rankRslt[i].gameNum +"</th>" +
								"<th width='40'>"+ gross +"</th>" +
								"<th width='30'>"+ rankRslt[i].winNum +"</th>" +
								"<th width='40'>"+ a_net +"</th>" +
								"</tr>" +
								"</table>";
		onsList.appendChild(onsListItem);
		ons.compile(onsListItem);
	}
	
	for( var i = 0; i< rankRslt.count; i++ )
	{
		(function (n) {
			$("#nameCell" + i).click(function(){
				lmrk_goToPersonDisplay(rankRslt[n]);			// 個人画面へ移行!
			});
		})(i);
	}

	// 閾値表示
	onsListItem = document.createElement("rank-list");
	onsListItem.innerHTML = "平均ゲーム数"+
							gbl_makeRank_thrGameNum +
							"以上";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

	// その他説明等表示
	onsListItem = document.createElement("rank-list");
	onsListItem.innerHTML = "<header>"+ "pt:ポイント" + "</header>"+
							"<header>"+ "gm:試合数" + "</header>"+
							"<header>"+ "grs:グロス" + "</header>"+
							"<header>"+ "win:勝利数" + "</header>"+
                            "<header Align='right'>"+ VER_NO + "</header>";
	onsList.appendChild(onsListItem);
	ons.compile(onsListItem);
	
}

/***********************************************************
 * @brief	個人画面へ移行
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmrk_goToPersonDisplay(rslt)
{
	var options = {param1: rslt};
//	rankNavi.pushPage("pagePerson.html", options);
    Navi1.pushPage("pagePerson.html", options);
}

/***********************************************************
 ===========================================================
 * @brief   トータル管理用ID取得
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmrk_get_id_pos()
{
    return gbl_makeRank_id_pos;
}

/***********************************************************
 ===========================================================
 * @brief   現在のスコアテーブル取得
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmrk_get_current_scoreTbl()
{
    return gbl_makeRank_currentTotalTbl.scoreTbl;
}

/***********************************************************
 * @brief   rank画面からBack押下でpast画面へ移行時
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmrk_back_to_Past()
{
    preNavi.popPage();
}

/***********************************************************
 ===========================================================
 * @brief   個人画面からBack押下でランク画面へ移行時
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmrk_back_to_ranking()
{
    var options = {param1: gbl_makeRank_id_pos};
    Navi1.popPage(options);
}