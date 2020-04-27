let fs = require("fs");
let path = require("path");

function checkPathisDirectory(src) {
    let ans = fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src) {
    let childrens = fs.readdirSync(src);
    return childrens;
}

function viewAsFlatFiles(src) {
    let isFile = checkPathisDirectory(src);
    if (isFile == true)
        console.log(src + "*");
    else {
        console.log(src);
        // how to list the content of  a directory in nodejs
        let childrens = childrenReader(src);
        // console.log(childrens);
        for (let i = 0; i < childrens.length; i++) {
            let cChPath = path.join(src, childrens[i]);
            viewAsFlatFiles(cChPath);
        }
    }
}

function displayTree(indent, src) {
    let ans = fs.lstatSync(src).isDirectory();
    if (ans == false) {
        console.log(indent + path.basename(src) + "*");
    } else {
        console.log(indent + path.basename(src));
        // how to list the content of  a directory in nodejs
        let childrens = fs.readdirSync(src);
        // console.log(childrens);
        for (let i = 0; i < childrens.length; i++) {
            let cChPath = path.join(src, childrens[i]);
            displayTree(indent + "\t", cChPath);
        }
    }
}

displayTree("", process.argv[2]);
viewAsFlatFiles(process.argv[2]);