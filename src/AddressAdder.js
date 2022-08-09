const fs = require("node:fs");

let data = fs.readFileSync(process.cwd() + "/Code.asm");
let strData = new Array(data.length);

data.forEach((val, idx) => strData[idx] = String.fromCharCode(val));
strData = strData.join("").split("\r\n");
let ctr = 0;

strData = strData.map((line) => {
  let temp = `${4000 + (7 * ctr)}: ${line}\r\n`;
  ctr++;
  return temp;
});

fs.writeFileSync(process.cwd() + "/Code.asm", strData.join(""));