const fs = require("fs");
const http = require("http");
// Synchronous and blocking mode

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// Async and non blocking mode
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile("./txt/output.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log(err);
//       });
//     });
//   });
// });

// //////////////////////////////////////////////////////////////////
// Create server

const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening to request on port : 8000");
});
