let fs = require("fs");

let files = ["index.html", "p.txt", "write.txt"];
readFiles(0);
function readFiles(i){
    if(i==files.length){
        return;
    }
    fs.readFile(files[i],function(err,data){
        console.log(`Data of file${i+1}: ${data.byteLength}`);
        readFiles(i+1);
    })

    
}
