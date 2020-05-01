let fs = require("fs");
// console.log("**Starting**");
// fs.readFile("../../index.html",function(err,data){
//     console.log("file1 has processed");
//     console.log(data.byteLength);
// fs.readFile("../../p.txt",function(err,data){
//     console.log("file2 has processed");
//     console.log(data.byteLength);
//     fs.readFile("../../write.txt",function(err,data){
//     console.log("file3 has processed");
//     console.log(data.byteLength);
//     })
//   })
// })

// console.log("**after**");

//**************************************************************************************************//
// alternate way

fs.readFile("../../index.html",f1cb);

function f1cb(err,data){
    console.log("file1 has arrived");
    console.log(data.byteLength);
    fs.readFile("../../p.txt",f2cb);
}

function f2cb(err,data){
    console.log("file2 has arrived");
    console.log(data.byteLength);
    fs.readFile("../../write.txt",f3cb)
}

function f3cb(err,data){
    console.log("file1 has arrived");
    console.log(data.byteLength);
}


