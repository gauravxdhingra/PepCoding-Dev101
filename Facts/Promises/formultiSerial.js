let fs=require("fs")
let files=["../../.././facts/f2.txt","../../.././facts/f3.txt","../../.././facts/f1.txt"]
let readf=fs.promises.readFile(files[0])
for(let i=1;i<files.length;i++)
{
    readf=readf .then(function(content){
        console.log(`file ${i}  ${content} `);
        return fs.promises.readFile(files[i])
    })
}