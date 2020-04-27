// let greeter = function sayHi() {
//     console.log('all function sare variables');
// }

// greeter()


// function lib(number) {
//     for (let div = 2; div <= number * number; div++) {
//         if (number % div === 0) return false;
//     }
//     return true;
// }

// let ans = lib(22)

// if (ans == true) {
//     console.log('Prime')
// } else console.log('Non-Prime')


// let { exec } = require("child_process")

// function framework(data, scb, fcb) {
//     for (let div = 2; div * div <= data; div++) {
//         console.log()
//         if (data % div === 0) {
//             fcb()
//             return
//         }
//     }
//     scb()
// }

// function success() {
//     console.log("prime")
//     exec('calc')
// }
// function failure() {
//     console.log("non prime")
//     exec('start chrome')
// }

// framework(12, success, failure)

// MAP AND FILTER

let arr = [4, 14, 17, 23, 48, 66]

let oddevemap = arr.map(
    function (ele) { if (ele % 2 == 0) { return ++ele; } else { return --ele; } }
)

console.log(oddevemap)


function isPrime(number) {
    for (let div = 2; div * div <= number; div++) {
        if (number % div === 0)
            return false;
    }
    return true;
}

let result = []
Array.prototype.myfilter = function (isPrime) {
 
    for (let i = 0; i < this.length; i++) {
        if (isPrime(this[i]) === true)
            result.push(this[i])
    }
    return result
}

let primefilter = arr.myfilter(isPrime)

console.log(primefilter)
