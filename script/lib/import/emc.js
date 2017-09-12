var EMCToBDCFF = {
	0: Emerald.objects.rock.code,
	2: "$3",
	4: "Ro",
	//6: Cpause/*boom_1*/
	8: "Tu",
	9: "Tr",
	10: "Td",
	11: "Tl",
	12: "Tu",
	13: "Tr",
	14: "Tl",
	15: "Tl", // found in KevinMina/01S - EMV6
	16: "Bo",
	18: "$1",
	20: "Bu",
	21: "Br",
	22: "Bd",
	23: "Bl",
	24 : "Bu", // found in AladdinMine01/pla/1 - really a bug ? - = Bug 2 according to X11
	25 : "Br", // Bug 2 according to X11
	26 : "Bd", // Bug 2 according to X11
	27 : "Bl", // found in KevinMine4/01S EMV6  - really a bug ? - = Bug 2 according to X11
	28: "a.", // amoeba drop
	30: "  ", // amoeba drop falling -> space
	32: "rr", // rock paused
	33: "Bo", // bomb paused
	34: "$3", // diamond paused
	35: "$1", // emerald paused
	36: "QA", // magic wall active
	37: "Nu",
	41 : "Yu",
	42 : "Yd",
	43 : "Yl",
	44 : "Yr",
	45 : "Qr", // quicksand with stone
	57 : "WH", // expanding wall //todo: is this steel or stone in EMV6 ?
	59 : "dA", // dynamite active
	60 : "!1", // dynamite active 1
	61 : "!2", // dynamite active 2
	62 : "!3", // dynamite active 3
	63 : "A3", // acid box ?
	64 : "X2", // outbox open
	65 : "X2", // outbox open state 2
	66 : "X2", // outbox open state 3
	67 : "Ba",
	68 : ".!",
	69 : "Sp",  // spring
	73 : "Qa", // magic ball
	75 : "an", // Android
	78 : " f", // fake space (acts like stone wall)
	99 : "Pl",
	100 : "Pr",
	101: "Aa", // Acid
	116 : "Ws", // end point of level - ignore everything after this and fill with Steel Wall
	118 : ">1",
	119 : "Ol", // bomb move left
	120 : "Or", // bomb move right
	121 : "ul", // boulder move left
	122 : "ur", // boulder move right
	123 : "Aa",
	128 : "  ",
	129 : "WS", // slippery wall
	130 : "..",
	131 : "Ws",
	132 : "Ww",
	133 : "Kr",
	134 : "Ky",
	135 : "Kb",
	136 : "Kg",
	137 : "Dr",
	138 : "Dy",
	139 : "Db",
	140 : "Dg",
	141 : "a.",
	142 : "dr",
	143 : "dy",
	144 : "db",
	145 : "dg",
	146 : "Wm",
	147 : "Rw",
	148 : "Q.",
	149 : "A1",
	150 : "A5",
	151 : "A2",
	152 : "A4",
	153 : "Ai", // invisible Amoeba (Always static I believe ? ) // when this is above an acid box, it shouls turn into acid
	154 : "a1", // state 5
	155 : "a1", // state 6
	156 : "a1", // state 7
	157 : "a1", // state 8
	158 : "XX", // exit
	160 : "Ww", // Stone Wall - made to look like Dirt - found in CrazyMine01 - level 0
	162 : "Le", // Lenses (candy)
	168 : "#1", //decor - in EMCV6 this is a pipe top (e.g. KevinMine4/27S
	169 : "#2", //decor - in EMCV6 this is a pipe middel (e.g. KevinMine4/27S
	170 : "#3", //decor - in EMCV6 this is a pipe bottom (e.g. KevinMine4/27S
	173 : ".f" ,// Cfake_grass EMCV6?
	175 : "dD", // shouldn't this by dynamite active ? - found in CrazyMine01 - level 0 where they musn't be active
	176 : "Ws", // Steel Wall deco 1? (found in KevinMine4 - level 3)
	179 : "Ws", // Steel Wall? (found in KevinMine4 - level 0)
	189 : "..", // Dirt 2 - alternate image
	191 : "Kp",
	192 : "Kk",
	193 : "Kn",
	194 : "Kw",
	195 : "Dp",
	197 : "Dn",
	198 : "Dw",
	196 : "Dk",
	200 : "_A",
	201 : "_B",
	202 : "_C",
	203 : "_D",
	204 : "_E",
	205 : "_F",
	206 : "_G",
	207 : "_H",
	208 : "_I",
	209 : "_J",
	210 : "_K",
	211 : "_L",
	212 : "_M",
	213 : "_N",
	214 : "_O",
	215 : "_P",
	216 : "_Q",
	217 : "_R",
	218 : "_S",
	219 : "_T",
	220 : "_U",
	221 : "_V",
	222 : "_W",
	223 : "_X",
	224 : "_Y",
	225 : "_Z",
	226 : "_0",
	227 : "_1",
	228 : "_2",
	229 : "_3",
	230 : "_4",
	231 : "_5",
	232 : "_6",
	233 : "_7",
	234 : "_8",
	235 : "_9",
	236 : "_.",
	237 : "_!",
	238 : "_:",
	239 : "_?",
	240 : "_>",
	244 : "dn" // mystery door brown

};


var BDCFFToEMC = {};

for (var key in EMCToBDCFF){
    if (EMCToBDCFF.hasOwnProperty(key)){
        var val = EMCToBDCFF[key];
		BDCFFToEMC[val] = key;
    }
}
// fix multiple occurences ..
BDCFFToEMC["Ws"] = 131;
BDCFFToEMC[".."] = 130;


function convertKingsoft(b){
    var map={
        0: "Ws",
        1: "Ws",
        3: "Ws",
        4: "  ",
        5: "Ws",
        6: "..",
        7: "Ws",
        8: "rr",
        9: "Ws",
        10: "XX",
        11: "Ws",
        12: "Ww",
        13: "Ws",
        22: "$1",
        26: "XX",
        118:"$1",
        54:"$1",
        182:"$1",
        202: "XX",
        214: "$1",
        246: "$1",
        255: "Ws"
    };

    var result = "**";
    if (map[b]){
        result =  map[b];
    }
    return result;
}

function convertEmcV1(b){
    // http://www.steffest.com/dxboulder/EMLevelformat.htm
    var result = "**";
	result =  EMCToBDCFF[b] || "**";
    return result;
}