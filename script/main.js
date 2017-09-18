function main(){

    Editor.init(function(){
        Editor.buildObjectPicker();
        var levelName = getUrlParameter("level");
        var diskName = getUrlParameter("disk");
        if (levelName) levelName = decodeURIComponent(levelName);
        if (diskName ) {
            diskName  = decodeURIComponent(diskName );

            if (isNaN(parseInt(diskName,10))){
                Editor.loadDisk(diskName)
            }else{
                Api.getDisk(diskName,function(data){
                    if (data && data.filename){
                        var url = "http://www.emeraldmines.net/emeraldweb/" +  data.filename;
                        Editor.loadDisk(url)
                    }
                })
            }
		}else{
			Editor.loadLevel(levelName);
        }

    });


}



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

