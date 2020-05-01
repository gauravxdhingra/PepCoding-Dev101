let fs=require("fs")
let file=fs.promises.readFile("../../.././facts/f1.txt")
file.then(function(content){
    console.log("f1 -> "+content)
})