/**
 * @brief   ランク画面表示
 * @note    
 */



/**
 * @brief   
 * @param   
 * @return  
 * @note    
 */
/** グローバル変数宣言
-------------------------------------*/
var gbl_makeRank_RankTbl;
var gbl_makeRank_ScoreLatest;
var gbl_makeRank_bkDailyLatest;



/**
 * @brief   ランク画面表示開始
 * @param   
 * @return  
 * @note    
 */
function startMakeRankDisplay()
{
    getAsMemberTbl(function(rslt){ chkAsRenewScoreTbl(rslt) });
}

/**
 * @brief   スコア更新チェック
 * @param   
 * @return  
 * @note    引数は存在するが、ここでは使用しないので省略
 */
function chkAsRenewScoreTbl()
{
    var Score = ncmb.DataStore( ThisScoreTbl );
	var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
	var totalTbl = new TotalTbl();
	var bkDailyLatest;

    Score                       // データベース検索
	.order("updateDate", true)
	.count()
	.limit(1)
	.fetchAll()
	.then(function(resultScore){
        gbl_makeRank_ScoreLatest = resultScore[0].updateDate;
        TotalTbl                // データベース検索
        .fetchAll()
        .then(function(resultManage){
            gbl_makeRank_bkDailyLatest = resultManage[0].dailyLatest;
            if( ( resultManage.length == 0 )
             || ( gbl_makeRank_ScoreLatest != resultManage[0].rankLatest ) )
            {   // 更新ありならば
                getAsScoreTbl(function(rslt){ deleteAsRankTbl(rslt) });     // next!
            }
            else
            {   // 更新なしならば
                getAsRankTbl();                                             // next!
            }
        })
    	.catch(function(err){
			alert("chkAsRenewScoreTbl2 err:"+err);
		});
	})
	.catch(function(err){
		alert("chkAsRenewScoreTbl1 err:"+err);
	});
}

/**
 * @brief   ランクテーブル削除
 * @param   
 * @return  
 * @note    引数は存在するが、ここでは使用しないので省略
 */
function deleteAsRankTbl()
{
    var RankScore = ncmb.DataStore( "Rank" );

    RankScore
    .fetchAll()
    .then(function(results){
    	for(var i=0; i<results.length; i++)
		{
			results[i].delete();
		}
        makeAsRankTbl();                // next!
	})
	.catch(function(err){
		alert("remakeRankTbl err:" + err);
	});
}

/**
 * @brief   ランクテーブル作成
 * @param   
 * @return  
 * @note    
 */
function makeAsRankTbl()
{
    
}



