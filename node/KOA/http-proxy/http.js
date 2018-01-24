const axios=require("axios");


axios.get("http://www.baidu.com")
	.then(function(response){
		console.log(response);
	})
