let fs = require("fs");
console.log("Starting");
console.log("CPU is still stuck");
fs.readFile("index.html",function(err,data){
    console.log(data.byteLength);
})

console.log("finished");