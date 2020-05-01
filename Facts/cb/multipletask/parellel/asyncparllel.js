let fs = require("fs");
console.time("task1")


fs.readFile("../../p.txt",function(err,data){
    console.log(data.byteLength);
    console.timeEnd("task1");
});

setTimeout(() => {
  }, 2000);


console.time("task2")
fs.readFile("../../p.txt",function(err,data){
    
    console.log(data.byteLength);
    console.timeEnd("task2");
});

console.time("task3")
fs.readFile("../../p.txt",function(err,data){
    
    console.log(data.byteLength);
    console.timeEnd("task3");
});

