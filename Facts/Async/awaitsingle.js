let fs=require("fs");
(async function(){
    let data= await fs.promises.readFile("../../.././facts/f1.txt")
    console.log("f1: "+data)
})()

