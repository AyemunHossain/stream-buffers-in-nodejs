// What is stream pipe?
// Piping is a mechanism in NodeJs where the output of a stream is fed as an input into another stream. With that mentioned, let us see an example of piping

const fs = require("fs");

const reader = fs.createReadStream("./sample.txt");
const writer = fs.createWriteStream("./newFile.txt");

reader.pipe(writer);

console.log("Piping ended");