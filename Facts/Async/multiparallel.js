let fs=require("fs");
(async function(){
    let f1=await fs.promises.readFile("../../.././facts/f1.txt")
    console.log("f1: "+f1)
})();
(async function(){
    let f2=await fs.promises.readFile("../../.././facts/f2.txt")
    console.log("f2: "+f2)
})();
(async function(){
    let f3=await fs.promises.readFile("../../.././facts/f3.txt")
    console.log("f3: "+f3)
})();
