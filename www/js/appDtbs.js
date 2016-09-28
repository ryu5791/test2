//mobile backendのAPIキーを設定
//↓本番
//var ncmb = new NCMB("bb0194930176053bea3ec03024dc1962234cb96d0b372352234b17e25f525a9e","8960c3d8602554b25f6eb59a117ac883ee26a245eaab5553eecd610eea450ba0");
//↓テスト
var ncmb = new NCMB("15c1b1aa62fb0128a2b013dd7480250f71e00a80177d53e1cab99457a7dab5a4","85490ef92f820b634523453cc9353ea8068faec84ef3894c6cb1a193bfcdb7f1");

const ThisScoreTbl = "Score2016_2";

var regMem;        	// regular member

window.onload = function(){
		regMem = new Array();
	regMem[0] = new set_regMem(1,"岩井","いわい");
	regMem[1] = new set_regMem(2,"大谷","おおたに");
	regMem[2] = new set_regMem(6,"木村","きむら");
	regMem[3] = new set_regMem(10,"住野","すみの");
	regMem[4] = new set_regMem(13,"中川","なかがわ");
	regMem[5] = new set_regMem(17,"野上","のがみ");
	regMem[6] = new set_regMem(18,"長谷川","はせがわ");
	regMem[7] = new set_regMem(22,"前田","まえだ");
	regMem[8] = new set_regMem(27,"矢澤","やざわ");
	regMem[9] = new set_regMem(29,"山本修","やまもと");
	regMem[10] = new set_regMem(31,"吉川","よしかわ");
	regMem[11] = new set_regMem(32,"和田","わだ");
	regMem[12] = new set_regMem(34,"大藤","おおふじ");
	regMem[13] = new set_regMem(39,"濱田","はまだ");
	regMem[14] = new set_regMem(40,"志水","しみず");
	regMem[15] = new set_regMem(48,"中前","なかまえ");
	regMem[16] = new set_regMem(49,"高橋","たかはし");
	regMem[17] = new set_regMem(50,"田村","たむら");
	regMem[18] = new set_regMem(52,"板倉","いたくら");
	regMem[19] = new set_regMem(53,"上村","うえむら");
	regMem[20] = new set_regMem(55,"榊","さかき");
	regMem[21] = new set_regMem(62,"清見","きよみ");
	regMem[22] = new set_regMem(63,"小嶋","こじま");
	regMem[23] = new set_regMem(64,"古川","ふるかわ");
	regMem[24] = new set_regMem(67,"栄里子","えり");
	regMem[25] = new set_regMem(72,"植田","うえだ");
	regMem[26] = new set_regMem(73,"一柳","いちりゅう");
	regMem[27] = new set_regMem(74,"徳武","とくたけ");
	regMem[28] = new set_regMem(75,"疋田","ひきだ");
	regMem[29] = new set_regMem(76,"名越","なごし");
	regMem[30] = new set_regMem(77,"宮田","みやた");
	regMem[31] = new set_regMem(78,"ひろみ","ひろみ");
	regMem[32] = new set_regMem(79,"キム","きむ");
	regMem[33] = new set_regMem(80,"福山","ふくやま");
	regMem[34] = new set_regMem(82,"片山","かたやま");
	regMem[35] = new set_regMem(84,"宮脇","みやわき");
	regMem[36] = new set_regMem(85,"大朝","おおとも");
	regMem[37] = new set_regMem(87,"浪江","なみえ");
	regMem[38] = new set_regMem(88,"齊藤","さいとう");
	regMem[39] = new set_regMem(89,"日高","ひだか");
	regMem[40] = new set_regMem(90,"田熊","たぐま");
	regMem[41] = new set_regMem(91,"井関","いせき");
	regMem[42] = new set_regMem(100,"角コーチ","すみ");
	regMem[43] = new set_regMem(149,"菊池","きくち");
	regMem[44] = new set_regMem(165,"大勝","おおかつ");
	regMem[45] = new set_regMem(177,"古田","ふるた");
	regMem[46] = new set_regMem(277,"南木","なんぼく");
	regMem[47] = new set_regMem(281,"西崎","にしざき");
	regMem[48] = new set_regMem(92,"大川","おおかわ");
	regMem[49] = new set_regMem(93,"平岡","ひらおか");
	regMem[50] = new set_regMem(66,"荒本","あらもと");
	regMem[51] = new set_regMem(298,"飯田","いいだ");
	regMem[52] = new set_regMem(94,"宮本","みやもと");
	regMem[53] = new set_regMem(96,"松下","まつした");
	regMem[54] = new set_regMem(301,"大朝J","おおともじ");
	regMem[55] = new set_regMem(95,"澤田","さわだ");
};

