function binaryDivision(binaryNumerator, binaryDenominator) {
    // Convert binary strings to decimal numbers
    let numerator = parseInt(binaryNumerator, 2);
    let denominator = parseInt(binaryDenominator, 2);

    // Perform division
    let quotient = Math.floor(numerator / denominator);
    let remainder = numerator % denominator;

    // Convert results back to binary strings
    let binaryQuotient = quotient.toString(2);
    let binaryRemainder = remainder.toString(2);

    // Display the result
    console.log("Quotient: " + binaryQuotient);
    console.log("Remainder: " + binaryRemainder);
    console.log(binaryRemainder.length);

    if(remainder.length != binaryDenominator.length-1){
        let diffrence = binaryRemainder.length - binaryDenominator.length
        for (let i = 0; i < diffrence; i++) {
            binaryRemainder += "0"
        }
        binaryRemainder += binaryRemainder
    }

    let message_transmited  = binaryNumerator.substring(0, binaryNumerator.length - 3)+binaryRemainder
    console.log(message_transmited);
}

// Example usage
binaryDivision("10010000", "110");