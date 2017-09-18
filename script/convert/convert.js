var FileConvertor = function(){
    var me = {};

    me.getConvertor = function(data,source){
        if (data.length == 2106){

            var endByte = data[1983];
            if (endByte == 27){
                //EM 1 2 or 3 disk with encrypted levels
                return kingSoftConvertor();
            }

            console.error(endByte);
            if (endByte == 131 || endByte == 116){
                return emc4Convertor();
            }
        }

        if (data.length == 2107){
            // em3 pro
            return emc4Convertor();
        }
        if (data.length == 2172){

            /*
            byte 2106 should be 255
            if byte 2107==54 -> V6
            if byte 2107==53 -> V5
             */

            if (data[2107] == 53){
                console.error("Warning: V5 map : TODO")
            }

            return emc6Convertor();
        }

        return unknownConvertor();
    };

    me.convert = function(data){
        console.log("File size: " + data.length);

        var convertor = me.getConvertor(data);
        var result = convertor.convert(data);
        if(result){
            EventBus.trigger(EVENT.levelLoaded,result);
        }
    };

    return me;
}();