function set_regMem(id, dispName, nickname){	   //
	this.id = id;
	this.dispName = dispName;
	this.nickname = nickname;
}

// IDから名前の取得（内部テーブルから）
function get_NameFromTbl(idNum){
	var i;
	var retStr = null;
	for(i in regMem){
		if(regMem[i].id == idNum){
//alert(i);
			retStr = regMem[i].dispName;
			break;
		}
	}
	
	return retStr;
}

// IDから名前の取得
function get_NameFromID(idNum)
{
	var Member = ncmb.DataStore("member");
	var strName = get_NameFromTbl(+idNum);
	
	if(strName == null)
	{
		strName = "ID:" + idNum;		// ★暫定でID入力
		Member
			.equalTo("ID", +idNum)
			.fetchAll()
			.then(function(results){
				var object = results[0];

				if(object.length != 0){
					strName = object.name;
					regMem[regMem.length] = new set_regMem(+idNum,strName,"");
				}else{
					alert("該当IDがありません");
					strName = idNum;
				}
			})
			.catch(function(err){
				alert("該当IDがありません"+err);
				strName = idNum;
			});
	};
	return( strName );
}


// 日毎テーブル作成
function makeDailyTbl()
{
	var Score = ncmb.DataStore( ThisScoreTbl );
	
	Score	.order("date")
			.count()
			.fetchAll()
			.then(function(results){
//				  alert("results.count : "+results.count);
				makeDailyManageTbl(results.count);
			})
			.catch(function(err){
				alert("err1:"+err);
			})
	
}




// 日毎管理テーブル作成 //
function makeDailyManageTbl(totalNum)
{
	var Score = ncmb.DataStore( ThisScoreTbl );
	var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
	var totalTbl = new TotalTbl();
	var DailyStore = ncmb.DataStore("DailyManageTbl");
	var dailyStore = new DailyStore();
	var tblInfo = new Object();
	var ScoreLatest;
	var manageLatest;
		Score
			.order("updateDate", true)
			.count()
			.limit(1)
			.fetchAll()
			.then(function(resultScore){
				ScoreLatest = resultScore[0].updateDate;
				TotalTbl
					.fetchAll()
					.then(function(resultManage){
						if( ChkDailyRefresh(ScoreLatest, resultManage) == true )	/* リフレッシュありならば */
						{
							totalTbl
								.set("dailyLatest", ScoreLatest)					// 日毎更新日時保存
								.set("rankLatest", resultManage[0].rankLatest)		// その他のデータは保持
								.save()
								.then(function(resultSave){
									
								})
								.catch(function(err){
										alert("makeDailyManageTbl save Err :" + err);
								});
							// 削除
							DailyStore
								.fetchAll()
								.then(function(resultDelete){
									var i;
									for(i=0; i<resultDelete.length; i++){
										resultDelete[i].delete();
									}
									tblInfo.ptrNum = 0;
									tblInfo.bkDate = "";
									tblInfo.totalDate = 0;
									tblInfo.scoreNum = 0;
									
									makeDailyManageTbl_per100(totalNum, tblInfo);
								})
								.catch(function(err){
									alert("makeDailyManageTbl delete Err :" + err);
								});
							
						}
						else
						{
							//完了!(更新なし)
//							  alert("更新なし");
							finishDailyStore();
						}
					})
					.catch(function(err){
						alert("makeDailyManageTbl2 Err :" + err);
					})

				})
				.catch(function(err){
					alert("makeDailyManageTbl Err :" + err);
				})

}

// 日毎データ更新チェック
// true:データなし　又は更新時間が異なる
function ChkDailyRefresh(ScoreLatest, resultManage)
{
	var ret = false;
	
	if(resultManage.length == 0)
	{
		ret = true;
	}
	else
	if(ScoreLatest != resultManage[0].dailyLatest)
	{
		resultManage[0].delete();
		ret = true;
	}
	
	return ret;
}


