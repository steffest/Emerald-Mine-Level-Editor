var kingSoftConvertor = function(){
    var me = {};

    me.name = "KingSoft convertor";

    me.convert = function(data){
        console.log("converting KingSoft level");

        function convertCode(b){

            var map = {
                0: "rr",
                1: "r/", // rock falling
                2: "$3",
                3: "3/", // diamond falling
                4: "Ro",
                5: "R/", // robot pause
                //6: Cpause/*boom_1*/
                // 7: Cpause/*boom_2*/,
                8: "Tu",
                9: "Tr",
                10: "Td",
                11: "Tl",
                12: "Tu",
                13: "Tr",
                14: "Td",
                15: "Tl", // found in KevinMina/01S - EMV6
                16: "Bo",
                17: "B/", // bomb falling
                18: "$1",
                19: "1/", // emerald falling
                20: "Bu",
                21: "Br",
                22: "Bd",
                23: "Bl",
                24 : "Bu", // found in AladdinMine01/pla/1 - really a bug ? - = Bug 2 according to X11
                25 : "Br", // Bug 2 according to X11
                26 : "Bd", // Bug 2 according to X11
                27 : "Bl", // found in KevinMine4/01S EMV6  - really a bug ? - = Bug 2 according to X11
                28: "a.", // amoeba drop
                29: "a/", // amoeba drop falling
                30: "a/", // amoeba drop falling 2
                31: "a/", // amoeba drop falling 3
                32: "rr", // rock paused
                33: "Bo", // bomb paused
                34: "$3", // diamond paused
                35: "$1", // emerald paused
                36: "QA", // magic wall active
                37: "Nu",
                38: "N/", // nut falling
                39: "N_", // nut falling pause
                40 : "Rw", // Robot Wheel - same as 147?
                41 : "Yu",
                42 : "Yd",
                43 : "Yl",
                44 : "Yr",
                45 : "Qr", // quicksand with stone
                46 : "  ", // quicksand Stone 1
                47 : "  ", // quicksand Stone 2
                48 : "  ", // quicksand Stone 3
                49 : "..", // quicksand sand 4
                50 : "..", // quicksand sand 5
                51 : "..", // quicksand sand 6
                52 : "Qr", // quicksand Stone 7
                53 : "Qr", // quicksand Stone 8
                54 : "Qr", // quicksand Stone 9
                55 : "..", // quicksand Stone 10
                56 : "rr", // quicksand Stone 11
                //57: " f", // fake space
                57 : "WH", // expanding wall //todo: is this steel or stone in EMV6 ?
                58: " f", // fake space
                59 : "dA", // dynamite active
                60 : "!1", // dynamite active 1
                61 : "!2", // dynamite active 2
                62 : "!3", // dynamite active 3
                63 : "A3", // acid box ?
                64 : "X2", // outbox open
                65 : "X2", // outbox open state 2
                66 : "X2", // outbox open state 3
                67 : "Ba", // balloon ?
                68 : ".!",
                69 : "Sp",  // spring
                73 : "Qa", // magic ball
                75 : "an", // Android
                78 : " f", // fake space (acts like stone wall)
                99 : "Pl",
                100 : "Pr",
                101: "Aa", // Acid
                114: "N<", // nut push left
                115: "N<", // nut push right
                116 : "Ws", // end point of level - ignore everything after this and fill with Steel Wall
                117 : "!!", // explosion /*boom_2*/
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
                159 : ".f", // fake dirt?
                160 : ".f", // fake dirt - found in CrazyMine01 - level 0
                161 : ".f", // fake dirt
                168 : "#1", //decor - in EMCV6 this is a pipe top (e.g. KevinMine4/27S
                169 : "#2", //decor - in EMCV6 this is a pipe middel (e.g. KevinMine4/27S
                170 : "#3", //decor - in EMCV6 this is a pipe bottom (e.g. KevinMine4/27S
                173 : ".f" ,// Cfake_grass EMCV6?
                175 : "dD",
                176 : "Ww", // Stone Wall deco 1? (found in KevinMine4 - level 3)
                179 : "Ww", // Stone Wall? (found in KevinMine4 - level 0)
                189 : "..", // Dirt 2 - alternate image
                190 : "..", // Plant - alternative ?
                191 : "Kp",
                192 : "Kk",
                193 : "Kn",
                194 : "Kw",
                195 : "Dp",
                196 : "Dk",
                197 : "Dn",
                198 : "Dw",
                199 : "Bm", // bumper
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
                241 : "_@" // only in EM2 ?

            };
            var result = "**";
            if (map[b]){
                result =  map[b];
            }
            return result;
        }


        var result = {
            width: 64,
            height: 32,
            map: [],
            unknown: []
        };

        var line = "";


        // decypt - see https://searchcode.com/codesearch/view/20710526/
        var firstByte = data[0];
        var c1 = 0x65;
        var c2 = 0x11;


        var dData = new Uint8Array(data.length);
        for (var i = 0, len = data.length; i<len; i++){
            var b = data[i];
            b ^= c1;
            b -= c2;
            c1 = (c1 + 7) & 0xff;
            dData[i] = b;
        }
        dData[0] = 131; // only for EM2
        dData[1] = 131;

        var index = 0;
        for (var y = 0; y < 32; y++){
            line = "";
            for (var x = 0; x < 64; x++){

                b = dData[index];

                var code = convertCode(b);
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
                var yamObject = dData[index];
                index++;
            }
        }

        result.EmeraldValue = dData[index++];
        result.DiamondValue = dData[index++];
        result.RobotValue = dData[index++];
        result.TankValue = dData[index++];
        result.BugValue = dData[index++];
        result.YamValue = dData[index++];
        result.NutValue = dData[index++];
        result.DynamiteValue = dData[index++];
        result.KeyValue = dData[index++];
        result.TimeBonus = dData[index++];
        result.Time = dData[index++];
        result.PointsNeeded = dData[index++];

        result.Player1Offset = dData[index++] * 256 + dData[index++];
        result.Player2Offset = dData[index++] * 256 + dData[index++];
        result.AmoebaRate = dData[index++] * 256 + dData[index++];
        result.MagicWallTime = dData[index++] * 256 + dData[index++];
        result.WheelTime = dData[index++] * 256 + dData[index++];


        var player1X = Math.floor(result.Player1Offset % 64);
        var player1Y = Math.floor(result.Player1Offset / 64);
        line = result.map[player1Y];
        line = line.substr(0,player1X*2) + "P1" + line.substr((player1X*2)+2);
        result.map[player1Y] = line;

        result.originalData = dData;

        return result;

    };

    return me;
};