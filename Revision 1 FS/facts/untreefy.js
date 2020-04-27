let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");
module.exports.untreefy = function () {
    let src = arguments[0];
    let dest = arguments[1];

    untreefyFolder(src, dest);
    console.log("All files have been copied")
};


// function childrenReader(src) {
//     let childrens = fs.readdirSync(src);
//     return childrens;
// }

function untreefyFolder(src, dest) {
    let ans = fs.lstatSync(src).isDirectory();
    if (ans == false) {
        let uniqueName = uniqid();
        //copy file from src to dest=> and rename them
        fs.copyFileSync(src, path.join(dest, uniqueName));
        node.isFile = true;
        node.oldName = path.basename;
        node.newname = newFileName;

    } else {

        let childrens = fs.readdirSync(src);

        // console.log(childrens);
        for (let i = 0; i < childrens.length; i++) {
            let cChPath = path.join(src, childrens[i]);
            let chObj = {};
            node.childrens.push(chObj);
            untreefyFolder(cChPath, dest);
        }
    }
}
let root = {}
untreefyFolder(process.argv[2], process.argv[3], root);
fs.writeFileSync(path.join(process.argv[3], "metadata.json"), JSON.stringify(root))
// console.log(root)