// 日毎管理テーブル作成 100ずつ //
function makeDailyManageTbl_per100(totalNum, tblInfo)
{
	var Score = ncmb.DataStore(ThisScoreTbl);

	Score
		.order("date")
		.skip(tblInfo.ptrNum)
		.fetchAll()
		.then(function(results){
			var i;
			for(i=0; i<results.length; i++)
			{
				tblInfo.scoreNum++;
				if(tblInfo.bkDate != results[i].date)
				{
					if(tblInfo.totalDate != 0){
						saveDailyDate( tblInfo.bkDate, tblInfo.scoreNum/4, false );
					}
					tblInfo.totalDate++;
					tblInfo.scoreNum=0;
					tblInfo.bkDate = results[i].date;
				}
			}
			// 終了確認 //
			tblInfo.ptrNum += results.length;
			if(tblInfo.ptrNum == totalNum)
			{
				//完了!
				tblInfo.scoreNum++;
				saveDailyDate( tblInfo.bkDate, tblInfo.scoreNum/4, true );
//				alert("tblInfo.totalDate = " + tblInfo.totalDate);
				finishDailyStore();
			}
			else
			{
				makeDailyManageTbl_per100(totalNum, tblInfo);
			}
		})
		.catch(function(err){
			alert("err2:"+err);
		});
}



/* 日毎管理テーブル 1データ保存 */
function saveDailyDate( date, game, finalDt )
{
	var DailyStore = ncmb.DataStore("DailyManageTbl");
	var dailyStore = new DailyStore();
	
	dailyStore	
		.set("date", date)
		.set("gameNum", game)
		.save()
		.then(function(dailyStore){
			if(finalDt == true)
			{
//				alert("complete!");
			}
		})
		.catch(function(err){
			alert("saveDailyDate error : " + err);
		});
	
}


/* 日毎管理テーブル作成後の処理 */
function finishDailyStore()
{
	getDailyTblInfo();
}

/* 日毎管理テーブル情報取得 */
function getDailyTblInfo()
{
	var DailyStore = ncmb.DataStore("DailyManageTbl");
	
	DailyStore
		.order("date")
		.fetchAll()
		.then(function(dailyRslt){
			makeDailyMasterDisplay(dailyRslt);
		})
		 .catch(function(err){
			alert("getDailyTblInfo error : " + err);
		});
   
}

/* 詳細画面作成 */
function makeDetailTbl(rslt)
{
	var ptrNum = 0;
	var Score = ncmb.DataStore( ThisScoreTbl );
	Score
		.equalTo("date",rslt.date)
		.order("gameNo")
		.count()
		.fetchAll()
		.then(function(detailRslt){
			makeDetailTbl_per100(detailRslt, ptrNum, rslt.date);
		})
		.catch(function(err){
			alert("makeDetailTbl error : " + err);
		});
	
}

/* 詳細画面作成 100ずつ */
function makeDetailTbl_per100(detailRslt, ptrNum, date)
{
	var Score = ncmb.DataStore( ThisScoreTbl );
	ptrNum += 100;
	/* 全データ取得ならば */
	if( detailRslt.count <= ptrNum )
	{
		makeDetailDisplay(detailRslt);
	}
	else
	{
	/* まだデータ必要ならば */
		Score
			.equalTo("date",date)
			.order("gameNo")
			.skip(ptrNum)
			.fetchAll()
			.then(function(detailRsltNext){
				/* データをコピーして次の100データ取得 */
				Array.prototype.push.apply(detailRslt, detailRsltNext);
				makeDetailTbl_per100(detailRslt, ptrNum, date);
			})
			 .catch(function(err){
				alert("makeDetailTbl_per100 error : " + err);
			});
	}
}

// 成績表管理関数
var gbl_RankTbl;
function manageRankTbl(CB_func)
{
    var rslt;
    
    if(gbl_RankTbl != null)
    {
        rslt = gbl_RankTbl;
        CB_func(rslt);                  // コールバック関数実行
    }
    else
    {
        makeRankTbl(CB_func)
    }
}


