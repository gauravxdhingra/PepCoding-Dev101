let fs=require("fs");
(async function(){
    try{
        let data1=await fs.promises.readFile("../../.././facts/f1.txt")
    console.log("f1  "+data1.byteLength)
    if(data1.byteLength<20)
    {
        let data2=await fs.promises.readFile("../../.././facts/f2.txt")
         console.log("f2  "+data2.byteLength)
         if(data2.byteLength>40)
         {
            let data4=await fs.promises.readFile("../../.././facts/f4.txt")
            console.log("f4  "+data4.byteLength)
         }
         else
         {
            let data5=await fs.promises.readFile("../../.././facts/f5.txt")
            console.log("f5  "+data5.byteLength)
         }

    }
    else
    {
        let data3=await fs.promises.readFile("../../.././facts/f3.txt")
        console.log("f3  "+data3.byteLength)
        if(data3.byteLength>50)
        {
            let data6=await fs.promises.readFile("../../.././facts/f6.txt")
            console.log("f6  "+data6.byteLength)
        }
        else
        {
            let data7=await fs.promises.readFile("../../.././facts/f7.txt")
             console.log("f7  "+data7.byteLength)
        }
    }
    }
    catch(err)
    {
        console.log(err)
    }
})()