let fs = require("fs")
let f1 = fs.promises.readFile("../../.././facts/f1.txt")
    .then(function (data) {
        console.log("f1 " + data.byteLength);
        if (data.byteLength < 20) {
            let f2 = fs.promises.readFile("../../.././facts/f2.txt")
                .then(function (data) {
                    console.log("f2 " + data.byteLength)
                    if (data.byteLength > 40) {
                        let f4 = fs.promises.readFile("../../.././facts/f4.txt")
                            .then(function (data) {
                                console.log("f4 " + data.byteLength)
                            }).catch(function (err) {
                                console.log(err);
                            })
                    }
                    else {
                        let f5 = fs.promises.readFile("../../.././facts/f5.txt")
                            .then(function (data) {
                                console.log("f5 " + data.byteLength)
                            }).catch(function (err) {
                                console.log(err);
                            })
                    }
                }).catch(function (err) {
                    console.log(err);
                })
        }
        else {
            let f3 = fs.promises.readFile("../../.././facts/f3.txt")
                .then(function (data) {
                    console.log("f3 " + data.byteLength)
                    if (data.byteLength > 50) {
                        let f6 = fs.promises.readFile("../../.././facts/f6.txt")
                            .then(function (data) {
                                console.log("f6 " + data.byteLength)
                            }).catch(function (err) {
                                console.log(err);
                            })
                    }
                    else {
                        let f7 = fs.promises.readFile("../../.././facts/f7.txt")
                            .then(function (data) {
                                console.log("f7 " + data.byteLength)
                            }).catch(function (err) {
                                console.log(err);
                            })
                    }
                }).catch(function (err) {
                    console.log(err);
                })
        }
    }).catch(function (err) {
        console.log(err);
    })