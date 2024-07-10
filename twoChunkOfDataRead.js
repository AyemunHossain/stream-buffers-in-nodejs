const fs = require('fs');

//First we need to create a read stream
const readableStream = fs.createReadStream('2mb-examplefile-com.txt');

// if we want to read two chunk of data, then?

let counter = 0;

readableStream.on('readable', () => {

    console.log("Hurray! Now we can read the file when we wants..")
    let chunk;
    counter++;

    if(counter <= 2){
        console.log("Reading the file now..")
        chunk = readableStream.read();
        console.log(`Received ${chunk.length} bytes of data.`);
        console.log(chunk);
    }
    else{
        console.log("I am done reading the file..")
        readableStream.destroy();
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
  