// 成績表作成 //
var gbl_totalScoreNum=0;	//スコア総数
function makeRankTbl(CB_func)
{
	var Score = ncmb.DataStore( ThisScoreTbl );
	var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
	var totalTbl = new TotalTbl();
	var scoreLatest;
	var resultManage;
	var totalNum;

	Score
		.order("updateDate", true)
		.count()
		.fetchAll()
		.then(function(resultScore){
			scoreLatest = resultScore[0].updateDate;	// 更新日時取得
			gbl_totalScoreNum = resultScore.count;
			TotalTbl
				.fetchAll()
				.then(function(resultManage){
					// 更新ありならば
					if( chkRankRefresh(scoreLatest, resultManage) )
					{
						totalTbl
							.set("rankLatest", scoreLatest)
							.set("dailyLatest", resultManage[0].dailyLatest)	// その他のデータは保持
							.save()
							.then(function(rslt){
							})
							.catch(function(err){
								alert("makeRankTbl3 err:"+err);
							})
						remakeRankTbl(CB_func);	// 成績表更新
					}
					else
					{
						finishMakeRankTbl(CB_func);	  // 成績表作成完了! (更新なし)
					}
				})
				.catch(function(err){
					alert("makeRankTbl2 err:"+err);
				});
				
		})
		.catch(function(err){
			alert("makeRankTbl1 err:"+err);
		});

}

// 成績表更新
function remakeRankTbl()
{
	var RankScore = ncmb.DataStore( "Rank" );
   
	// 成績表削除
	RankScore
		.fetchAll()
		.then(function(results){
			for(var i=0; i<results.length; i++)
			{
				results[i].delete();
			}
			
			getMemberTbl(); // メンバーテーブル作成
			
		})
		.catch(function(err){
			alert("remakeRankTbl err:" + err);
		});
   
   
}

// 会員のデータ取得
var gbl_memberDB;	  // メンバーデータベース
function getMemberTbl ()
{
	var MemberTbl = ncmb.DataStore("member");
	var memInfo = new Object();
	MemberTbl
		.order("ID")
		.count()
		.fetchAll()
		.then(function(memRslt){
			
			memInfo.ptrNum = 0;
			makeMemberTbl_per100(memRslt, memInfo);
		})
		.catch(function(err){
			alert("getMemberTbl err" + err);
		});
}

// 会員のデータ取得 100ずつ
function makeMemberTbl_per100(memRslt, memInfo)
{
	var MemberTbl = ncmb.DataStore("member");

	memInfo.ptrNum += 100;
	
	if( memInfo.ptrNum < memRslt.count )
	{
		MemberTbl
			.order("ID")
			.skip(memInfo.ptrNum)
			.fetchAll()
			.then(function(nextMemRslt){
				Array.prototype.push.apply(memRslt, nextMemRslt);	// 結果合成
				makeMemberTbl_per100(memRslt, memInfo);
			})
			.catch(function(err){
				alert("makeMemberTbl_per100 err:" +err);
			});
	}
	else
	{	// データ取得完了!
		gbl_memberDB = memRslt.concat();
        gbl_memberDB.count = memRslt.count;
		finishmakeMemberTbl();
	}
}

// 会員のデータ取得完了時
function finishmakeMemberTbl()
{
	var tblInfo = new Object()

	tblInfo.ptrNum = 0;		//　解析中のデータ数(100ずつ)
	tblInfo.bkID = "";
	tblInfo.totalIDNum = 0; //	IDの総数(種類)
	tblInfo.gameNum = 0;	//	試合数
	tblInfo.pt = 0;			//	ポイント
	tblInfo.winNum = 0;		//	勝利数
	
	makeRankTbl_per100(gbl_totalScoreNum, tblInfo);
	
}

// メンバーデータ取得
function getMemberData(tblInfo)
{
alert("gbl_memberDB.count:"+gbl_memberDB.count);
    for(var i=0; i<gbl_memberDB.count; i++)
    {
alert("tblInfo.dispName:"+tblInfo.dispName+":"+typeof(tblInfo.dispName)+"\n"+
       "gbl_memberDB[i].ID:" + gbl_memberDB[i].ID + ":" + typeof(gbl_memberDB[i].ID) );        
        if(tblInfo.bkID == +gbl_memberDB[i].ID)
        {
            tblInfo.dispName = gbl_memberDB[i].dispName;
            tblInfo.HDCP = gbl_memberDB[i].HDCP;
            return tblInfo;
        }
    }
    alert("該当IDなし ID:" + tblInfo.bkID);
    return tblInfo;
}

