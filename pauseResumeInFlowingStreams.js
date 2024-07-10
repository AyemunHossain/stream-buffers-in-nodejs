const fs = require('fs')

//First we need to create a read stream
const readableStream = fs.createReadStream('2mb-examplefile-com.txt')
// Initialize a counter to keep track of the number of chunks read
let chunkCounter = 0;

// Event listener for when there is data available to read
readableStream.on('data', (chunk) => {

  chunkCounter++;

    console.log(`Received ${chunk.length} bytes of data.`);
    // console.log(chunk.toString());

    // If we have read two chunks, pause the stream
    if (chunkCounter === 2) {
      console.log('Pausing stream after reading two chunks.');
      readableStream.pause();

      // Resume the stream after a delay
      setTimeout(()=>{
        readableStream.resume();
      },2000);
    }
  
});

// Event listener for when the stream has ended
readableStream.on('end', () => {
  console.log('Finished reading file.');
});

// Event listener for errors
readableStream.on('error', (err) => {
  console.error('Error:', err);
});