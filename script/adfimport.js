var AdfImport = function(){
    var me = {};

    var engine = "EM4"; // levels in pla folder

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
                            var levelContent = ADF.readFileAtSector(levelFile.sector,true);
                            if (levelContent && levelContent.content && levelContent.content.length){
                                var result = {
                                    width: 64,
                                    height: 32,
                                    map: [],
                                    unknown: []
                                };
                                var line = "";
                                var index = 0;
                                for (var y = 0; y < 32; y++){
                                    line = "";
                                    for (var x = 0; x < 64; x++){
                                        var b = levelContent.content[index];
                                        var code = convertEmcV1(b);
                                        if (code == "**"){
                                            result.unknown.push(b);
                                        }
                                        line += code;
                                        index++;
                                    }
                                    result.map.push(line);
                                }

                                // yam data
                                for (var yam = 0; yam < 4; yam++){
                                    for (i = 0; i < 9; i++){
                                        var yamObject = levelContent.content[index];
                                        index++;
                                    }
                                }

                                result.EmeraldValue = levelContent.content[index++];
                                result.DiamondValue = levelContent.content[index++];
                                result.RobotValue = levelContent.content[index++];
                                result.TankValue = levelContent.content[index++];
                                result.BugValue = levelContent.content[index++];
                                result.YamValue = levelContent.content[index++];
                                result.NutValue = levelContent.content[index++];
                                result.DynamiteValue = levelContent.content[index++];
                                result.KeyValue = levelContent.content[index++];
                                result.TimeBonus = levelContent.content[index++];
                                result.Time = levelContent.content[index++];
                                result.DiamondsNeeded = levelContent.content[index++];

                                result.Player1Offset = levelContent.content[index++] * 256 + levelContent.content[index++];
                                result.Player2Offset = levelContent.content[index++] * 256 + levelContent.content[index++];
                                result.AmoebaRate = levelContent.content[index++] * 256 + levelContent.content[index++];
                                result.MagicWallTime = levelContent.content[index++] * 256 + levelContent.content[index++];
                                result.WheelTime = levelContent.content[index++] * 256 + levelContent.content[index++];


                                var player1X = Math.floor(result.Player1Offset % 64);
                                var player1Y = Math.floor(result.Player1Offset / 64);
                                line = result.map[player1Y];
                                line = line.substr(0,player1X*2) + "P1" + line.substr((player1X*2)+2);
                                result.map[player1Y] = line;

                                console.log(result);

                                if (next) next(result);
                            }else{
                                noFile();
                            }
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

    return me;
}();