var unknownConvertor = function(){
    var me = {};

    me.name = "Unknown file type";

    me.convert = function(){
        var error = "Unknown level type!";
        console.error(error);
        Editor.setInfoText(error);
        // return empty level?
    };

    return me;
};