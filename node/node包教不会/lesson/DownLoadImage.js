var http=require("http");
var fs=require("fs");

var server=http.createServer(function(req,res){
	
}).listen(8082);

console.log("http start");

var url="http://s1.dwstatic.com/crka/60/00/60004909f81fb5468205153d576fc3226293.png";
http.get(url,function(res){
	var imgData="";
	res.setEncoding("binary");
	
	res.on("data",function(chunk){
		imgData+=chunk;
	});
	
	
	 res.on("end", function(){
        fs.writeFile("./public/1.png", imgData, "binary", function(err){
            if(err){
                console.log("down fail");
            }
            console.log("down success");
        });
    });
	
})
