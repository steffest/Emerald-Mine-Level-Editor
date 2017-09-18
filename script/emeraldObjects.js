var Emerald = function(){
	var me = {};

	me.objects = {
		empty: 		{code: "  ", spriteIndex:0, name: "empty space"},
		fakeSpace: 	{code: " f", spriteIndex:1},
		wall:  		{code: "Ws", spriteIndex:10, name: "steel wall"},
		slipperyWall:{code: "WS", spriteIndex:13},
		stoneWall:	{code: "Ww", spriteIndex:12},
		dirt:  		{code: "..", spriteIndex:20, name: "dirt"},
		rock:  		{code: "rr", spriteIndex:30, name: "rock"},
		emerald: 	{code: "$1", spriteIndex:40},
		emeraldFalling: {code: "1/", spriteIndex:40},
		diamond: 	{code: "$3", spriteIndex:41},
		bomb: 		{code: "Bo", spriteIndex:31},
		nut: 		{code: "Nu", spriteIndex:49},
		player: 	{code: "P1", spriteIndex:50},
		player2: 	{code: "P2", spriteIndex:51},
		bugLeft: 	{code: "Bl", spriteIndex:60},
		bugUp: 		{code: "Bu", spriteIndex:61},
		bugRight: 	{code: "Br", spriteIndex:62},
		bugDown: 	{code: "Bd", spriteIndex:63},
		tankLeft: 	{code: "Tl", spriteIndex:64},
		tankUp: 	{code: "Tu", spriteIndex:65},
		tankRight: 	{code: "Tr", spriteIndex:66},
		tankDown: 	{code: "Td", spriteIndex:67},
		yamLeft: 	{code: "Yl", spriteIndex:73},
		yamUp: 		{code: "Yu", spriteIndex:74},
		yamRight: 	{code: "Yr", spriteIndex:75},
		yamDown: 	{code: "Yd", spriteIndex:72},
		robot: 		{code: "Ro", spriteIndex:71},
		robotWheel: {code: "Rw", spriteIndex:38},
		unknown: 	{code: "??", spriteIndex:70},
		quickSand: 	{code: "Q.", spriteIndex:28},
		quickSandRock:{code: "Qr", spriteIndex:18},
		keyGreen: 	{code: "Kg", spriteIndex:52},
		keyBlue: 	{code: "Kb", spriteIndex:42},
		keyYellow: 	{code: "Ky", spriteIndex:32},
		keyRed: 	{code: "Kr", spriteIndex:22},
		exit: 	    {code: "XX", spriteIndex:3},
		exitOpen1: 	{code: "X1", spriteIndex:2},
		exitOpen2: 	{code: "X2", spriteIndex:2},
		exitOpen3: 	{code: "X3", spriteIndex:2},
		doorRed: 	{code: "Dr", spriteIndex:23},
		doorGreen: 	{code: "Dg", spriteIndex:53},
		doorBlue: 	{code: "Db", spriteIndex:43},
		doorYellow: {code: "Dy", spriteIndex:33},
		doorGreyRed: {code: "dr", spriteIndex:24},
		doorGreyGreen: {code: "dg", spriteIndex:54},
		doorGreyBlue: {code: "db", spriteIndex:44},
		doorGreyYellow:{code: "dy", spriteIndex:34},
		dynamite:   {code: "dD", spriteIndex:29},
		dynamiteActive:   {code: "dA", spriteIndex:39},
		dynamiteActive1:   {code: "!1", spriteIndex:39},
		dynamiteActive2:   {code: "!2", spriteIndex:39},
		dynamiteActive3:   {code: "!3", spriteIndex:39},
		magicWall:  {code: "Wm", spriteIndex:48},
		magicWallActive:{code: "WM", spriteIndex:8},
		fakeDirt:   {code: ".f", spriteIndex:21},
		charA:		{code: "_A", spriteIndex:80},
		charB:		{code: "_B", spriteIndex:90},
		charC:		{code: "_C", spriteIndex:100},
		charD:		{code: "_D", spriteIndex:110},
		charE:		{code: "_E", spriteIndex:81},
		charF:		{code: "_F", spriteIndex:91},
		charG:		{code: "_G", spriteIndex:101},
		charH:		{code: "_H", spriteIndex:111},
		charI:		{code: "_I", spriteIndex:82},
		charJ:		{code: "_J", spriteIndex:92},
		charK:		{code: "_K", spriteIndex:102},
		charL:		{code: "_L", spriteIndex:112},
		charM:		{code: "_M", spriteIndex:83},
		charN:		{code: "_N", spriteIndex:93},
		charO:		{code: "_O", spriteIndex:103},
		charP:		{code: "_P", spriteIndex:113},
		charQ:		{code: "_Q", spriteIndex:84},
		charR:		{code: "_R", spriteIndex:94},
		charS:		{code: "_S", spriteIndex:104},
		charT:		{code: "_T", spriteIndex:114},
		charU:		{code: "_U", spriteIndex:85},
		charV:		{code: "_V", spriteIndex:95},
		charW:		{code: "_W", spriteIndex:105},
		charX:		{code: "_X", spriteIndex:115},
		charY:		{code: "_Y", spriteIndex:86},
		charZ:		{code: "_Z", spriteIndex:96},
		char1:		{code: "_1", spriteIndex:97},
		char2:		{code: "_2", spriteIndex:107},
		char3:		{code: "_3", spriteIndex:117},
		char4:		{code: "_4", spriteIndex:88},
		char5:		{code: "_5", spriteIndex:98},
		char6:		{code: "_6", spriteIndex:108},
		char7:		{code: "_7", spriteIndex:118},
		char8:		{code: "_8", spriteIndex:89},
		char9:		{code: "_9", spriteIndex:99},
		char0:		{code: "_0", spriteIndex:87},
		charArrowRight:		{code: "_>", spriteIndex:106},
		charArrowLeft:		{code: "_<", spriteIndex:116},
		charDot:		{code: "_.", spriteIndex:128},
		charQuestion:		{code: "_?", spriteIndex:119},
		charExclamation:		{code: "_!", spriteIndex:127},
		charCopyRight:		{code: "_@", spriteIndex:138},
		decor10:		{code: "#a", spriteIndex:15},
		poisionDirt:		{code: "p.", spriteIndex:4},
		amoeba:{code: "a1", spriteIndex:77},
		amoebaDrop:{code: "a.", spriteIndex:76},
		amoebaInvisible:{code: "Ai", spriteIndex:121},
		acid:		{code: "Aa", spriteIndex:121},
		acidBoxTopLeft:	{code: "A1", spriteIndex:120},
		acidBoxBottomLeft:	{code: "A2", spriteIndex:130},
		acidBoxBottom:	{code: "A3", spriteIndex:131},
		acidBoxBottomRight:	{code: "A4", spriteIndex:132},
		acidBoxTopRight:	{code: "A5", spriteIndex:122},
		spring:	{code: "Sp", spriteIndex:68},
		springLeft:	{code: "Sl", spriteIndex:68},
		springright:	{code: "Sr", spriteIndex:68},
		bumper:	{code: "Bm", spriteIndex:78},
		magicBall:	{code: "Qa", spriteIndex:59},
		expandingWallHorizontal:	{code: "WH", spriteIndex:19},
		expandingWallVertical:	{code: "WV", spriteIndex:9},
		pause:	{code: "__", spriteIndex:0}
		//dunno:	{code: "a1", spriteIndex:70}
	};

	var codes = {};
	for (var key in me.objects){
		if (me.objects.hasOwnProperty(key)){
			var val = me.objects[key];
			codes[val.code] = val;
		}
	}

	me.objectForCode = function(code){
		var result = codes[code];
		if (!result){
			console.warn("no object for code " + code);
			result = me.objects.unknown;
		}
		return result;
	};

	return me;
}();





