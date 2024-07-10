const fs = require('fs');

//First we need to create a read stream
const readableStream = fs.createReadStream('2mb-examplefile-com.txt');

// Way 1: We will use flowing mode to read the file

// readableStream.on('data', (chunk) => {
//     console.log(`Received ${chunk.length} bytes of data.`);
//     // console.log(chunk);
//   });

// Way 2: We will use paused mode to read the file

let counter = 0;
readableStream.on('readable', () => {

    console.log("Hurray! Now we can read the file when we wants..")
    let chunk;
    while (null !== (chunk = readableStream.read())) {
        console.log(`Received ${chunk.length} bytes of data.`);
        // console.log(chunk);
    }
});

// Handle the end event when the stream is done reading
readableStream.on('end', () => {
    console.log('Finished reading file.');
  });
  
  // Handle the error event for any errors during the read
  readableStream.on('error', (err) => {
    console.error('Error:', err);
  });
  