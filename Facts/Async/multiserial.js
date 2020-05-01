let fs=require("fs");
(async function(){
    let data=await fs.promises.readFile("../../.././facts/f1.txt")
    console.log("f1  "+data)
    data=await fs.promises.readFile("../../.././facts/f2.txt")
    console.log("f2  "+data)
    data=await fs.promises.readFile("../../.././facts/f3.txt")
    console.log("f3  "+data)
})()