// what are buffers?
// The buffer class in Node.Js is designed to handle raw binary data. 
// It is a global class, so there is no need in using the required() method to import it.

// Speciality about?
// buffer is a space in memory (usually RAM) that temporarily stores binary data. 
// A buffer is a temporary memory that a stream takes to hold some data until it is consumed.
// When a stream processor accepts data faster more than it can digest, sends the data to buffer.



// Creating buffers: 
// Buffer.from() : 
const buf1 = Buffer.from("Hello, welcome to Node.Js")
console.log(buf1) //<Buffer 48 65 6c 6c 6f 2c 20 77 65 6c 63 6f 6d 65 20 74 6f 20 4e 6f 64 65 2e 4a 73>


// Buffer.alloc(size)
const _buf1 = Buffer.alloc(8)
buf1.write("Hello, welcome to Node.Js")

console.log(_buf1.toString())//Hello, w


// Buffer.allocUnsafe(size).

const buf2 = Buffer.allocUnsafe(8, 1)
buf2.write("Hello, welcome to Node.Js")
console.log(buf2.toString())//Hello, w



// About Buffer.alloc(size) & Buffer.allocUnsafe(size)
// However, the trade-off is that the allocated segment of memory might contain old data that is potentially sensitive. 


// what are streams?
// Stream is the method of transferring large amounts of data in an efficient way. 
// They are used to read or write input into output sequentially. 
// Furthermore, they are used to handling reading/writing files,
// network communications, or any kind of end-to-end information exchange in an efficient manner.


// Advantages of streams
// It is time-efficient – Because data is available in bits, it takes less time to start processing the data than waiting for the whole data to be available.
// It is memory efficient – It requires less memory to process the data because you don’t need all the data to be available in the memory before processing it


// Here are some important features of Streams: 
// Streams work sequentially. 
// The information is transmitted through “chunks” (pieces). 
// Streams rely on buffers to manage content.

// Types of NodeJs Streams
// Readable stream – A readable stream is an abstraction for a source from which data can be read, in other words, it lets you read data from a source
// Writeable stream – A writable stream is an abstraction for a destination to which data can be written
// Duplex stream – You can both read and write into it, in other words, it is a combination of both readable and writeable streams. Example – net.Socket
// Transform stream – It is similar to a duplex stream, but it can modify the data as it is being written and read. Example – zlib.createGzip


// Example of Readable Stream

const fs = require("fs");
const readerStream = fs.createReadStream("./myOutput.txt");

readerStream.on("data", function (chunk) {
  console.log(chunk.toString());
});

readerStream.on("end", function () {
  console.log("Stream Ended");
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});


// Example of Writable Stream
const fs = require("fs");
const data = "Hello, welcome to Node.Js";
const writerStream = fs.createWriteStream("./myOutput.txt");

writerStream.write(data, "UTF8");
writerStream.end();

writerStream.on("finish", function () {
  console.log("Write completed.");
});

writerStream.on("error", function (err) {
  console.log(err.stack);
});


// Example of Transform Stream
const fs = require("fs");
const zlib = require("zlib");

fs.createReadStream("./myOutput.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("myOutput.txt.gz"));

console.log("File Compressed.");

// Example of Duplex Stream

const net = require("net");
const server = net.createServer(function (connection) {
  console.log("Client Connected");

  connection.on("end", function () {
    console.log("Client Disconnected");
  });

  connection.write("Hello, welcome to Node.Js");
  connection.pipe(connection);
});

server.listen(8080, function () {
  console.log("Server Started");

});

