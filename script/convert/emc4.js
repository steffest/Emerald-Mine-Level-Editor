var emc4Convertor = function(){
    var me = {};

    me.name = "EMC V4 convertor";

    me.convert = function(data){
        console.log("converting EMC V4 level");

        function convertCode(b){

            var map = {
                0: "rr",
                1: "rr", // fall
                2: "$3",
                3: "$3", // fall
                4: "Ro",
                5: "Ro", // robot pause
                6: "__", // explosion 1
                7: "__", // explosion 2
                8: "Tu",
                9: "Tr",
                10: "Td",
                11: "Tl",
                12: "Tu",
                13: "Tr",
                14: "Td",
                15: "Tl",
                16: "Bo",
                17: "Bo", // fall
                18: "$1",
                19: "$1", // fall
                20: "Bu",
                21: "Br",
                22: "Bd",
                23: "Bl",
                24 : "Bu",
                25 : "Br",
                26 : "Bd",
                27 : "Bl",
                28: "a.", // amoeba drop
                29: "a.", // amoeba drop 2
                30: "  ", // amoeba drop falling -> space
                31: "a.", // amoeba drop 3
                32: "rr", // rock paused
                33: "Bo", // bomb paused
                34: "$3", // diamond paused
                35: "$1", // emerald paused
                36 : "Wm",
                37: "Nu",
                38: "Nu", // fall
                39: "Nu", // paused
                40: "Rw",
                41 : "Yu",
                42 : "Yd",
                43 : "Yl",
                44 : "Yr",
                45 : "Qr", // quicksand with stone
                46 : "  ", // quicksand appear 2
                47 : "  ", // quicksand appear 3
                48 : "  ", // quicksand appear 4
                49 : "Q.", // quicksand appear 4
                50 : "Q.", // quicksand appear 5
                51 : "Q.", // quicksand appear 6
                52 : "Qr", // quicksand appear 7
                53 : "Qr", // quicksand appear 8
                54 : "Qr", // quicksand appear 9
                55 : "Q.", // quicksand appear 10
                56 : "rr", // quicksand appear 11
                57 : "WH", // expanding wall //todo: is this steel or stone in EMV6 ?
                58 : "WV", // expanding wall
                59 : "dA", // dynamite active 1
                60 : "!1", // dynamite active 2
                61 : "!2", // dynamite active 3
                62 : "!3", // dynamite active 4
                63 : "A3",
                64 : "X2", // outbox open
                65 : "X2", // outbox open state 2
                66 : "X2", // outbox open state 3
                67 : " f",
                68 : " f",
                69 : " f",  // spring
                70 : " f",  // spring fall
                71 : " f",  // spring left
                72 : " f",  // spring right
                73 : " f", // magic ball
                74 : " f", // magic ball 2
                75 : " f", // Android
                76 : " f",
                77 : " f",
                78 : " f", // Android up
                79 : " f", // Android down
                80 : " f", // Android down
                81 : " f", // Android right
                82 : " f", // Android right
                83 : " f", // Android left
                84 : " f", // Android left
                85 : " f",
                86 : " f",
                87 : " f",
                88 : " f",
                89 : " f",
                90 : " f",
                91 : " f",
                92 : " f",
                93 : " f",
                94 : " f",
                95 : " f",
                96 : " f",
                97 : " f",
                98 : " f",
                99 : "Sr", // spring push right
                100 : "Sl",// spring push left
                101: "Aa", // Acid
                102: "Aa", // Acid
                103: "Aa", // Acid
                104: "Aa", // Acid
                105: "Aa", // Acid
                106: "Aa", // Acid
                107: "Aa", // Acid
                108: "Aa", // Acid
                109: "__", // dirt animations
                110: "__", // dirt animations
                111: "__", // dirt animations
                112: "__", // dirt animations
                113: "__", // dirt animations
                114: "Nl", // nut moving left
                115: "Nr", // nut moving right
                116 : "Ws", // end point of level - ignore everything after this and fill with Steel Wall
                117 : "__",
                118 : "__",
                119 : "Ol", // bomb move left
                120 : "Or", // bomb move right
                121 : "ul", // boulder move left
                122 : "ur", // boulder move right
                123 : "__",
                124 : "__",
                125 : "__",
                126 : "__",
                127 : "__",
                128 : "  ",
                129 : "WS", // slippery wall
                130 : "..",
                131 : "Ws",
                132 : "Ws",
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
                153 : " f",
                154 : "a1", // state 5
                155 : "a1", // state 6
                156 : "a1", // state 7
                157 : "a1", // state 8
                158 : "XX", // exit
                159 : "_<",
                160 : ".f", // Fake dirt
                161 : "Le", // Lenses
                162 : "Ma", // Magnify
                163 : " f",
                164 : ".f",
                165 : "B|",
                166 : "B|",
                167 : "__",
                168 : "#1", //decor - in EMCV6 this is a pipe top (e.g. KevinMine4/27S
                169 : "#2", //decor - in EMCV6 this is a pipe middel (e.g. KevinMine4/27S
                170 : "#3", //decor - in EMCV6 this is a pipe bottom (e.g. KevinMine4/27S
                171 : "#4", //decor
                172 : "_,",
                173 : "_'",
                174 : "_-", //decor
                175 : "dD",
                176 : "Ws", // Steel Wall deco 1? (found in KevinMine4 - level 3)
                177 : "#5",
                178 : "#6",
                179 : "Ws", // Steel Wall? (found in KevinMine4 - level 0)
                180 : "WS", // slippery decor
                181 : "#7",
                182 : "#8",
                183 : "#9",
                184 : "(*", // wind multi
                185 : "(l",
                186 : "(d",
                187 : "(r",
                188 : "(u",
                189 : "..", // Dirt 2 - alternate image
                190 : "Aa",
                191 : "Kp",
                192 : "Kk",
                193 : "Kn",
                194 : "Kw",
                195 : "Dp",
                196 : "Dk",
                197 : "Dn",
                198 : "Dw",
                199 : "Bm",
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
                241 : "#a",
                242 : "dp",
                243 : "dk",
                244 : "dn", // mystery door brown
                245 : "dw",
                246 : " f",
                247 : " f",
                248 : " f",
                249 : " f",
                250 : " f",
                251 : " f",
                252 : " f",
                253 : " f",
                254 : " f",
                255 : " f"

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
        var index = 0;
        for (var y = 0; y < 32; y++){
            line = "";
            for (var x = 0; x < 64; x++){
                var b = data[index];
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
                var yamObject = data[index];
                index++;
            }
        }

        result.EmeraldValue = data[index++];
        result.DiamondValue = data[index++];
        result.RobotValue = data[index++];
        result.TankValue = data[index++];
        result.BugValue = data[index++];
        result.YamValue = data[index++];
        result.NutValue = data[index++];
        result.DynamiteValue = data[index++];
        result.KeyValue = data[index++];
        result.TimeBonus = data[index++];
        result.Time = data[index++];
        result.PointsNeeded = data[index++];

        result.Player1Offset = data[index++] * 256 + data[index++];
        result.Player2Offset = data[index++] * 256 + data[index++];
        result.AmoebaRate = data[index++] * 256 + data[index++];
        result.MagicWallTime = data[index++] * 256 + data[index++];
        result.WheelTime = data[index++] * 256 + data[index++];


        console.error(result.Player2Offset);
        var player1X = Math.floor(result.Player1Offset % 64);
        var player1Y = Math.floor(result.Player1Offset / 64);
        var player2X = Math.floor(result.Player2Offset % 64);
        var player2Y = Math.floor(result.Player2Offset / 64);
        line = result.map[player1Y];
        line = line.substr(0,player1X*2) + "P1" + line.substr((player1X*2)+2);
        result.map[player1Y] = line;

        if(result.Player2Offset){
            line = result.map[player2Y];
            line = line.substr(0,player2X*2) + "P2" + line.substr((player2X*2)+2);
            result.map[player2Y] = line;
        }



        result.originalData = data;

        return result;

    };

    return me;
};