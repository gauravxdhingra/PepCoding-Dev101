let fs=require("fs")
let f2=fs.promises.readFile("../../.././facts/f2.txt")
.then(function(data){
    console.log("f2 -> "+data)
})
let f3=fs.promises.readFile("../../.././facts/f3.txt")
.then(function(data){
    console.log("f3 -> "+data)
})
let f1=fs.promises.readFile("../../.././facts/f1.txt")
.then(function(data){
    console.log("f1 -> "+data)
})
