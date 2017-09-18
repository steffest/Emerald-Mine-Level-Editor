var Editor = function(){
	var me = {};
	var canvas, ctx,tiles;
	var infoBox,selectBox;
	var selectionBox, selectionBoxContext;
	var level = {};
	var zoom = 0;
	var selectedIndex = 0;
	var selectedElement = Emerald.objects.empty;
	var pickerCount = 0;
	var Picker = {};
	var currentFileName;
	var currentIndex;
	var importIndex;
	var importFunction;

	me.init = function(next){
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		infoBox = document.getElementById("info");
		selectBox = document.getElementById("selectbox");

		selectionBox = document.getElementById("selectionBox");
		selectionBoxContext = selectionBox.getContext("2d");

		Picker.main = [
			Emerald.objects.empty,
			Emerald.objects.dirt,
			Emerald.objects.player,
			Emerald.objects.player2,
			Emerald.objects.rock,
			Emerald.objects.exit,
			Emerald.objects.wall,
			Emerald.objects.stoneWall,
			Emerald.objects.emerald,
			Emerald.objects.diamond,
			Emerald.objects.bomb,
			Emerald.objects.nut,
			Emerald.objects.dynamite,
			Emerald.objects.dynamiteActive1,
			Emerald.objects.quickSand,
			Emerald.objects.quickSandRock,
			Emerald.objects.magicWall,
			Emerald.objects.amoeba,
			Emerald.objects.spring,
			Emerald.objects.magicBall
		];

		Picker.enemies = [
			Emerald.objects.bugLeft,
			Emerald.objects.bugUp,
			Emerald.objects.bugRight,
			Emerald.objects.bugDown,
			Emerald.objects.tankLeft,
			Emerald.objects.tankUp,
			Emerald.objects.tankRight,
			Emerald.objects.tankDown,
			Emerald.objects.yamLeft,
			Emerald.objects.yamUp,
			Emerald.objects.yamRight,
			Emerald.objects.yamDown,
			Emerald.objects.robot,
			Emerald.objects.robotWheel
		];

		Picker.doors = [
			Emerald.objects.doorBlue,
			Emerald.objects.doorGreen,
			Emerald.objects.doorRed,
			Emerald.objects.doorYellow,
			Emerald.objects.keyBlue,
			Emerald.objects.keyGreen,
			Emerald.objects.keyRed,
			Emerald.objects.keyYellow,
			Emerald.objects.doorGreyBlue,
			Emerald.objects.doorGreyGreen,
			Emerald.objects.doorGreyRed,
			Emerald.objects.doorGreyYellow
		];

		Picker.walls = [
			Emerald.objects.wall,
			Emerald.objects.stoneWall,
			Emerald.objects.slipperyWall
		];

		Picker.text = [
			Emerald.objects.charA,
			Emerald.objects.charB,
			Emerald.objects.charC,
			Emerald.objects.charD,
			Emerald.objects.charE,
			Emerald.objects.charF,
			Emerald.objects.charG,
			Emerald.objects.charH,
			Emerald.objects.charI,
			Emerald.objects.charJ,
			Emerald.objects.charK,
			Emerald.objects.charL,
			Emerald.objects.charM,
			Emerald.objects.charN,
			Emerald.objects.charO,
			Emerald.objects.charP,
			Emerald.objects.charQ,
			Emerald.objects.charR,
			Emerald.objects.charS,
			Emerald.objects.charT,
			Emerald.objects.charU,
			Emerald.objects.charV,
			Emerald.objects.charW,
			Emerald.objects.charX,
			Emerald.objects.charY,
			Emerald.objects.charZ
		];

		Picker.cipher = [
			Emerald.objects.char0,
			Emerald.objects.char1,
			Emerald.objects.char2,
			Emerald.objects.char3,
			Emerald.objects.char4,
			Emerald.objects.char5,
			Emerald.objects.char6,
			Emerald.objects.char7,
			Emerald.objects.char8,
			Emerald.objects.char9
		];

		Picker.chars = [
			Emerald.objects.charArrowRight,
			Emerald.objects.charExclamation,
			Emerald.objects.charQuestion,
			Emerald.objects.charDot
		];

		Picker.special = [
			Emerald.objects.exitOpen1,
			Emerald.objects.magicWallActive,
			Emerald.objects.fakeSpace,
			Emerald.objects.fakeDirt,
			Emerald.objects.poisionDirt,
			Emerald.objects.amoebaDrop

		];

		tiles = new Image();
		tiles.onload = function(){
			console.log("sprites loaded");
			if (next) next();
		};
		tiles.src = "img/editor_sprites.png";


		canvas.onmousedown = function(e){

			var scaleX = canvas.clientWidth / canvas.width;
			var scaleY = canvas.clientHeight / canvas.height;


			var x = Math.floor((e.offsetX/scaleX)/32);
			var y = Math.floor((e.offsetY/scaleY)/32);
			me.setMaptile(x,y,selectedElement);
			canvas.isMousedown = true;
		};
		canvas.onmousemove = function(e){

			var scaleX = canvas.clientWidth / canvas.width;
			var scaleY = canvas.clientHeight / canvas.height;

			var x = Math.floor((e.offsetX/scaleX)/32);
			var y = Math.floor((e.offsetY/scaleX)/32);


			if (canvas.isMousedown){
				me.setMaptile(x,y,selectedElement);
			}

			var index = (y * level.width) + x;
			var code = level.map[index].code;
			var name = level.map[index].name || "";

			if (level.data.originalData) code += " - " + level.data.originalData[index];

			me.setInfoText(x + "," + y + ": " + name + " (" + code + ")");

			selectBox.style.left = x*scaleX*32 + "px";
			selectBox.style.top = y*scaleY*32 + "px";
			selectBox.style.width = scaleX*32 + "px";
			selectBox.style.height = scaleY*32 + "px";


		};
		canvas.onmouseup = function(e){
			canvas.isMousedown = false;
		};
	};

	me.buildObjectPicker = function(){
		me.buildObjectPickerSection("Main",Picker.main);
		me.buildObjectPickerSection("Enemies",Picker.enemies);
		me.buildObjectPickerSection("Doors",Picker.doors);
		me.buildObjectPickerSection("Walls",Picker.walls);
		me.buildObjectPickerSection("ABC",Picker.text);
		me.buildObjectPickerSection("123",Picker.cipher);
		me.buildObjectPickerSection("?.!",Picker.chars);
		me.buildObjectPickerSection("Special",Picker.special);
	};

	me.buildObjectPickerSection = function(name,objects){
		pickerCount++;
		var paletteContainer = document.createElement("div");

		var label = document.createElement("div");
		label.innerHTML = name;
		label.className = "pickerlabel";
		label.id = "picker" + pickerCount;
		label.onclick = function(){
			me.activatePicker(parseInt(this.id.substr(6)));
		};

		var d = document.createElement("div");
		d.id = "palette" + pickerCount;
		d.className = "palette";
		if (pickerCount>1) d.className += " collapsed";

		var palette = document.createElement("canvas");
		palette.width = 64;
		palette.height = Math.ceil(objects.length/2) * 32;
		d.appendChild(palette);

		var paletteContext = palette.getContext("2d");
		paletteContext.fillStyle = "black";
		paletteContext.fillRect(0,0,palette.width,palette.height);

		var counter = 0;
		objects.forEach(function(o){
			var spriteIndex = o.spriteIndex;
			var coX = (counter % 2) * 32;
			var coY = Math.floor(counter / 2) * 32;

			if (spriteIndex){
				var tileX = (spriteIndex % 10) * 32;
				var tileY = Math.floor(spriteIndex/10) * 32;
				paletteContext.drawImage(tiles,tileX,tileY,32,32,coX,coY,32,32);
			}
			counter++;
		});
		me.selectElement(0);

		palette.onclick = function(e){
			var x = Math.floor(e.offsetX/32);
			var y = Math.floor((e.offsetY)/32);
			console.log(x,y);
			me.selectElement((y*2) + x,objects);
		};

		var picker = document.getElementById("picker");
		paletteContainer.appendChild(label);
		paletteContainer.appendChild(d);
		picker.appendChild(paletteContainer);
	};

	me.activatePicker = function(index){
		console.log(index);

		for (var i = 1; i<=pickerCount; i++){
			var picker = document.getElementById("palette" + i);
			if (!picker) continue;

			if (index == i){
				if (picker.className.indexOf("collapsed")>=0){
					picker.className = "palette";
				}else{
					picker.className = "palette collapsed";
				}

			}else{
				picker.className = "palette collapsed";
			}
		}
	};

	me.selectElement = function(index,palette){
		palette = palette || Picker.main;
		selectedIndex = index;
		selectedElement = palette[selectedIndex];
		var spriteIndex = selectedElement.spriteIndex;

		var tileX = (spriteIndex % 10) * 32;
		var tileY = Math.floor(spriteIndex / 10) * 32;

		selectionBoxContext.fillRect(0,0,64,64);
		selectionBoxContext.drawImage(tiles,tileX,tileY,32,32,0,0,64,64);
	};

	var initLevel = function(levelData){
		var counter = 0;
		level.map = [];
		level.data = levelData;
		console.log(levelData);
		level.width = levelData.width;
		level.height = levelData.height;

		for (var y = 0; y<level.height; y++){
			var line = levelData.map[y];
			for (var x = 0; x<level.width; x++){
				var code = line.substr(x * 2,2);

				var object = Emerald.objectForCode(code);
				if (!object){
					console.warn("Unknown object " + code);
					object = Emerald.objects.unknown;
				}
				level.map[counter] = object;
				counter ++;
			}
		}

		me.drawLevel();
	};

	me.loadLevel = function(levelName){
		var counter = 0;
		level.map = [];
		if (levelName){

			if (levelName.indexOf(".adf")>0){
				AdfImport.import(levelName,function(levelData){
					if (!levelData){
						console.error("Disk doesn't contain this level")
					}else{
						if (levelData.unknown && levelData.unknown.length) console.error("Level contains unknown objects: ", levelData.unknown);
						me.parseBDCFFLevel(levelData);
					}
				});
			}else{
				//Y.level.loadFromUrl("../levels/" + levelName + ".json",function(levelData){
				//
				//    me.parseBDCFFLevel(levelData);
				//});
			}
		}else{
			me.clearLevel();
		}
	};

	me.clearLevel = function(){
		level.map = [];
		level.width = 64;
		level.height = 32;
		level.data = {
			EmeraldValue: 1,
			DiamondValue: 3,
			Time: 100,
			PointsNeeded: 0
		};

		var counter = 0;
		for (var y = 0; y<level.height; y++){
			for (var x = 0; x<level.width; x++){
				var object = Emerald.objects.dirt;
				if (x==0 || x==63 || y==0 || y==31) object = Emerald.objects.wall;
				if (x==1 && y==1) object = Emerald.objects.player;
				level.map[counter] = object;
				counter ++;
			}
		}
		me.drawLevel();
	};

	me.loadDisk = function(diskName){
		var counter = 0;
		level.map = [];
		AdfImport.openDisk(diskName,function(data){
				EventBus.trigger(EVENT.diskLoaded,data);
		});
	};

	me.drawLevel = function(){
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,canvas.width,canvas.height);

		for (var x = 0; x<level.width; x++){
			for (var y = 0; y<level.height; y++){
				var i = y*level.width + x;
				var object = level.map[i];
				me.drawObject(x,y,object);
			}
		}
	};

	me.getLevel = function(){
		return level;
	};

	me.getCurrentFileName = function(){
		return currentFileName;
	};

	me.getCurrentIndex = function(){
		return currentIndex;
	};

	me.putLevel = function(){
		Api.updateLevel(level,function(){
			if (importFunction) importFunction();
		});
	};

	me.importDisk = function(){
		var elms = document.querySelector(".levellist").querySelectorAll("div");
		importIndex = 0;

		importFunction = function(){
			if (importIndex<elms.length){
				console.log("importing file " + importIndex);
				elms[importIndex].click();
				importIndex++;
			}else{
				importFunction = undefined;
			}
		};

		importFunction();

	};

	me.setMaptile = function(x,y,object){

		if (object.code === Emerald.objects.player.code || object.code === Emerald.objects.player2.code){
			me.replaceMap(object,Emerald.objects.empty);
		}

		var index = (y * level.width) + x;
		level.map[index] = object;
		me.drawObject(x,y,object);
	};

	me.replaceMap = function(from,to){
		for (var x = level.width-1; x>=0; x--){
			for (var y = level.height-1; y>=0; y--){
				var index = (y * level.width) + x;
				if (level.map[index].code === from.code) me.setMaptile(x,y,to);
			}

		}
	};

	me.drawObject = function(x,y,object){

		var spriteIndex = object.spriteIndex;
		var coX = x*32;
		var coY = y*32;

		ctx.fillRect(coX,coY,32,32);
		if (spriteIndex){
			var tileX = (spriteIndex % 10) * 32;
			var tileY = Math.floor(spriteIndex  / 10) *  32;

			//console.error(tileX,tileY,coX,coY);
			ctx.drawImage(tiles,tileX,tileY,32,32,coX,coY,32,32);
		}

	};

	me.toggleZoom = function(){
		if (zoom){
			zoom = 0;
		}else{
			zoom = 1;
		}
		canvas.className = "zoom" + zoom;
	};

	me.zoomToFit = function(){
		canvas.className = "zoomFit";
	};

	me.export = function(){
		//var output = document.getElementById("exportoutput");
		//output.value = JSON.stringify(me.buildBDCFF(),null, 2);
		//var panel = document.getElementById("export");
		//panel.style.display = "block";

		var data = Exporter.buildEMV6();
		console.error(data);

		//var sData = base64js.fromByteArray(data);
		//console.error(sData);

		var b = new Blob([data], {type: "octet/stream"});
		saveAs(b,"export.level");

	};

	me.closeExport = function(){
		var panel = document.getElementById("export");
		panel.style.display = "none";
	};

	me.play = function(){
		console.error("saving");
		//localStorage.setItem("BDCFFLevel",JSON.stringify(me.buildBDCFF()));

		var sData = base64js.fromByteArray(Exporter.buildEMV6());
		localStorage.setItem("EMCLevel",sData);
		console.error(sData);

		console.error("starting player");
		window.open("../src/dev.html?editor=true");
	};

	me.editScores=function(){
		var blanket = document.getElementById("blanket");
		blanket.style.display = "block";

		var panels = document.getElementById("panels");

		var container = document.getElementById("scorepanel");
		if (!container){
			container = document.createElement("div");
			container.id = "scorepanel";
			container.className = "panel";

			var caption = document.createElement("div");
			caption.className = "caption";
			caption.innerHTML = "Score";
			container.appendChild(caption);

			var content = document.createElement("div");
			content.id = "scorepanelcontent";
			container.appendChild(content);

			var button = document.createElement("div");
			button.className = "button";
			button.innerHTML = "OK";
			button.onclick = me.closeScoreEditor;
			container.appendChild(button);

			panels.appendChild(container);

		}else{
			content = document.getElementById("scorepanelcontent");
		}

		var scores = {
			Time: "Available Time",
			PointsNeeded: "Points Needed",
			EmeraldValue: "Emerald value",
			DiamondValue: "Diamond value",
			NutValue: "Nut value",
			RobotValue: "Robot value",
			TankValue: "Tank value",
			BugValue: "Bug value",
			YamValue: "Yam value",
			DynamiteValue: "Dynamite value",
			KeyValue: "Dynamite value",
			TimeBonus: "Time Bonus",
			MagicWallTime: "MagicWallTime",
			WheelTime: "WheelTime",
			AmoebaRate: "AmoebaRate",
			AndroidMoveTime: "AndroidMoveTime",
			AndroidCloneTime: "AndroidCloneTime",
			BallTime: "BallTime",
			LensTime: "LensTime",
			MagnifyTime: "MagnifyTime",
			WindDirection: "WindDirection"
		};

		content.innerHTML = "";
		for (var key in scores){
			if (scores.hasOwnProperty(key)){
				var line = document.createElement("div");
				line.className = "line";
				var label = document.createElement("div");
				var input = document.createElement("input");
				label.className = "label";
				label.innerHTML= scores[key];

				input.type = "text";
				input.value = level.data[key] || 0;
				line.appendChild(label);
				line.appendChild(input);
				content.appendChild(line);
			}
		}

		container.style.display = "block";
	};

	me.closeScoreEditor = function(){
		var container = document.getElementById("scorepanel");
		if (container) container.style.display = "none";

		var blanket = document.getElementById("blanket");
		blanket.style.display = "none";
	};



	me.editYam=function(){

	};

	me.setInfoText = function(s){
		infoBox.innerHTML = s;
	};

	EventBus.on(EVENT.diskLoaded,function(disk){
		// list disk

		var container = document.getElementById("toolbox");
		container.innerHTML = "";

		var caption = document.createElement("div");
		caption.className = "caption";
		caption.innerHTML = disk.label;

		var levels =  document.createElement("div");
		levels.className = "levellist";

		var counter = 0;
		disk.files.forEach(function(f){
			var elm = document.createElement("div");
			elm.innerHTML = f;
			elm.dataset.index = counter;
			elm.onclick = function(){
				var activeElm = levels.querySelector(".active");
				if (activeElm) activeElm.className = "";
				elm.className = "active";
				currentFileName = f;
				currentIndex = this.dataset.index;
				EventBus.trigger(EVENT.fileLoaded,AdfImport.openFile(f));
			};
			levels.appendChild(elm);
			counter++;
		});
		container.appendChild(caption);
		container.appendChild(levels);

		var hash = md5(ADF.getDisk().buffer);
		Api.checkHash("disk",hash,function(result){
			if (result){
				if (!result.result) {
					me.setInfoText("This disk is not yet in the database!");
				}else{
					me.setInfoText("Disk recognised as: " +result.name);
				}
			}
		});


/*      // save all levels to file
		var buffer = new Uint8Array(2172*82);
		var offset = 0;
		disk.files.forEach(function(f){
			var content = AdfImport.openFile(f);
			for (var i = 0, len = content.length; i<len; i++){
				buffer[offset] =  content[i];
				offset++;
			}
		});
		var b = new Blob([buffer], {type: "octet/stream"});
		saveAs(b,"export.level");
		*/
	});

	EventBus.on(EVENT.fileLoaded,function(file){
		if (file){
			FileConvertor.convert(file);
		}
	});

	EventBus.on(EVENT.levelLoaded,function(levelData){
		me.setInfoText("Checking ...");
		initLevel(levelData);

		if (levelData && levelData.originalData){
			var hash = md5(levelData.originalData);
			level.hash = hash;
			Api.checkHash("level",hash,function(result){
				if (result){
					if (!result.result) {
						me.setInfoText("This level is not yet in the database!")
					}else{
						me.setInfoText("Found in database: " + result.path)
					}

					if (importFunction) me.putLevel();
				}
			});
		}
	});

	return me;
}();
