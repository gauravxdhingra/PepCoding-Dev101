console.log("Hello All");

let number = 22
for (let div = 2; div <= number * number; div++) {
    if (number % div == 0) {
        console.log('Not Prime')
        return;
    }
    console.log('Number is prime');
}