var Api = function(){
	var me = {};

	var baseUrl = "http://www.emeraldmines.net/play/api/?action=";

	me.getDisk = function(id,next){
		var url = baseUrl + "getdisk&id=" + id;
		FetchService.json(url,function(data){
			next(data);
		});
	};

	me.checkHash = function(type,hash,next){
		var url = baseUrl + "gethash&type=" + type + "&hash=" + decodeURIComponent(hash);
		FetchService.json(url,function(data){
			next(data);
		});
	};

	me.updateLevel = function(levelData,next){
		var url = baseUrl + "putlevel";

		var diskHash = md5(ADF.getDisk().buffer);
		var fileName = Editor.getCurrentFileName() || "";
		var diskIndex = Editor.getCurrentIndex() || 0;


		var img = document.createElement("canvas");
		img.width = 192;
		img.height = 96;
		img.getContext("2d").drawImage(document.getElementById("canvas"),0,0,2048,1024,0,0,192,96);

		console.error(levelData);

		var data = {
			disk: diskHash,
			filename: fileName,
			diskindex: diskIndex,
			hash: levelData.hash,
			img: img.toDataURL('image/png')
		};

		FetchService.post(url,data,function(result){
			console.error(result);
			if (next) next();
		})

	};

	return me;
}();