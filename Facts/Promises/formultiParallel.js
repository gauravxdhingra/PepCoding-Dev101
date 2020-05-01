let fs= require("fs")
let files=["../../.././facts/f3.txt","../../.././facts/f2.txt","../../.././facts/f1.txt"]
for(let i=0;i<files.length;i++)
{
    let readf=fs.promises.readFile(files[i])
    .then(function(content){
        console.log(`file ${i+1}  ${content} `);
    })
}