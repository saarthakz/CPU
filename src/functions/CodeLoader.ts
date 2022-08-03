import { CPU } from "../CPU";
import fs from "node:fs";

export default function codeLoader(processor: CPU, path: string) {
  let data = fs.readFileSync(process.cwd() + path);
  let stringData = new Array<string>(data.length);
  data.forEach((val, idx) => stringData[idx] = String.fromCharCode(val));

  stringData = stringData.join("").split("\r\n");

  let codeStartAddr = 2 ** 15;
  let codeAddr = codeStartAddr;

  stringData.forEach((dataLine) => {
    dataLine = dataLine.split("//")[0].trim();
    for (let idx = 0; idx < dataLine.length; idx++) {
      processor.RAM[codeAddr] = dataLine[idx].charCodeAt(0);
      codeAddr++;
    };
  });

  return codeStartAddr;

};