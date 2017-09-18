var Exporter = function(){
	var me = {};

	// build text based BDCFF format
	me.buildBDCFF = function(){
		var level = Editor.getLevel();

		var result = {};
		result.width = level.width;
		result.height = level.height;
		result.map = [];
		var counter = 0;
		for (var y = 0; y<level.height; y++){
			var line = "";
			for (var x = 0; x<level.width; x++){
				line += level.map[counter].code;
				counter ++;
			}
			result.map.push(line);
		}
		return result;
	};

	// build binary EMV6 cave
	me.buildEMV6 = function(){
		var level = Editor.getLevel();
		var result = new Uint8Array(2172);
		var player1Offset = 65;

		var offset = 0;
		for (var y = 0; y<level.height; y++){
			for (var x = 0; x<level.width; x++){
				var code = level.map[offset].code;
				result[offset] = BDCFFToEMC[code] || 128;
				if (code === "P1") player1Offset = offset;
				offset ++;
			}
		}
		console.error(player1Offset);

		offset = 2048-1;
		result[offset] = 116; // end byte
		offset++;

		// yam data
		for (var i = 0; i<36; i++){
			result[offset] = 128;
			offset++;
		}


		result[offset] = 1;  // emeraldscore
		result[offset+1] = 10;  // diamond score
		result[offset+2] = 0;  // robot score
		result[offset+3] = 0;  // ship score

		result[offset+4] = 0;  // bug score
		result[offset+5] = 0;  // yam score
		result[offset+6] = 0;  // nut score
		result[offset+7] = 0;  // dynamite score

		result[offset+8] = 0;  // key score
		result[offset+9] = 0;  // time score
		result[offset+10] = 100;  // available time
		result[offset+11] = 10;  // dimaonds to collect

		result[offset+12] = Math.floor(player1Offset/256);  // player 1 offset
		result[offset+13] = player1Offset%256;  // player 1 offset


		result[offset+14] = 0;  // player 2 offset
		result[offset+15] = 0;  // player 2 offset

		for (i = offset+16; i<2172; i++){
			result[i] = 0;
		}


		return result;
	};



	return me;
}();