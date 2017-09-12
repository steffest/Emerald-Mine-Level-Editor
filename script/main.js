function main(){

    Editor.init(function(){
        Editor.buildObjectPicker();
        var levelName = getUrlParameter("level");
        if (levelName) levelName = decodeURIComponent(levelName);
        Editor.loadLevel(levelName);
    });


}

var Editor = function(){
    var me = {};
    var canvas, ctx,tiles;
    var palette, paletteContext;
    var level = {};
    var zoom = 0;
    var selectedIndex = 0;
    var EMElements;

    me.init = function(next){
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        palette = document.getElementById("objects");
        paletteContext = palette.getContext("2d");

        /*EMElements = [
            Y.gameObjects.EMPTYSPACE,
            Y.gameObjects.PLAYER,
            Y.gameObjects.GRASS,
            Y.gameObjects.STEELWALL,
            Y.gameObjects.STONEWALL,
            Y.gameObjects.BOULDER,
            Y.gameObjects.EMERALD,
            Y.gameObjects.DIAMOND,
            Y.gameObjects.BOMB,
            Y.gameObjects.YAM,
            Y.gameObjects.SPIDER,
            Y.gameObjects.BUG
        ];*/

		EMElements = [
            Emerald.objects.empty,
            Emerald.objects.wall,
			Emerald.objects.rock,
			Emerald.objects.emerald,
			Emerald.objects.dirt,
			Emerald.objects.player,
			Emerald.objects.bugLeft
        ];


        tiles = new Image();
        tiles.onload = function(){
            console.log("sprites loaded");
            if (next) next();
        };
        tiles.src = "img/editor_sprites.png";


        canvas.onmousedown = function(e){
            var x = Math.floor(e.offsetX/32);
            var y = Math.floor(e.offsetY/32);
            me.setMaptile(x,y,EMElements[selectedIndex]);
            canvas.isMousedown = true;
        };
        canvas.onmousemove = function(e){
            if (canvas.isMousedown){
                var x = Math.floor(e.offsetX/32);
                var y = Math.floor(e.offsetY/32);
                me.setMaptile(x,y,EMElements[selectedIndex]);
            }
        };
        canvas.onmouseup = function(e){
            canvas.isMousedown = false;
        };
    };

    me.buildObjectPicker = function(){

        paletteContext.fillStyle = "black";
        paletteContext.fillRect(0,0,palette.width,palette.height);

        var counter = 0;
        EMElements.forEach(function(o){
            var spriteIndex = o.spriteIndex;
            var coX = (counter % 2) * 32;
            var coY = 64 + Math.floor(counter / 2) * 32;

            if (spriteIndex){
                var tileX = 0;
                var tileY = spriteIndex * 32;
                paletteContext.drawImage(tiles,tileX,tileY,32,32,coX,coY,32,32);
            }
            counter++;
        });
        me.selectElement(0);

        palette.onclick = function(e){
            var x = Math.floor(e.offsetX/32);
            var y = Math.floor((e.offsetY - 64)/32);
            console.log(x,y);
            me.selectElement((y*2) + x);
        }
    };

    me.selectElement = function(index){
        selectedIndex = index;
        var obj = EMElements[selectedIndex];
        var spriteIndex = obj.spriteIndex;
        var tileX = (spriteIndex % 8) * 32;
        var tileY = Math.floor(spriteIndex / 8) * 32;
        paletteContext.fillRect(0,0,64,64);
        paletteContext.drawImage(tiles,tileX,tileY,32,32,0,0,64,64);
    };

    me.parseBDCFFLevel = function(levelData){
        var counter = 0;
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
            // start with empty level
            level.width = 64;
            level.height = 32;

            for (var y = 0; y<level.height; y++){
                for (var x = 0; x<level.width; x++){
                    var object = EMObjects.bugLeft;
                    if (x==0 || x==63 || y==0 || y==31) object = EMObjects.wall;
                    level.map[counter] = object;
                    counter ++;
                }
            }
            me.drawLevel();
        }
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

    me.setMaptile = function(x,y,object){
        var index = (y * level.width) + x;
        level.map[index] = object;
        me.drawObject(x,y,object);
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

    me.buildBDCFF = function(){
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

	me.buildEMV6 = function(){
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
		result[offset+1] = 0;  // diamond score
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

    me.export = function(){
        //var output = document.getElementById("exportoutput");
        //output.value = JSON.stringify(me.buildBDCFF(),null, 2);
        //var panel = document.getElementById("export");
        //panel.style.display = "block";

		var data = me.buildEMV6();
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

		var sData = base64js.fromByteArray(me.buildEMV6());
		localStorage.setItem("EMCLevel",sData);
		console.error(sData);

        console.error("starting player");
        window.open("../src/dev.html?editor=true");
    };

    return me;
}();


function getUrlParameter(param){
    if (window.location.getParameter){
        return window.location.getParameter(param);
    } else if (location.search) {
        var parts = location.search.substring(1).split('&');
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            if (nv[0] == param) {
                return nv[1] || true;
            }
        }
    }
}

//https://github.com/beatgammit/base64-js
(function(r){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=r()}else if(typeof define==="function"&&define.amd){define([],r)}else{var e;if(typeof window!=="undefined"){e=window}else if(typeof global!=="undefined"){e=global}else if(typeof self!=="undefined"){e=self}else{e=this}e.base64js=r()}})(function(){var r,e,t;return function r(e,t,n){function o(i,a){if(!t[i]){if(!e[i]){var u=typeof require=="function"&&require;if(!a&&u)return u(i,!0);if(f)return f(i,!0);var d=new Error("Cannot find module '"+i+"'");throw d.code="MODULE_NOT_FOUND",d}var c=t[i]={exports:{}};e[i][0].call(c.exports,function(r){var t=e[i][1][r];return o(t?t:r)},c,c.exports,r,e,t,n)}return t[i].exports}var f=typeof require=="function"&&require;for(var i=0;i<n.length;i++)o(n[i]);return o}({"/":[function(r,e,t){"use strict";t.byteLength=c;t.toByteArray=v;t.fromByteArray=s;var n=[];var o=[];var f=typeof Uint8Array!=="undefined"?Uint8Array:Array;var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var a=0,u=i.length;a<u;++a){n[a]=i[a];o[i.charCodeAt(a)]=a}o["-".charCodeAt(0)]=62;o["_".charCodeAt(0)]=63;function d(r){var e=r.length;if(e%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}return r[e-2]==="="?2:r[e-1]==="="?1:0}function c(r){return r.length*3/4-d(r)}function v(r){var e,t,n,i,a;var u=r.length;i=d(r);a=new f(u*3/4-i);t=i>0?u-4:u;var c=0;for(e=0;e<t;e+=4){n=o[r.charCodeAt(e)]<<18|o[r.charCodeAt(e+1)]<<12|o[r.charCodeAt(e+2)]<<6|o[r.charCodeAt(e+3)];a[c++]=n>>16&255;a[c++]=n>>8&255;a[c++]=n&255}if(i===2){n=o[r.charCodeAt(e)]<<2|o[r.charCodeAt(e+1)]>>4;a[c++]=n&255}else if(i===1){n=o[r.charCodeAt(e)]<<10|o[r.charCodeAt(e+1)]<<4|o[r.charCodeAt(e+2)]>>2;a[c++]=n>>8&255;a[c++]=n&255}return a}function l(r){return n[r>>18&63]+n[r>>12&63]+n[r>>6&63]+n[r&63]}function h(r,e,t){var n;var o=[];for(var f=e;f<t;f+=3){n=(r[f]<<16)+(r[f+1]<<8)+r[f+2];o.push(l(n))}return o.join("")}function s(r){var e;var t=r.length;var o=t%3;var f="";var i=[];var a=16383;for(var u=0,d=t-o;u<d;u+=a){i.push(h(r,u,u+a>d?d:u+a))}if(o===1){e=r[t-1];f+=n[e>>2];f+=n[e<<4&63];f+="=="}else if(o===2){e=(r[t-2]<<8)+r[t-1];f+=n[e>>10];f+=n[e>>4&63];f+=n[e<<2&63];f+="="}i.push(f);return i.join("")}},{}]},{},[])("/")});
