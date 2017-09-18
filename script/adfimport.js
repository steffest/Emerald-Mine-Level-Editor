var AdfImport = function(){
    var me = {};

    var engine = "EM4"; // levels in pla folder
    var currentFolder;
    var currentFolder2;

    // em5: levels in CAVE folder

    me.import = function(url,next){
        var level = url.split(".adf/")[1];
        if (level){
            url = url.split(".adf/")[0] + ".adf";
        }else{
            level = "0";
        }

        ADF.loadDisk(url,function(succes){
            var noFile = function(){
              if (next) next(false);
            };

            if (succes){
                var root = ADF.readRootFolder();
                var levelFolder;
                for (var i = 0, len = root.folders.length; i<len;i++){
                    if (root.folders[i].name == "pla"){
                        levelFolder = root.folders[i];
                        break;
                    }
                    if (root.folders[i].name == "CAVE"){
                        engine = "EM5";
                        levelFolder = root.folders[i];
                        break;
                    }
                }
                if (levelFolder){
                    var pla = ADF.readFolderAtSector(levelFolder.sector);
                    if (pla && pla.files && pla.files.length){
                        var levelFile;
                        for (i = 0, len = pla.files.length; i<len;i++){
                            if (pla.files[i].name == level){
                                levelFile = pla.files[i];
                                break;
                            }
                        }
                        if (levelFile){
                            me.readFile(levelFile,function(result){
                                if (result){
                                    if (next) next(result);
                                }else{
									noFile();
                                }
                            })
                        }else{
                            noFile();
                        }
                    }
                }else{
                    noFile();
                }

            }else{
                noFile();
            }
        })
    };

	me.readFile = function(file){
		var adfFile = ADF.readFileAtSector(file.sector,true);
		if (adfFile && adfFile.content && adfFile.content.length) return adfFile.content;
    };

    me.openDisk = function(url,next){
        var result = {};
		ADF.loadDisk(url,function(succes){
			if (succes){
				result.label = ADF.getInfo().label;
				var root = ADF.readRootFolder();
				var levelFolder;
				var levelFolder2;
				for (var i = 0, len = root.folders.length; i<len;i++){
					if (root.folders[i].name.toLowerCase() === "pla"){
					    console.log("Disk is EMV4");
						engine = "EM4";
						levelFolder = root.folders[i];
						break;
					}
					if (root.folders[i].name === "CAVE"){
						console.log("Disk is EMV5");
						engine = "EM5";
						levelFolder = root.folders[i];
						break;
					}
                    if (root.folders[i].name === "part1"){
                        console.log("Disk is Kingsoft EM2");
                        engine = "KINGSOFT";
                        levelFolder = root.folders[i];
                    }
                    if (root.folders[i].name === "part2"){
                        console.log("found part 2");
                        levelFolder2 = root.folders[i];
                    }
				}
                result.files = [];
                var sortNumerical = true;

                if (levelFolder){
					var folder = ADF.readFolderAtSector(levelFolder.sector);
					if (folder && folder.files && folder.files.length){
						currentFolder = folder;
						result.folder = folder;
						for (i = 0, len = folder.files.length; i<len;i++){
							result.files.push(folder.files[i].name);
                            sortNumerical = sortNumerical && !isNaN(parseInt(folder.files[i].name,10));
							//console.log(folder.files[i].name);
						}
					}
				}
                currentFolder2 = undefined;
                if (levelFolder2){
                    folder = ADF.readFolderAtSector(levelFolder2.sector);
                    if (folder && folder.files && folder.files.length){
                        currentFolder2 = folder;
                        result.folder2 = folder;
                        for (i = 0, len = folder.files.length; i<len;i++){
                            result.files.push(folder.files[i].name);
                            sortNumerical = sortNumerical && !isNaN(parseInt(folder.files[i].name,10));
                        }
                    }
                }

                if (sortNumerical){
                    result.files.sort(function(a,b){return a - b;});
                }else{
                    result.files.sort();
                }
                if (next) next(result);


			}
		});
    };

    me.openFile = function(name){
		if (currentFolder && currentFolder.files && currentFolder.files.length){
			for (var i = 0, len = currentFolder.files.length; i<len;i++){
				if (currentFolder.files[i].name === name){
					return me.readFile(currentFolder.files[i]);
				}
			}
		}

        if (currentFolder2 && currentFolder2.files && currentFolder2.files.length){
            for (var i = 0, len = currentFolder2.files.length; i<len;i++){
                if (currentFolder2.files[i].name === name){
                    return me.readFile(currentFolder2.files[i]);
                }
            }
        }
    };

    return me;
}();