// 成績表作成 100ずつ
function makeRankTbl_per100(totalNum, tblInfo)
{
	var Score = ncmb.DataStore(ThisScoreTbl);
	
	Score
		.order("ID")
		.skip(tblInfo.ptrNum)
		.fetchAll()
		.then(function(results){
			for(var i=0; i<results.length; i++)
			{
				tblInfo.scoreNum++;
				tblInfo.gameNum++;					//	試合数
				tblInfo.pt += results[i].gamePt;	 //	 ポイント
				if(results[i].gamePt==5)
				{
					tblInfo.winNum++;				//	勝利数
				}

				if(tblInfo.bkID != results[i].ID)
				{
					if(tblInfo.totalIDNum != 0){	 //初回以外なら
						saveRankData( tblInfo );
					}
					tblInfo.totalIDNum++;
					tblInfo.gameNum = 0;
					tblInfo.winNum = 0;
					tblInfo.pt = 0;
					tblInfo.bkID = results[i].ID;
				}
			}
			// 終了確認 //
			tblInfo.ptrNum += results.length;
			if(tblInfo.ptrNum == totalNum)		// 最後のデータはまだ保存していないのでここで保存
			{
				//完了!
				tblInfo.gameNum++;
				saveRankData( tblInfo );
				finishMakeRankTbl(CB_func);
			}
			else
			{
				makeRankTbl_per100(totalNum, tblInfo);
			}
		})
		.catch(function(err){
			alert("err2:"+err);
		});


}

// 成績表 データベースへ保存
function saveRankData( tblInfo )
{
	var MemberTbl = ncmb.DataStore( "member" );
	var RankScore = ncmb.DataStore( "Rank" );
	var rankScore = new RankScore();	

    tblInfo = getMemberData(tblInfo);

	rankScore
		.set("ID", +tblInfo.bkID)
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
			alert("saveRankData rankScore err:" + err);
		});

}

// 成績表テーブル作成完了
function finishMakeRankTbl(CB_func)
{
	var RankScore = ncmb.DataStore( "Rank" );
    var thrGameNum;        // ゲーム数閾値

	RankScore
		.order("ID")
		.fetchAll()
		.then(function(rslt){
            // ソート作業
            thrGameNum = getGameNumAvg(rslt);       // ゲーム数閾値取得
            rslt = sortRankData(rslt, thrGameNum);
            gbl_RankTbl = rslt;
            
            // 表示！
//			makeRankDisplay(rslt);
            CB_func(rslt);
		})
		.catch(function(err){
			alert("finishMakeRankTbl err:"+err);
		});
}

// ランキング ソート
function sortRankData(rslt, thrGameNum)
{
    var invalArr;       // 無効配列
    var tmpArr;
    var validPtr=0;
    var invalPtr=0;
    
    var btmPt=rslt.length-1;
    var validNum=0;
    // ソート

    // 有効・無効判定 / 有効は前半、無効は後半に移動する
    for(var topPt = 0; topPt<btmPt; topPt++)
    {
        if( chkValidDat(rslt[topPt].gameNum, thrGameNum)==false )
        {
            for(;btmPt>topPt;btmPt--)
            {
                if( chkValidDat(rslt[btmPt].gameNum, thrGameNum)==true )
                {
                    var tmp = rslt[topPt];
                    rslt[topPt] = rslt[btmPt];
                    rslt[btmPt] = tmp;
                    break;
                }
            }
        }
    }

    rslt.validNum = btmPt;  // 有効データ数を格納

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

function chkValidDat(gameNum, thrGameNum)
{
    if(gameNum > thrGameNum)
    {
        return true;    // 有効
    }
    else
    {
        return false;   // 無効
    }
}

// 平均ゲーム数算出
function getGameNumAvg(rslt)
{
    var sum=0;
    
    for(var i=0; i<rslt.length; i++)
    {
        sum += rslt[i].gameNum;
    }
    return (sum/(rslt.length));
}

// 成績表更新チェック
// true:データなし　又は更新時間が異なる
function chkRankRefresh(ScoreLatest, resultManage)
{
	var ret = false;
	
	if(resultManage.length == 0)
	{
		ret = true;
	}
	else
	if(ScoreLatest != resultManage[0].rankLatest)
	{
		resultManage[0].delete();
		ret = true;
	}
	
	return ret;

}


function get_gameDetail(date, gameNo)
{
    var Score = ncmb.DataStore( ThisScoreTbl );

//    gameNo++;   // ??

	Score	.equalTo("date", date)
            .equalTo("gameNo", gameNo)
            .order("row")
            .fetchAll()
//            .then(dispGameDetailWindow(rslt))
            .then(function(rslt){
                dispGameDetailWindow(rslt);
            })
            .catch(function(err){
                alert("get_gameDetail err:" + err);
            });
    
}