

// Flowing and Non-flowing
// There are two types of readable streams in NodeJs:

// Flowing stream — A stream used to pass data from the system and provide this data to your programs.

const fs = require('fs');

// Create a readable stream from a file
const readableStream = fs.createReadStream('example.txt');

// Set the encoding to utf8
readableStream.setEncoding('utf8');

// Handle the data event to read the data chunks
readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  console.log(chunk);
});

// Handle the end event when the stream is done reading
readableStream.on('end', () => {
  console.log('Finished reading file.');
});

// Handle the error event for any errors during the read
readableStream.on('error', (err) => {
  console.error('Error:', err);
});



// Non-flowing stream — The non-flowing stream that does not push data automatically. Instead, the non-flowing stream stores the data in the buffer and explicitly calls the

const fs = require('fs');

// Create a readable stream from a file
const readableStream2 = fs.createReadStream('example.txt');

// Handle the readable event to read the data chunks
readableStream2.on('readable', () => {
  let chunk;
  while (null !== (chunk = readableStream2.read())) {
    console.log(`Received ${chunk.length} bytes of data.`);
    console.log(chunk.toString());
  }
});

// Handle the end event when the stream is done reading
readableStream2.on('end', () => {
  console.log('Finished reading file.');
});

// Handle the error event for any errors during the read
readableStream2.on('error', (err) => {
  console.error('Error:', err);
});




// Switching between two mood: 
const fs = require('fs');

// Create a readable stream from a file
const readableStream3 = fs.createReadStream('example.txt');

// Initially in non-flowing mode
readableStream3.on('readable', () => {
  let chunk;
  while (null !== (chunk = readableStream3.read())) {
    console.log(`Received ${chunk.length} bytes of data.`);
    console.log(chunk.toString());
  }
});

// Switch to flowing mode by adding a data event listener
readableStream3.on('data', (chunk) => {
  console.log('Switching to flowing mode.');
  console.log(chunk.toString());
});
