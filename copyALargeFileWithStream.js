const fs = require('fs');

//First we need to create a read stream
const readableStream = fs.createReadStream('a_file.zip');


//Then we need to create a write stream

const writableStream = fs.createWriteStream('a_file_copy.zip');

//Now we need to pipe the read stream to the write stream
readableStream.pipe(writableStream);
